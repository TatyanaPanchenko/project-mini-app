import React from "react";
import Button from "./Button/Button";
import "./header.css";

function Heder(props) {
  const tg = window.Telegram.WebApp;
  const onClose = () => {
    tg.close();
  };
  return (
    <div className={"header"}>
      <Button onClick={onClose}>Close</Button>
      <span className={"username"}>{tg.initDataUnsafe?.user?.userName}</span>
    </div>
  );
}

export default Heder;
