import React, { useEffect, useRef, useState } from "react";

const VirtualizationCustom = ({ items, itemHeight, height }) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 5, items.length); // with buffer

  const visibleItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(containerRef.current.scrollTop);
    };

    const el = containerRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

   return (
    <>
    <h2>Custom Virtualization</h2>
        <div
      ref={containerRef}
      style={{
        height,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, i) => (
          <div
            key={startIndex + i}
            style={{
              position: "absolute",
              top: (startIndex + i) * itemHeight,
              height: itemHeight,
              left: 0,
              right: 0,
              borderBottom: "1px solid #eee",
              paddingLeft: "8px",
            }}
          >
            Item #{item}
          </div>
        ))}
      </div>
    </div>
        </>

  );
};

export default VirtualizationCustom;
