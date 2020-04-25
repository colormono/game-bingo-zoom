import React, { useState } from "react";
import { Number } from "./Elements";

const BoardNumber = ({ number, color, active, showHints }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setClicked(prevState => !prevState)}
      className="relative focus:outline-none"
    >
      <Number color={color} active={active && showHints}>
        {number}
        {clicked ? (
          <div className="absolute bg-white opacity-75 rounded-full leading-none">
            <span className="material-icons">done</span>
          </div>
        ) : null}
      </Number>
    </button>
  );
};

export default BoardNumber;
