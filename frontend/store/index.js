// In the store/index.js file, we create a state, a mutation and an action for the todos
export const state = () => ({
  todos: [], // An empty array to store the todos
});

export const mutations = {
  // A mutation to set the state with the fetched todos
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  TOGGLE_TODO(state, updatedTodo) {
    updatedTodo.completed = !updatedTodo.completed;
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      // Update the todo in the state array
      state.todos.splice(index, 1, updatedTodo);
    }
  },
  ADD_TODO(state, todo) {
    console.log(todo);
    state.todos.push(todo);
  },
  DELETE_TODO(state, deletedtodo) {
    const index = state.todos.findIndex((todo) => todo.id === deletedtodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1);
    }
  },
  REORDER_TODOS(state, { oldIndex, newIndex }) {
    const todos = [...state.todos];
    const [movedTodo] = todos.splice(oldIndex, 1);
    todos.splice(newIndex, 0, movedTodo);
    state.todos = todos;
  },
};

export const actions = {
  // An action to fetch the todos from the endpoint and commit the mutation
  async fetchTodos({ commit }) {
    try {
      // Use axios to get the todos from the endpoint
      const response = await this.$axios.get("/todos");
      // Extract the data from the response
      const data = response.data.data;
      // Commit the mutation with the data
      commit("SET_TODOS", data);
    } catch (error) {
      // Handle the error if any
      console.error(error);
    }
  },

  async toggleTodo({ commit }, todo) {
    try {
      // Send a PATCH request to update the completion status
      const response = await this.$axios.patch(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });

      if (response.status === 200) {
        // If the response is successful, update the todo in the state
        commit("TOGGLE_TODO", todo);
      } else {
        console.error("Failed to update todo completion:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  },

  async addTodo({ commit }, todoTitle) {
    try {
      // Send a PATCH request to update the completion status
      const response = await this.$axios.post(`/todos`, {
        title: todoTitle,
        completed: false,
      });

      if (response.status === 201) {
        // If the response is successful, update the todo in the state
        commit("ADD_TODO", response.data.data);
      } else {
        console.error("Failed to update todo completion:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  },

  async deleteTodo({ commit }, todo) {
    try {
      // Send a PATCH request to update the completion status
      const response = await this.$axios.delete(`/todos/${todo.id}`);

      if (response.status === 200) {
        // If the response is successful, update the todo in the state
        commit("DELETE_TODO", todo);
      } else {
        console.error("Failed to update todo completion:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  },
};
