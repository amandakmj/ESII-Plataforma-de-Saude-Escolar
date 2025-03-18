import React from "react";
import styles from "./page.module.css";
import FileUpload from "../../../Componentes/FileUpload/fileUpload";

const Anexos: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Anexos</p>

            <FileUpload text="Carteira de vacinação"/>
            <FileUpload text="Relatórios médicos relevantes (exames, laudos, etc.)"/>
            <FileUpload text="Autorização assinada pelos responsáveis"/>
        </div>    
    );
};

export default Anexos;
