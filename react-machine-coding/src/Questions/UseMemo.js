import React, { useState, useMemo } from "react";

const ExpensiveCalculation = ({ num }) => {
  const expensiveValue = useMemo(() => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) result += num;
    return result;
  }, [num]);

  return <div>Calculated: {expensiveValue}</div>;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
      <button onClick={() => setNum((n) => n + 1)}>Increment Num</button>
      <p>Count: {count}</p>
      <ExpensiveCalculation num={num} />
    </div>
  );
}
