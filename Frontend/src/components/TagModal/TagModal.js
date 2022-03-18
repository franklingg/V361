import React, { useCallback, useEffect, useState } from "react";
import styles from "./TagModal.module.css";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";

export default function TagModal({ open, closeModal, updateState }) {
  const [tag, setTag] = useState({});

  const submitChanges = useCallback(async () => {
    try {
      await api.post("/tags", tag);
      closeModal();
      updateState();
    } catch (err) {
      console.error(err);
    }
  }, [tag, closeModal, updateState]);

  useEffect(() => {
    setTag({ color: "#000", textColor: "#FFF" });
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
      <h2 className={styles.modal__title}>Criar Tag</h2>
      <div className={styles.modal__field}>
        <span>Título </span>
        <input
          value={tag.title || ""}
          onChange={(event) => setTag({ ...tag, title: event.target.value })}
        />
      </div>
      <div className={styles.modal__tagColor}>
        <div className={styles.modal__field}>
          <span>Cor </span>
          <input
            maxLength={7}
            value={tag.color}
            onChange={(event) => setTag({ ...tag, color: event.target.value })}
          />
        </div>
        <div className={styles.modal__field}>
          <span>Cor do Texto </span>
          <input
            maxLength={7}
            value={tag.textColor}
            onChange={(event) => setTag({ ...tag, textColor: event.target.value })}
          />
        </div>
      </div>
      <div className={styles.modal__field}>
        <span>Resultado: </span>
        <div
          className={styles.modal__tag}
          style={{ backgroundColor: tag.color, color: tag.textColor }}
        >
          {tag.title || "[Título]"}
        </div>
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
