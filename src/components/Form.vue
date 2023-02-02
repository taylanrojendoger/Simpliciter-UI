<template>
  <div class="form-container">
    <form>
      <div>
        <label for="title">Title:</label>
      </div>
      <div>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="endDate">End Date:</label>
      </div>
      <div>
        <input type="date" id="endDate" v-model="endDate" />
      </div>
      <div>
        <label for="tags">Tags:</label>
      </div>
      <div>
        <select multiple v-model="selectedTags">
          <option v-for="(tag, index) in tags" :key="index" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>
      <div v-if="isRedirectedFromDetails">
        <label for="Description">Description:</label>
      </div>
      <div v-if="isRedirectedFromDetails">
        <input type="text" id="Description" v-model="description" />
      </div>
      <div>
        <button v-if="isEditing" type="submit" @click="edit">
          <span>Edit Task</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-check2"
              viewBox="0 0 15 15"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </span>
        </button>
        <button v-else type="submit" @click="save">
          <span>Add Task</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-check2"
              viewBox="0 0 15 15"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

//pinia
import { mapActions } from "pinia";
import { TaskStore } from "@/stores/task";
export default defineComponent({
  name: "edit-form",
  props: {
    isRedirectedFromDetails: {
      type: Boolean,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    taskId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      title: '' as string,
      description: '' as string,
      endDate: null,
      tags: ['A', 'B', 'C'] as string[],
      selectedTags: [] as string[]
    };
  },
  methods: {
    ...mapActions(TaskStore, ["editTask", "addTask"]),
    edit(): void {
      this.editTask(this.taskId, this.title, this.endDate, this.selectedTags);
    },
    save(): void {
      this.addTask(this.title, this.endDate, this.selectedTags, this.description);
    }
  }
})
</script>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;
}

form {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
}

div {
  width: 100%;
  font-size: 18px;
}

button {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: rgb(11, 158, 11);
  color: white;
  border: 1px solid #ddd;
}

button:hover {
  background-color: green;
}

span {
  padding: 3px;
  font-size: 15px;
}
</style>