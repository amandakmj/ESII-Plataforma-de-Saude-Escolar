"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import Button from "@/app/Componentes/Button/button";

const editarAluno = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aluno, setAluno] = useState({
    nome: "Nome do Aluno",
    idade: 16,
    genero: "Mulher",
    nomeResponsavel: "Nome tal e vínculo",
    telefoneResponsavel: "00 000000000",
    endereco: "Endereço do aluno",
    escola: "Nome da escola",
    serieTurma: "Segundo ano do ensino médio",
    professores: "Lista de professores",
    alergias: "Morango",
    doencas: "Diabetes",
    medicamentos: "Clifagen (para diabetes)",
    cirurgias: "Nenhuma",
    deficiencias: "Nenhuma",
    planoSaude: "Bradesco",
    contatoEmergencia: {
      nome: "Contato fulano de tal",
      parentesco: "Pai",
      telefone: "00 000000000",
      telefoneSecundario: "00 000000000"
    }
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Dados salvos:", aluno); // Aqui você pode enviar os dados para uma API
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, campo: string, subCampo?: string) => {
    if (subCampo) {
      setAluno((prev) => ({
        ...prev,
        contatoEmergencia: {
          ...prev.contatoEmergencia,
          [subCampo]: e.target.value
        }
      }));
    } else {
      setAluno((prev) => ({
        ...prev,
        [campo]: e.target.value
      }));
    }
  };

  return (
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Nome do gestor</h2>
        <div className={styles.alunoNome}>{aluno.nome}</div>

        <div className={styles.card}>
          {isEditing ? (
            <button className={styles.saveButton} onClick={handleSaveClick}>💾</button>
          ) : (
            <button className={styles.editButton} onClick={handleEditClick}>✎</button>
          )}

          <p><strong>Idade:</strong> <input type="number" value={aluno.idade} disabled={!isEditing} onChange={(e) => handleChange(e, "idade")} /></p>
          <p><strong>Gênero:</strong> <input type="text" value={aluno.genero} disabled={!isEditing} onChange={(e) => handleChange(e, "genero")} /></p>
          <p><strong>Nome do responsável:</strong> <input type="text" value={aluno.nomeResponsavel} disabled={!isEditing} onChange={(e) => handleChange(e, "nomeResponsavel")} /></p>
          <p><strong>Telefone do responsável:</strong> <input type="text" value={aluno.telefoneResponsavel} disabled={!isEditing} onChange={(e) => handleChange(e, "telefoneResponsavel")} /></p>
          <p><strong>Endereço:</strong> <textarea value={aluno.endereco} disabled={!isEditing} onChange={(e) => handleChange(e, "endereco")} /></p>

          <h3 className={styles.subtitulo}>Saúde</h3>
          <p><strong>Alergias:</strong> <input type="text" value={aluno.alergias} disabled={!isEditing} onChange={(e) => handleChange(e, "alergias")} /></p>
          <p><strong>Doenças:</strong> <input type="text" value={aluno.doencas} disabled={!isEditing} onChange={(e) => handleChange(e, "doencas")} /></p>
          <p><strong>Medicamentos:</strong> <input type="text" value={aluno.medicamentos} disabled={!isEditing} onChange={(e) => handleChange(e, "medicamentos")} /></p>

          <h3 className={styles.subtitulo}>Contato de Emergência</h3>
          <p><strong>Nome:</strong> <input type="text" value={aluno.contatoEmergencia.nome} disabled={!isEditing} onChange={(e) => handleChange(e, "contatoEmergencia", "nome")} /></p>
          <p><strong>Parentesco:</strong> <input type="text" value={aluno.contatoEmergencia.parentesco} disabled={!isEditing} onChange={(e) => handleChange(e, "contatoEmergencia", "parentesco")} /></p>
          <p><strong>Telefone:</strong> <input type="text" value={aluno.contatoEmergencia.telefone} disabled={!isEditing} onChange={(e) => handleChange(e, "contatoEmergencia", "telefone")} /></p>

          <div className={styles.buttonGroup}>
            <Button text="Baixar PDF do relatório de saúde" />
            <Button text="Baixar PDF dos dados" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default editarAluno;
