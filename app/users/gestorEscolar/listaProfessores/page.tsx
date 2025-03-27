"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Professor {
  nome: string;
  id: string;
}

const ListaProfessores: React.FC = () => {
  const router = useRouter();
  const [nomeGestor, setNomeGestor] = useState("Nome do Gestor");
  const [fotoGestor, setFotoGestor] = useState("/default-profile.png");
  const [busca, setBusca] = useState("");
  const [professores, setProfessores] = useState<Professor[]>([]);

  useEffect(() => {
    setNomeGestor(localStorage.getItem("nomeGestor") || "Nome do Gestor");
    setFotoGestor(localStorage.getItem("fotoGestor") || "/default-profile.png");

    // Lista fixa de professores simulando uma API
    const professoresCadastrados: Professor[] = [
      { nome: "Adicineia", id: "1" },
      { nome: "Professor Tal", id: "2" },
      { nome: "Professor Tal Tal", id: "3" },
    ];

    setProfessores(professoresCadastrados.sort((a, b) => a.nome.localeCompare(b.nome)));
  }, []);

  // Filtrar professores considerando letras juntas e separadas
  const professoresFiltrados = professores.filter((professor) => {
    const nomeLower = professor.nome.toLowerCase();
    const buscaLower = busca.toLowerCase();

    // Verifica se as letras da busca aparecem em ordem no nome do professor
    let index = 0;
    for (const letra of buscaLower) {
      index = nomeLower.indexOf(letra, index);
      if (index === -1) return false;
      index++; // Avança para evitar repetir letras anteriores
    }
    return true;
  });

  const handleVerProfessor = (id: string) => {
    router.push(`/dados-professor/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={fotoGestor} alt="Foto do gestor" className={styles.profilePic} />
        <h2>{nomeGestor}</h2>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar professor"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button disabled>🔍</button>
      </div>

      <h3 className={styles.title}>Lista de Professores</h3>
      <ul className={styles.listaProfessores}>
        {professores.map((professor) => (
          <li key={professor.id} className={styles.professorItem}>
            <span>{professor.nome}</span>
            <span className={styles.verDetalhes} onClick={() => handleVerProfessor(professor.id)}>
              Clique aqui para ver melhor
            </span>
          </li>
        ))}
      </ul>

      {busca && (
        <>
          <h3 className={styles.title}>Resultado da Busca</h3>
          {professoresFiltrados.length > 0 ? (
            <ul className={styles.listaProfessores}>
              {professoresFiltrados.map((professor) => (
                <li key={professor.id} className={styles.professorItem}>
                  <span>{professor.nome}</span>
                  <span className={styles.verDetalhes} onClick={() => handleVerProfessor(professor.id)}>
                    Clique aqui para ver melhor
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.naoEncontrado}>Nenhum professor encontrado com esse nome.</p>
          )}
        </>
      )}

      <button className={styles.voltarButton} onClick={() => router.push("/tela-inicial")}>
        Voltar à tela inicial
      </button>
    </div>
  );
};

export default ListaProfessores;
