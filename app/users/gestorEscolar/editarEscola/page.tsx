"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';

const editarEscola = () => {
  const [editando, setEditando] = useState(false);
  const [escola, setEscola] = useState({
    nome: "Nome da Escola",
    instituicao: "Pública",
    cnpj: "00000000000000",
    telefone: "00 000000000",
    site: "www.escolatal.com.br",
    series: 6,
    mediaAlunos: 120,
    mediaProfessores: 12,
    profissionaisSaude: "nenhum",
    endereco: "rua tal, lugar tal, numero 0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEscola({ ...escola, [e.target.name]: e.target.value });
  };

  const toggleEdicao = () => {
    setEditando(!editando);
  };

  const salvarDados = () => {
    console.log("Dados salvos:", escola);
    setEditando(false);
  };

  return (
    <div className={styles.page}>
    <Navbar/>
      <h2 className={styles.titulo}>
        {editando ? (
          <input
            type="text"
            name="nome"
            value={escola.nome}
            onChange={handleChange}
            className={styles.inputTitulo}
          />
        ) : (
          escola.nome
        )}
      </h2>

      <div className={styles.container}>
        <div className={styles.card}>
          <label>Instituição:</label>
          <input
            type="text"
            name="instituicao"
            value={escola.instituicao}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>CNPJ:</label>
          <input
            type="text"
            name="cnpj"
            value={escola.cnpj}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Telefone da escola:</label>
          <input
            type="text"
            name="telefone"
            value={escola.telefone}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Site:</label>
          <input
            type="text"
            name="site"
            value={escola.site}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Séries/Turmas oferecidas:</label>
          <input
            type="number"
            name="series"
            value={escola.series}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Número médio de alunos:</label>
          <input
            type="number"
            name="mediaAlunos"
            value={escola.mediaAlunos}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Número médio de professores:</label>
          <input
            type="number"
            name="mediaProfessores"
            value={escola.mediaProfessores}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Profissionais da saúde:</label>
          <input
            type="text"
            name="profissionaisSaude"
            value={escola.profissionaisSaude}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Endereço da escola:</label>
          <textarea
            name="endereco"
            value={escola.endereco}
            onChange={handleChange}
            disabled={!editando}
          />

          {editando && (
            <button className={styles.saveButton} onClick={salvarDados}>
              Confirmar
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default editarEscola;
