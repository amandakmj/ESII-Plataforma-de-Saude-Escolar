import React from "react";
import "./Button.css";


interface ButtonProps {
    text: string; 
  }

const Button: React.FC<ButtonProps> = ({text}) => {
  return (

      <div className="button-container">
        <h1 className="text">{text}</h1>
      </div>

  );
};

export default Button;

