import React from "react";
import styles from "./inputBox.module.css";


interface InputProps {
    text: string; 
  }

const InputBox: React.FC<InputProps> = ({text}) => {
  return (

    <div className={styles.input_container_one}>
        <p className={styles.text}>{text}</p>
        <input type="text" className={styles.input_box} />
    </div>

  );
};

export default InputBox;

