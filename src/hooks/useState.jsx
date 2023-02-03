import React, { useState } from "react";

const UseStateHook = () => {
  const [count, setCount] = useState(0);

  const increment = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  const decrement = (e) => {
    e.preventDefault();
    setCount(count - 1);
  };
  return (
    <div>
      <button onClick={decrement}>-</button>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default UseStateHook;
