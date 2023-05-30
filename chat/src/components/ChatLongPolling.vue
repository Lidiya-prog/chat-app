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
      <ChatLongPollingForm @send-message="send"/>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import Message from '@/components/Message.vue'
import ChatLongPollingForm from '@/components/ChatLongPollingForm.vue'
import { ref, onMounted, defineProps } from 'vue'

const messages = ref([])
const lastMessageId = ref(0)
const props = defineProps({
  name: String
})
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
//
// const exit = () => {
//   router.go(-1)
//   store.commit('clearData')
// }

onMounted(() => {
  getMessages()
})

const getMessages = () => {
  axios.get('http://localhost:3000/messages',
    { params: { lastMessageId: lastMessageId.value } }
    // { cancelToken: source.token }
  )
    .then(async response => {
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
    data: { text: data, owner: true, name: props.name }
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
