export function createStore(reducer, initialState) {
  let state = initialState; //глобальное состояние, которое хранит все данные в приложении (приватная переменная, которую изменять мы не можем)
  const listeners = []; //наблюдатели
  // метод, возвращающий текущее состояние
  function getState() {
    return state;
  }
  //метод для обновления состояния
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i <= listeners.length; i++) {
      const listener = listeners[i]; // каждый из слушателей это функция
      return listener();
    }
  }
  //метод для добавления слушателей, чтобы получать обновление состояния
  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}
