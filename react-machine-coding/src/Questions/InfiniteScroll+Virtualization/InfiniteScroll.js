import { useEffect, useRef, useState } from "react";
import VirtualList from "./VirtualList";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      setPage(1);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`
        );
        const result = await response.json();
        setData((prev) =>
          page === 1 ? result.docs : [...prev, ...result.docs]
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  // Observe the sentinel when it enters view
  useEffect(() => {
    // if (observerRef.current) observerRef.current.disconnect();

    // observerRef.current = new IntersectionObserver(
    //   (entries) => {
    //     if (entries[0].isIntersecting && !loading) {
    //       setPage((prev) => prev + 1);
    //     }
    //   },
    //   { root: null, rootMargin: "0px", threshold: 1.0 }
    // );

    // if (sentinelRef.current) {
    //   observerRef.current.observe(sentinelRef.current);
    // }

    // return () => observerRef.current?.disconnect();
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect(); // safer than unobserve(el)
    };

  }, [loading]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    setData([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search books..."
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      <VirtualList
        items={data}
        height={500}
        itemHeight={50}
        onSentinelRef={sentinelRef}
      />
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
