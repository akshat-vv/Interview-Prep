import React, { useState, useEffect } from "react";
import ProgressBarComponent from "./ProgressBarComponent";

const App = () => {
  const [bars, setBars] = useState([]);
  const [concurrencyLimit, setConcurrencyLimit] = useState(2);
  const runningCount = bars.filter((b) => b.status === "running").length;
  const [start, setStart] = useState(false)

  const addBar = () => {
    setStart(true);
    const id = Date.now() + Math.random();
    const canRun = runningCount < concurrencyLimit;

    setBars((prev) => [
      ...prev,
      {
        id,
        progress: 0,
        status: canRun ? "running" : "pending",
      },
    ]);
  };

  useEffect(() => {
    let interval;
    if(start){
         interval = setInterval(() => {
        setBars((prevBars) => {
            return prevBars.map((bar) => {
            if (bar.status === "running") {
                const updated = bar.progress + 5;
                if (updated >= 100) {
                return { ...bar, progress: 100, status: "completed" };
                }
                return { ...bar, progress: updated };
            }
            return bar;
            });
        });
        }, 100);
    }


    return () => clearInterval(interval);
  },[]);

  useEffect(() => {
    // Check and promote next pending if slots are available
    const running = bars.filter((b) => b.status === "running").length;
    const pending = bars.find((b) => b.status === "pending");

    if(running === 0){
        setStart(false)
    }

    if (running < concurrencyLimit && pending) {
      setBars((prevBars) =>
        prevBars.map((bar) =>
          bar.id === pending.id ? { ...bar, status: "running" } : bar
        )
      );
    }
  }, [bars, concurrencyLimit]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🚀 Concurrent Progress Bars</h2>

      <label>
        Concurrency Limit:
        <input
          type="number"
          min="1"
          value={concurrencyLimit}
          onChange={(e) => setConcurrencyLimit(parseInt(e.target.value, 10))}
          style={{ marginLeft: "10px" }}
        />
      </label>

      <button onClick={addBar} style={{ marginLeft: "20px" }}>
        ➕ Add Bar
      </button>

      <div style={{ marginTop: "20px" }}>
        {bars.map((bar) => (
          <ProgressBarComponent key={bar.id} progress={bar.progress} />
        ))}
      </div>
    </div>
  );
};

export default App;
