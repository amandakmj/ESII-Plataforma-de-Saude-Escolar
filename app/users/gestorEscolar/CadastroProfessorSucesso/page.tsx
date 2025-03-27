"use client";

import React from "react";
import { useRouter } from "next/navigation"; 
import styles from "./page.module.css";

const CadastroProfessorSucesso = () => {
  const router = useRouter();

  // Dados do gestor (exemplo, pode vir de um contexto ou API)
  const nomeGestor = "Nome do gestor";
  const fotoGestor = "/gestor.jpg"; // Substitua pelo caminho correto

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src={fotoGestor} alt="Foto do Gestor" className={styles.profileImage} />
        <span className={styles.profileName}>{nomeGestor}</span>
      </div>

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
    </div>
  );
};

export default CadastroProfessorSucesso;
