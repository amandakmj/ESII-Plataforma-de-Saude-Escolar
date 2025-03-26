import styles from './page.module.css'
import Navbar from './Componentes/NavBar/navbar'
import Footer from './Componentes/Footer/footer'

export default function Home() {
  return (
    <main>
     <>
      <Navbar />
      <div className={styles.page}>

        {/* Seção Home */}
        <section id="home" className={styles.section}>
          <div className={styles.container}>
            <img src="/images/saude-inicial.svg" alt="Médicos conversando" className={styles.image} />
            <div className={styles.text}>
              <h2>Bem-vindo(a) à HealthSchool!</h2>
            </div>
          </div>
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.text}>
              <h2>Sobre</h2>
              <p>A HealthSchool foi criada para ajudar você a gerenciar e monitorar o estado de saúde dos alunos e sua progressão.</p>
            </div>
            <img src="/images/saude-sobre.svg" alt="Médica analisando exames" className={styles.image} />
          </div>
        </section>

        {/* Seção Contato */}
        <section id="contato" className={styles.section}>
          <div className={styles.container}>
            <img src="/images/saude-contato.svg" alt="Pessoa segurando smartphone" className={styles.image} />
            <div className={styles.text}>
              <h2>Contato</h2>
              <p>Tem alguma dúvida, sugestão ou precisa de suporte? Nossa equipe está pronta para ajudar!</p>
              <p><strong>Informações:</strong></p>
              <p>Email: HealthSchoolSuporte@hotmail.com</p>
              <p>WhatsApp: 82 2935-3310</p>
              <p>Horário de atendimento: segunda à sexta-feira, de 8h às 17h</p>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </>
    </main>
  )
}
