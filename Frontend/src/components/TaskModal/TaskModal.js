import React, { useCallback, useEffect, useState } from "react";
import styles from "./TaskModal.module.css";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import Select from 'react-select';

export default function TaskModal({
  list,
  task,
  tags,
  setTask,
  open,
  closeModal,
  updateState,
}) {
  const [isNewTask, setIsNewTask] = useState(true);

  const submitChanges = useCallback(async () => {
    try {
      let response;
      const tags = task.tags || [];
      setTask(old => {
        delete old['tags'];
        return old;
      })
      if (isNewTask) {
        response = await api.post("/tasks", {
          ...task,
          task_list_id: list._id,
        });
      } else {
        response = await api.put(`/tasks/${task._id}`, task);
      }
      response = await api.put(`/tasks/${response.data._id}/tags`, {tags});
      setTask(response.data);
      closeModal();
      updateState();
    } catch (err) {
      console.error(err);
    }
  }, [list.tags, list._id, setTask, isNewTask, closeModal, updateState, task]);

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
      <div className={styles.modal__field}>
        <span>Tags </span>
        <Select
          options={tags.map(tag => ({value: tag.title, label: tag.title, text: tag.textColor, bg: tag.color }))}
          defaultValue={task.tags?.length && task.tags.map(tag => ({value: tag.title, label: tag.title, text: tag.textColor, bg: tag.color }))}
          placeholder="Selecione..."
          noOptionsMessage={() => <span>Sem Tags</span>}
          styles={{option: (provided, state)=> ({...provided, color: state.data.text, backgroundColor: state.data.bg})}}
          onChange={(selectedTags)=> setTask({...task, tags: selectedTags.map(tag => tag.value)})}
          isMulti
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
