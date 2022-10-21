import { taskDeleted, taskUpdeated } from "./actionType";

//метод, который будет обрабатывать все действия, связанные с задачами
export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdeated: {
      const newArray = [...state]; //создаем новый массив из текущего состояния
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    case taskDeleted: {
      let newArray = [...state];
      console.log(newArray);
      return (newArray = newArray.filter((el) => el.id !== action.payload.id));
    }
    default:
      return state;
  }
}
