"use client";
import React, { useState } from "react";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, foto: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.profile_section}>
          <div className={styles.profile_container}>
            <label htmlFor="fotoUpload" className={styles.profile_label}>
              {formData.foto ? (
                <img src={formData.foto} alt="Foto do usuário" className={styles.profile_image} />
              ) : (
                <div className={styles.addPhotoCircle}>Adicione uma foto aqui</div>
              )}
            </label>
            <input type="file" id="fotoUpload" className={styles.file_input} onChange={handleFileChange} accept="image/*" hidden />
          </div>
          <div>
            <h2 className={styles.responsavel}>Responsável pelo aluno</h2>
            <p className={styles.nome}>Nome do responsável</p>
          </div>
        </div>

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
