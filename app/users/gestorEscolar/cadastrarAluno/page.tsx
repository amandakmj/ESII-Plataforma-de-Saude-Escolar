"use client"

import React, { useEffect, useState } from 'react';
import Navbar from "../../Componentes/NavBar/navbar";
import Footer from '@/app/Componentes/Footer/footer';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const CadastraAluno = () => {

    const router = useRouter();
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [escolas, setEscolas] = useState<string[]>([]);
    const [formData, setFormData] = useState<{
      nomeAluno: string;
      dataNascimento: string;
      genero: string;
      peso: string;
      altura: string;
      endereco: string;
      escola: string;
      outraEscola: string;
      serieTurma: string;
      matricula: string;
      alergias: File | null;
      doencasCronicas: File | null;
      medicamentos: File | null;
      cirurgias: File | null;
      necessidadesEspeciais: File | null;
      planoSaude: File | null;
      autorizacaoMedicamentos: boolean;
      atendimentoUrgencia: boolean;
      compartilharDados: boolean;
      termosCondicoes: boolean;
      foto: string | null;
    }>({
      nomeAluno: '',
      dataNascimento: '',
      genero: '',
      peso: '',
      altura: '',
      endereco: '',
      escola: '',
      outraEscola: '',
      serieTurma: '',
      matricula: '',
      alergias: null,
      doencasCronicas: null,
      medicamentos: null,
      cirurgias: null,
      necessidadesEspeciais: null,
      planoSaude: null,
      autorizacaoMedicamentos: false,
      atendimentoUrgencia: false,
      compartilharDados: false,
      termosCondicoes: false,
      foto: null,
    });
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    useEffect(() => {
      // Simula a busca do nome no registro (substitua isso por um fetch real, se necessário)
      const nomeSalvo = localStorage.getItem('nomeUsuario') || 'Nome não encontrado';
      setNomeUsuario(nomeSalvo);

      // Simulação de busca de escolas no banco de dados
      setEscolas(["Escola A", "Escola B", "Escola C"]);

      // Recupera os checkboxes salvos
      const savedCheckboxes = JSON.parse(localStorage.getItem('formCheckboxes') || '{}');
      setFormData((prev) => ({ ...prev, ...savedCheckboxes }));
    }, []);

    // Função para atualizar os valores do form e salvar no localStorage
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    
      // Remover erro assim que o checkbox for marcado
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    };
    
    
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
    
      if (!formData.nomeAluno) newErrors.nomeAluno = "* Nome do Aluno é obrigatório.";
      if (!formData.dataNascimento) newErrors.dataNascimento = "* Data de nascimento é obrigatório.";
      if (!formData.peso) newErrors.peso = "* Peso é obrigatório.";
      if (!formData.altura) newErrors.altura = "* Altura é obrigatório.";
      if (!formData.endereco) newErrors.endereco = "* Endereço é obrigatório.";
      if (!formData.escola) newErrors.escola = "* Nome da escola é obrigatório.";
      if (!formData.serieTurma) newErrors.serieTurma = "* Série/Turma é obrigatória.";
      if (!formData.matricula) newErrors.matricula = "* Matrícula é obrigatória.";
      if (!formData.alergias) newErrors.alergias = "* Alergias é obrigatória.";
      if (!formData.doencasCronicas) newErrors.doencasCronicas = "* Doença Crônica é obrigatória.";
      if (!formData.medicamentos) newErrors.medicamentos = "* Medicamentos é obrigatório.";
      if (!formData.termosCondicoes) newErrors.termosCondicoes = "* Aceitação dos Termos de Uso é obrigatória.";
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        // Aqui você pode enviar os dados para o banco de dados
        router.replace("/users/responsavel/inicial");
      }
   };

  return (
    <div>
      <Navbar/>
    <div className={styles.page}>
    <h1 className={styles.pageTitle}>Cadastre o aluno abaixo:</h1>
      <div className={styles.container}>
        <div className={styles.profile_container}>
          <label htmlFor="fotoUpload" className={styles.profile_label}>
            <div className={styles.addPhotoCircle}>Adicione uma foto aqui</div>
          </label>
          <input type="file" id="fotoUpload" className={styles.file_input} onChange={handleFileChange} accept="image/*" hidden />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nome Completo*</label>
          <input type="text" name="nomeAluno" className={styles.input_box} onChange={handleInputChange} />
          {errors.nomeAluno && <p className={styles.error}>{errors.nomeAluno}</p>}
          
          <label className={styles.label}>Data de nascimento*</label>
          <input type="date" name="dataNascimento" className={styles.input_box} onChange={handleInputChange} />
          {errors.dataNascimento && <p className={styles.error}>{errors.dataNascimento}</p>}

          <label className={styles.label}>Gênero</label>
          <select name="genero" className={styles.input_box}>
            <option value="Mulher">Mulher</option>
            <option value="Homem">Homem</option>
            <option value="Outro">Outro</option>
          </select>
          
          <label className={styles.label}>Peso*</label>
          <input type="text" name="peso" className={styles.input_box} onChange={handleInputChange} />
          {errors.peso && <p className={styles.error}>{errors.peso}</p>}

          <label className={styles.label}>Altura*</label>
          <input type="text" name="altura" className={styles.input_box} onChange={handleInputChange} />
          {errors.altura && <p className={styles.error}>{errors.altura}</p>}

          <label className={styles.label}>Endereço (cidade, estado, bairro, CEP)*</label>
          <input type="text" name="endereco" className={styles.input_box} onChange={handleInputChange} />
          {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}


          <label className={styles.label}>Escola (nome da instituição)*</label>
          <select name="escola" className={styles.input_box} onChange={handleInputChange}>
            <option value="">Selecione uma escola</option>
            {escolas.map((escola, index) => (
              <option key={index} value={escola}>{escola}</option>
            ))}
            <option value="Outra">Outra</option>
          </select>
          {formData.escola === "Outra" && (
            <input type="text" name="outraEscola" className={styles.input_box} placeholder="Digite o nome da escola" onChange={handleInputChange} />
          )}

          <label className={styles.label}>Serie/Turma*</label>
          <input type="text" name="serie/turma" className={styles.input_box} onChange={handleInputChange} />
          {errors.serieTurma && <p className={styles.error}>{errors.serieTurma}</p>}


          <label className={styles.label}>Matrícula*</label>
          <input type="text" name="matricula" className={styles.input_box} onChange={handleInputChange} />
          {errors.matricula && <p className={styles.error}>{errors.matricula}</p>}

          <label className={styles.label}>Alergias (alimentos, medicamentos, picadas de insetos, etc.)*</label>
          <input type="text" name="alergias" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="alergias" className={styles.input_box} onChange={handleInputChange} />
          {errors.alergias && <p className={styles.error}>{errors.alergias}</p>}

          <label className={styles.label}>Doenças crônicas (diabetes, asma, cardiopatias, epilepsia, etc.)*</label>
          <input type="text" name="doencasCronicas" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="doencasCronicas" className={styles.input_box} onChange={handleInputChange} />
          {errors.doencasCronicas && <p className={styles.error}>{errors.doencasCronicas}</p>}

          <label className={styles.label}>Medicamentos de uso contínuo (nome do medicamento, dosagem, horários)*</label>
          <input type="text" name="medicamentos" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="medicamentos" className={styles.input_box} onChange={handleInputChange} />
          {errors.medicamentos && <p className={styles.error}>{errors.medicamentos}</p>}

          <label className={styles.label}>Cirurgias ou internações anteriores (se relevante)</label>
          <input type="text" name="cirurgias" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="cirurgias" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Deficiências ou necessidades especiais (auditiva, visual, motora, etc.)</label>
          <input type="text" name="necessidadesEspeciais" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="necessidadesEspeciais" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Plano de saúde (se houver)</label>
          <input type="text" name="planoSaude" className={styles.input_box} onChange={handleInputChange} />
          <input type="file" name="planoSaude" className={styles.input_box} onChange={handleInputChange} />

          <div className={styles.checkboxContainer}>
            <input type="checkbox" name="compartilharDados" onChange={() => setFormData((prev) => ({ ...prev, compartilharDados: !prev.compartilharDados }))} />
            <label className={styles.label}> Autorização para administração de medicamentos na escola</label>
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" name="atendimentoUrgencia" onChange={() => setFormData((prev) => ({ ...prev, atendimentoUrgencia: !prev.atendimentoUrgencia }))} />
            <label className={styles.label}> Autorização para atendimento médico em caso de emergência</label>
          </div>
          
          <div className={styles.checkboxContainer}>
            <input type="checkbox" name="compartilharDados" onChange={() => setFormData((prev) => ({ ...prev, compartilharDados: !prev.compartilharDados }))} />
            <label className={styles.label}> Consentimento para compartilhamento de dados de saúde com profissionais autorizados</label>
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" name="termosCondicoes" onChange={handleCheckboxChange} checked={formData.termosCondicoes} />
            <span> Eu aceito os <a href="/termos-de-uso">Termos de Uso</a> e a <a href="/politica-de-privacidade">Política de Privacidade*</a></span>
            {errors.termosCondicoes && <p className={styles.error}>{errors.termosCondicoes}</p>}
          </div>

          <label className={styles.label}>* indica um campo obrigatório</label>
          
          <button type="submit" className={styles.button}>Confirmar</button>
        </form>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default CadastraAluno;
