<template>
    <component :is="tab"/>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, defineAsyncComponent } from 'vue'

const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

const ChatWebSocket = defineAsyncComponent(() =>
  import('@/components/ChatWebSocket')
)
const ChatLongPolling = defineAsyncComponent(() =>
  import('@/components/ChatLongPolling')
)
const ChatPolling = defineAsyncComponent(() =>
  import('@/components/ChatPolling')
)

const tab = ref(null)

function getTab () {
  if (currentRoute === '/ws') {
    tab.value = ChatWebSocket
  }
  if (currentRoute === '/long-polling') {
    tab.value = ChatLongPolling
  }
  tab.value = ChatPolling
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
