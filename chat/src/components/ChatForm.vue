<template>
  <v-flex class="xs12">
    <v-text-field label="Введите сообщение" outline v-model="text" @keydown.enter="send"/>
  </v-flex>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')

const send = () => {
  console.log('send')
}
</script>
