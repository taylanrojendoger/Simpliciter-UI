<template>
  <div>
    <div class="drawer" :style="{ right: isDrawerShown ? '0' : '-100%' }">
      <header class="header">
        <h3>Edit Task</h3>
        <button @click="closeDrawer">Close</button>
      </header>
      <div class="content">
        <Form
          :isRedirectedFromDetails="isRedirectedFromDetails"
          :isEditing="isEditing"
          :taskId="taskId"
        />
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
import Form from "@/components/Form.vue";

export default defineComponent({
  name: 'drawer',
  components: {
    Form,
  },
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(TaskStore, ["isDrawerShown"]),
  },
  data() {
    return {
      isRedirectedFromDetails: false as boolean,
      isEditing: true as boolean,
    }
  },
  methods: {
    ...mapActions(TaskStore, ["setIsDrawerShown"]),
    closeDrawer(): void {
      this.setIsDrawerShown(false);
    }
  }
})
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  width: 20%;
  background-color: rgb(245, 245, 245);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-out;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.header h3 {
  margin: 0;
}

.content {
  height: 100%;
  width: 100%;
  padding: 1rem;
}
</style>