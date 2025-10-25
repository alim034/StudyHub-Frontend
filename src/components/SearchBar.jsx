import React, { useState, useRef } from 'react';
import { globalSearch } from '../api/searchApi';

const TYPES = [
  { key: 'messages', label: 'Messages' },
  { key: 'notes', label: 'Notes' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'resources', label: 'Resources' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(TYPES.map(t => t.key));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const debounceRef = useRef();

  // Debounced search
  const handleInput = e => {
    setQuery(e.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(e.target.value);
    }, 400);
  };

  const doSearch = async (q) => {
    setLoading(true);
    setError('');
    try {
      const params = {
        q,
        type: selectedTypes,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page: 1,
        limit: 20,
      };
      const res = await globalSearch(params);
      setResults(res.data.results || []);
    } catch (err) {
      setError('Search failed');
    }
    setLoading(false);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Re-search when filters change
  React.useEffect(() => {
    if (query) doSearch(query);
    // eslint-disable-next-line
  }, [selectedTypes, startDate, endDate]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search across all rooms..."
          className="border p-2 rounded flex-1"
        />
        <div className="flex gap-2 items-center">
          {TYPES.map(t => (
            <label key={t.key} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedTypes.includes(t.key)}
                onChange={() => handleTypeToggle(t.key)}
              />
              <span className="text-xs">{t.label}</span>
            </label>
          ))}
        </div>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {loading && <div className="text-sm text-gray-500">Searching...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      <div className="bg-white rounded shadow p-4 max-h-[60vh] overflow-y-auto">
        {results.length === 0 && !loading ? (
          <div className="text-sm text-gray-400">No results found.</div>
        ) : (
          results.map(item => (
            <div key={item._id} className="border-b py-2">
              <div className="flex gap-2 items-center">
                <span className="px-2 py-1 rounded bg-gray-200 text-xs font-bold">{item.type}</span>
                <span className="text-xs text-gray-500">Room: {item.room}</span>
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-1 text-sm">
                {item.type === 'message' && item.content}
                {item.type === 'note' && <><b>{item.title}</b>: {item.description}</>}
                {item.type === 'task' && <><b>{item.title}</b>: {item.description}</>}
                {item.type === 'resource' && <b>{item.name}</b>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
