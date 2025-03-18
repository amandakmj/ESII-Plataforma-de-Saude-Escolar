"use client";

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../Components/NavBar/navbar';
import Footer from '../Components/Footer/footer';
import Button, { ButtonColor } from '../Components/Button/button';

const RegisterPage = () => {
  const router = useRouter();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    userType: "",
    senha: "",
  });

  // Função para atualizar o estado ao digitar nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para tratar o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarregar a página

    console.log("Dados do usuário:", formData);
    validacao(formData)
    // Redirecionamento com base no userType
    switch (formData.userType) {
      case "responsavel":
        router.push("users/responsavel");
        break;
      case "professor":
        router.push("users/professor");
        break;
      case "gestorEscolar":
        router.push("users/gestorEscolar");
        break;
      case "profissionalSaude":
        router.push("users/profissionalSaude");
        break;
    }
  };

  const validacao = (usuario: { nome: string, senha: string, userType: string }) => {
    if(usuario.senha.length < 8) {
      alert("Precisa conter 8 caracteres")
    }
    if(usuario.userType.length == 0) {
      alert("Escolha o seu tipo de acesso")
    }
  }
  return (
    <div>
      <Navbar isHome={false} />
      <div className={styles.page}>
        <div className={styles.register_section}>
          <p className={styles.header}>Bem-vindo!</p>
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_section}>
              <p className={styles.text}>Nome Completo</p>
              <input 
                type="text" 
                name="nome" 
                className={styles.input_box} 
                placeholder="Nome completo" 
                value={formData.nome} 
                onChange={handleChange} 
              />
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Email</p>
              <input 
                type="email" 
                name="email" 
                className={styles.input_box} 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Qual é o seu perfil de acesso?</p>
              <select 
                name="userType" 
                className={styles.input_selection} 
                value={formData.userType} 
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="responsavel">Responsável pelo aluno</option>
                <option value="professor">Professor</option>
                <option value="gestorEscolar">Gestor Escolar</option>
                <option value="profissionalSaude">Profissional da saúde</option>
              </select>
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Senha</p>
              <input 
                type="password" 
                name="senha" 
                className={styles.input_box} 
                placeholder="Senha" 
                value={formData.senha} 
                onChange={handleChange} 
              />
            </div>

            {/* Botão de envio */}
            <Button text="Confirmar" color={ButtonColor.Secondary} />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
