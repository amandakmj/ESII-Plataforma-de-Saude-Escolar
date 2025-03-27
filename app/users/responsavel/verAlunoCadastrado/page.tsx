"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import mockAlunos from '@/app/Mocks/alunosMocks';
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import Button, { ButtonColor } from '@/app/Componentes/Button/button';
import { gerarRelatorioPDF } from '@/app/utils/pdfGenerator';
const VerAlunoCadastrado = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAluno = (nome: string) => {
    const alunoEncontrado = mockAlunos.find((aluno) => aluno.nome === nome);
    return alunoEncontrado ?[ alunoEncontrado] : []; 
  };

  useEffect(() => {
    fetch('/api/alunos') // API no Vercel
      .then((response) => response.json())
      .then((data) => {
        setAlunos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
        const aluno = getAluno("Amanda");
        setAlunos(mockAlunos);
    
      });
  }, []);
  return (
    <div>
      <Navbar/>
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Aluno(s)</h2>

        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : alunos.length === 0 ? (
          <div className={styles.semDados}>
            <p>Não tem nenhum aluno cadastrado.</p>
          </div>
        ) : (
          alunos.map((aluno, index) => (
            <div key={index} className={styles.card}>
              <h3>Nome: {aluno.nome}</h3>
              <p><strong>Idade:</strong> {aluno.idade} anos</p>
              <p><strong>Gênero:</strong> {aluno.genero}</p>
              <p><strong>Nome do responsável:</strong> {aluno.nomeResponsavel}</p>
              <p><strong>Telefone do responsável:</strong> {aluno.telefoneResponsavel}</p>
              <p><strong>Endereço:</strong> {aluno.endereco}</p>

              <h3 className={styles.subtitulo}>Contato de Emergência</h3>
              <p><strong>Nome:</strong> {aluno.contatoEmergenciaNome}</p>
              <p><strong>Parentesco:</strong> {aluno.contantoEmergenciaParentesco}</p>
              <p><strong>Telefone:</strong> {aluno.contatoEmergenciaTelefone}</p>
              <p><strong>Telefone secundário:</strong> {aluno.contatoEmergenciaTelefoneSecundario}</p>
              <Button text='Baixar relatório' color={ButtonColor.Primary} onClick={() => gerarRelatorioPDF(aluno)}></Button>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default VerAlunoCadastrado;
