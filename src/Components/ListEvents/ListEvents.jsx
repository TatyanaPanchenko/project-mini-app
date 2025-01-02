import React from "react";
import "./ListEvents.css";

export default function ListEvents({ events }) {
  const addFavorite = (e) => {
    console.log(e.target);
    // setFavorite();
    if (
      e.target.classList.contains("like") &&
      !e.target.classList.contains("active")
    ) {
      e.target.classList.add("active");
    } else if (
      e.target.classList.contains("like") &&
      e.target.classList.contains("active")
    ) {
      e.target.classList.remove("active");
    }
  };
  return (
    <>
      {events.map((item, index) => {
        const {
          content,
          image,
          start,
          title,
          locationName,
          cost,
          currency,
          description,
          date,
          location,
        } = item;
        return (
          <div className={"events"} key={index}>
            <div className={"name"}>{title}</div>
            <div className={"info"}>
              <div className={"hour"}>{start.substr(11, 5)} </div>
              <div className={"day"}>
                {new Date(start).getDate()}/{new Date(start).getMonth() + 1}/
                {new Date(start).getFullYear()}
              </div>
              <div className={"cost"}>
                {cost} {currency}
              </div>
            </div>
            <div className={"location"}>{locationName} </div>
            <div className={"image"}>
              <img src={image} alt={title} />
            </div>

            <div className={"description"}> {content}</div>
            <div className={"like"} onClick={addFavorite}>
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <g id="icomoon-ignore"> </g>
                  <path
                    d="M21.886 5.115c3.521 0 6.376 2.855 6.376 6.376 0 1.809-0.754 3.439-1.964 4.6l-10.297 10.349-10.484-10.536c-1.1-1.146-1.778-2.699-1.778-4.413 0-3.522 2.855-6.376 6.376-6.376 2.652 0 4.925 1.62 5.886 3.924 0.961-2.304 3.234-3.924 5.886-3.924zM21.886 4.049c-2.345 0-4.499 1.089-5.886 2.884-1.386-1.795-3.54-2.884-5.886-2.884-4.104 0-7.442 3.339-7.442 7.442 0 1.928 0.737 3.758 2.075 5.152l11.253 11.309 11.053-11.108c1.46-1.402 2.275-3.308 2.275-5.352 0-4.104-3.339-7.442-7.442-7.442v0z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        );
      })}
    </>
  );
}
