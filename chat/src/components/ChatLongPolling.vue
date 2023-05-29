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
        :owner="!!m.owner"
      />
    </div>
    <div class="c-form">
      <ChatLongPollingForm @send-message="send"/>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import Message from '@/components/Message.vue'
import ChatLongPollingForm from '@/components/ChatLongPollingForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

const router = useRouter()
const store = useStore()
const messages = ref([])
// const userName = store.getters.getUserName
const lastMessageId = ref(0)
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const exit = () => {
  router.push('/')
  store.commit('clearData')
}

onMounted(() => {
  debugger
  getMessages()
})

const getMessages = () => {
  debugger
  axios.get('http://localhost:3000/messages', { params: { lastMessageId: lastMessageId.value }}, { cancelToken: source.token })
    .then(async response => {
      debugger
      const newMessages = await response.data
      if (newMessages.length > 0) {
        messages.value = [...messages.value, ...newMessages]
        lastMessageId.value = newMessages[newMessages.length - 1].id
      }
      getMessages() // рекурсивный вызов для длинного опроса
    })
    .catch(error => {
      console.log(error)
    })
}

const send = (data) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/messages',
    data: { text: data, owner: true },

  })
    .then(response => {
      // getMessages()
    })
    .catch(error => {
      console.log(error)
    })
}

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
