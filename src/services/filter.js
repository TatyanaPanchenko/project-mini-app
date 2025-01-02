import { getDataFB } from "./fireBaseData";
import Services from "./padzeiRequest";

// const data = getData();
// console.log(data);

export const getData = () => {
  const dataFB = getDataFB();
  const result = dataFB.then((response) => {
    return response.events;
  });
  return result;
};

export const filterEvents = async (time) => {
  console.log(time);
  Services.getAuth();
  const eventsData = await Services.getRecomendations();
  console.log(eventsData);
  const arrEvents = [];
  console.log(arrEvents);
  eventsData.forEach((item) => {
    // const date = item.original.match(/\d{2}(\D)\d{2}\1\d{4}/g);
    // const hours = item.original.match(/\b[0-2]?\d:[0-5]\d\b/);
    const eventTime = new Date(item.start).getTime();
    const currentTime = new Date().getTime();
    const rangeEvents = currentTime + Number(time) * 1000 * 60 * 60;
    console.log(item.start);
    console.log(new Date(rangeEvents));
    console.log(new Date(eventTime));
    console.log(new Date(currentTime));
    console.log(Number(time));
    console.log(arrEvents);
    if (rangeEvents > eventTime && eventTime > currentTime) {
      arrEvents.push(item);
    }
    console.log(arrEvents);
  });
  return arrEvents;

  // const eventsData = await getData();
  // console.log(time);

  // console.log(arrEvents);

  // console.log(arrEvents);
  // return arrEvents;
};
