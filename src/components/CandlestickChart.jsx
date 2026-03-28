import { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

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

    // Format data for candlestick
    const ohlcData = data
      .filter(d => d.open != null && d.high != null && d.low != null && d.close != null)
      .map(d => ({
        time: d.timestamp?.substring(0, 10),
        open: Number(d.open),
        high: Number(d.high),
        low: Number(d.low),
        close: Number(d.close),
      }));

    if (ohlcData.length > 0) {
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#00d4aa',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#00d4aa',
        wickDownColor: '#ff4976',
        wickUpColor: '#00d4aa',
      });
      candleSeries.setData(ohlcData);
    } else {
      // Fall back to line chart if no OHLC
      const lineData = data
        .filter(d => d.value != null || d.close != null)
        .map(d => ({
          time: d.timestamp?.substring(0, 10),
          value: Number(d.value ?? d.close),
        }));

      if (lineData.length > 0) {
        const lineSeries = chart.addLineSeries({
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
