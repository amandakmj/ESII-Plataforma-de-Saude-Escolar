"use client";
import React from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import useActiveSection from "../../Hooks/useActiveSection";

const sectionIds = ["home", "sobre", "contato"];

const Navbar: React.FC = () => {
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">HealthSchool</h1>

        <ul className="nav-list">
          <li className="nav-item">
            <a href="#home" className={activeSection === "home" ? "active" : "inactive"}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#sobre" className={activeSection === "sobre" ? "active" : "inactive"}>Sobre</a>
          </li>
          <li className="nav-item">
            <a href="#contato" className={activeSection === "contato" ? "active" : "inactive"}>Contato</a>
          </li>
          <li className="nav-item"><a className="inactive">Entrar</a></li>
          <li>
            <Button text="Registrar"/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
