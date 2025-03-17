import React from 'react'
import styles from './page.module.css'
import Navbar from '../Components/NavBar/navbar'
import Footer from '../Components/Footer/footer'

const RegisterPage = () => {
  return (
    <div>
      <Navbar/>
      <div className={styles.page}>
            <div className={styles.register_section}>
              <p className={styles.header}>Bem-vindo!</p>
              <div className={styles.input_section}>
                <p className={styles.text}>Nome Completo</p>
                <input type="text" className={styles.input_box} placeholder='nome completo'/>
              </div>
              <div className={styles.input_section}>
                <p className={styles.text}>Email</p>
                <input type="email" className={styles.input_box} placeholder='email'/>
              </div>
              <div className={styles.input_section}>
                <p className={styles.text}>Qual é o seu perfil de acesso?</p>
                <select className={styles.input_selection}>
                  <option value="nada" className={styles.selection_option}></option>
                  <option value="responsavel">Responsável</option>
                  <option value="professor">Professor</option>
                  <option value="profissionalSaude">Profissional da saúde</option>
                </select>
              </div>
              <div className={styles.input_section}>
                <p className={styles.text}>Senha</p>
                <input type="password" className={styles.input_box} placeholder='password'/>
              </div>
              <button className={styles.button}>Confirmar</button>
            </div>
          </div>
    </div>
    
  )
}

export default RegisterPage