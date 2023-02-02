<template>
  <div class="main">
    <div class="aside">
      <Teleport to="body">
        <modal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>Add Task</h3>
          </template>
        </modal>
      </Teleport>
      <div class="header">
        <div class="container">
          <button
            v-if="currentPath != '/list'"
            class="navigation-text"
            @click="navigate"
          >
            Navigate to Listing Page
          </button>
          <div v-else class="navigation-text">
            <p>You're viewing Listing Page</p>
          </div>
          <button class="add-button" @click="showModal = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-file-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"
              />
              <path
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="body">
        <router-view />
      </div>
      <div class="footer">
        <p class="footer-text">
          {{ footerText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

//pinia
import { mapState, mapActions } from "pinia";
import { TaskStore } from "@/stores/task";

//components
import Modal from '@/components/top-bar/Modal.vue'

export default defineComponent({
  name: "app",
  mounted(): void {
    this.setInitialTasks();
  },
  components: {
    Modal
  },
  computed: {
    ...mapState(TaskStore, ["isDrawerShown"]),
  },
  watch: {
    "$route"() {
      this.currentPath = this.$route.path;
      console.log(this.currentPath)
    }
  },
  data() {
    return {
      showModal: false as boolean,
      currentPath: "" as string,
      footerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deseruntmollit anim id est laborum." as string,
    };
  },
  methods: {
    ...mapActions(TaskStore, ["setInitialTasks"]),
    navigate(): void {
      this.$router.push("/list");
    },
  }
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  width: 100%;
  height: 10%;
  margin-bottom: 25px;
  border-bottom: 1px solid;
}
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.navigation-text {
  background-color: rgb(255, 255, 255);
  margin: 0px 0px 25px 0px;
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}

p {
  margin: 0px 0px 0px 5px;
  text-align: center;
}

.add-button {
  background-color: rgb(31, 202, 31);
  color: rgb(0, 0, 0);
  width: 100px;
  height: 100%;
  justify-content: flex-end;
}

button {
  cursor: pointer;
  text-align: center;
  border-bottom: none;
  border-top: none;
  border-left: none;
}

button:hover {
  background-color: #ddd;
}

.drawer {
  width: 100%;
  height: 10%;
}

.body {
  width: 100%;
  height: 80%;
}

.footer {
  width: 100%;
  height: 10%;
}

.footer-text {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.router-view {
  height: 100%;
  overflow-y: auto;
}
</style>
