"use client";
import React from "react";
import styles from "./navbar.module.css";
import Button from "../Button/button";
import useActiveSection from "../../Hooks/useActiveSection";

const sectionIds = ["home", "sobre", "contato"];

const Navbar: React.FC = () => {
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <h1 className={styles.logo}><a href="/">HealthSchool</a></h1>

        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <a href="#home" className={`${styles.nav_link} ${activeSection === "home" ? styles.active : styles.inactive}`}>Home</a>
          </li>
          <li className={styles.nav_item}>
            <a href="#sobre" className={`${styles.nav_link} ${activeSection === "sobre" ? styles.active : styles.inactive}`}>Sobre</a>
          </li>
          <li className={styles.nav_item}>
            <a href="#contato" className={`${styles.nav_link} ${activeSection === "contato" ? styles.active : styles.inactive}`}>Contato</a>
          </li>
          <li className={styles.nav_item}>
            <a href="../../login"><Button text="Entrar"/></a>
          </li>
          <li>
            <a href="/register"><Button text="Registrar"/></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
