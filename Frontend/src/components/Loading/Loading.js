import styles from "./Loading.module.css";
import ReactLoading from 'react-loading';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <ReactLoading type="spinningBubbles" className={styles.loading__spinner} />
            <span className={styles.loading__info}>Estamos buscando suas tarefas...</span>
        </div>
    );
}
