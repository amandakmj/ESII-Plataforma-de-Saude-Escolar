import React from "react";
import styles from "./page.module.css";

const AtualizacoesTermos: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Autorizações e Termos</p>

            <div className={styles.input_container_two}>
                <input type="checkbox" className={styles.input_box} />
                <p className={styles.text}>Autorização para administração de medicamentos na escola</p>
                    
            </div>
            <div className={styles.input_container_two}>
                <input type="checkbox" className={styles.input_box} />
                <p className={styles.text}>Autorização para atendimento médico em caso de emergência</p>
                    
            </div>
            <div className={styles.input_container_two}>
                <input type="checkbox" className={styles.input_box} />
                <p className={styles.text}>Consentimento para compartilhamento de dados de saúde com profissionais autorizados</p>
                    
            </div>

            <div className={styles.checkbox_section}>
                <input type="checkbox" id="termos" />
                <label htmlFor="termos">Aceitação dos Termos de Uso e Política de Privacidade</label>
            </div>
        </div>    
    );
};

export default AtualizacoesTermos;
