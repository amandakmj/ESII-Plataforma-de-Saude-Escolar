import React from "react";
import styles from "./page.module.css";
import InputBox from "../../../Componentes/InputBox/inputBox";

const ContatoEmergencia: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Contato de Emergência</p>

            <InputBox text="Nome do contato"/>
            <InputBox text="Parentesco"/>
            <InputBox text="Telefone principal"/>
            <InputBox text="Telefone secundário"/>
        </div>    
    );
};

export default ContatoEmergencia;
