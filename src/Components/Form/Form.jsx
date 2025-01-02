import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";
import Button from "../Button/Button";
import ListEvents from "../ListEvents/ListEvents";
import { getData, filterEvents } from "../../services/filter";

export default function Form() {
  const [time, setTime] = useState("2");
  const [events, setEvents] = useState([]);
  const { tg } = useTelegram();
  const user = tg.initDataUnsafe.user;

  console.log(tg.LocationManager.isInited);
  tg.LocationManager.init((LocationData) => {
    LocationData.getLocation();
    console.log(tg.LocationManager.getLocation(LocationData));
  });
  console.log(tg.LocationManager.isInited);

  useEffect(() => {
    filterEvents("2").then((result) => {
      console.log(events);
      setEvents(result);
    });
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const userLocation = urlParams.get("location");
  console.log(userLocation);
  // if (userLocation) {
  //   console.log("User location is:", userLocation);
  //   return userLocation;
  // }

  const onChangeTime = (e) => {
    // setTime(e.target.value);
    if (user) {
      const madeFilter = filterEvents(e.target.value);
      console.log(urlParams, userLocation);
      madeFilter.then((result) => {
        console.log(result);
        setEvents(result);
      });
    } else {
      console.log("no");
    }
    console.log(e.target.value);
  };
  const getDataForm = (e) => {
    e.preventDefault();
    // if (user) {
    //   const madeFilter = filterEvents(time);
    //   madeFilter.then((result) => {
    //     console.log(result);
    //     setEvents(result);
    //   });
    // } else {
    //   console.log("no");
    // }
  };
  // const geo = tg.LocationManager.getLocation();
  return (
    <>
      <form className={"form"} onSubmit={getDataForm}>
        <div className={"title"}>
          Выбери время, в течении которого хочешь найти ивент:
        </div>
        <select onChange={onChangeTime} className={"select"}>
          {/* <option value={"1"}>1 час</option> */}
          <option value={"2"}>2 часа</option>
          <option value={"4"}>4 часа</option>
          <option value={"8"}>8 часов</option>
          <option value={"24"}>весь день</option>
          <option value={"48"}>завтра</option>
        </select>
        {/* <Button>Найти ивент</Button> */}
      </form>
      {/* <div>{geo}</div> */}
      {events.length !== 0 ? (
        <ListEvents events={events} />
      ) : (
        <div className={"no-events"}>
          К сожалению, в заданный промежуток времени ивенты не найдены
        </div>
      )}
    </>
  );
}
