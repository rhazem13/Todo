<!-- components/Todo.vue -->
<template>
  <div v-if="todo" class="todo">
    <div>
      <a-checkbox  :checked="todo.completed==1" @change="toggleTodo" />
      <span :class="{ completed: todo.completed }">
        {{ todo.title }}
      </span>
    </div>
    <a-button size="small" type="danger" @click="deleteTodo">
      <a-icon type="delete" />
    </a-button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: rgb(240, 240, 240);
  padding: 8px;
  border: 1px solid rgb(198, 198, 198);
  border-radius: 8px;
}

.completed {
  text-decoration: line-through;
}
</style>
