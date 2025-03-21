import React from 'react';
import styles from './page.module.css';
import Navbar from '@/app/Componentes/NavBar/navbar';
import InformacoesPessoais from './Componentes/InformacoesPessoais/page';
import InformacoesEscolares from './Componentes/InformacoesEscolares/page';
import HistoricoSaude from './Componentes/HistoricoSaude/page';
import ContatoEmergencia from './Componentes/ContatoEmergencia/page';
import AtualizacoesTermos from './Componentes/AtualizacoesTermos/page';
import Anexos from './Componentes/Anexos/page';

const CadastraAluno = () => {
  return (
    <div>
      
      <div className={styles.page}>
        <div className={styles.container}>
          <InformacoesPessoais/>
          <InformacoesEscolares/>
          <HistoricoSaude/>
          <ContatoEmergencia/>
          <AtualizacoesTermos/>
          <Anexos/>
        </div>
      </div>      
    </div>
  );
};

export default CadastraAluno;
