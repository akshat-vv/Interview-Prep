import React, { useEffect, useReducer, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchItems = async (pageNum) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // Simulated API delay
    const newItems = Array.from(
      { length: 20 },
      (_, i) => `Item ${(pageNum - 1) * 20 + i + 1}`
    );
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setPage((prev) => prev + 1); // Trigger next fetch
      }
    };

    const el = containerRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <h2>InfiniteScroll</h2>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
          >
            {item}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default InfiniteScroll;
