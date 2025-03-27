"use client";

import React, { useState } from "react";
import styles from "./menuLateral.module.css";
import { useRouter } from "next/navigation";
function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Usuário deslogado");
    sessionStorage.removeItem("usuario")
    router.replace("/");
  };

  return (
    <div className={styles.menu_container}>
      <button className={styles.menu_button} onClick={toggleMenu}>☰</button>
      <div className={`${styles.menu_aberto} ${isOpen ? styles.ativo : ""}`}>
        <button className={styles.close_button} onClick={toggleMenu}>✖</button>
        <ul className={styles.menu_itens_list}>
          <li className={styles.menu_item}><a href="./inicial">Página inicial</a></li>
          <li className={styles.menu_item}><a href="./cadastrarAluno">Cadastrar aluno</a></li>
          <li className={styles.menu_item}><a href="./verAlunoCadastrado">Ver aluno cadastrado</a></li>
          <li className={styles.menu_item}><a href="./notificacoes">Notificacoes</a></li>
        </ul>
        <button className={styles.logout_button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default MenuLateral;
