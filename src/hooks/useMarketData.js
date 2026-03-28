import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

/**
 * Fetches historical data for a given instrument from Supabase.
 * Returns { data, loading, error, latestValue, latestDate }
 */
export function useMarketData(instrumentId, limit = 500) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const { data: rows, error: dbError } = await supabase
          .from('market_data')
          .select('*')
          .eq('ticker', instrumentId)
          .order('timestamp', { ascending: true })
          .limit(limit);

        if (dbError) throw dbError;
        if (cancelled) return;

        setData(rows || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [instrumentId, limit]);

  const latest = data.length > 0 ? data[data.length - 1] : null;

  return {
    data,
    loading,
    error,
    latestValue: latest?.value ?? latest?.close ?? null,
    latestDate: latest?.timestamp ?? null,
  };
}
