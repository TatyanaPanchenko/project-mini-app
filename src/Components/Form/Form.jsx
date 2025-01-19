import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import ListEvents from "../ListEvents/ListEvents";
import SelectHoroscope from "../SelectHoroscope/SelectHoroscope";
import { Select, Checkbox, ConfigProvider } from "antd";
import { getData, filterEvents } from "../../services/filter";

export default function Form() {
  const [time, setTime] = useState("2");
  const [events, setEvents] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [horoscope, setHoroscope] = useState(false);
  const [location, setLocation] = useState({});
  console.log(location);
  console.log(horoscope);
  const { tg } = useTelegram();
  const user = tg.initDataUnsafe.user;
  // console.log(navigator);
  // console.log(user);
  const getSpinner = () => {
    return <Spinner />;
  };

  // console.log(tg.LocationManager.isInited);
  // tg.LocationManager.init((LocationData) => {
  //   LocationData.getLocation();
  //   console.log(tg.LocationManager.getLocation(LocationData));
  // });
  // console.log(tg.LocationManager.isInited);

  useEffect(() => {
    filterEvents("4").then((result) => {
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

  if ("geolocation" in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // const location = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   accuracy: position.coords.accuracy,
        // };
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
    // if (user) {
    //   console.log("Геолокация не получена");
    //   const madeFilter = filterEvents(value);
    //   madeFilter.then((result) => {
    //     console.log(result);
    //     setEvents(result);
    //     setWaiting(false);
    //   });
    // } else {
    //   console.log("no user");
    // }
  }

  const onChangeTime = (value) => {
    console.log(value);
    setWaiting(true);

    if (user) {
           const madeFilter = filterEvents(value, location);
      madeFilter.then((result) => {
        console.log(result);
        setEvents(result);
        setWaiting(false);
      });
    } else {
      console.log("no user");
      setWaiting(false);
    }

    console.log(events);
  };


  const getHoroscope = () => {
    if (!horoscope) {
      setHoroscope(true);
      console.log(`horoscope изменен на ${horoscope}`);
    } else if (horoscope) {
      console.log(`horoscope изменен на ${horoscope}`);
      setHoroscope(false);
    }
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
      <form className={"form-time"}>
        <div className={"title"}>
          Выберите время, в течении которого хотите найти ивент:
        </div>

        <ConfigProvider
          theme={{
            components: {
              Select: {
                activeBorderColor: "none",
                hoverBorderColor: "none",
              },
            },
          }}
        >
          <Select
            className="time-select"
            placeholder="4 часа"
            onChange={onChangeTime}
          >
            <Select.Option value="4">4 часа</Select.Option>
            <Select.Option value="8">8 часов</Select.Option>
            <Select.Option value="12">12 часов</Select.Option>
            <Select.Option value="24">Весь день</Select.Option>
            <Select.Option value="480">Включая завтра</Select.Option>
          </Select>
        </ConfigProvider>
      </form>
      <form className={"form-horoscope"}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ccc",
              controlInteractiveSize: 20,
            },
          }}
        >
          <Checkbox className={"checkbox-horoscope"} onChange={getHoroscope}>
            {" "}
            Подобрать активности по гороскопу
          </Checkbox>
        </ConfigProvider>
        {/* <input type="checkbox" className="checkbox-horoscope" /> */}
        {/* <span> Подобрать подходящие активности по гороскопу</span> */}

        {horoscope ? <SelectHoroscope /> : null}
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
