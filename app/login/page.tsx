import React from 'react'
import styles from './page.module.css'
import Navbar from '../Components/NavBar/navbar'
import Button, { ButtonColor } from '../Components/Button/button'
import Footer from '../Components/Footer/footer'
const LoginPage = () => {
  return (
    <div>
      <Navbar isHome = {false}/>
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
          <Button text='Confirmar' color={ButtonColor.Secondary}/>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default LoginPage