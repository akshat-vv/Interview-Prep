import React, { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

function Counter() {
  const [count, setCount] = useState(0);

  useDocumentTitle(`Count: ${count}`);

  return (
    <div>
      <h1>Count is {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
