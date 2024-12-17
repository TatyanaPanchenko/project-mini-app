import React from "react";
import "./Button.css";

export default function Button(props) {
  // console.log(props.children);
  return (
    <div>
      <button {...props} className={"button"}></button>
    </div>
  );
}
