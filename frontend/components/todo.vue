<!-- components/Todo.vue -->
<template>
  <div v-if="todo" class="todo">
    <input type="checkbox" :checked="todo.completed" @change="toggleTodo" />
    <span :class="{ completed: todo.completed }"
      >{{ todo.title }}
      <a-button size="small" type="danger" @click="deleteTodo">
        <a-icon type="close" /> </a-button
    ></span>
  </div>
  <div v-else>
    <!-- Handle the case where todo is undefined or null -->
    Loading...
  </div>
</template>

<script>
import { Button, Icon } from "ant-design-vue";

export default {
  components: {
    "a-button": Button,
    "a-icon": Icon,
  },
  props: {
    todo: Object,
  },
  methods: {
    async toggleTodo() {
      // Dispatch the toggleTodo action with the current todo
      await this.$store.dispatch("toggleTodo", this.todo);
    },
    async deleteTodo() {
      await this.$store.dispatch("deleteTodo", this.todo);
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
