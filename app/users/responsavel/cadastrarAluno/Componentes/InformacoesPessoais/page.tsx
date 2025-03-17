import React from "react";
import styles from "./page.module.css";
import InputBox from "../../../Compontentes/InputBox/inputBox";

const InformacoesPessoais: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Informações Pessoais</p>
            <div className={styles.input_row_section}>
                
                <div className={styles.input_column_section}>
                    <InputBox text="Idade"/>
                    <InputBox text="Vinculo com o aluno"/>
                </div>

                <div className={styles.input_column_section}>
                    <InputBox text="Genero"/>
                    <InputBox text="Telefone do responsável"/>
                </div>

            </div>

            <InputBox text="Endereço (cidade, estado, bairro, CEP)"/>
        </div>    
    );
  };
  
  export default InformacoesPessoais;