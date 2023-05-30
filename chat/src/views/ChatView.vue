<template>
  <Toolbar/>
  <component :is="tab"/>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, defineAsyncComponent } from 'vue'
import Toolbar from '@/components/Toolbar'

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
    return
  }
  if (currentRoute === '/long-polling') {
    tab.value = ChatLongPolling
    return
  }
  tab.value = ChatPolling
}
getTab()
</script>
