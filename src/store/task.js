import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
/* import todosService from "../services/todos.service"; */
import { setError } from "./errors";
const initialState = { entities: [], isLoading: true };

//метод, который будет обрабатывать все действия, связанные с задачами
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    create(state, action) {
      state.entities.push(action.payload);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { recived, update, remove, create, taskRequested, taskRequestedFailed } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();

    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};
export const taskCreated = () => async (dispatch, getState) => {
  try {
    const data = await todosService.post();
    dispatch(create(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export function titleChanged(id) {
  return update({ id, title: `new title for task ${id}` });
}
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export default taskReducer;
