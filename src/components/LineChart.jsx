import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function LineChart({ data, name }) {
  const chartData = data
    .filter(d => d.value != null || d.close != null)
    .map(d => ({
      date: d.timestamp?.substring(0, 10),
      value: Number(d.value ?? d.close),
    }));

  if (chartData.length === 0) {
    return (
      <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        No data available
      </div>
    );
  }

  // Show ~6 ticks on X axis
  const tickInterval = Math.max(1, Math.floor(chartData.length / 6));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ReLineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#a0a0b0', fontSize: 10 }}
          interval={tickInterval}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#a0a0b0', fontSize: 10 }}
          tickLine={false}
          domain={['auto', 'auto']}
          width={60}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a1a2e',
            border: '1px solid #3a3a5e',
            borderRadius: 6,
            color: '#e0e0f0',
            fontSize: 12,
          }}
          labelStyle={{ color: '#a0a0b0' }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00d4aa"
          strokeWidth={2}
          dot={false}
          name={name}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
