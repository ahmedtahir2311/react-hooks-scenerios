import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(0);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext can only be used inside AppProvider");
  }
  return context;
}

const ConsumerMainFunction = () => {
  return (
    <AppProvider>
      <ConsumerFunction />
    </AppProvider>
  );
};

export default ConsumerMainFunction;

const ConsumerFunction = () => {
  const { state, setState } = useAppContext();
  const increment = (e) => {
    e.preventDefault();
    setState(state + 1);
  };
  const decrement = (e) => {
    e.preventDefault();
    setState(state - 1);
  };
  return (
    <div>
      <button onClick={decrement}>-</button>
      <p>{state}</p>
      <button onClick={increment}>+</button>
    </div>
  );
};
