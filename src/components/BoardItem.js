import React, { useState } from "react";
import { StateContext } from "../App";

const BoardItem = ({ item, color }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <StateContext.Consumer>
      {state => (
        <button
          type="button"
          onClick={() => setClicked(prevState => !prevState)}
          className={`relative focus:outline-none`}
        >
          <div
            className={`flex items-center justify-center overflow-hidden bg-white border-2 border-${color ||
              "gray"}-${
              item.active && state.showHints ? 500 : 200
            } rounded-md text-${color || "gray"}-700 text-xl ${
              state.useImages ? "w-24 h-24" : "w-12 h-12"
            }`}
          >
            {state.useImages ? (
              <img
                src={item.option}
                alt={item.hint}
                className="w-full h-auto"
              />
            ) : (
              <span>{item.option}</span>
            )}

            {clicked ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75 m-1">
                <span className="material-icons">done</span>
              </div>
            ) : null}
          </div>
        </button>
      )}
    </StateContext.Consumer>
  );
};

export default BoardItem;
