import React from 'react';
import styles from './page.module.css';

const CadastroProfessor = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.profile_container}>
          <img src="/profile.jpg" alt="Foto do professor" className={styles.profile_image} />
          <span className={styles.edit_icon}>✏️</span>
        </div>

        <h2 className={styles.name}>Nome do gestor</h2>

        <form className={styles.form}>
          <label className={styles.label}>Nome Completo*</label>
          <input type="text" className={styles.input_box} />

          <label className={styles.label}>Email*</label>
          <input type="email" className={styles.input_box} />

          <label className={styles.label}>Senha*</label>
          <input type="password" className={styles.input_box} />

          <label className={styles.label}>CPF*</label>
          <input type="text" className={styles.input_box} />

          <label className={styles.label}>Data de nascimento</label>
          <input type="date" className={styles.input_box} />

          <label className={styles.label}>Gênero</label>
          <input type="text" className={`${styles.input_box} ${styles.readonly_input}`} value="Mulher" readOnly />

          <label className={styles.label}>Instituição de ensino*</label>
          <input type="text" className={`${styles.input_box} ${styles.readonly_input}`} value="Tal escola" readOnly />

          <label className={styles.label}>Cargo/Função*</label>
          <input type="text" className={styles.input_box} />

          <label className={styles.label}>Turma que leciona*</label>
          <input type="text" className={styles.input_box} />

          <label className={styles.label}>Outras turmas</label>
          <input type="text" className={styles.input_box} />

          <button className={styles.button}>Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProfessor;
