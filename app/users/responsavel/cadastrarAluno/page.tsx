"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import InformacoesPessoais from './Componentes/InformacoesPessoais/page';
import InformacoesEscolares from './Componentes/InformacoesEscolares/page';
import HistoricoSaude from './Componentes/HistoricoSaude/page';
import ContatoEmergencia from './Componentes/ContatoEmergencia/page';
import AtualizacoesTermos from './Componentes/AtualizacoesTermos/page';
import Anexos from './Componentes/Anexos/page';
import MenuLateral from '@/app/Componentes/MenuLateral/menuLateral';
import Footer from '@/app/Componentes/Footer/footer';

const CadastraAluno = () => {

    const router = useRouter();
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [formData, setFormData] = useState<{
      nomeAluno: string;
      dataNascimento: string;
      genero: string;
      peso: string;
      altura: string;
      vinculo: string;
      telefone: string;
      endereco: string;
      escola: string;
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
      vinculo: '',
      telefone: '',
      endereco: '',
      escola: '',
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
    }, []);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!formData.dataNascimento) newErrors.dataNascimento = "* Data de nascimento é obrigatória.";
      if (!formData.vinculo) newErrors.vinculo = "* Vínculo com o aluno é obrigatório.";
      if (!formData.telefone) newErrors.telefone = "* Telefone do responsável é obrigatório.";
      if (!formData.endereco) newErrors.endereco = "* Endereço é obrigatório.";
      if (!formData.escola) newErrors.escola = "* Nome da escola é obrigatório.";
      if (!formData.serieTurma) newErrors.serieTurma = "* Série/Turma é obrigatória.";
      if (!formData.matricula) newErrors.matricula = "* Matrícula é obrigatória.";
      if (!formData.termosCondicoes) newErrors.termosCondicoes = "* Aceitação dos Termos de Uso é obrigatória.";
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        router.replace("/users/responsavel/inicialResponsavel");
      }
    };

  
  return (
    <div>
    <div className={styles.page}>
    <h1 className={styles.pageTitle}>Cadastre o aluno</h1>
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
          
          <label className={styles.label}>Peso</label>
          <input type="text" name="peso" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Altura</label>
          <input type="text" name="altura" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Vínculo com o Aluno*</label>
          <select name="vinculo" className={styles.input_box}>
            <option value="Pai">Pai</option>
            <option value="Mãe">Mãe</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.vinculo && <p className={styles.error}>{errors.vinculo}</p>}

          <label className={styles.label}>Telefone do responsável</label>
          <input type="tel" name="telefone" className={styles.input_box} onChange={handleInputChange} />
          {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}
          
          <label className={styles.label}>Endereço (cidade, estado, bairro, CEP)*</label>
          <input type="text" name="endereco" className={styles.input_box} onChange={handleInputChange} />
          {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}

          <label className={styles.label}>Escola (nome da instituição)*</label>
          <input type="text" name="escola" className={styles.input_box} onChange={handleInputChange} />
          {errors.escola && <p className={styles.error}>{errors.escola}</p>}

          <label className={styles.label}>Serie/Turma*</label>
          <input type="text" name="serie/turma" className={styles.input_box} onChange={handleInputChange} />
          {errors.serieTurma && <p className={styles.error}>{errors.serieTurma}</p>}


          <label className={styles.label}>Matrícula*</label>
          <input type="text" name="matricula" className={styles.input_box} onChange={handleInputChange} />
          {errors.matricula && <p className={styles.error}>{errors.matricula}</p>}

          <label className={styles.label}>Alergias (alimentos, medicamentos, picadas de insetos, etc.)*</label>
          <input type="file" name="alergias" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Doenças crônicas (diabetes, asma, cardiopatias, epilepsia, etc.)*</label>
          <input type="file" name="doencasCronicas" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Medicamentos de uso contínuo (nome do medicamento, dosagem, horários)*</label>
          <input type="file" name="medicamentos" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Cirurgias ou internações anteriores (se relevante)*</label>
          <input type="file" name="cirurgias" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Deficiências ou necessidades especiais (auditiva, visual, motora, etc.)</label>
          <input type="file" name="necessidadesEspeciais" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Plano de saúde (se houver)</label>
          <input type="file" name="planoSaude" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Autorização para administração de medicamentos na escola</label>
          <input type="checkbox" name="planoSaude" className={styles.input_box} onChange={handleInputChange} />
          
          <label className={styles.label}>Autorização para atendimento médico em caso de emergência</label>
          <input type="checkbox" name="atendimentoUrgencia" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Consentimento para compartilhamento de dados de saúde com profissionais autorizados</label>
          <input type="checkbox" name="compartilharDados" className={styles.input_box} onChange={handleInputChange} />

          <label className={styles.label}>Aceitação dos Termos de Uso e Política de Privacidade*</label>
          <input type="checkbox" name="termosCondicoes" className={styles.input_box} onChange={handleInputChange} />
          {errors.termosCondicoes && <p className={styles.error}>{errors.termosCondicoes}</p>}

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
