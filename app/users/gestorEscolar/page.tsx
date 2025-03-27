"use client"

import React, { useState } from 'react';
import styles from './page.module.css';
import router from 'next/router';
import Footer from '@/app/Componentes/Footer/footer';

const gestorEscolarPage = () => {

  const [formData, setFormData] = useState<{
    cpf: string;
    dataNascimento: string;
    cargo: string;
    genero: string;
    telefone: string;
    atuacao: string;
    foto: string | null;
  }>({
    cpf: '',
    dataNascimento: '',
    genero: '',
    cargo: '',
    telefone: '',
    atuacao: '',
    foto: null,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.cpf) newErrors.cpf = "* CPF é obrigatório.";
    if (!formData.genero) newErrors.genero = "* Gênero é obrigatório.";
    if (!formData.cargo) newErrors.cargo = "* Campo obrigatório.";
    if (!formData.telefone) newErrors.telefone = "*Telefone é obrigatório.";
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prevData) => ({ ...prevData, foto: URL.createObjectURL(file) }));
      }
    };
  return (
    <div>
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
          <h2 className={styles.name}>Nome gestor escolar</h2>
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

            <label className={styles.label}>Cargo/Função*</label>
            <input type="text" value="" className={styles.input_box} readOnly />
            {errors.cargo && <p className={styles.error}>{errors.cargo}</p>}

            <label className={styles.label}>Telefone*</label>
            <input type="text" className={styles.input_box} />
            {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}

            <label className={styles.label}>Endereço (cidade, estado, bairro, CEP)</label>
            <input type="text" className={styles.input_box} />
            
            <button className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default gestorEscolarPage;