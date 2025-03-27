import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar'
import MenuLateral from '@/app/Componentes/MenuLateral/menuLateral';
import Footer from '@/app/Componentes/Footer/footer';
import Link from 'next/link';

const inicialGestorEscolarPage = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <h1 className={styles.title}>HealthSchool</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.profile_section}>
            <div>
              <h2 className={styles.responsavel}>Gestor Escolar</h2>
              <p className={styles.nome}>Nome do gestor escolar</p>
            </div>
          </div>
          <div className={styles.buttons_section}>

            <Link href="./enviarNotificacoes">
            <button className={styles.button}>Enviar Notificação</button>
            </Link>

            <Link href="./notificacoes">
            <button className={styles.button}>Notificações</button>
            </Link>

            
            <Link href="./listaAlunos">
            <button className={styles.button}>Visualizar Lista de Alunos</button>
            </Link>

            
            <Link href="./cadastroProfessor">
            <button className={styles.button}>Cadastrar Professor</button>
            </Link>

            
            <Link href="./listaProfessores">
            <button className={styles.button}>Visualizar Lista de Professores</button>
            </Link>

            
            <Link href="./editarEscola">
            <button className={styles.button}>Editar escola</button>
            </Link>

          </div>
        </div>
        <MenuLateral/>
      </div>
      <Footer/>
    </div>
  );
};

export default inicialGestorEscolarPage;