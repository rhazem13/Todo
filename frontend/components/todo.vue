<!-- components/Todo.vue -->
<template>
  <div v-if="todo" class="todo">
    <div>
      <a-checkbox :checked="todo.completed == 1" @change="toggleTodo" />
      <span
        v-if="!isEditing"
        @dblclick="startEditing"
        :class="{ completed: todo.completed }"
      >
        {{ todo.title }}
      </span>
      <input
        v-else
        v-model="editedTitle"
        ref="inputField"
        @input="adjustInputWidth"
        @blur="stopEditing"
        @keyup.enter="stopEditing"
      />
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
  data() {
    return {
      isEditing: false,
      editedTitle: "",
    };
  },
  methods: {
    async toggleTodo() {
      // Dispatch the toggleTodo action with the current todo
      await this.$store.dispatch("toggleTodo", this.todo);
    },
    async deleteTodo() {
      await this.$store.dispatch("deleteTodo", this.todo);
    },
    startEditing() {
      this.isEditing = true;
      this.editedTitle = this.todo.title;
      this.$nextTick(() => {
        // Focus the input field and adjust its width
        this.$refs.inputField.focus();
        this.adjustInputWidth();
      });
    },
    async stopEditing() {
      this.isEditing = false;
      // Dispatch an action to update the todo title in the store
      if (this.todo.title != this.editedTitle)
        await this.$store.dispatch("updateTodo", {
          todo: this.todo,
          title: this.editedTitle,
        });
    },
    adjustInputWidth() {
      // Set the width of the input to match the text content
      const inputField = this.$refs.inputField;
      inputField.style.width = `${inputField.scrollWidth}px`;
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

/* Ensure the input has a minimum width */
input {
  min-width: 50px;
  background-color: transparent;
  border: none;
  outline: none; /* Remove the default outline when focused */
}
</style>
