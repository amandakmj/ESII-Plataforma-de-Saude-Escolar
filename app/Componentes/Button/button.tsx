import React from "react";
import styles from "./button.module.css";

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: ButtonColor; // Propriedade para definir a cor
}

const Button: React.FC<ButtonProps> = ({ text, onClick, color = ButtonColor.Primary }) => {
  return (
    <button
      className={`${styles.button_container} ${styles[color]}`} // Adiciona a classe correspondente
      onClick={onClick}
    >
      <h1 className={styles.text}>{text}</h1>
    </button>
  );
};

export default Button;
