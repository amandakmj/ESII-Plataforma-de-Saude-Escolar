import React from "react";
import styles from "./page.module.css";
import InputBox from "../../../Componentes/InputBox/inputBox";

const InformacoesEscolares: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Informações Escolares</p>

            <div className={styles.input_container_two}>
                <input type="checkbox" className={styles.input_box} />
                <p className={styles.text}>Mesmo endereço do responsável</p> 
            </div>

            <InputBox text="Escola (nome da instituição)"/>
            <InputBox text="Série/Turma"/>
            <InputBox text="Professor(a) responsável pela turma"/>
        </div>    
    );
};

export default InformacoesEscolares;
