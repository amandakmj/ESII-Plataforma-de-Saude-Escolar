"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const VerAlunoCadastrado = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Nome do Aluno</h2>

        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : alunos.length === 0 ? (
          <div className={styles.semDados}>
            <p>Não tem nenhum aluno cadastrado.</p>
          </div>
        ) : (
          alunos.map((aluno, index) => (
            <div key={index} className={styles.card}>
              <h3>Idade: {aluno.idade} anos</h3>
              <p><strong>Gênero:</strong> {aluno.genero}</p>
              <p><strong>Nome do responsável:</strong> {aluno.responsavel.nome}</p>
              <p><strong>Telefone do responsável:</strong> {aluno.responsavel.telefone}</p>
              <p><strong>Endereço:</strong> {aluno.endereco}</p>

              <h3 className={styles.subtitulo}>Contato de Emergência</h3>
              <p><strong>Nome:</strong> {aluno.contatoEmergencia.nome}</p>
              <p><strong>Parentesco:</strong> {aluno.contatoEmergencia.parentesco}</p>
              <p><strong>Telefone:</strong> {aluno.contatoEmergencia.telefone}</p>
              <p><strong>Telefone secundário:</strong> {aluno.contatoEmergencia.telefoneSecundario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerAlunoCadastrado;
