import React from "react";
import "./ListEvents.css";

export default function ListEvents({ events }) {
  return (
    <>
      {events.map((item, index) => {
        const { name, title, description, date, location } = item;
        return (
          <div className={"events"} key={index}>
            <div className={"image"}>
              <img src={`./assets/${name}.jpg`} alt={name} />
            </div>
            <div className={"title"}>{title} </div>
            <div className={"description"}> {description}</div>
            <div className={"date"}>{date} </div>
            <div className={"location"}>{location} </div>
          </div>
        );
      })}
    </>
  );
}
