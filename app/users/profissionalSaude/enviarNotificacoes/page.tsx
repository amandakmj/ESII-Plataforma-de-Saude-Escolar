"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Notificacao {
  id: number;
  mensagem: string;
  dataEnvio: string;
}

const enviarNotificacoesPage: React.FC = () => {
  const router = useRouter();
  const [mensagem, setMensagem] = useState("");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [nome, setNome] = useState("Nome do Responsável");
  const [foto, setFoto] = useState("/default-profile.png");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nome") || "Nome do Responsável";
    const fotoSalva = localStorage.getItem("foto") || "/default-profile.png";
    setNome(nomeSalvo);
    setFoto(fotoSalva);
  }, []);

  const enviarNotificacao = () => {
    if (mensagem.trim() === "") return;
    
    const novaNotificacao: Notificacao = {
      id: Date.now(),
      mensagem,
      dataEnvio: new Date().toLocaleString("pt-BR"),
    };

    setNotificacoes([novaNotificacao, ...notificacoes]);
    setMensagem("");
    alert("Notificação enviada com sucesso!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={foto} alt="Foto do responsável" className={styles.profilePic} />
        <h2>{nome}</h2>
      </div>
      
      <h3 className={styles.title}>Notificações</h3>
      <textarea
        className={styles.textarea}
        placeholder="Escreva a notificação abaixo..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />
      <button className={styles.button} onClick={enviarNotificacao}>Enviar</button>
      
      <h3 className={styles.title}>Notificações Enviadas</h3>
      <div className={styles.notificacoesContainer}>
        {notificacoes.length === 0 ? (
          <p className={styles.semNotificacao}>Nenhuma notificação enviada</p>
        ) : (
          notificacoes.map((notificacao) => (
            <div key={notificacao.id} className={styles.notificacao}>
              <strong>Você:</strong> <span>{notificacao.mensagem}</span>
              <small className={styles.dataEnvio}>Enviado às {notificacao.dataEnvio}</small>
            </div>
          ))
        )}
      </div>
      
      <button className={styles.voltarButton} onClick={() => router.push("/tela-inicial")}>Voltar à tela inicial</button>
    </div>
  );
};

export default enviarNotificacoesPage;