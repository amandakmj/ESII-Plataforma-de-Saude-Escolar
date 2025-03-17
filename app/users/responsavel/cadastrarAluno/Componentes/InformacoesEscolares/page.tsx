import React from "react";
import styles from "./page.module.css"


function InformacoesEscolares() {
  return (
    <div className={styles.container}>
        <p className={styles.text}>Informações Escolares</p>
        <div className={styles.input_row_section}>
            <div className={styles.input_column_section}>
                <div className={styles.input_container_one}>
                    <p className={styles.text}>Escola(nome  da instituição)</p>
                    <input type="text" className={styles.input_box} />
                </div>
                <div className={styles.input_container_one}>
                    <p className={styles.text}>Série/Turma</p>
                    <input type="text" className={styles.input_box} />
                </div>
            </div>
            <div className={styles.input_container_two}>
                <input type="checkbox" className={styles.input_box} />
                <p className={styles.text}>Mesmo endereço do responsável</p>
                    
            </div>
        </div>
    </div>
  )
}

export default InformacoesEscolares