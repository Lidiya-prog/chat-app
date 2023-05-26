<template>
  <v-sheet max-width="300" class="mx-auto">
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        v-model="userName"
        label="User name"
      ></v-text-field>

      <v-btn
        type="submit"
        block
        class="mt-2"
        text="Submit"
      ></v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import socket from '@/socket'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const userName = ref('')
const store = useStore()

const submit = () => {
  socket.connect()

  socket.emit('userJoin', userName.value, data => {
    if (typeof data === 'string') {
      console.error(data)
    } else {
      store.commit('setUser', userName.value)
      store.commit('setUserId', data.userId)
      router.push({ name: 'chat', params: { userName: userName.value } })
    }
  })
}

socket.on('newMessage', data => {
  if (data) {
    store.commit('addMessage', data)
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
