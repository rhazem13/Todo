<template>
  <div class="todo-page">
    <h1>Your Todo List</h1><Icon name="uil:github" color="black" />
    <a-row type="flex" align="middle" justify="center">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <a-input-group class="inputgroup" compact>
          <a-input
            v-model="newtodotitle"
            placeholder="Create new task"
            style="width: calc(100% - 60px)"
          />
          <a-button type="primary" @click="addTodo">Add</a-button>
        </a-input-group>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" justify="center">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div v-for="todo in todos" :key="todo.id">
          <Todo :todo="todo" />
        </div>
      </a-col>
    </a-row>
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
  methods: {
    async addTodo() {
      // Dispatch the toggleTodo action with the current todo
      if (this.newtodotitle != undefined && this.newtodotitle != "")
        await this.$store.dispatch("addTodo", this.newtodotitle);
      this.newtodotitle = undefined;
    },
  },
  data() {
    return {
      newtodotitle: "",
    };
  },
};
</script>

<style>
/* Add some styles for the page */
.todo-page {
  margin: 20px;
}

.todo-page h1 {
  margin-top: 40px;
  text-align: center;
}
.inputgroup{
  margin-bottom: 20px;
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
