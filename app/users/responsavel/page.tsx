"use client"

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Footer from "../../Componentes/Footer/footer";
import { useRouter } from 'next/navigation';


const ResponsavelPage: React.FC = () => {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState<string>('');
  const [formData, setFormData] = useState<{
    cpf: string;
    dataNascimento: string;
    nomeAluno: string;
    vinculo: string;
    telefone: string;
    endereco: string;
    foto: string | null;
  }>({
    cpf: '',
    dataNascimento: '',
    vinculo: '',
    nomeAluno: '',
    telefone: '',
    endereco: '',
    foto: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, foto: URL.createObjectURL(file) }));
    }
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.cpf) newErrors.cpf = "* CPF é obrigatório.";
    if (!formData.nomeAluno) newErrors.nomeAluno = "* Nome do Aluno é obrigatório.";
    if (!formData.vinculo) newErrors.vinculo = "* Vinculo com Aluno é obrigatório.";
    if (!formData.telefone) newErrors.telefone = "*Telefone é obrigatório.";
    if (!formData.endereco) newErrors.endereco = "* Endereço é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      router.replace("/users/responsavel/inicial");
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
            <input type="text" name="cpf" className={styles.input_box} onChange={handleInputChange} />
            {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}
            
            <label className={styles.label}>Data de nascimento</label>
            <input type="date" name="dataNascimento" className={styles.input_box} onChange={handleInputChange} />
            
            <label className={styles.label}>Gênero</label>
            <select name="genero" className={styles.input_box}>
            <option value=""></option>
              <option value="Mulher">Mulher</option>
              <option value="Homem">Homem</option>
              <option value="Outro">Outro</option>
            </select>
            
            <label className={styles.label}>Vínculo com o Aluno*</label>
            <select name="vinculo" className={styles.input_box} onChange={handleInputChange}>
            <option value=""></option>
              <option value="Pai">Pai</option>
              <option value="Mãe">Mãe</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.vinculo && <p className={styles.error}>{errors.vinculo}</p>}
            <label className={styles.label}>Nome do Aluno*</label>
            <input type="text" name="nomeAluno" className={styles.input_box} onChange={handleInputChange} />
            {errors.nomeAluno && <p className={styles.error}>{errors.nomeAluno}</p>}
            
            <label className={styles.label}>Telefone* </label>
            <input type="text" name="telefone" className={styles.input_box} onChange={handleInputChange} />
            {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}

            <label className={styles.label}>Endereço (cidade, estado, bairro, CEP)*</label>
            <input type="text" name="endereco" className={styles.input_box} onChange={handleInputChange} />
            {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}

            <label className={styles.label}>* indica um campo obrigatório</label>
            
            <button type="submit" className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResponsavelPage;