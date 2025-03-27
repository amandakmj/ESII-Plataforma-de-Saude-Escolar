"use client"

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Footer from "../../Componentes/Footer/footer";
import { useRouter } from 'next/navigation';


const ProfessorPage: React.FC = () => {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState<string>('');
  const [turmas, setTurmas] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    cpf: string;
    dataNascimento: string;
    genero: string;
    instituicaoEnsino: string;
    cargo: string;
    turma: string;
    outraTurma: string;
    foto: string | null;
  }>({
    cpf: '',
    dataNascimento: '',
    genero: '',
    instituicaoEnsino: '',
    cargo: '',
    turma: '',
    outraTurma: '',
    foto: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Simula a busca do nome no registro (substitua isso por um fetch real, se necessário)
    const nomeSalvo = localStorage.getItem('nomeUsuario') || 'Nome não encontrado';
    setNomeUsuario(nomeSalvo);

    setTurmas(["Turma A", "Turma B", "Turma C"]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  



  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.cpf) newErrors.cpf = "* CPF é obrigatório.";
    if (!formData.instituicaoEnsino) newErrors.instituicaoEnsino = "* Instituição de Ensino é obrigatório.";
    if (!formData.cargo) newErrors.cargo= "* Cargo/Função é obrigatório.";
    if (!formData.turma) newErrors.turma = "* Turma é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      router.replace("/users/professor/inicial");
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
            
            <label className={styles.label}>Instituição de Ensino*</label>
            <input type="text" name="instituicaoEnsino" className={styles.input_box} onChange={handleInputChange} />
            {errors.instituicaoEnsino && <p className={styles.error}>{errors.instituicaoEnsino}</p>}

            <label className={styles.label}>Cargo/Função*</label>
            <input type="text" name="cargo" className={styles.input_box} onChange={handleInputChange} />
            {errors.cargo && <p className={styles.error}>{errors.cargo}</p>}
            
            <label className={styles.label}>Turma</label>
            <select name="turma" className={styles.input_box} onChange={handleInputChange}>
                <option value="">Selecione uma turma</option>
                {turmas.map((turma, index) => (
                <option key={index} value={turma}>{turma}</option>
                ))}
                <option value="Outra">Outra</option>
            </select>
            {formData.turma === "Outra" && (
                <input type="text" name="outraTurma" className={styles.input_box} placeholder="Digite o nome da turma" onChange={handleInputChange} />
            )}
            <label className={styles.label}>* indica um campo obrigatório</label>
            
            <button type="submit" className={styles.button}>Confirmar</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorPage;