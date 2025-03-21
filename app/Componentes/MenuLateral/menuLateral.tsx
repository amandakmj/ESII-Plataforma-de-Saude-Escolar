"use client";

import React, { useState } from "react";
import styles from "./menuLateral.module.css";

function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Usuário deslogado");
    // Adicione aqui a lógica para sair da conta
  };

  return (
    <div className={styles.menu_container}>
      <button className={styles.menu_button} onClick={toggleMenu}>☰</button>
      <div className={`${styles.menu_aberto} ${isOpen ? styles.ativo : ""}`}>
        <button className={styles.close_button} onClick={toggleMenu}>✖</button>
        <div className={styles.profile_section}>
          <img src="/user-avatar.jpg" alt="Perfil" className={styles.profile_image} />
          <p className={styles.profile_name}>Nome</p>
          <p className={styles.profile_subtitle}>responsavel</p>
        </div>
        <ul className={styles.menu_itens_list}>
          <li className={styles.menu_item}><a href="/inicio">Página inicial</a></li>
          <li className={styles.menu_item}><a href="/dados">Editar perfil</a></li>
          <li className={styles.menu_item}><a href="/gerenciar">Gerenciar aluno</a></li>
          <li className={styles.menu_item}><a href="/relatorio">Relatórios de saúde</a></li>
          <li className={styles.menu_item}><a href="/notificacoes">Notificacoes</a></li>
          <li className={styles.menu_item}><a href="/configuracoes">Configurações</a></li>
        </ul>
        <button className={styles.logout_button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default MenuLateral;
