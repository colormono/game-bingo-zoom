import React, { useState } from "react";

const BoardNumber = ({ number, color, active, showHints }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setClicked(prevState => !prevState)}
      className={`flex items-center justify-center focus:outline-none w-full`}
    >
      <div
        className={`relative w-full p-1 bg-white border-4 rounded-4 border-${color ||
          "gray"}-${active && showHints ? 500 : 200} text-${color ||
          "gray"}-700 text-xl`}
      >
        {number}
        {clicked ? (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white opacity-75 leading-none p-1">
            <span className="material-icons">done</span>
          </div>
        ) : null}
      </div>
    </button>
  );
};

export default BoardNumber;
