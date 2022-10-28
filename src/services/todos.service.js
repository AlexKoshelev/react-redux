import httpService from "./http.service";
const todosEndpount = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpount, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
    return data;
  },
  post: async () => {
    const { data } = await httpService.post(todosEndpount, {
      title: "Task № " + Math.round(Math.random() * 200),
      completed: false,
      id: Math.round(Math.random() * 200),
    });

    return data;
  },
};
export default todosService;
