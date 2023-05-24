<template>
  <v-flex class="xs12">
    <v-text-field label="Введите сообщение" outline v-model="text" @keydown.enter="send"/>
  </v-flex>
</template>

<script setup>
import { ref } from 'vue'
import socket from '@/socket'

const text = ref('')

const send = () => {
  console.log('send')
  socket.emit(
    "createMessage",
    {
      text: text.value,
    },
    data => {
      if (typeof data === "string") {
        console.error(data);
      } else {
        this.text = "";
      }
    })
}
</script>
