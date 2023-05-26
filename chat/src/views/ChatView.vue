<template>
    <component :is="tab" />
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ChatWebSocket from '@/components/ChatWebSocket'

const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

const tab = ref(null)

function getTab () {
  if (currentRoute === '/ws') {
    tab.value = ChatWebSocket
  }
  if (currentRoute === '/long-polling') {
    tab.value = ChatWebSocket
  }
  tab.value = ChatWebSocket
}
getTab()
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
