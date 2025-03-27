"use client";

import React from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import styles from "./page.module.css";

const CadastroProfessorSucesso = () => {
  const router = useRouter();

  // Dados do gestor (exemplo, pode vir de um contexto ou API)
  const nomeGestor = "Nome do gestor";
  const fotoGestor = "/gestor.jpg"; // Substitua pelo caminho correto

  return (
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.container}>
        <p className={styles.successMessage}>Professor cadastrado com sucesso!<br /> O que deseja fazer agora?</p>

        <button className={styles.button} onClick={() => router.push("/gestorEscolar/home")}>
          Ir para a página inicial do gestor escolar
        </button>
        
        <button className={styles.button} onClick={() => router.push("/professor/home")}>
          Ir para a página inicial do professor
        </button>
        
        <button className={styles.button} onClick={() => router.push("/logout")}>
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroProfessorSucesso;
