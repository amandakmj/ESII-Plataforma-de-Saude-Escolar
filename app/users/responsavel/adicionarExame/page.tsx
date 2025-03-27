"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Footer from "@/app/Componentes/Footer/footer";
import Navbar from "../../Componentes/NavBar/navbar";
import mockAlunos from "@/app/Mocks/alunosMocks";


interface adicionarExame {
  titulo: string;
  status: string;
  arquivo?: File | null;
}

const AdicionarExame: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null);
  const [alunos, setAlunos] = useState<any[]>([]);
  const [documentos, setDocumentos] = useState<adicionarExame[]>([
    { titulo: "Alergias: Morango", status: "ainda não foi enviado" },
    { titulo: "Doenças: diabetes", status: "ainda não foi enviado" },
    { titulo: "Medicamentos: clifagen (para diabetes)", status: "ainda não foi enviado" },
    { titulo: "Cirurgias/Internações: nenhuma", status: "ainda não foi enviado" },
    { titulo: "Deficiências ou necessidades especiais: nenhuma", status: "ainda não foi enviado" },
    { titulo: "Plano de saúde: Bradesco tal", status: "ainda não foi enviado" },

  ]);
  useEffect(() => {
    const dados = sessionStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }


    setTimeout(() => {
      setAlunos(mockAlunos);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFileUpload = (alunoIndex: number, docIndex: number, file: File | null) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno, index) => {
        if (index === alunoIndex) {
          const novosDocumentos = aluno.documentos
            ? aluno.documentos.map((doc: any, dIndex: number) =>
                dIndex === docIndex ? { ...doc, arquivo: file, status: file ? "enviado" : "ainda não foi enviado" } : doc
              )
            : [];
          return { ...aluno, documentos: novosDocumentos };
        }
        return aluno;
      })
    );
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
        </div>

        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : alunos.length === 0 ? (
          <div className={styles.semDados}>
            <p>Não tem nenhum aluno cadastrado.</p>
          </div>
        ) : (
          alunos.map((aluno, alunoIndex) => (
            <div key={alunoIndex} className={styles.card}>
              <p className={styles.aluno}>{aluno.nome}</p>
              <div className={styles.card}>
                {documentos && documentos.length > 0 ? (
                  documentos.map((doc: any, docIndex: number) => (
                    <div key={docIndex} className={styles.docContainer}>
                      <strong>{doc.titulo}</strong>
                      <span className={styles.status}>{doc.status}</span>
                      <input
                        type="file"
                        className={styles.fileInput}
                        onChange={(e) => handleFileUpload(alunoIndex, docIndex, e.target.files?.[0] || null)}
                      />
                    </div>
                  ))
                ) : (
                  <p>Nenhum documento disponível.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdicionarExame;
