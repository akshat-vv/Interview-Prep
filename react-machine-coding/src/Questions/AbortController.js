import React, {useState, useRef, useEffect} from "react";

const AbortControllerExample = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return; // ✅ Prevent empty fetch
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setData(data.products);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        } else {
          console.log("Fetch aborted");
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // ✅ Abort on cleanup
    };
  }, [query]);

  return (
    <div className="App">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {data.map((product) => (
        <p key={product.id}>{product.title}</p> // ✅ key added
      ))}
    </div>
  );
};

export default AbortControllerExample;
