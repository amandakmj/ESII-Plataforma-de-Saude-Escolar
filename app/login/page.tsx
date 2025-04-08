"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../Componentes/NavBar/navbar";
import Button, { ButtonColor } from "../Componentes/Button/button";
import Footer from "../Componentes/Footer/footer";
import { useRouter } from "next/navigation";
import mockUsers from "../Mocks/usuariosMocks";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });
  const router = useRouter();

  // Estado para armazenar mensagens de erro
  const [errors, setErrors] = useState<{ usuario?: string; senha?: string; geral?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Verifica se as credenciais correspondem a algum usuário mockado
    const userFound = mockUsers.find(
      (user) => user.usuario === formData.usuario && user.senha === formData.senha
    );

    if (userFound) {
      router.replace(`/users/${userFound.perfilDeAcesso}/inicial`);
      const usuario = {
        nome: userFound.usuario,
        perfilDeAcesso: userFound.perfilDeAcesso,
      };
    
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, geral: "Usuário ou senha incorretos." }));
    }
  };

  const url = process.env.NEXT_PUBLIC_API_ULR ?? "http://localhost:8000"
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   // Verifica se as credenciais correspondem a algum usuário mockado
  //   const userFound = mockUsers.find(
  //     (user) => user.usuario === formData.usuario && user.senha === formData.senha
  //   );

  //   if (userFound) {
  //     const usuario = {
  //       nome: userFound.usuario,
  //       perfilDeAcesso: userFound.perfilDeAcesso,
  //     };
  //     sessionStorage.setItem("usuario", JSON.stringify(usuario));
  //     router.replace(`/users/${userFound.perfilDeAcesso}/inicial`);
  //   } else {
  //     setErrors((prevErrors) => ({ ...prevErrors, geral: "Usuário ou senha incorretos." }));
  //   try {
  //     // TEMPORÁRIO
  //     const response = await fetch(`${url}/site/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: new URLSearchParams({
  //           username: formData.usuario,
  //           password: formData.senha
  //         }).toString(),
  //       }
  //     );

  //     if(!response.ok) {
  //       throw new Error("Usuário ou senha incorretos.");
  //     }

  //     // Adiciona o token de autenticação ao armazenamento local
  //     const data = await response.json();
  //     localStorage.setItem("token", data.access_token);

  //     // Redirecionamento para a página inicial
  //     router.push("/")

  //   } catch (error: any) {
  //     setErrors((prevErrors) => ({...prevErrors, geral: error.message}));
  //   }
  // };

  
  const validateForm = () => {
    let newErrors: { usuario?: string; senha?: string } = {};

    if (!formData.usuario) newErrors.usuario = "* Usuário é obrigatório.";
    if (!formData.senha) newErrors.senha = "* Senha é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <Navbar isHome={false} />
      <div className={styles.page}>
        <div className={styles.login_container}>
          <p className={styles.header}>Bem-vindo!</p>
          <p className={styles.text}>
            Novo no site?{" "}
            <a href="/register" className={styles.link}>
              Registre-se
            </a>
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_section}>
              <label htmlFor="usuario" className={styles.text}>Usuário</label>
              <input
                id="usuario"
                type="text"
                name="usuario"
                className={styles.input_box}
                placeholder="Digite seu usuário"
                value={formData.usuario}
                onChange={handleChange}
              />
              {errors.usuario && <p className={styles.error}>{errors.usuario}</p>}
            </div>

            <div className={styles.input_section}>
              <label htmlFor="senha" className={styles.text}>Senha</label>
              <input
                id="senha"
                type="password"
                name="senha"
                className={styles.input_box}
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && <p className={styles.error}>{errors.senha}</p>}
              {errors.geral && <p className={styles.error}>{errors.geral}</p>}
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
