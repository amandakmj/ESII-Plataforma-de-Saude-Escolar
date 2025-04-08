"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Footer from '@/app/Componentes/Footer/footer';
import router from 'next/router';

const registrarEscolaPage = () => {

  const [formData, setFormData] = useState<{
    cnpj: string;
    tipo: string;
    endereco: string;
    telefone: string;
  }>({
    cnpj: '',
    tipo: '',
    endereco: '',
    telefone: '',
  });
  useEffect(() => {
    // Simula a busca do nome no registro (substitua isso por um fetch real, se necessário)
    const nomeSalvo = localStorage.getItem('nomeUsuario') || 'Nome não encontrado';
    setNomeEscola(nomeSalvo);
  }, []);
  const [nomeEscola, setNomeEscola] = useState("");
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.cnpj) newErrors.cnpj = "* CNPJ é obrigatório.";
    if (!formData.tipo) newErrors.tipo = "* Campo obrigatório.";
    if (!formData.telefone) newErrors.telefone = "*Telefone é obrigatório.";
    if (!formData.endereco) newErrors.endereco = "*Endereço é obrigatório.";

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
        router.replace("/users/gestorEscolar/inicial");
      }
    };
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
      <h1 className={styles.pageTitle}>Finalize seu cadastro da escola preenchendo os dados abaixo:</h1>
        <div className={styles.container}>
          <h2 className={styles.name}>{nomeEscola}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Tipo de Instituição *</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            {errors.tipo && <p className={styles.error}>{errors.tipo}</p>}

            <label className={styles.label}>CNPJ*</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            {errors.cnpj && <p className={styles.error}>{errors.cnpj}</p>}

            <label className={styles.label}>Telefone da escola*</label>
            <input type="text" className={styles.input_box} readOnly onChange={handleInputChange}/>
            {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}

            <label className={styles.label}>Site</label>
            <input type="text" className={styles.input_box} readOnly onChange={handleInputChange}/>
            
            <label className={styles.label}>Séries/Turmas oferecidas</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            
            <label className={styles.label}>Número de alunos</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            
            <label className={styles.label}>Número de professores</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>

            <label className={styles.label}>Profissionais de saúde na escola (se houver)</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            
            <label className={styles.label}>Endereço da escola (cidade, estado, bairro, CEP)*</label>
            <input type="text" className={styles.input_box} onChange={handleInputChange}/>
            {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}

            <button className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default registrarEscolaPage;