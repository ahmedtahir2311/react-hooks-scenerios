import React, { useState, useTransition } from "react";

const UseTransitionHook = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <button onClick={() => selectTab("all")}>All</button>
      <button onClick={() => selectTab("active")}>Active</button>
      <button onClick={() => selectTab("completed")}>Completed</button>
      <h2>Status :{JSON.stringify(isPending)}</h2>
      <h2>Tab :{tab}</h2>
    </>
  );
};

export default UseTransitionHook;
