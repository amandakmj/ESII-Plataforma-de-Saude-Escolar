import React from 'react'
import styles from './page.module.css';
import Navbar from '@/app/Components/NavBar/navbar'
import InformacoesPessoais from './Componentes/InformacoesPessoais/page';
import InformacoesEscolares from './Componentes/InformacoesEscolares/page';

const CadastraAluno = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className={styles.page}>
        
        <div className={styles.container}>
          <InformacoesPessoais/>
          <InformacoesEscolares/>
        
        </div>
      </div>      
    </div>
  )
}

export default CadastraAluno