import React from "react";
import { Select, ConfigProvider } from "antd";
import "./SelectHoroscope.css";

// import Services from "../../services/padzeiRequest";

export default function SelectHoroscope() {
  const onChange = (value) => {
    console.log(value);
  };
  return (
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
        className="horoscope-select"
        onChange={onChange}
        placeholder="Выбрать знак зодиака"
      >
        <Select.Option value="aries">Овен</Select.Option>
        <Select.Option value="taurus">Телец</Select.Option>
        <Select.Option value="gemini">Близнецы</Select.Option>
        <Select.Option value="cancer">Рак</Select.Option>
        <Select.Option value="leo">Лев</Select.Option>
        <Select.Option value="virgo">Дева</Select.Option>
        <Select.Option value="libra">Весы</Select.Option>
        <Select.Option value="scorpio">Скорпион</Select.Option>
        <Select.Option value="sagittarius">Стрелец</Select.Option>
        <Select.Option value="capricorn">Козерог</Select.Option>
        <Select.Option value="aquarius">Водолей</Select.Option>
        <Select.Option value="pisces">Рыбы</Select.Option>
      </Select>
    </ConfigProvider>
  );
}
