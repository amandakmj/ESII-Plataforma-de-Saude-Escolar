"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

import router from 'next/router';
import Footer from '@/app/Componentes/Footer/footer';

const profissionalSaudePage = () => {
  const [formData, setFormData] = useState<{
      cpf: string;
      dataNascimento: string;
      crm: string;
      genero: string;
      telefone: string;
      atuacao: string;
      foto: string | null;
    }>({
      cpf: '',
      dataNascimento: '',
      genero: '',
      crm: '',
      telefone: '',
      atuacao: '',
      foto: null,
    });
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    const [nomeUsuario, setNomeUsuario] = useState<string>('');

    useEffect(() => {
      const usuario = sessionStorage.getItem("usuario");
      if (usuario) {
        try {
          const usuarioObj = JSON.parse(usuario);
          setNomeUsuario(usuarioObj.nome || "Nome não encontrado");
        } catch (e) {
          console.error("Erro ao ler o nome:", e);
          setNomeUsuario("Nome não encontrado");
        }
      } else {
        setNomeUsuario("Nome não encontrado");
      }
    }, []);
    
    
    const validateForm = () => {
      let newErrors: { [key: string]: string } = {};
      if (!formData.cpf) newErrors.cpf = "* CPF é obrigatório.";
      if (!formData.genero) newErrors.genero = "* Gênero é obrigatório.";
      if (!formData.crm) newErrors.crm = "* Campo obrigatório.";
      if (!formData.telefone) newErrors.telefone = "*Telefone é obrigatório.";
      if (!formData.atuacao) newErrors.atuacao = "* Área de Atuação é obrigatório.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
          router.replace("/users/profissionalSaude/inicial");
        }
      };
    

  return (
    <div>
       <h1 className={styles.pageTitle}>Finalize seu cadastro preenchendo os dados abaixo:</h1>
      <div className={styles.page}>
        <div className={styles.container}>
           
          <h2 className={styles.name}>{nomeUsuario}</h2>
          
          <form className={styles.form} onSubmit={handleSubmit}>

            <label className={styles.label}>CPF*</label>
            <input type="text" className={styles.input_box} />
            {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}

            <label className={styles.label}>Data de nascimento</label>
            <input type="date" className={styles.input_box} />
            
            <label className={styles.label}>Gênero*</label>
            <select name="genero" className={styles.input_box} onChange={handleInputChange}>
              <option value=""></option>
              <option value="Homem">Pai</option>
              <option value="Mulher">Mãe</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.genero && <p className={styles.error}>{errors.genero}</p>}


            <label className={styles.label}>Área de atuação*</label>
            <input type="text" value="" className={styles.input_box} readOnly />
            {errors.atuacao && <p className={styles.error}>{errors.atuacao}</p>}

            <label className={styles.label}>CRM e afins*</label>
            <input type="text" className={styles.input_box} />
            {errors.crm && <p className={styles.error}>{errors.crm}</p>}

            <label className={styles.label}>Telefone*</label>
            <input type="text" className={styles.input_box} />
            {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}

            <button className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default profissionalSaudePage;