import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'

const gestorEscolarPage = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.profile_container}>
            <img src="/placeholder-image.jpg" alt="Profile" className={styles.profile_image} />
            <span className={styles.edit_icon}>✏️</span>
          </div>
          <h2 className={styles.name}>Nome gestor escolar</h2>
          <form className={styles.form}>
            <label className={styles.label}>CPF*</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Data de nascimento</label>
            <input type="date" className={styles.input_box} />
            
            <label className={styles.label}>Gênero</label>
            <input type="text" value="Mulher" className={styles.input_box} readOnly />
            
            <label className={styles.label}>Cargo/Função*</label>
            <input type="text" value="Pai" className={styles.input_box} readOnly />
            
            <label className={styles.label}>Telefone</label>
            <input type="text" className={styles.input_box} />
            
            <label className={styles.label}>Endereço (cidade, estado, bairro, CEP)</label>
            <input type="text" className={styles.input_box} />
            
            <button className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default gestorEscolarPage;