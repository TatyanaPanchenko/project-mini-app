import { getDataFB } from "./fireBaseData";
import Services from "./padzeiRequest";

// const data = getData();
// console.log(data);

// export const getData = () => {
//   const dataFB = getDataFB();
//   const result = dataFB.then((response) => {
//     return response.events;
//   });
//   return result;
// };

export const filterEvents = async (time, location) => {
  console.log(time);
  // Services.getAuth();
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
    const itemLongitude = item.lon;
    const itemLatitude = item.lat;
    console.log(location);
    if (location.latitude && location.longitude ) {
      const findDelta = (degrees) => {
        return (Math.PI / 180) * 6371210 * Math.cos((degrees * Math.PI) / 180);
      };
      const currentLongitude = location.longitude;
      const currentLatitude = location.latitude;
      const deltaLatitude = 5000 / findDelta(location.latitude);
      const deltaLongitude = 5000 / findDelta(location.longitude);
      console.log(currentLongitude, itemLongitude + deltaLongitude);
      console.log(currentLongitude, itemLongitude - deltaLongitude);
      console.log(currentLatitude, itemLatitude + deltaLatitude);

      console.log(currentLatitude, itemLatitude - deltaLatitude);
      console.log(
        `My location is ${currentLongitude}-${currentLatitude}, локация объекта - ${itemLongitude}- ${itemLatitude}, ${
          currentLatitude + deltaLatitude
        }, ${currentLongitude + deltaLongitude}`
      );
      if (
        eventTime < rangeEvents &&
        eventTime > currentTime &&
        currentLongitude < itemLongitude + deltaLongitude &&
        currentLongitude > itemLongitude - deltaLongitude &&
        currentLatitude < itemLatitude + deltaLatitude &&
        currentLatitude > itemLatitude - deltaLatitude
      ) {
        console.log(
          `Данные получены, текущая геолокация ${location.longitude} - ${location.latitude},  геолокация объекта  ${currentLongitude} - ${currentLatitude}`
        );
        arrEvents.push(item);
      }
    } else {
      if (eventTime < rangeEvents && eventTime > currentTime) {
        console.log("Данные получены без геолокации");
        arrEvents.push(item);
      } else {
        console.log("Данные не получены");
      }
    }
    console.log(arrEvents);
    return arrEvents;
  });
  return arrEvents;

  // const eventsData = await getData();
  // console.log(time);

  // console.log(arrEvents);

  // console.log(arrEvents);
  // return arrEvents;
};

// export const chooseLocation = (location) => {
//   if (location) {
//     const findDelta = (degrees) => {
//       return (Math.PI / 180) * 6371210 * Math.cos((degrees * Math.PI) / 180);
//     };
//     const deltaLatitude = 5000 / findDelta(location.latitude);
//     const deltaLongitude = 5000 / findDelta(location.longitude);
//     console.log(`Location is ${location.longitude} - ${findLongitude}`);
//   }
// };
