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
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setFormData((prevData) => ({ ...prevData, foto: URL.createObjectURL(file) }));
        }
      };

  return (
    <div>
       <h1 className={styles.pageTitle}>Finalize seu cadastro preenchendo os dados abaixo:</h1>
      <div className={styles.page}>
        <div className={styles.container}>
           <div className={styles.profile_container}>
            <label htmlFor="fotoUpload" className={styles.profile_label}>
              {formData.foto ? (
                // Exibe a foto escolhida
                <img src={formData.foto} alt="Foto do usuário" className={styles.profile_image} />
              ) : (
                // Se não houver foto, exibe um círculo com a mensagem
                <div className={styles.addPhotoCircle}>Adicione uma foto aqui</div>
              )}
            </label>
            <input
              type="file"
              id="fotoUpload"
              className={styles.file_input}
              onChange={handleFileChange}
              accept="image/*"
              hidden
            />
          </div>
          <h2 className={styles.name}>Nome profissional de saude</h2>
          
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