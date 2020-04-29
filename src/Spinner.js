import React, { useState, useEffect } from "react";

const Spinner = ({ trigger }) => {
  const [anim, setAnim] = useState("");

  useEffect(() => {
    setAnim(trigger ? "animation" : "");
  }, [trigger]);

  const onAnimationStart = () => {
    // console.log("Animation start");
  };

  const onAnimationEnd = () => {
    console.log("Animation end");
    setAnim("");
  };

  return (
    <div
      className={`${
        anim ? "bg-gray-300" : ""
      } spinner-wrapper mb-2 w-40 m-auto rounded-full overflow-hidden`}
    >
      <div
        className={`spinner bg-gray-400 rounded-full ${anim}`}
        onAnimationEnd={onAnimationEnd}
        onAnimationStart={onAnimationStart}
      />
    </div>
  );
};

export default Spinner;
