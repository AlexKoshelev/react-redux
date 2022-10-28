import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import {
  completeTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  taskCreated,
  taskDeleted,
  titleChanged,
} from "./store/task";
import configureStore from "./store/store";
import { getError } from "./store/errors";

const store = configureStore();
const App = () => {
  //получаем текущий стэйт
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deletedTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) {
    return <h1>isLoading</h1>;
  }
  if (!isLoading && error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Выполнить задачу
            </button>
            <button onClick={() => changeTitle(el.id)}>
              Изменить заголовок
            </button>
            <button onClick={() => deletedTask(el.id)}>Удалить задачу</button>

            <hr></hr>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(taskCreated())}>Создать задачу</button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
