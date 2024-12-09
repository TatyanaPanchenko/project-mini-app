import React from "react";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram.js";
import "./Form.css";

export default function Form() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();
  useEffect(() => {
    tg.MainButton.setParams({ text: "Send" });
  }, []);
  useEffect(() => {
    if (!city || !address) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, []);
  const onChangeCity = (e) => {
    setCity(e.targetValue);
  };
  const onChangeAddress = (e) => {
    setAddress(e.targetValue);
  };
  const onChangeSubject = (e) => {
    setSubject(e.targetValue);
  };
  return (
    <div className={"form"}>
      <h3> Enter data </h3>
      <input
        onChange={onChangeCity}
        className={"input"}
        type="text"
        placeholder={"City"}
        value={city}
      />
      <input
        onChange={onChangeAddress}
        className={"input"}
        type="text"
        placeholder={"Address"}
        value={address}
      />
      <select onChange={onChangeSubject} className={"select"} value={subject}>
        <option value={"legal"}>Legal</option>
        <option value={"physical"}>Physical</option>
      </select>
      <button>Send</button>
    </div>
  );
}
