<template>
<div class="c-wrap">
    <div class="c-chat">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="!!m.owner"
      />
    </div>
    <div class="c-form">
      <ChatWebSocketForm @send-message="send"/>
    </div>
  </div>
</template>
<script setup>
import Message from '@/components/Message.vue'
import ChatWebSocketForm from '@/components/ChatWebSocketForm.vue'
import { onMounted, ref, defineProps } from 'vue'
import socket from '@/socket'

const messages = ref([])
const props = defineProps({
  name: String
})

onMounted(() => {
  socket.connect()

  socket.emit('userJoin', props.name, data => {
    if (typeof data === 'string') {
      console.error(data)
    }
  })
})

socket.on('newMessage', data => {
  if (data) {
    messages.value = [...messages.value, data]
  }
})

const send = (text) => {
  debugger
  socket.emit(
    'createMessage',
    {
      text: text,
      owner: true,
      name: props.name
    },
    data => {
      if (typeof data === 'string') {
        console.error(data)
      }
    })
}
</script>

<style scoped>
.c-wrap {
  height: calc(100% - 64px);
  position: relative;
  overflow: hidden;
}
.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  /*background: #212121;*/
}
.c-chat {
  padding: 1rem;
  overflow-y: auto;
  height: 80%;
}
</style>
