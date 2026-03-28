import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, LineSeries } from 'lightweight-charts';

export default function CandlestickChart({ data, name }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

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
      timeScale: {
        borderColor: '#2a2a3e',
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    // Format data for candlestick – deduplicate by time
    const ohlcRaw = data
      .filter(d => d.open != null && d.high != null && d.low != null && d.close != null)
      .map(d => ({
        time: d.timestamp?.substring(0, 10),
        open: Number(d.open),
        high: Number(d.high),
        low: Number(d.low),
        close: Number(d.close),
      }))
      .filter(d => d.time);
    const ohlcMap = new Map();
    for (const d of ohlcRaw) ohlcMap.set(d.time, d);
    const ohlcData = Array.from(ohlcMap.values()).sort((a, b) => a.time.localeCompare(b.time));

    if (ohlcData.length > 0) {
      // v5 API: chart.addSeries(CandlestickSeries, options)
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#00d4aa',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#00d4aa',
        wickDownColor: '#ff4976',
        wickUpColor: '#00d4aa',
      });
      candleSeries.setData(ohlcData);
    } else {
      // Fall back to line chart if no OHLC – deduplicate by time
      const lineRaw = data
        .filter(d => d.value != null || d.close != null)
        .map(d => ({
          time: d.timestamp?.substring(0, 10),
          value: Number(d.value ?? d.close),
        }))
        .filter(d => d.time && !isNaN(d.value));
      const lineMap = new Map();
      for (const d of lineRaw) lineMap.set(d.time, d);
      const lineData = Array.from(lineMap.values()).sort((a, b) => a.time.localeCompare(b.time));

      if (lineData.length > 0) {
        // v5 API: chart.addSeries(LineSeries, options)
        const lineSeries = chart.addSeries(LineSeries, {
          color: '#00d4aa',
          lineWidth: 2,
        });
        lineSeries.setData(lineData);
      }
    }

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

  return <div ref={containerRef} style={{ width: '100%', minHeight: 260 }} />;
}
