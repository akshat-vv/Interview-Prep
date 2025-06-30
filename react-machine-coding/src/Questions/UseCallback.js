import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

const UseCallback = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // stays same between renders


  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />
    </div>
  );
}

export default UseCallback