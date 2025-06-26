import React from "react";

const Button = ({
  text,
  onClick,
  type = "submit",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-teal-700 text-white font-medium py-2 rounded-lg transition duration-200 
        hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
