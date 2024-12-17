import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";
import Button from "../Button/Button";
import ListEvents from "../ListEvents/ListEvents";
import { getData, filterEvents } from "../../services/filter";

export default function Form() {
  const [time, setTime] = useState("");
  const [events, setEvents] = useState([]);
  const { tg } = useTelegram();
  // useEffect(() => {
  //   tg.MainButton.setParams({ text: "Send" });
  // }, []);

  const onChangeTime = (e) => {
    setTime(e.target.value);
  };
  const getDataForm = (e) => {
    e.preventDefault();
    const madeFilter = filterEvents(time);
    madeFilter.then((result) => {
      setEvents(result);
    });
  };

  return (
    <>
      <form className={"form"} onSubmit={getDataForm}>
        <div className={"title"}>
          Выбери время, в течении которого хочешь найти ивент:
        </div>
        <select onChange={onChangeTime} className={"select"}>
          <option value={"1"}>1 час</option>
          <option value={"2"}>2 часа</option>
          <option value={"3"}>3 часа</option>
          <option value={"4"}>4 часа</option>
          <option value={"5 "}>5 часов</option>
          <option value={"6"}>6 часов</option>
          <option value={"7"}>7 часов</option>
          <option value={"8"}>8 часов</option>
          <option value={"9"}>9 часов</option>
          <option value={"10"}>10 часов</option>
          <option value={"11"}>11 часов</option>
          <option value={"12"}>12 часов</option>
        </select>
        <Button>Найти ивент</Button>
      </form>
      <ListEvents events={events} />
    </>
  );
}
