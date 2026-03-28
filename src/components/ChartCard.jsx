import { useMarketData } from '../hooks/useMarketData';
import { intradayIds } from '../config/instruments';
import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';
import ErrorBoundary from './ErrorBoundary';

function formatValue(val) {
  if (val == null) return '—';
  const n = Number(val);
  if (isNaN(n)) return '—';
  if (Math.abs(n) >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (Math.abs(n) >= 10_000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (Math.abs(n) < 0.01) return n.toFixed(4);
  return n.toFixed(2);
}

function statusDot(latestDate) {
  if (!latestDate) return { color: '#ff4976', label: 'No data' }; // red
  const age = Date.now() - new Date(latestDate).getTime();
  const hours = age / (1000 * 60 * 60);
  if (hours < 48) return { color: '#00d4aa', label: 'Fresh' };     // green
  if (hours < 168) return { color: '#ffb800', label: 'Stale' };     // yellow
  return { color: '#ff4976', label: 'Old' };                         // red
}

export default function ChartCard({ instrument }) {
  const { data, loading, error, latestValue, latestDate } = useMarketData(instrument.id);
  const isCandle = intradayIds.has(instrument.id);
  const status = statusDot(latestDate);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <span
            className="status-dot"
            style={{ backgroundColor: status.color }}
            title={status.label}
          />
          <h3>{instrument.name}</h3>
        </div>
        <div className="chart-meta">
          {loading ? (
            <span className="meta-loading">Loading...</span>
          ) : error ? (
            <span className="meta-error" title={error}>Error</span>
          ) : (
            <>
              <span className="meta-value">{formatValue(latestValue)}</span>
              <span className="meta-date">{latestDate?.substring(0, 10) || '—'}</span>
              <span className="meta-count">{data.length} pts</span>
            </>
          )}
        </div>
      </div>
      <div className="chart-body">
        {loading ? (
          <div className="chart-placeholder">Loading chart data...</div>
        ) : error ? (
          <div className="chart-placeholder chart-error">
            Error: {error}
          </div>
        ) : data.length === 0 ? (
          <div className="chart-placeholder">
            No data in Supabase yet.<br />
            <small>Run the data-center pipeline to populate.</small>
          </div>
        ) : isCandle ? (
          <ErrorBoundary>
            <CandlestickChart data={data} name={instrument.name} />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <LineChart data={data} name={instrument.name} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
