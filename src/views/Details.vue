<template>
  <div class="content">
    <Form
      :isRedirectedFromDetails="isRedirectedFromDetails"
      :isEditing="isEditing"
      :taskId="taskId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

//components
import Form from "@/components/Form.vue";

export default defineComponent({
  name: "details-page",
  components: { Form },
  mounted(): void {
    if (this.$route.params.id) {
      this.taskId = Number(this.$route.params.id);
    }
  },
  data() {
    return {
      isRedirectedFromDetails: true as boolean,
      isEditing: true as boolean,
      taskId: 0 as number
    }
  }
})
</script>

<style scoped>
.content {
  height: 100%;
  width: 100%;
  padding: 1rem;
}
</style>