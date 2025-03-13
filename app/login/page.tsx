import React from 'react'
import styles from './page.module.css'
import Navbar from '../Components/NavBar/navbar'
 

const LoginPage = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.page}>
      <div className={styles.login_container}>
        <p className={styles.header}>Bem-vindo!</p>
        <p className={styles.text}>Novo no site? <a href='/register' className={styles.link}>Registre-se</a></p>
        <div>
          <p className={styles.text}>Usuário</p>
          <input type='text' placeholder='username' className={styles.input_box}/>
        </div>
        <div>
          <p className={styles.text}>Senha</p>
          <input type='text' placeholder='password' className={styles.input_box}/>
        </div>
        <button className={styles.button}>Confirmar</button>
      </div>
    </div>
    </>
  )
}

export default LoginPage