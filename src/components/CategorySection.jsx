import ChartCard from './ChartCard';

const categoryColors = {
  'US Rates': '#4fc3f7',
  'Global & Spreads': '#ab47bc',
  'FX & Dollar': '#66bb6a',
  'Commodities & Vol': '#ffa726',
  'Econ Charts': '#ef5350',
  'Watchlist': '#42a5f5',
};

export default function CategorySection({ category, instruments }) {
  const color = categoryColors[category] || '#888';

  return (
    <section className="category-section">
      <h2 className="category-title" style={{ borderLeftColor: color }}>
        {category}
        <span className="category-count">{instruments.length}</span>
      </h2>
      <div className="chart-grid">
        {instruments.map(inst => (
          <ChartCard key={inst.id} instrument={inst} />
        ))}
      </div>
    </section>
  );
}
