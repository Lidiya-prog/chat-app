<template>
  <v-flex class="xs12">
    <v-text-field
      label="Введите сообщение"
      outline
      v-model="text"
      @keydown.enter="send"/>
  </v-flex>
</template>

<script setup>
import { ref } from 'vue'
import socket from '@/socket'
import { useStore } from 'vuex'

const text = ref('')
const store = useStore()
const name = store.getters.getUserName

const send = () => {
  console.log('send')
  socket.emit(
    'createMessage',
    {
      text: text.value,
      name: name
    },
    data => {
      if (typeof data === 'string') {
        console.error(data)
      } else {
        text.value = ''
      }
    })
}
</script>
