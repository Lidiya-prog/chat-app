<template>
  <v-layout full-height class="column justify-center align-center">
    <v-flex class="xs12 sm8">
      <v-card min-width="400">
        <v-card-title>
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <LoginForm/>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script setup>
import LoginForm from '@/components/LoginForm.vue'

</script>
