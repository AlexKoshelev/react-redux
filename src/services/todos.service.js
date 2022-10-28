import httpService from "./http.service";
const todosEndpount = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpount, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
};
export default todosService;
