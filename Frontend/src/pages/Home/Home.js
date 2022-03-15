
import styles from './home.module.css';

export default function Home(){
    return(
        <div className={styles.home}>
            <section className={styles.home__info}>
                <h1>Seja bem-vindo ao V361</h1>
                <p>
                    Aqui você poderá gerenciar suas listas de tarefas de forma 
                    simplificada e dinâmica. Venha conhecer esta nova ferramenta
                    e melhore seu gerenciamento de tempo e esforço imediatamente!
                </p>
                <button>Vamos lá?!</button>
            </section>
            <section className={styles.home__banner}>
                <img></img>
            </section>
        </div>
    )
};