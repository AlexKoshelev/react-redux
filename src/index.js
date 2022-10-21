import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();
const App = () => {
  const [state, setState] = useState(store.getState()); //получаем текущий стэйт
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
      console.log(store.getState());
    });
  }, []);

  const completedTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };
  const deletedTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>
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
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
