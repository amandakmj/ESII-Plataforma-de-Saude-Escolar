import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'

const registrarEscolaPage = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
        <div className={styles.container}>
          <h2 className={styles.name}>Nome da Escola*</h2>
          <form className={styles.form}>
            <label className={styles.label}>Tipo de Instituição *</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>CNPJ*</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Telefone da escola*</label>
            <input type="text" className={styles.input_box} readOnly />
            
            <label className={styles.label}>Site</label>
            <input type="text" className={styles.input_box} readOnly />
            
            <label className={styles.label}>Séries/Turmas oferecidas</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Número médio de alunos</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Número médio de professores</label>
            <input type="text" className={styles.input_box} />

            <label className={styles.label}>Profissionais de saúde na escola (se houver)</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Endereço da escola (cidade, estado, bairro, CEP)*</label>
            <input type="text" className={styles.input_box} />

            <button className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default registrarEscolaPage;