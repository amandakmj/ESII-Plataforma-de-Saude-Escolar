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

        <button className={styles.button} onClick={() => router.replace("./inicial")}>
          Ir para a página inicial do gestor escolar
        </button>
        
        
        <button className={styles.button} onClick={() => {
          console.log("Usuário deslogado");
          sessionStorage.removeItem("usuario")
          router.replace("/");
        }
        }>
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroProfessorSucesso;
