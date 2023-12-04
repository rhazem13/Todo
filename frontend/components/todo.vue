<!-- components/Todo.vue -->
<template>
  <div v-if="todo" class="todo">
    <input type="checkbox"  :checked="todo.completed" @change="toggleTodo" />
    <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
  </div>
  <div v-else>
    <!-- Handle the case where todo is undefined or null -->
    Loading...
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  methods: {
    async toggleTodo() {
      // Dispatch the toggleTodo action with the current todo
      await this.$store.dispatch("toggleTodo", this.todo);
    },
  },
};
</script>

<style scoped>
.todo {
  margin-bottom: 8px;
}

.completed {
  text-decoration: line-through;
}
</style>
