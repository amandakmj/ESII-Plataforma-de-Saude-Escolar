import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'
import MenuLateral from '@/app/Componentes/MenuLateral/menuLateral';
import Link from 'next/link';
import Footer from '@/app/Componentes/Footer/footer';

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
            <Link href="./enviarNotificacoes">
            <button className={styles.button}>Enviar Notificação</button>
            </Link>
            <Link href="./notificacoes">
            <button className={styles.button}>Notificações</button>
            </Link>
            
            <Link href="./verAlunoCadastrado">
            <button className={styles.button}>Ver Aluno Cadastrado</button>
            </Link>
            
            <Link href="./adicionarExame">
            <button className={styles.button}>Adicionar Exame</button>
            </Link>
          </div>
        </div>
        <MenuLateral/>
      </div>
      <Footer/>
    </div>
  );
};

export default inicialProfissionalSaudePage;