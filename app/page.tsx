import styles from './page.module.css'
import Navbar from './Components/NavBar/navbar'
import Footer from './Components/Footer/footer'

export default function Home() {
  return (
    <main>
     <>
      <Navbar />
      <div className={styles.page}>
        <section id="home" className={styles.section}> 
          <h2>Home</h2>
          <p>Bem-vindo à página inicial.</p>
        </section>

        <section id="sobre" className={styles.section}>
          <h2>Sobre</h2>
          <p>Saiba mais sobre nós.</p>
        </section>

        <section id="contato" className={styles.section}>
          <h2>Contato</h2>
          <p>Entre em contato conosco.</p>
        </section>
      </div>
      <Footer/>
    </>
    </main>
  )
}
