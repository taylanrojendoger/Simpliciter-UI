<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-body">
          <Form
            :isRedirectedFromDetails="isRedirectedFromDetails"
            :isEditing="isEditing"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>


<script lang="ts">
// Bu component Vue dökümantasyonundaki component örneklerinden alınarak ihtiyaçlara göre modifiye edilmiştir.
import { defineComponent } from '@vue/runtime-core'

//components
import Form from "@/components/Form.vue";
export default defineComponent({
  name: "modal",
  components: {
    Form
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      isRedirectedFromDetails: false as boolean,
      isEditing: false as boolean,
    }
  }
}) 
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>