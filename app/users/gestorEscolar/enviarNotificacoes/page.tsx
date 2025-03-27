"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import { useRouter } from "next/navigation";

interface Notificacao {
  id: number;
  mensagem: string;
  dataEnvio: string;
}

const EnviarNotificacoesPage: React.FC = () => {
  const router = useRouter();
  const [mensagem, setMensagem] = useState("");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [nomeResponsavel, setNomeResponsavel] = useState("Nome do Responsável");
  const [fotoResponsavel, setFotoResponsavel] = useState("/default-profile.png");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeResponsavel") || "Nome do Responsável";
    const fotoSalva = localStorage.getItem("fotoResponsavel") || "/default-profile.png";
    setNomeResponsavel(nomeSalvo);
    setFotoResponsavel(fotoSalva);

    const notificacoesSalvas = JSON.parse(localStorage.getItem("notificacoes") || "[]");
    setNotificacoes(notificacoesSalvas);
  }, []);

  const enviarNotificacao = () => {
    if (mensagem.trim() === "") return;
    
    const novaNotificacao: Notificacao = {
      id: Date.now(),
      mensagem,
      dataEnvio: new Date().toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" })
    };

    const novasNotificacoes = [novaNotificacao, ...notificacoes];
    setNotificacoes(novasNotificacoes);
    localStorage.setItem("notificacoes", JSON.stringify(novasNotificacoes));
    setMensagem("");
  };

  return (
    <div>
      <Navbar/>
    <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{nomeResponsavel}</h2>
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
        {notificacoes.map((notificacao) => (
          <div key={notificacao.id} className={styles.notificacao}>
            <strong>Você:</strong>
            <p>{notificacao.mensagem}</p>
            <small className={styles.dataEnvio}>Enviado às {notificacao.dataEnvio}</small>
          </div>
        ))}
      </div>

      <button className={styles.voltarButton} onClick={() => router.push("/tela-inicial")}>Voltar à tela inicial</button>
    </div>
    </div>
    <Footer />
  </div>
  );
};

export default EnviarNotificacoesPage;
