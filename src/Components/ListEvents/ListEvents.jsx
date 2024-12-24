import React from "react";
import "./ListEvents.css";

export default function ListEvents({ events }) {
  return (
    <>
      {events.map((item, index) => {
        const {
          content,
          image,
          start,
          title,
          locationAddress,
          description,
          date,
          location,
        } = item;
        return (
          <div className={"events"} key={index}>
            <div className={"image"}>
              <img src={image} alt={title} />
            </div>
            <div className={"title"}>{title} </div>
            <div className={"description"}> {content}</div>
            <div className={"date"}>{start} </div>
            <div className={"location"}>{locationAddress} </div>
          </div>
        );
      })}
    </>
  );
}
