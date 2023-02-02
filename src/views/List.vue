<template>
  <Drawer :taskId="taskId" />
  <div class="filter-container">
    <input
      v-model="searchedTitle"
      class="search-input"
      type="text"
      placeholder="Search title..."
      @input="searchTitle"
    />
    <input
      style="margin-left: 20px"
      type="checkbox"
      id="checkbox"
      v-model="isShowCompletedSelected"
      @change="handleCheckbox"
    />
    <label for="checkbox">Only show completed tasks</label>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column }}
            <button
              v-if="column.length > 0 && column == 'State'"
              class="up-down-button"
              @click="sortByFilter()"
            >
              <svg
                v-if="isClicked"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tempTasks" :key="task.id">
          <td>
            <a :href="'details/' + task.id">{{ task.id }}</a>
          </td>
          <td>{{ task.title }}</td>
          <td>{{ task.tags }}</td>
          <td>{{ task.endDate }}</td>
          <td>{{ task.state }}</td>
          <td>{{ task.description }}</td>
          <td>
            <button class="edit-button" @click="openDrawer(task.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

//pinia
import { mapState, mapActions } from "pinia";
import { TaskStore } from "@/stores/task";

//types
import type Task from '@/types/task'

//components
import Drawer from "@/components/body/Drawer.vue";

export default defineComponent({
  name: "listing-page",
  components: {
    Drawer
  },
  mounted(): void {
    this.tempTasks = this.tasks;
  },
  computed: {
    ...mapState(TaskStore, ["tasks"]),
  },
  data() {
    return {
      isShowCompletedSelected: false as boolean,
      isClicked: true as boolean,
      taskId: 0 as number,
      searchedTitle: "" as string,
      tempTasks: [] as Array<Task>,
      columns: ["ID", "Title", "Tags", "End Date", "State", "Description", ""] as string[],
    }
  },
  methods: {
    ...mapActions(TaskStore, ["setInitialTasks", "setIsDrawerShown"]),
    openDrawer(taskId: number): void {
      this.taskId = taskId;
      this.setIsDrawerShown(true);
    },
    searchTitle(): void {
      this.tempTasks = this.tasks.filter(t => t.title.toLowerCase().includes(this.searchedTitle));
    },
    handleCheckbox(): void {
      if (this.isShowCompletedSelected) {
        this.tempTasks = this.tasks.filter(t => t.state == "Completed");
      } else {
        this.searchTitle();
      }
    },
    sortByFilter(): void {
      this.isClicked = !this.isClicked;
      this.tempTasks.sort((a, b) => this.isClicked ? a.state.localeCompare(b.state) : b.state.localeCompare(a.state));
    }
  }
})
</script>

<style scoped>
.filter-container {
  width: 100%;
  height: 30px;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 20%;
  height: 100%;
  font-size: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgb(0, 0, 0);
  padding: 8px;
  text-align: left;
  font-size: 16px;
}

th {
  background-color: rgb(238, 238, 238);
}

.up-down-button {
  display: flex;
  flex-direction: column;
  float: right;
}

.edit-button {
  margin: auto;
  display: block;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #ddd;
}
</style>