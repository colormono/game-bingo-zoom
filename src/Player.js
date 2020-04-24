import React from "react";

const Player = ({ numbers, showHints }) => {
  return (
    <h4>
      Billete:{" "}
      {numbers.map(item => {
        return (
          <span
            key={item.number}
            className={`number ${
              item.active && showHints ? "number--active" : "number--regular"
            }`}
          >
            {item.number}
          </span>
        );
      })}
    </h4>
  );
};

export default Player;
