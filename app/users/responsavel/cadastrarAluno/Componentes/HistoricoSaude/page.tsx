import React from "react";
import styles from "./page.module.css";
import InputBox from "../../../Componentes/InputBox/inputBox";
import FileUpload from "../../../Componentes/FileUpload/fileUpload";

const HistoricoSaude: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Histórico de Saúde</p>

            <InputBox text="Alergias (alimentos, medicamentos, picadas de insetos, etc.)"/>
            <FileUpload text="Upload de arquivo/foto"/>

            <InputBox text="Doenças crônicas (diabetes, asma, cardiopatias, epilepsia, etc.)"/>
            <FileUpload text="Upload de arquivo/foto"/>

            <InputBox text="Medicamentos de uso contínuo (nome do medicamento, dosagem, horários)"/>
            <FileUpload text="Upload de arquivo/foto"/>

            <InputBox text="Cirurgias ou internações anteriores (se relevante)"/>
            <FileUpload text="Upload de arquivo/foto"/>

            <InputBox text="Deficiências ou necessidades especiais (auditiva, visual, motora, etc.)"/>
            <FileUpload text="Upload de arquivo/foto"/>

            <InputBox text="Plano de saúde (se houver)"/>
            <FileUpload text="Upload de arquivo/foto"/>
        </div>    
    );
};

export default HistoricoSaude;
