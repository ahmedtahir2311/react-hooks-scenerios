import { useEffect, useState } from "react";

function UseEffectHook({ roomId = 1, createConnection = () => {} }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    console.log("Connection is made with love" + serverUrl + roomId);
    return () => {
      console.log("Disconnected with coffee");
    };
  }, [serverUrl, roomId]);
  // ...
}

export default UseEffectHook;
