import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import ListEvents from "../ListEvents/ListEvents";
import { getData, filterEvents } from "../../services/filter";

export default function Form() {
  const [time, setTime] = useState("2");
  const [events, setEvents] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const { tg } = useTelegram();
  const user = tg.initDataUnsafe.user;
  // console.log(navigator);
  // console.log(user);
  const getSpinner = () => {
    return <Spinner />;
  };

  // console.log(tg.LocationManager.isInited);
  tg.LocationManager.init((LocationData) => {
    LocationData.getLocation();
    console.log(tg.LocationManager.getLocation(LocationData));
  });
  // console.log(tg.LocationManager.isInited);

  useEffect(() => {
    filterEvents("2").then((result) => {
      setEvents(result);
    });
  }, []);

  // const urlParams = new URLSearchParams(window.location.search);
  // const userLocation = urlParams.get("location");
  // console.log(userLocation);
  // if (userLocation) {
  //   console.log("User location is:", userLocation);
  //   return userLocation;
  // }

  const onChangeTime = (e) => {
    console.log(e.target.value);
    setWaiting(true);
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          if (user) {
            console.log("Геолокация получена");
            const madeFilter = filterEvents(e.target.value, location);
            madeFilter.then((result) => {
              console.log(result);
              setEvents(result);
              setWaiting(false);
            });
          } else {
            console.log("no user");
          }
          // chooseLocation(location);
          // return location;
          // console.log("Текущее местоположение:", {
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          //   accuracy: position.coords.accuracy,
          // });
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      // Остановить отслеживание при необходимости
      // navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Геолокация недоступна в этом браузере.");
      if (user) {
        console.log("Геолокация не получена");
        const madeFilter = filterEvents(e.target.value);
        madeFilter.then((result) => {
          console.log(result);
          setEvents(result);
          setWaiting(false);
        });
      } else {
        console.log("no user");
      }
    }
    console.log(events);
  };

  // const getDataForm = (e) => {
  //   e.preventDefault();
  // if (user) {
  //   const madeFilter = filterEvents(time);
  //   madeFilter.then((result) => {
  //     console.log(result);
  //     setEvents(result);
  //   });
  // } else {
  //   console.log("no");
  // }
  // };
  // const geo = tg.LocationManager.getLocation();

  return (
    <>
      <form className={"form"}>
        <div className={"title"}>
          Выберите время, в течении которого хотите найти ивент:
        </div>
        <select onChange={onChangeTime} className={"select"}>
          <option value={"2"}>2 часа</option>
          <option value={"4"}>4 часа</option>
          <option value={"8"}>8 часов</option>
          <option value={"24"}>весь день</option>
          <option value={"48"}>завтра</option>
        </select>
        {/* <Button>Найти ивент</Button> */}
      </form>
      <form className={"form"}>
        <div className={"title"}>
          Выберите свой знак задиака, чтобы подобрать подходящие ивенты:
        </div>
        <select className={"select"}>
          <option value={"Other"}>Не выбран</option>
          <option value={"Aries"}>Овен</option>
          <option value={"Taurus"}>Телец</option>
          <option value={"Gemini"}>Близнецы</option>
          <option value={"Cancer"}>Рак</option>
          <option value={"Leo"}>Лев</option>
          <option value={"Virgo"}>Дева</option>
          <option value={"Libra"}>Весы</option>
          <option value={"Scorpio"}>Скорпион</option>
          <option value={"Sagittarius"}>Стрелец</option>
          <option value={"Capricorn"}>Козерог</option>
          <option value={"Aquarius"}>Водолей</option>
          <option value={"Pisces"}>Рыбы</option>
        </select>
      </form>
      {/* <Button>Найти ивент</Button> */}

      {waiting ? getSpinner() : null}
      {events.length !== 0 ? (
        <ListEvents events={events} />
      ) : (
        <div className={"no-events"}>К сожалению, ивенты не найдены</div>
      )}
    </>
  );
}
