import React, { useEffect, useState } from 'react';

const TrafficSignal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getDelay = (index) => {
    if (index === 0) return 3000; // Red
    if (index === 1) return 2000; // Green
    return 1000;                 // Orange
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, getDelay(activeIndex));

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className='signal'>
      <div className={`light ${activeIndex === 0 ? 'red' : ''}`}></div>
      <div className={`light ${activeIndex === 1 ? 'green' : ''}`}></div>
      <div className={`light ${activeIndex === 2 ? 'orange' : ''}`}></div>
    </div>
  );
};

export default TrafficSignal;
