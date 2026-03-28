import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches historical data for a given instrument from Supabase.
 * Auto-refreshes every 5 minutes.
 * Returns { data, loading, error, latestValue, latestDate }
 */
export function useMarketData(instrumentId, limit = 500) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const { data: rows, error: dbError } = await supabase
        .from('market_data')
        .select('*')
        .eq('ticker', instrumentId)
        .order('timestamp', { ascending: true })
        .limit(limit);

      if (dbError) throw dbError;
      setData(rows || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [instrumentId, limit]);

  useEffect(() => {
    fetchData(true);

    // Auto-refresh every 5 minutes (silently, no loading spinner)
    const interval = setInterval(() => fetchData(false), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const latest = data.length > 0 ? data[data.length - 1] : null;

  return {
    data,
    loading,
    error,
    latestValue: latest?.value ?? latest?.close ?? null,
    latestDate: latest?.timestamp ?? null,
  };
}
