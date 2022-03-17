import React, { useCallback, useState } from 'react';
import styles from './TaskModal.module.css';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../../services/api';

const TaskModal = React.forwardRef((props, ref) => {

    const [ task, setTask ] = useState(props.task || {});

    const closeModal = useCallback(() => {
        setTask({});
        ref.current?.portal.close();
    }, [ref]);

    const submitChanges = useCallback(async () => {
        try{
            if(!props.task){
                await api.post('/tasks', task );
            } else {
                await api.put('/tasks', task );
            }
            closeModal();
        } catch(err){
            console.error(err);
        }
    }, [props.task, closeModal, task]);

    return (
        <Modal
            ref={ref}
            className={styles.modal}
            overlayClassName={styles.modal__overlay}
            onRequestClose={closeModal}
            style={{content: {backgroundColor: props.task ? task.color : "var(--pink)"}}}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <AiOutlineClose onClick={closeModal} size={18} className={styles.modal__close} />
            <h2 className={styles.modal__title}>
                {!Object.keys(task).length ? "Criar" : "Editar"} Taska de Tarefas
            </h2>
            <div className={styles.modal__field}>
                <span>Nome </span>
                <input value={task.name || ""} onChange={(event)=>setTask({...task, name:event.target.value})} />
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

export default TaskModal;