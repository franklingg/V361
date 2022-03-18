import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Logo from '../../assets/logo.png';
import Banner from '../../assets/banner.png';
import { Footer } from '../../components';

export default function Home(){

    return(
        <div className={styles.home}>
            <header className={styles.home__logo}>
                <img src={Logo} alt="Logo da V361" />
            </header>
            <section className={styles.home__info}>
                <div className={styles.home__text}>
                    <h2>Bem-Vindo!</h2>
                    <p>
                        V361 é uma nova solução para facilitar o seu gerenciamento
                        de tarefas e listas de tarefas. Descubra mais sobre esta ferramenta 
                        e veja sua produtividade aumentar consideravelmente.
                    </p>
                    <Link className={styles.home__link} to="/board">Vamos começar?!</Link>
                </div>
                <div className={styles.home__banner}>
                    <img src={Banner} alt="Banner da página inicial" />
                </div>
            </section>
            <Footer color="var(--gray)" />
        </div>
    );
}