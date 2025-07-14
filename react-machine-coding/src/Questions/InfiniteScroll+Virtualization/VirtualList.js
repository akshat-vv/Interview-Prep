import { useEffect, useRef, useState } from "react";

const VirtualList = ({ items, itemHeight, height, onSentinelRef }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalHeight = items.length * itemHeight;
  const visibleItems = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItems + 5, items.length);
  const visibleList = items.slice(startIndex, endIndex);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(containerRef.current.scrollTop);
    };

    const el = containerRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ border: "1px solid black", overflow: "auto", height }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleList.map((doc, i) => (
          <div
            key={startIndex + i}
            style={{
              height: itemHeight,
              position: "absolute",
              top: (startIndex + i) * itemHeight,
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
              borderBottom: "1px solid #ccc",
            }}
          >
            {doc.title}
          </div>
        ))}

        {/* Sentinel at the bottom */}
        <div
          ref={onSentinelRef}
          style={{
            position: "absolute",
            top: totalHeight - 1,
            height: "1px",
            width: "100%",
            background: "red",
          }}
        />
      </div>
    </div>
  );
};

export default VirtualList;
