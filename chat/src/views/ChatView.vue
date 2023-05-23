<template>
  <div class="c-wrap">
    <div class="c-chat">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
      />
    </div>
    <div class="c-form">
      <ChatForm/>
    </div>
  </div>
</template>
<script setup>
import Message from '@/components/Message.vue'
import ChatForm from '@/components/ChatForm.vue'

import { ref } from 'vue'

const messages = ref([
  {
    name: '1',
    text: 'hello'
  },
  {
    name: '2',
    text: 'hello'
  }
])

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
  background: #212121;
}
.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
