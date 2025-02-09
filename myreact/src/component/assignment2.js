import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      Mouse position: X - {position.x}, Y - {position.y}
    </div>
  );
}

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <p>Current count: {count}</p>
    </div>
  );
}

function Appa() {
  const [showData, setShowData] = useState(false);
  const [showMouse, setShowMouse] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowData(!showData)} style={{ marginRight: '10px' }}>
          Toggle Data Fetch
        </button>
        {showData && <DataFetcher />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowMouse(!showMouse)} style={{ marginRight: '10px' }}>
          Toggle Mouse Tracker
        </button>
        {showMouse && <MouseTracker />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowTitle(!showTitle)} style={{ marginRight: '10px' }}>
          Toggle Title Updater
        </button>
        {showTitle && <DocumentTitleUpdater />}
      </div>
    </div>
  );
}

export default Appa;
