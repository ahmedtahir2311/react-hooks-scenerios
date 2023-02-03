import React, { useCallback, useState } from "react";

const UseCallbackHook = () => {
  const [todos, setTodos] = useState([{ id: "123", text: "Hi first one" }]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: Math.random(), text };
    setTodos((todos) => [...todos, newTodo]);
    console.log("handleAddTodo Rendered", todos);
  }, []);

  console.log("component Rendered");

  return (
    <div>
      {todos.map((item) => (
        <p key={item.id}>{item.text}</p>
      ))}

      <button onClick={() => handleAddTodo(Math.random())}>Add New Todo</button>
    </div>
  );
};

export default UseCallbackHook;
