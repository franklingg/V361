import React, { useCallback, useEffect, useState } from 'react';
import styles from './ListModal.module.css';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../../services/api';

const ListModal = ({list, setList, open, closeModal, updateState}) => {

    const [isNewList, setIsNewList] = useState(true);

    const submitChanges = useCallback(async () => {
        try{
            let response;
            if(isNewList){
                response = await api.post('/task_lists', list );
            } else {
                response = await api.put(`/task_lists/${list._id}`, list );
            }
            setList(response.data);
            closeModal();
            updateState();
        } catch(err){
            console.error(err);
        }
    }, [closeModal, isNewList, list, setList, updateState]);

    useEffect(()=>{
        setIsNewList(Object.keys(list).length === 0);
        if(isNewList) setList({color: "#f16775"});
    }, [open]);

    return (
        <Modal
            className={styles.modal}
            isOpen={open}
            overlayClassName={styles.modal__overlay}
            onRequestClose={closeModal}
            style={{content: {backgroundColor: 'color' in list ? list.color : "var(--pink)"}}}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <AiOutlineClose onClick={closeModal} size={18} className={styles.modal__close} />
            <h2 className={styles.modal__title}>
                {isNewList ? "Criar" : "Editar"} Lista de Tarefas
            </h2>
            <div className={styles.modal__field}>
                <span>Nome </span>
                <input maxLength={14} value={list.name || ""} onChange={(event)=>setList({...list, name:event.target.value})} />
            </div>
            <div className={styles.modal__field}>
                <span>Cor </span>
                <input maxLength={7} value={list.color} onChange={(event)=>setList({...list, color:event.target.value})} />
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
};

export default ListModal;