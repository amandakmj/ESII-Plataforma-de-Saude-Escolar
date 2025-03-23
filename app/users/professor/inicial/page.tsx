import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'
import MenuLateral from '@/app/Componentes/MenuLateral/menuLateral';

const inicialProfessorPage = () => {
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
              <h2 className={styles.responsavel}>Professor</h2>
              <p className={styles.nome}>Nome do professor</p>
            </div>
          </div>
          <div className={styles.buttons_section}>
            <button className={styles.button}><a href="./enviarNotificacoes">Enviar Notificação</a></button>
            <button className={styles.button}>Visualizar Lista de Alunos</button>
            <button className={styles.button}>Notificações</button>
          </div>
        </div>
        <MenuLateral/>
      </div>
    </div>
  );
};

export default inicialProfessorPage;