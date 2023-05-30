<template>
  <v-toolbar app>
    <v-btn @click="goBack">
      Назад
    </v-btn>
    <v-toolbar-title>Чат</v-toolbar-title>
  </v-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.go(-1)
}
</script>
