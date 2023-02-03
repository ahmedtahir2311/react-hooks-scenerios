import React, { useMemo, useState } from "react";

const UseMemoHooks = () => {
  const [tab, setTab] = useState("all");

  const createTodos = () => {
    const todos = [];
    for (let i = 0; i < 50; i++) {
      todos.push({
        id: i,
        text: "Todo " + (i + 1),
        completed: Math.random() > 0.5,
      });
    }
    return todos;
  };
  const todos = createTodos();

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (tab === "all") {
          return true;
        } else if (tab === "active") {
          return !todo.completed;
        } else if (tab === "completed") {
          return todo.completed;
        }
      }),
    [todos, tab]
  );

  console.log(visibleTodos);
  return (
    <div>
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <br />
      <ul>
        {visibleTodos.map((item) => (
          <li key={item.id}>
            {item.completed ? <s>{item.text}</s> : item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseMemoHooks;
