import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";
import Button from "../Button/Button";
import ListEvents from "../ListEvents/ListEvents";
import { getData, filterEvents } from "../../services/filter";

export default function Form() {
  const [time, setTime] = useState("1");
  const [events, setEvents] = useState([]);
  const { tg } = useTelegram();
  const user = tg.initDataUnsafe.user;
  // useEffect(() => {
  // tg.MainButton.setParams({ text: "Send" });
  // }, []);
  console.log(user);
  const onChangeTime = (e) => {
    setTime(e.target.value);
    console.log(e.target.value);
  };
  const getDataForm = (e) => {
    e.preventDefault();
    if (user) {
      const madeFilter = filterEvents(time);
      madeFilter.then((result) => {
        console.log(result);
        setEvents(result);
      });
    } else {
      console.log("no");
    }
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
          <option value={"4"}>4 часа</option>
          <option value={"24"}>весь день</option>
          <option value={"36"}>завтра</option>
        </select>
        <Button>Найти ивент</Button>
      </form>
      <ListEvents events={events} />
    </>
  );
}
