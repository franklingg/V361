import React, { useCallback, useState } from 'react';
import styles from './ListModal.module.css';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../../services/api';

const ListModal = React.forwardRef((props, ref) => {

    const [ list, setList ] = useState(props.list || {});

    const closeModal = useCallback(() => {
        setList({});
        ref.current?.portal.close();
    }, [ref]);

    const submitChanges = useCallback(async () => {
        try{
            if(!props.list){
                await api.post('/task_lists', list );
            } else {
                await api.put('/task_lists', list );
            }
            closeModal();
        } catch(err){
            console.error(err);
        }
    }, [closeModal, list.name, props.list]);

    return (
        <Modal
            ref={ref}
            className={styles.modal}
            overlayClassName={styles.modal__overlay}
            onRequestClose={closeModal}
            style={{content: {backgroundColor: props.list ? list.color : "var(--pink)"}}}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <AiOutlineClose onClick={closeModal} size={18} className={styles.modal__close} />
            <h2 className={styles.modal__title}>
                {!Object.keys(list).length ? "Criar" : "Editar"} Lista de Tarefas
            </h2>
            <div className={styles.modal__field}>
                <span>Nome </span>
                <input value={list.name || ""} onChange={(event)=>setList({...list, name:event.target.value})} />
            </div>
            <div className={styles.modal__field}>
                <span>Cor </span>
                <input value={list.color || "#FFF"} onChange={(event)=>setList({...list, name:event.target.value})} />
            </div>
            <div className={styles.modal__buttons}>
                <button className={styles.modal__button__submit} onClick={submitChanges}>
                    Salvar
                </button>
                <button className={styles.modal__button__cancel} onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </Modal>
    );
});

export default ListModal;