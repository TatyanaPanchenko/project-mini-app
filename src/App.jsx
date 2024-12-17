import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import { useTelegram } from "./hooks/useTelegram";
import "./App.css";

export default function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  });

  return (
    <div className="App">
      {/* <Header /> */}
      <Form />
    </div>
  );
}
