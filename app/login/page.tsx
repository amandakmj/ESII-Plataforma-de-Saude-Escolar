"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../Componentes/NavBar/navbar";
import Button, { ButtonColor } from "../Componentes/Button/button";
import Footer from "../Componentes/Footer/footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  // Estado para armazenar mensagens de erro
  const [errors, setErrors] = useState<{ usuario?: string; senha?: string }>({});

  // Atualiza os valores do formulário e remove erros quando o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove o erro assim que o usuário começa a corrigir
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validação antes de enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { usuario?: string; senha?: string } = {};

    if (formData.usuario.length < 4) {
      newErrors.usuario = "Usuário deve ter pelo menos 4 caracteres";
    }

    if (formData.senha.length < 8) {
      newErrors.senha = "Senha deve ter pelo menos 8 caracteres";
    }

    // Se houver erros, não envia o formulário
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login realizado com:", formData);
    alert("Login efetuado!");
  };

  return (
    <div>
      <Navbar isHome={false} />
      <div className={styles.page}>
        <div className={styles.login_container}>
          <p className={styles.header}>Bem-vindo!</p>
          <p className={styles.text}>
            Novo no site?{" "}
            <a href="/register" className={styles.link}>Registre-se</a>
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_section}>
              <label htmlFor="usuario" className={styles.text}>Usuário</label>
              <input
                id="usuario"
                type="text"
                name="usuario"
                className={`${styles.input_box} ${errors.usuario ? styles.invalid : ""}`} 
                placeholder="Digite seu usuário"
                value={formData.usuario}
                onChange={handleChange}
              />
              {errors.usuario && <p className={styles.error_message}>{errors.usuario}</p>}
            </div>

            <div className={styles.input_section}>
              <label htmlFor="senha" className={styles.text}>Senha</label>
              <input
                id="senha"
                type="password"
                name="senha"
                className={`${styles.input_box} ${errors.senha ? styles.invalid : ""}`}
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && <p className={styles.error_message}>{errors.senha}</p>}
            </div>

            {/* Botão de envio */}
            <div className={styles.button}>
              <Button text="Confirmar" color={ButtonColor.Secondary} />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
