import React, { useEffect, useRef } from "react";

const UseRefHook = () => {
  let idRef = useRef(null);

  useEffect(() => {
    //It is used to get a reference of a Node in the DOM
    console.log(idRef);
  }, []);

  return <p ref={(e) => (idRef = e)}>This is the reference item </p>;
};

export default UseRefHook;
