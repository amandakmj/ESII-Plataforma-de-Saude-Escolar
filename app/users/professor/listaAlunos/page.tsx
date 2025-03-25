"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Aluno {
  nome: string;
  id: string;
}

const ListaAlunos: React.FC = () => {
  const router = useRouter();
  const [nomeProfessor, setNomeProfessor] = useState("Nome do professor");
  const [fotoProfessor, setFotoProfessor] = useState("/default-profile.png");
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    setNomeProfessor(localStorage.getItem("nomeProfessor") || "Nome do professor");
    setFotoProfessor(localStorage.getItem("fotoProfessor") || "/default-profile.png");

    // Lista fixa de alunos simulando uma API
    const alunosCadastrados: Aluno[] = [
      { nome: "Amanda Freitas Silva Araújo", id: "1" },
      { nome: "Artur Freitas Bonfim Araújo ALves", id: "2" },
      { nome: "Carlos Eduardo Lima", id: "3" },
      { nome: "Débora Martins", id: "4" },
      { nome: "Elisa Costa", id: "5" },
    ];

    setAlunos(alunosCadastrados.sort((a, b) => a.nome.localeCompare(b.nome)));
  }, []);

  // Filtrar alunos considerando letras juntas e separadas
  const alunosFiltrados = alunos.filter((aluno) => {
    const nomeLower = aluno.nome.toLowerCase();
    const buscaLower = busca.toLowerCase();

    // Verifica se as letras da busca aparecem em ordem no nome do aluno
    let index = 0;
    for (const letra of buscaLower) {
      index = nomeLower.indexOf(letra, index);
      if (index === -1) return false;
      index++; // Avança para evitar repetir letras anteriores
    }
    return true;
  });

  const handleVerAluno = (id: string) => {
    router.push(`/dados-aluno/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={fotoProfessor} alt="Foto do professor" className={styles.profilePic} />
        <h2>{nomeProfessor}</h2>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar aluno"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button disabled>🔍</button>
      </div>

      <h3 className={styles.title}>Lista de Alunos</h3>
      <ul className={styles.listaAlunos}>
        {alunos.map((aluno) => (
          <li key={aluno.id} className={styles.alunoItem}>
            <span>{aluno.nome}</span>
            <span className={styles.verDetalhes} onClick={() => handleVerAluno(aluno.id)}>
              Clique aqui para ver melhor
            </span>
          </li>
        ))}
      </ul>

      {busca && (
        <>
          <h3 className={styles.title}>Resultado da Busca</h3>
          {alunosFiltrados.length > 0 ? (
            <ul className={styles.listaAlunos}>
              {alunosFiltrados.map((aluno) => (
                <li key={aluno.id} className={styles.alunoItem}>
                  <span>{aluno.nome}</span>
                  <span className={styles.verDetalhes} onClick={() => handleVerAluno(aluno.id)}>
                    Clique aqui para ver melhor
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.naoEncontrado}>Nenhum aluno encontrado com esse nome.</p>
          )}
        </>
      )}

      <button className={styles.voltarButton} onClick={() => router.push("/tela-inicial")}>
        Voltar à tela inicial
      </button>
    </div>
  );
};

export default ListaAlunos;
