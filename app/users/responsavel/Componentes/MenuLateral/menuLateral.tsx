"use client";

import React, { useState } from "react";
import styles from "./menuLateral.module.css";
import Button, { ButtonColor } from "@/app/Components/Button/button";

export enum Category {
    Responsavel = "users/responsavel",
    Gestor = "secondary",
  }


function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.menu_button}>
      <button className={styles.menu} onClick={toggleMenu}>☰</button>

      {/* Menu sempre no DOM, apenas alternando a classe */}
      <div className={`${styles.menu_aberto} ${isOpen ? styles.ativo : ""}`}>
        <ul className={styles.menu_itens_list}>
          <li className={styles.menu_item}><a href="./loginResponsavel">Início</a></li>
          <li className={styles.menu_item}>Editar Perfil</li>
          <li className={styles.menu_item}>Gerenciar Alunos</li>
          <li className={styles.menu_item}>Relatórios de Saúde</li>
          <li className={styles.menu_item}>Notificações</li>
          <li className={styles.menu_item}>Alertas</li>
          <li className={styles.menu_item}>Configurações</li>
          <Button text="Sair" onClick={toggleMenu} color={ButtonColor.Primary} />
        </ul>
      </div>
    </div>
  );
}

export default MenuLateral;
