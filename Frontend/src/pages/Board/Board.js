import { useState, useCallback, useEffect } from "react";
import styles from "./Board.module.css";
import Logo from "../../assets/logo.png";
import Broken from "../../assets/broken.png";
import api from "../../services/api";
import moment from "moment";
import { BsPlusLg } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiFillPushpin,
  AiOutlinePushpin,
  AiOutlineAppstoreAdd
} from "react-icons/ai";
import { Form, ProgressBar } from "react-bootstrap";
import { Footer, Loading, ListModal, TaskModal, TagModal } from "../../components";

export default function Board() {
  const [loading, setLoading] = useState(true);
  const [apiOn, setApiOn] = useState(true);
  const [lists, setLists] = useState([]);
  const [fixedLists, setFixedLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [openListModal, setOpenListModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [listModal, setListModal] = useState({});
  const [taskModal, setTaskModal] = useState({});

  const openModalList = useCallback((list = {}) => {
    setListModal(list);
    setOpenListModal(true);
  }, []);

  const openModalTask = useCallback((list, task = {}) => {
    setListModal(list);
    setTaskModal(task);
    setOpenTaskModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setListModal({});
    setTaskModal({});
    setOpenListModal(false);
    setOpenTaskModal(false);
    setOpenTagModal(false);
  }, []);

  const updateState = useCallback(() => {
    const getInfo = async () => {
      const responseTags = await api.get("/tags");
      const responseLists = await api.get("/task_lists");
      setTags(responseTags.data);
      setLists(responseLists.data);
      console.info("Informações da API lidas e salvas");
    };

    api
      .get("/")
      .then(() => {
        setLoading(true);
        getInfo();
      })
      .catch(() => {
        setApiOn(false);
        console.error("API fora do ar.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteList = useCallback(
    async (deleteList) => {
      await api.delete(`/task_lists/${deleteList._id}`);
      updateState();
    },
    [updateState]
  );

  const deleteTask = useCallback(
    async (deleteTask) => {
      await api.delete(`/tasks/${deleteTask._id}`);
      updateState();
    },
    [updateState]
  );

  const markTask = useCallback(
    async (task, mark) => {
      await api.patch(`/tasks/${task._id}/${mark ? "done" : "not_done"}`);
      updateState();
    },
    [updateState]
  );

  const pinList = useCallback(
    (list) => {
      setFixedLists([...fixedLists, list._id]);
    },
    [fixedLists]
  );

  const unpinList = useCallback(
    (list) => {
      setFixedLists(fixedLists.filter((listId) => listId !== list._id));
    },
    [fixedLists]
  );

  const sortLists = useCallback(() => {
    const fixed = fixedLists.map((fixedId) =>
      lists.find((list) => list._id === fixedId)
    );
    const notFixed = lists.filter((list) => !fixed.includes(list));
    return [...fixed, ...notFixed];
  }, [fixedLists, lists]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  return (
    <div className={styles.board}>
      <header className={styles.board__header}>
        <img
          src={Logo}
          alt="Logo da V361"
          className={styles.board__header__logo}
        />
        <h1 className={styles.board__header__title}>Meu Board de Tarefas</h1>
        {apiOn && <button className={styles.board__header__tags} onClick={()=>setOpenTagModal(true)}> <AiOutlineAppstoreAdd size={18} /> Tags</button>}
      </header>
      <main className={styles.board__main}>
        {loading ? (
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
            {sortLists().map((list) => {
              const percentDone =
                (100 *
                  list.tasks.reduce(
                    (sum, task) => sum + (task.done ? 1 : 0),
                    0
                  )) /
                list.tasks.length;
              return (
                <div
                  className={styles.board__card}
                  style={{ backgroundColor: list.color }}
                >
                  {fixedLists.includes(list._id) ? (
                    <AiFillPushpin
                      size={20}
                      className={styles.board__card__pin}
                      onClick={() => {
                        unpinList(list);
                      }}
                    />
                  ) : (
                    <AiOutlinePushpin
                      size={20}
                      className={styles.board__card__pin}
                      onClick={() => {
                        pinList(list);
                      }}
                    />
                  )}
                  <AiOutlineEdit
                    size={20}
                    className={styles.board__card__edit}
                    onClick={() => {
                      openModalList(list);
                    }}
                  />
                  <AiOutlineDelete
                    size={20}
                    className={styles.board__card__delete}
                    onClick={() => {
                      deleteList(list);
                    }}
                  />
                  <h3>{list.name}</h3>
                  {list.tasks?.map((task) => (
                    <div className={styles.board__card__task}>
                      <Form.Check
                        type="checkbox"
                        checked={task.done}
                        onChange={(e) => {
                          markTask(task, e.target.checked);
                        }}
                      />
                      <span>{`${task.name}${
                        task.start_date
                          ? ": " +
                            moment(task.start_date).format("DD/MM") +
                            " - " +
                            moment(task.finish_date).format("DD/MM")
                          : ""
                      }`}</span>
                      <AiOutlineEdit
                        size={16}
                        className={styles.board__task__edit}
                        onClick={() => {
                          openModalTask(list, task);
                        }}
                      />
                      <AiOutlineDelete
                        size={16}
                        onClick={() => {
                          deleteTask(task);
                        }}
                      />
                    </div>
                  ))}
                  <AiOutlinePlusCircle
                    size={27}
                    className={styles.board__card__add}
                    onClick={() => {
                      openModalTask(list);
                    }}
                  />
                  <ProgressBar
                    now={percentDone}
                    variant="success"
                    label={percentDone ? `${percentDone}%` : ""}
                    className={styles.board__card__progress}
                  />
                </div>
              );
            })}
            <button
              className={styles.board__main__add}
              onClick={() => {
                openModalList();
              }}
            >
              <BsPlusLg />
            </button>
          </div>
        )}
      </main>
      <Footer color="var(--blue)" />
      <ListModal
        open={openListModal}
        closeModal={closeModal}
        list={listModal}
        setList={setListModal}
        updateState={updateState}
      />
      <TaskModal
        open={openTaskModal}
        closeModal={closeModal}
        list={listModal}
        task={taskModal}
        tags={tags}
        setTask={setTaskModal}
        updateState={updateState}
      />
      <TagModal
        open={openTagModal}
        closeModal={closeModal}
        updateState={updateState}
      />
    </div>
  );
}
