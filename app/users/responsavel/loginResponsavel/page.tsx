import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Components/NavBar/navbar'
import MenuLateral from '../Componentes/MenuLateral/menuLateral';
const LoginResponsavelPage = () => {
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
              <h2 className={styles.responsavel}>Responsável</h2>
              <p className={styles.nome}>Nome do responsável</p>
            </div>
          </div>
          <div className={styles.buttons_section}>
            <button className={styles.button}>Cadastrar aluno</button>
            <button className={styles.button}>Ver aluno cadastrado</button>
            <button className={styles.button}>Adicionar Exame</button>
            <button className={styles.button}>Meus relatórios</button>
            <button className={styles.button}>Ver últimas notificações</button>
          </div>
        </div>
        <MenuLateral/>
      </div>
    </div>
  );
};

export default LoginResponsavelPage;