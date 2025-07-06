import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const pagesFetched = useRef(new Set());

  const fetchItems = async (pageNum) => {
    // Prevent duplicate fetch
    if (pagesFetched.current.has(pageNum)) return;
    pagesFetched.current.add(pageNum);

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800)); // Simulate API delay
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
      const el = containerRef.current;
      if (!el || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage((prev) => prev + 1);
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el && el.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll Demo</h2>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {items.map((item) => (
          <div key={item} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            {item}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
