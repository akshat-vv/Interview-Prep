import React, { useEffect, useRef, useState } from "react";

const IntersectionObserverExample = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const abortRef = useRef(null);
  const loaderRef = useRef(null);

  // ✅ Reset on query change
  useEffect(() => {
    setData([]);
    setPage(1);
  }, [query]);

  // ✅ Fetch on page change
  useEffect(() => {
    if (!query.trim()) return;

    const fetchData = async () => {
      setLoading(true);
      abortRef.current?.abort(); // cancel previous fetch
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`,
          { signal: controller.signal }
        );
        const result = await res.json();
        setData((prev) =>
          page === 1 ? result.docs : [...prev, ...result.docs]
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortRef.current?.abort(); // clean up
    };
  }, [page]); // only triggers when page changes

  // ✅ Observe bottom sentinel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
      />
      <div style={{  }}>
        {data.map((item, index) => (
          <p key={item.key || index}>{item.title}</p>
        ))}

        <div ref={loaderRef} style={{ height: "20px" }} />
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default IntersectionObserverExample;
