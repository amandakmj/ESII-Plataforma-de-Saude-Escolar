import React from "react";
import styles from "./navbar.module.css";
import MenuLateral from "@/app/Componentes/MenuLateral/menuLateral";

interface NavProps {
  isHome?: boolean;
}

const Navbar: React.FC<NavProps> = ({ isHome = true }) => {
  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>
          <a href="/">Plataforma de Saúde Escolar</a>
        </h1>
        <div className={styles.menu_lateral}>
      
        <MenuLateral />
      </div>
      </nav>

      
    </div>
  );
};

export default Navbar;
