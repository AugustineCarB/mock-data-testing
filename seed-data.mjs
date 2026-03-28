// Seed script: fetches recent data from FRED for key instruments and inserts into Supabase
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nzxleqozfjxgvowwmkoi.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eGxlcW96Zmp4Z3Zvd3dta29pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDcxMTU0OSwiZXhwIjoyMDkwMjg3NTQ5fQ.9JLNe_4hAFRtsX2PxHHKIMuiHRe_3HswDTJjJvHwnyk';
const FRED_API_KEY = '2013eb91b05a76970489abb34e5c6b22';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// FRED instruments to seed (ticker -> FRED series ID)
const fredInstruments = {
  us_sofr: 'SOFR',
  us_iorb: 'IORB',
  us_3m_yield: 'DGS3MO',
  us_5y_yield: 'DGS5',
  us_10y_yield: 'DGS10',
  us_30y_yield: 'DGS30',
  us_2s10s_spread: 'T10Y2Y',
  us_real_yield_10y: 'DFII10',
  dxy: 'DTWEXBGS',
  usdjpy: 'DEXJPUS',
  eurusd: 'DEXUSEU',
  gbpusd: 'DEXUSUK',
  usdcnh: 'DEXCHUS',
  usdchf: 'DEXSZUS',
  vix: 'VIXCLS',
  wti_oil: 'DCOILWTICO',
  brent_oil: 'DCOILBRENTEU',
  copper: 'PCOPPUSDM',
  natural_gas: 'DHHNGSP',
  sp500: 'SP500',
  nasdaq: 'NASDAQCOM',
  fed_funds_rate: 'DFF',
  gdpnow: 'GDPNOW',
  initial_jobless_claims: 'ICSA',
  continuing_jobless_claims: 'CCSA',
  nfp: 'PAYEMS',
  unemployment_rate: 'UNRATE',
  jolts_openings: 'JTSJOL',
  jolts_quits: 'JTSQUL',
  jolts_hires: 'JTSHIL',
  gdp: 'GDP',
  core_cpi: 'CPILFESL',
  cpi: 'CPIAUCSL',
  core_ppi: 'PPIFES',
  pce: 'PCEPI',
  core_pce: 'PCEPILFE',
  michigan_sentiment: 'UMCSENT',
  retail_sales: 'RSAFS',
  retail_sales_core: 'RSXFS',
  m2_money_supply: 'M2SL',
  industrial_production: 'INDPRO',
  durable_goods: 'DGORDER',
  housing_starts: 'HOUST',
  building_permits: 'PERMIT',
  // Derived rate-of-change (using FRED units parameter)
  cpi_mom: { series: 'CPIAUCSL', units: 'pch' },
  cpi_yoy: { series: 'CPIAUCSL', units: 'pc1' },
  core_cpi_mom: { series: 'CPILFESL', units: 'pch' },
  core_cpi_yoy: { series: 'CPILFESL', units: 'pc1' },
  pce_mom: { series: 'PCEPI', units: 'pch' },
  pce_yoy: { series: 'PCEPI', units: 'pc1' },
  core_pce_mom: { series: 'PCEPILFE', units: 'pch' },
  core_pce_yoy: { series: 'PCEPILFE', units: 'pc1' },
  gdp_qoq_ann: 'A191RL1Q225SBEA',
  gdp_qoq: { series: 'GDP', units: 'pch' },
  retail_sales_mom: { series: 'RSAFS', units: 'pch' },
  retail_sales_yoy: { series: 'RSAFS', units: 'pc1' },
  nfp_mom_change: { series: 'PAYEMS', units: 'chg' },
  nfp_yoy_change: { series: 'PAYEMS', units: 'ch1' },
  durable_goods_mom_change: { series: 'DGORDER', units: 'chg' },
  durable_goods_yoy_change: { series: 'DGORDER', units: 'ch1' },
};

async function fetchFred(seriesId, units = null, limit = 200) {
  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: FRED_API_KEY,
    file_type: 'json',
    sort_order: 'desc',
    limit: String(limit),
  });
  if (units) params.set('units', units);

  const url = `https://api.stlouisfed.org/fred/series/observations?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`FRED ${seriesId}: ${res.status}`);
  const json = await res.json();
  return (json.observations || [])
    .filter(o => o.value !== '.')
    .map(o => ({ date: o.date, value: parseFloat(o.value) }));
}

async function seedInstrument(ticker, config) {
  let seriesId, units;
  if (typeof config === 'string') {
    seriesId = config;
    units = null;
  } else {
    seriesId = config.series;
    units = config.units;
  }

  try {
    const observations = await fetchFred(seriesId, units, 200);
    if (observations.length === 0) {
      console.log(`  ${ticker}: no data from FRED`);
      return 0;
    }

    const rows = observations.map(o => ({
      ticker,
      source: 'fred',
      timestamp: new Date(o.date + 'T00:00:00Z').toISOString(),
      value: o.value,
      frequency: 'daily',
    }));

    const { error } = await supabase
      .from('market_data')
      .upsert(rows, { onConflict: 'ticker,timestamp,frequency' });

    if (error) throw error;
    console.log(`  ${ticker}: ${rows.length} rows`);
    return rows.length;
  } catch (err) {
    console.log(`  ${ticker}: ERROR - ${err.message.substring(0, 60)}`);
    return 0;
  }
}

console.log('Seeding Supabase with FRED data...\n');

let total = 0;
const tickers = Object.entries(fredInstruments);

// Process in batches of 5 to avoid rate limits
for (let i = 0; i < tickers.length; i += 5) {
  const batch = tickers.slice(i, i + 5);
  const results = await Promise.all(
    batch.map(([ticker, config]) => seedInstrument(ticker, config))
  );
  total += results.reduce((a, b) => a + b, 0);
  // Small delay between batches
  if (i + 5 < tickers.length) await new Promise(r => setTimeout(r, 500));
}

console.log(`\nDone! Inserted ${total} total rows across ${tickers.length} instruments.`);
