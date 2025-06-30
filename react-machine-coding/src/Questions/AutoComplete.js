import React, { useEffect, useState } from "react";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const { recipes } = await res.json();
      setData(recipes);
      setActiveIndex(-1); // reset on new results
      setLoading(false);
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, data.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(data[activeIndex].name);
      setData([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div>
      <h2>AutoComplete</h2>
      <div style={{ position: "relative", width: 250 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", padding: "4px" }}
          placeholder="Search recipes..."
        />

        {loading && <div>Loading...</div>}

        {data.length > 0 && (
          <ul style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "150px",
            overflowY: "auto"
          }}>
            {data.map((node, index) => (
              <li
                key={node.id}
                style={{
                  padding: "6px 10px",
                  backgroundColor: index === activeIndex ? "#eee" : "#fff",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setQuery(node.name);
                  setData([]);
                  setActiveIndex(-1);
                }}
              >
                {node.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
