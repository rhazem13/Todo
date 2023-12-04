<template>
  <div class="todo-page">
    <h1>Your Todo List</h1>
    <div v-for="todo in todos" :key="todo.id">
      <Todo :todo="todo" />
    </div>
  </div>
</template>

<script>
import Todo from "@/components/todo.vue";

export default {
  // Use the fetch hook to call the action before rendering the page
  async fetch() {
    await this.$store.dispatch("fetchTodos");
  },
  // Use a computed property to get the todos from the state
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  components: {
    Todo,
  },
};
</script>

<style>
/* Add some styles for the page */
.todo-page {
  margin: 20px;
}

.todo-page h1 {
  text-align: center;
}

.todo-page ul {
  list-style: none;
  padding: 0;
}

.todo-page li {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  border: 1px solid black;
  padding: 10px;
}
</style>
