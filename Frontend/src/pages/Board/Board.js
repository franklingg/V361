import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Board.module.css';
import Logo from '../../assets/logo.png';
import Broken from '../../assets/broken.png';
import api from '../../services/api';
import { BsPlusLg } from 'react-icons/bs';
import { Footer, Loading, ListModal } from '../../components';

export default function Board(){
    const [ loading, setLoading ] = useState(true);
    const [ apiOn, setApiOn ] = useState(true);
    const [ lists, setLists ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ modalList, setModalList ] = useState();
    const listModalRef = useRef(null);
    
    const openNewTaskModal = useCallback(()=>{
        listModalRef.current?.portal.open();
        console.log(listModalRef.current);
    },[]);

    useEffect(()=>{
        const getInfo = async ()=> {
            const responseTags = await api.get('/tags');
            const responseLists = await api.get('/task_lists');
            setTags(responseTags.data);
            setLists(responseLists.data);
            console.info("Informações da API lidas e salvas");
        };

        api.get('/').then(()=>{
            setLoading(true);
            getInfo();
        }).catch(() => {
            setApiOn(false);
            console.error('API fora do ar.')
        }).finally( () => {
            setLoading(false);
        });
    }, []);
    
    return(
        <div className={styles.board}>
            <header className={styles.board__header}>
                <img src={Logo} alt="Logo da V361" className={styles.board__header__logo} />
                <h1 className={styles.board__header__title}>Meu Board de Tarefas</h1>
            </header>
            <main className={styles.board__main}>
                {
                    loading ? (
                        <Loading />
                    ) : !apiOn ? (
                        <div className={styles.board__main__off}>
                            <div className={styles.board__main__off__text}>
                                <h2>Eita!!</h2>
                                <p>
                                    Parece que sua conexão não pôde ser feita com nossa API. 
                                    Verifique sua conexão, atualize a página ou tente mais tarde.
                                </p>
                            </div>
                            <img src={Broken} alt="Sem conexão" />
                        </div>
                    ) : (
                        <div className={styles.board__main__on}>
                            {}
                            <button className={styles.board__main__add} onClick={openNewTaskModal}>
                                <BsPlusLg />
                            </button>
                        </div>
                    )
                }
            </main>
            <Footer color="var(--blue)" />
            <ListModal ref={listModalRef} task={modalList} />
        </div>
    );
}