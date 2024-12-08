import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <div>
      <button {...props} className={"button+props.className"}>
        Get events
      </button>
    </div>
  );
}

export default Button;
