<template>
<div class="c-wrap">
    <v-toolbar app>
      <v-btn @click="exit">
        Выйти
      </v-btn>
      <v-toolbar-title>Чат</v-toolbar-title>
    </v-toolbar>
    <div class="c-chat">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.name === userName"
      />
    </div>
    <div class="c-form">
      <ChatWebSocketForm/>
    </div>
  </div>
</template>
<script setup>
import Message from '@/components/Message.vue'
import ChatWebSocketForm from '@/components/ChatWebSocketForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import socket from '@/socket'

const router = useRouter()
const store = useStore()
const messages = store.getters.getMessages
const userName = store.getters.getUserName

const exit = () => {
  router.push('/')
  store.commit('clearData')
  socket.disconnect()
  // socket.emit('leftChat', () => {
  //   debugger;
  //
  // })
}

onMounted(() => {
  socket.connect()

  socket.emit('userJoin', userName, data => {
    if (typeof data === 'string') {
      console.error(data)
    } else {
      store.commit('setUser', userName.value)
      store.commit('setUserId', data.userId)
      router.push({ name: 'chat', params: { userName: userName.value } })
    }
  })
})

socket.on('newMessage', data => {
  if (data) {
    store.commit('addMessage', data)
  }
})

</script>

<style scoped>
.c-wrap {
  height: 100%;
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
