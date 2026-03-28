import pg from 'pg';
const { Client } = pg;

const PROJECT_REF = 'nzxleqozfjxgvowwmkoi';

const SQL = `
CREATE TABLE IF NOT EXISTS public.market_data (
  id BIGSERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  source TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  value DOUBLE PRECISION,
  open DOUBLE PRECISION,
  high DOUBLE PRECISION,
  low DOUBLE PRECISION,
  close DOUBLE PRECISION,
  frequency TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ticker, timestamp, frequency)
);

CREATE INDEX IF NOT EXISTS idx_market_data_ticker ON public.market_data(ticker);
CREATE INDEX IF NOT EXISTS idx_market_data_timestamp ON public.market_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_market_data_ticker_ts ON public.market_data(ticker, timestamp DESC);

ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data' AND policyname = 'Allow public read') THEN
    CREATE POLICY "Allow public read" ON public.market_data FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data' AND policyname = 'Allow service insert') THEN
    CREATE POLICY "Allow service insert" ON public.market_data FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data' AND policyname = 'Allow service update') THEN
    CREATE POLICY "Allow service update" ON public.market_data FOR UPDATE USING (true);
  END IF;
END $$;

GRANT SELECT ON public.market_data TO anon;
GRANT SELECT ON public.market_data TO authenticated;
GRANT ALL ON public.market_data TO service_role;
`;

const password = process.env.DB_PASSWORD;
if (!password) {
  console.error('Please provide DB_PASSWORD.');
  process.exit(1);
}

// Use config object instead of connection string to avoid URL-encoding issues
const configs = [
  {
    name: 'Direct host',
    config: { host: `db.${PROJECT_REF}.supabase.co`, port: 5432, database: 'postgres', user: 'postgres', password, ssl: { rejectUnauthorized: false } },
  },
  {
    name: 'Pooler us-east-1',
    config: { host: `aws-0-us-east-1.pooler.supabase.com`, port: 5432, database: 'postgres', user: `postgres.${PROJECT_REF}`, password, ssl: { rejectUnauthorized: false } },
  },
  {
    name: 'Pooler us-west-1',
    config: { host: `aws-0-us-west-1.pooler.supabase.com`, port: 5432, database: 'postgres', user: `postgres.${PROJECT_REF}`, password, ssl: { rejectUnauthorized: false } },
  },
];

for (const { name, config } of configs) {
  console.log(`Trying ${name}...`);
  const client = new Client({ ...config, connectionTimeoutMillis: 15000 });
  try {
    await client.connect();
    console.log('  Connected! Creating table...');
    await client.query(SQL);
    const res = await client.query("SELECT count(*) FROM information_schema.tables WHERE table_name = 'market_data'");
    console.log(`  Table exists: ${res.rows[0].count > 0}`);
    console.log('  RLS policies and grants applied.');
    await client.end();
    console.log('\nDone! Dashboard should work now.');
    process.exit(0);
  } catch (err) {
    console.log(`  Failed: ${err.message.substring(0, 100)}`);
    try { await client.end(); } catch {}
  }
}
console.error('\nCould not connect. Check your DB_PASSWORD.');
process.exit(1);
