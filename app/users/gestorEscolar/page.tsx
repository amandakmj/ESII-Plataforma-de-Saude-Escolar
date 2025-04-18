"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Footer from '@/app/Componentes/Footer/footer';

const gestorEscolarPage = () => {
  const router = useRouter();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        router.replace("/users/gestorEscolar/registrarEscola");
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
      <h1 className={styles.pageTitle}>Finalize seu cadastro preenchendo os dados abaixo:</h1>
        <div className={styles.container}>
        
          <h2 className={styles.name}>{nomeUsuario}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            <label className={styles.label}>CPF*</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} className={styles.input_box} />
            {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}


            <label className={styles.label}>Data de nascimento</label>
            <input type="date" className={styles.input_box} />
            
            <label className={styles.label}>Gênero*</label>
            <select name="genero" className={styles.input_box} onChange={handleInputChange}>
              <option value=""></option>
              <option value="Homem">Homem</option>
              <option value="Mulher">Mulher</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.genero && <p className={styles.error}>{errors.genero}</p>}

            <label className={styles.label}>Cargo/Função*</label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} className={styles.input_box} />
            {errors.cargo && <p className={styles.error}>{errors.cargo}</p>}

            <label className={styles.label}>Telefone*</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} className={styles.input_box} />
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