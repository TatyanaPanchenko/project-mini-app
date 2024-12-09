import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <div>
      <button {...props} className={"button" + props.className}>
        Get events
      </button>
    </div>
  );
}
