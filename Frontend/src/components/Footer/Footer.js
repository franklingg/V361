import styles from './Footer.module.css';

export default function Footer({ color}){

    return(
        <footer className={styles.footer} style={{backgroundColor: color }}>
            <a href="https://storyset.com/online" target="_blank" rel="noreferrer">
                Online illustrations by Storyset
            </a>
            <span>Franklin Regis ® 2022</span>
        </footer>
    );
}