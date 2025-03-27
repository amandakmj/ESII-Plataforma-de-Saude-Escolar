"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from "@/app/Componentes/Footer/footer";
import Link from "next/link";

const InicialResponsavelPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    cpf: string;
    dataNascimento: string;
    nomeAluno: string;
    vinculo: string;
    telefone: string;
    endereco: string;
    foto: string | null;
  }>({
    cpf: "",
    dataNascimento: "",
    vinculo: "",
    nomeAluno: "",
    telefone: "",
    endereco: "",
    foto: null,
  });
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);

  

  useEffect(() => {
    const dados = sessionStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
       

        <div className={styles.buttons_section}>
          <Link href="./cadastrarAluno">
            <button className={styles.button}>Cadastrar aluno</button>
          </Link>

          <Link href="./verAlunoCadastrado">
          <button className={styles.button}>Ver aluno cadastrado</button>
          </Link>
          
          <Link href="./adicionarExame">
          <button className={styles.button}>Adicionar Exame</button>
          </Link>

          <Link href="./enviarNotificacoes">
            <button className={styles.button}>Enviar Notificação</button>
          </Link>
          
          <Link href="./notificacoes">
          <button className={styles.button}>Ver últimas notificações</button>
          </Link>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InicialResponsavelPage;
