// In the store/index.js file, we create a state, a mutation and an action for the todos
export const state = () => ({
  todos: [], // An empty array to store the todos
});

export const mutations = {
  // A mutation to set the state with the fetched todos
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
};

export const actions = {
  // An action to fetch the todos from the endpoint and commit the mutation
  async fetchTodos({ commit }) {
    console.log('Fetching todos');
    try {
      // Use axios to get the todos from the endpoint
      const response = await this.$axios.get("/todos");
      console.log(response);
      // Extract the data from the response
      const data = response.data.data;
      // Commit the mutation with the data
      commit("SET_TODOS", data);
    } catch (error) {
      // Handle the error if any
      console.error(error);
    }
  },
};
