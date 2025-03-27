"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Footer from "@/app/Componentes/Footer/footer";
import Navbar from "../../Componentes/NavBar/navbar";

interface adicionarExame {
  titulo: string;
  status: string;
  arquivo?: File | null;
}

const adicionarExame: React.FC = () => {
  const [nomeResponsavel, setNomeResponsavel] = useState("Nome do responsável");
  const [fotoResponsavel, setFotoResponsavel] = useState("/default-profile.png");
  const [nomeAluno, setNomeAluno] = useState("Nome do Aluno");
  const [documentos, setDocumentos] = useState<adicionarExame[]>([
    { titulo: "Alergias: Morango", status: "ainda não foi enviado" },
    { titulo: "Doenças: diabetes", status: "ainda não foi enviado" },
    { titulo: "Medicamentos: clifagen (para diabetes)", status: "ainda não foi enviado" },
    { titulo: "Cirurgias/Internações: nenhuma", status: "ainda não foi enviado" },
    { titulo: "Deficiências ou necessidades especiais: nenhuma", status: "ainda não foi enviado" },
    { titulo: "Plano de saúde: Bradesco tal", status: "ainda não foi enviado" },

  ]);

  useEffect(() => {
    setNomeResponsavel(localStorage.getItem("nomeResponsavel") || "Nome do responsável");
    setFotoResponsavel(localStorage.getItem("fotoResponsavel") || "/default-profile.png");
    setNomeAluno(localStorage.getItem("nomeAluno") || "Nome do Aluno");
  }, []);

  const handleFileUpload = (index: number, file: File | null) => {
    const novosDocumentos = [...documentos];
    novosDocumentos[index].arquivo = file;
    novosDocumentos[index].status = file ? "enviado" : "ainda não foi enviado";
    setDocumentos(novosDocumentos);
  };

  return (
    <div className={styles.page}>
      <Navbar/>
    <div className={styles.container}>
      <div className={styles.header}>
      

        <h2>{nomeResponsavel}</h2>
      </div>
      <p className={styles.aluno}>{nomeAluno}</p>
      <div className={styles.card}>
        {documentos.map((doc, index) => (
          <div key={index} className={styles.docContainer}>
            <strong>{doc.titulo}</strong>
            <span className={styles.status}>{doc.status}</span>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => handleFileUpload(index, e.target.files?.[0] || null)}
            />
          </div>
        ))}
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default adicionarExame;
