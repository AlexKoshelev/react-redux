import * as actionsTypes from "./actionType";

export function taskCompleted(id) {
  return {
    type: actionsTypes.taskUpdeated,
    payload: { id, completed: true },
  };
}
export function titleChanged(id) {
  return {
    type: actionsTypes.taskUpdeated,
    payload: { id, title: `new title for task ${id}` },
  };
}
export function taskDeleted(id) {
  return {
    type: actionsTypes.taskDeleted,
    payload: { id },
  };
}
