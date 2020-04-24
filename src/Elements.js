import React from "react";

const Button = ({ children, color, className, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={`bg-${color || "gray"}-500 hover:bg-${color ||
      "gray"}-400 text-white font-bold py-2 px-4 border-b-4 border-${color ||
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
    className={`text-gray-500 font-bold py-2 px-4 focus:outline-none`}
  >
    {children}
  </button>
);

const Logo = () => (
  <div className="text-center pb-6">
    <h1>BINGO RIVARELA</h1>
  </div>
);

export { Button, Icon, IconButton, Logo };
