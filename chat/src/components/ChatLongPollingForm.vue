<template>
  <v-flex class="xs12">
    <v-text-field
      label="Введите сообщение"
      outline
      v-model="text"
      @keydown.enter="sendMessage"/>
  </v-flex>
</template>

<script setup>
// import axios from 'axios'
import { ref, defineEmits } from 'vue'

const text = ref('')
const emits = defineEmits(['send-message'])

const sendMessage = () => {
  emits('send-message', text.value)
  text.value = ''
  // axios.post('http://localhost:3000/messages', { text: text.value })
  //   .then(response => {
  //     text.value = ''
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
}
</script>
