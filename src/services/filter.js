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
  const eventsData = await Services.getRecomendations();
  console.log(eventsData);
  // const eventsData = await getData();
  console.log(eventsData);
  console.log(time);
  const currentTime = new Date().getTime();
  const rangeEvents = currentTime + Number(time) * 1000 * 60 * 60;
  const arrEvents = [];
  console.log(arrEvents);
  eventsData.forEach((item) => {
    const eventTime = new Date(item.date).getTime();
    console.log(rangeEvents);
    console.log(eventTime);
    console.log(currentTime);
    if (rangeEvents > eventTime && eventTime > currentTime) {
      console.log(item.date);
      arrEvents.push(item);
    }
  });
  console.log(arrEvents);
  return arrEvents;
};
