import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'
import MenuLateral from '@/app/Componentes/MenuLateral/menuLateral';

const inicialProfissionalSaudePage = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <h1 className={styles.title}>HealthSchool</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.profile_section}>
            <img src="/placeholder-image.jpg" alt="Profile" className={styles.profile_image} />
            <div>
              <h2 className={styles.responsavel}>Profissional de saúde</h2>
              <p className={styles.nome}>Nome do profissional de saúde</p>
            </div>
          </div>
          <div className={styles.buttons_section}>
            <button className={styles.button}>Enviar Notificações</button>
            <button className={styles.button}>Notificações</button>
            <button className={styles.button}>Ver Aluno</button>
            <button className={styles.button}>Adicionar Exame</button>
            <button className={styles.button}>Relatório</button>
          </div>
        </div>
        <MenuLateral/>
      </div>
    </div>
  );
};

export default inicialProfissionalSaudePage;