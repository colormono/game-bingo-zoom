import React from "react";

export default ({ lastNumber, useImages }) => {
  return (
    <div className="text-6xl text-gray-700 font-semibold leading-tight my-2 center">
      {lastNumber ? (
        <>
          {useImages ? (
            <div className="p-4 inline-block bg-white rounded-md shadow-md">
              <img
                src={lastNumber.option}
                alt={lastNumber.hint}
                className="m-auto h-32"
              />
            </div>
          ) : (
            lastNumber.option
          )}

          {lastNumber.hint ? (
            <div className="text-base font-medium text-gray-600 uppercase tracking-wide">
              {lastNumber.hint}
            </div>
          ) : null}
        </>
      ) : (
        <span role="img" aria-label="start">
          👇
        </span>
      )}
    </div>
  );
};
