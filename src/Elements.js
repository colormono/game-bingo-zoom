import React from "react";

const Button = ({ children, color, className, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={`bg-${color || "gray"}-500 hover:bg-${color ||
      "gray"}-400 text-white font-bold py-2 px-6 border-b-4 border-${color ||
      "gray"}-700 hover:border-${color ||
      "gray"}-500 rounded focus:outline-none ${className}`}
  >
    {children}
  </button>
);

const Icon = ({ children }) => (
  <span className="material-icons">{children}</span>
);

const IconButton = ({ children, color, className, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={`text-gray-500 font-bold p-1 m-2 focus:outline-none`}
  >
    {children}
  </button>
);
// color ?
const Number = ({ color, active, className, children }) => {
  return (
    <div
      className={`inline-flex h-8 w-8 p-4 m-1 items-center justify-center bg-white border-4 rounded-full border-${color ||
        "gray"}-${active ? 500 : 200} text-${color || "gray"}-700 ${className}`}
    >
      {children}
    </div>
  );
};

const Logo = () => (
  <div className="text-center pb-6 font-black text-gray-900 text-4xl">
    <h1>BINGO RIVARELA</h1>
  </div>
);

export { Button, Icon, IconButton, Logo, Number };
