import React, { useCallback, useEffect, useState } from "react";
import styles from "./TaskModal.module.css";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";
import DatePicker from "react-datepicker";
import moment from 'moment';

export default function TaskModal({
  list,
  task,
  setTask,
  open,
  closeModal,
  updateState,
}) {
  const [isNewTask, setIsNewTask] = useState(true);

  const submitChanges = useCallback(async () => {
    try {
      let response;
      if (isNewTask) {
        response = await api.post("/tasks", {
          ...task,
          task_list_id: list._id,
        });
      } else {
        response = await api.put(`/tasks/${task._id}`, task);
      }
      setTask(response.data);
      closeModal();
      updateState();
    } catch (err) {
      console.error(err);
    }
  }, [isNewTask, setTask, closeModal, updateState, task, list._id]);

  useEffect(() => {
    setIsNewTask(Object.keys(task).length === 0);
  }, [open]);

  return (
    <Modal
      className={styles.modal}
      isOpen={open}
      overlayClassName={styles.modal__overlay}
      onRequestClose={closeModal}
      style={{ content: { backgroundColor: "var(--pink)" } }}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldFocusAfterRender={false}
    >
      <AiOutlineClose
        onClick={closeModal}
        size={18}
        className={styles.modal__close}
      />
      <h2 className={styles.modal__title}>
        {isNewTask ? "Criar" : "Editar"} Tarefa
      </h2>
      <div className={styles.modal__field}>
        <span>Nome </span>
        <input
          value={task.name || ""}
          onChange={(event) => setTask({ ...task, name: event.target.value })}
        />
      </div>
      <div className={styles.modal__field}>
        <span>Período </span>
        <DatePicker
          placeholderText="DD/MM/YYYY"
          dateFormat="dd/MM/yyyy"
          className={styles.modal__datepicker__input}
          clearButtonClassName={styles.modal__datepicker__clear}
          startDate={task.start_date ? moment(task.start_date).toDate() : null}
          endDate={task.finish_date ? moment(task.finish_date).toDate() : null}
          onChange={(newRange) =>
            setTask({
              ...task,
              start_date: newRange[0],
              finish_date: newRange[1],
            })
          }
          selectsRange
          isClearable
        />
      </div>
      <div className={styles.modal__buttons}>
        <button
          className={styles.modal__button__submit}
          onClick={submitChanges}
        >
          Salvar
        </button>
        <button className={styles.modal__button__cancel} onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
