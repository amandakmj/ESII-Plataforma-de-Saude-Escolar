"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import Button, { ButtonColor } from '@/app/Componentes/Button/button';
import { gerarRelatorioPDF } from '@/app/utils/pdfGenerator';
const VerAlunoCadastrado = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const alunosSalvos = JSON.parse(localStorage.getItem('alunos') || '[]');
    setAlunos(alunosSalvos);
    setLoading(false);
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
              <h3>Nome: {aluno.nomeAluno}</h3>
              <p><strong>Data de Nascimento:</strong> {aluno.dataNascimento}</p>
              <p><strong>Gênero:</strong> {aluno.genero}</p>
              <p><strong>Endereço:</strong> {aluno.endereco}</p>
              <p><strong>Escola:</strong> {aluno.escola === "Outra" ? aluno.outraEscola : aluno.escola}</p>
              <p><strong>Série/Turma:</strong> {aluno.serieTurma}</p>
              <p><strong>Matrícula:</strong> {aluno.matricula}</p>
              <p><strong>Alergias:</strong> {aluno.alergias}</p>
              <p><strong>Doenças Crônicas:</strong> {aluno.doencasCronicas}</p>
              <p><strong>Medicamentos:</strong> {aluno.medicamentos}</p>
              <p><strong>Cirurgias:</strong> {aluno.cirurgias}</p>
              <p><strong>Necessidades Especiais:</strong> {aluno.necessidadesEspeciais}</p>
              <p><strong>Plano de Saúde:</strong> {aluno.planoSaude}</p>
              <p><strong>Autorização de Medicamentos:</strong> {aluno.autorizacaoMedicamentos ? 'Sim' : 'Não'}</p>
              <p><strong>Atendimento de Urgência:</strong> {aluno.atendimentoUrgencia ? 'Sim' : 'Não'}</p>
              <p><strong>Compartilhar Dados:</strong> {aluno.compartilharDados ? 'Sim' : 'Não'}</p>
          
              <Button text='Baixar relatório' color={ButtonColor.Primary} onClick={() => gerarRelatorioPDF(aluno)} />
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
