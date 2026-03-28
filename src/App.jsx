import { useState, useMemo } from 'react';
import { instruments, categories } from './config/instruments';
import CategorySection from './components/CategorySection';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    let list = instruments;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') {
      list = list.filter(i => i.category === activeCategory);
    }
    return list;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map = {};
    for (const cat of categories) map[cat] = [];
    for (const inst of filtered) {
      if (map[inst.category]) map[inst.category].push(inst);
    }
    return Object.entries(map).filter(([, items]) => items.length > 0);
  }, [filtered]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>Data Center Dashboard</h1>
          <span className="instrument-count">{filtered.length} / {instruments.length} instruments</span>
        </div>
        <div className="header-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search instruments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="category-tabs">
            <button
              className={`tab ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main className="app-main">
        {grouped.length === 0 ? (
          <div className="no-results">No instruments match your search.</div>
        ) : (
          grouped.map(([cat, items]) => (
            <CategorySection key={cat} category={cat} instruments={items} />
          ))
        )}
      </main>
      <footer className="app-footer">
        <p>Mock Data Testing Dashboard &mdash; reads from Supabase <code>market_data</code> table</p>
      </footer>
    </div>
  );
}

export default App;
