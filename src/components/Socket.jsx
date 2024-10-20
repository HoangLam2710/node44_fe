import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// socket.on("send-new-number", (data) => {
//   document.getElementById("number").innerHTML = data;
// });

export default function Socket() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    socket.on("send-new-number", (data) => {
      // document.getElementById("number").innerHTML = data;
      setNumber(data);
    });
  }, [socket]);

  const onIncrease = () => {
    socket.emit("increase", "");
  };

  const onDecrease = () => {
    socket.emit("decrease", "");
  };

  return (
    <div className="text-white">
      <button onClick={onIncrease}>Increase</button>
      <p id="number">{number}</p>
      <button onClick={onDecrease}>Decrease</button>
    </div>
  );
}
