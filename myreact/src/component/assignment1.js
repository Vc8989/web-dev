import React, { useState, useEffect } from 'react';

function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Timer Count: {count}</div>;
}

function ScrollComponent() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div>Scroll Y Position: {scrollY}</div>;
}

function Appp() {
  const [showTimer, setShowTimer] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div style={{ padding: '20px', height: '200vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowTimer(!showTimer)}
          style={{ marginRight: '10px' }}
        >
          Toggle Timer
        </button>
        {showTimer && <TimerComponent />}
      </div>

      <div>
        <button onClick={() => setShowScroll(!showScroll)} style={{ marginRight: '10px' }}>
          Toggle Scroll Listener
        </button>
        {showScroll && <ScrollComponent />}
      </div>
    </div>
  );
}

export default Appp;