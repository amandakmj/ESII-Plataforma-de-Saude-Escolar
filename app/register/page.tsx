"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../Componentes/NavBar/navbar";
import Footer from "../Componentes/Footer/footer";
import Button, { ButtonColor } from "../Componentes/Button/button";

const RegisterPage = () => {
  const router = useRouter();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    userType: "",
    senha: "",
  });

  const [errors, setErrors] = useState<{ nome?: string; email?: string; userType?: string; senha?: string }>({});

  // Função para atualizar o estado ao digitar nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpa o erro ao digitar
  };

  // Validação antes de enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criando um objeto de erros vazio e tipado corretamente
    let newErrors: { nome?: string; email?: string; userType?: string; senha?: string } = {};

    if (formData.nome.trim() === "") {
      newErrors.nome = "Nome é obrigatório";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email é obrigatório";
    }
    if (formData.userType === "") {
      newErrors.userType = "Escolha um tipo de acesso";
    }
    if (formData.senha.length < 8) {
      newErrors.senha = "Senha deve ter pelo menos 8 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const usuario = {
      nome: formData.nome,
      perfilDeAcesso: formData.userType,
    };
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    switch (formData.userType) {
      case "responsavel":
        router.push("/users/responsavel");
        break;
      case "professor":
        router.push("/users/professor");
        break;
      case "gestorEscolar":
        router.push("/users/gestorEscolar");
        break;
      case "profissionalSaude":
        router.push("/users/profissionalSaude");
        break;
    }
  };

  return (
    <div>
      <Navbar isHome={false} />
      <div className={styles.page}>
        <div className={styles.register_section}>
          <p className={styles.header}>Cadastre-se para acessar:</p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_section}>
              <p className={styles.text}>Nome Completo*</p>
              <input
                type="text"
                name="nome"
                className={`${styles.input_box} ${errors.nome ? styles.invalid : ""}`}
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && <p className={styles.error_message}>{errors.nome}</p>}
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Email*</p>
              <input
                type="email"
                name="email"
                className={`${styles.input_box} ${errors.email ? styles.invalid : ""}`}
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error_message}>{errors.email}</p>}
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Qual é o seu perfil de acesso?*</p>
              <select
                name="userType"
                className={`${styles.input_selection} ${errors.userType ? styles.invalid : ""}`}
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="responsavel">Responsável pelo aluno</option>
                <option value="professor">Professor</option>
                <option value="gestorEscolar">Gestor Escolar</option>
                <option value="profissionalSaude">Profissional da saúde</option>
              </select>
              {errors.userType && <p className={styles.error_message}>{errors.userType}</p>}
            </div>

            <div className={styles.input_section}>
              <p className={styles.text}>Senha*</p>
              <input
                type="password"
                name="senha"
                className={`${styles.input_box} ${errors.senha ? styles.invalid : ""}`}
                placeholder="Digite a sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && <p className={styles.error_message}>{errors.senha}</p>}
            </div>
            <p className={styles.required_notice}>* Indica um item obrigatório</p>

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
