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

const Number = ({ active, children }) => (
  <div
    className={`inline-flex h-6 w-6 p-3 m-px items-center justify-center bg-white border-4 rounded-full border-gray-${
      active ? 500 : 200
    } text-gray-700 text-md`}
  >
    {children}
  </div>
);

const Logo = () => (
  <div className="text-center pb-6 font-black text-gray-900 text-5xl">
    <h1>BINGO RIVARELA</h1>
  </div>
);

export { Button, Icon, IconButton, Logo, Number };
