import React, { useId } from "react";

const UseIdHook = () => {
  const idHint = useId();
  const passcode = useId();
  const idOfF = useId();

  return (
    <>
      <div>{idHint}</div>
      <div>{passcode}</div>
      <div>{idOfF}</div>
    </>
  );
};

export default UseIdHook;
