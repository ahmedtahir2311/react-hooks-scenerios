import React, { useEffect, useReducer, useRef } from "react";

const UseReducerHook = () => {
  const initialState = {
    isRunning: false,
    time: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "start":
        return { ...state, isRunning: true };
      case "stop":
        return { ...state, isRunning: false };
      case "reset":
        return { isRunning: false, time: 0 };
      case "tick":
        return { ...state, time: state.time + 1 };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      console.log("State is not Changing");
      return;
    }

    idRef.current = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h2>{state.time} s</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <button onClick={() => dispatch({ type: "start" })}>start</button>
        <button onClick={() => dispatch({ type: "stop" })}>stop</button>
        <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      </div>
    </div>
  );
};

export default UseReducerHook;
