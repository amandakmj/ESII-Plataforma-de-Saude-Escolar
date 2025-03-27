"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import { useRouter } from "next/navigation";

interface Notificacoes {
  id: number;
  remetente: string;
  mensagem: string;
  dataEnvio: string;
  lida: boolean;
}

const NotificacoesPage: React.FC = () => {
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState<Notificacoes[]>([]);
  const [nomeResponsavel, setNomeResponsavel] = useState("Nome do Responsável");
  const [fotoResponsavel, setFotoResponsavel] = useState("/default-profile.png");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario") || "Nome não encontrado";
    const fotoSalva = localStorage.getItem("fotoResponsavel") || "/default-profile.png";
    setNomeResponsavel(nomeSalvo);
    setFotoResponsavel(fotoSalva);

    const notificacoesSalvas = JSON.parse(localStorage.getItem("notificacoes") || "[]");
    const notificacoesAtualizadas = notificacoesSalvas.map((notif: Notificacoes) => ({
      ...notif,
      lida: true,
    }));
    setNotificacoes(notificacoesAtualizadas);
    localStorage.setItem("Notificacoes", JSON.stringify(notificacoesAtualizadas));
  }, []);

  return (
    <div className={styles.container}> 
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.header}>
        <img src={fotoResponsavel} alt="Foto do responsável" className={styles.profilePic} />
        <h2>{nomeResponsavel}</h2>
      </div>

      <h3 className={styles.title}>Notificações</h3>
      <h4 className={styles.subtitle}>Não lidas</h4>
      <div className={styles.notificacoesContainer}>
        {notificacoes.filter(n => !n.lida).length === 0 ? (
          <p className={styles.semNotificacao}>Nenhuma nova notificação</p>
        ) : (
          notificacoes.filter(n => !n.lida).map((notificacao) => (
            <div key={notificacao.id} className={styles.notificacaoNaoLida}>
              <strong>{notificacao.remetente}</strong>
              <small className={styles.dataEnvio}>Enviado às {notificacao.dataEnvio}</small>
              <p>{notificacao.mensagem}</p>
            </div>
          ))
        )}
      </div>

      <h4 className={styles.subtitle}>Lidas e Enviadas</h4>
      <div className={styles.notificacoesContainer}>
        {notificacoes.filter(n => n.lida).map((notificacao) => (
          <div key={notificacao.id} className={styles.notificacaoLida}>
            <strong>{notificacao.remetente}</strong>
            <small className={styles.dataEnvio}>Enviado às {notificacao.dataEnvio}</small>
            <p>{notificacao.mensagem}</p>
          </div>
        ))}
      </div>
      <button className={styles.voltarButton} onClick={() => router.push("/users/responsavel/inicial")}>Voltar à tela inicial</button>
      </div>
      <Footer />
    </div>
  );
};

export default NotificacoesPage;
