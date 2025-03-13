import React from "react";
import styles from "./button.module.css";


interface ButtonProps {
    text: string; 
  }

const Button: React.FC<ButtonProps> = ({text}) => {
  return (

      <div className={styles.button_container}>
        <h1 className={styles.text}>{text}</h1>
      </div>

  );
};

export default Button;

