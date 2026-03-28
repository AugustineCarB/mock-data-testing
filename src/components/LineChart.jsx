import { useEffect, useRef } from 'react';
import { createChart, ColorType, LineSeries } from 'lightweight-charts';

export default function LineChart({ data, name }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const rawData = data
      .filter(d => d.value != null || d.close != null)
      .map(d => ({
        time: d.timestamp?.substring(0, 10),
        value: Number(d.value ?? d.close),
      }))
      .filter(d => !isNaN(d.value) && d.time);

    // Deduplicate by time (keep last occurrence) and sort ascending
    const timeMap = new Map();
    for (const d of rawData) timeMap.set(d.time, d);
    const chartData = Array.from(timeMap.values()).sort((a, b) => a.time.localeCompare(b.time));

    if (chartData.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 260,
      layout: {
        background: { type: ColorType.Solid, color: '#1a1a2e' },
        textColor: '#a0a0b0',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#2a2a3e' },
        horzLines: { color: '#2a2a3e' },
      },
      crosshair: { mode: 0 },
      rightPriceScale: { borderColor: '#2a2a3e' },
      timeScale: { borderColor: '#2a2a3e' },
    });

    chartRef.current = chart;

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#00d4aa',
      lineWidth: 2,
    });
    lineSeries.setData(chartData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, [data]);

  const hasData = data.some(d => d.value != null || d.close != null);

  if (!hasData) {
    return (
      <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        No data available
      </div>
    );
  }

  return <div ref={containerRef} style={{ width: '100%', minHeight: 260 }} />;
}
