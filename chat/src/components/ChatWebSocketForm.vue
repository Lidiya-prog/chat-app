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
import axios from 'axios'
import { ref } from 'vue'
// import socket from '@/socket'
// import { useStore } from 'vuex'

const text = ref('')
// const store = useStore()
// const name = store.getters.getUserName

// const send = () => {
//   console.log('send')
//   socket.emit(
//     'createMessage',
//     {
//       text: text.value,
//       name: name
//     },
//     data => {
//       if (typeof data === 'string') {
//         console.error(data)
//       } else {
//         text.value = ''
//       }
//     })
// }

const sendMessage = () => {
  axios.post('http://localhost:3000/messages', { text: text.value })
    .then(response => {
      text.value = ''
    })
    .catch(error => {
      console.log(error)
    })
}
</script>
