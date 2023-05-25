<template>
  <div>
    <div class="wrap">
      <div class="mes" :class="{owner}">
        <small>
          <strong>{{name}}</strong>
        </small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  text: String,
  owner: {
    type: Boolean,
    default: false
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.system {
  margin-bottom: 1rem;
  p {
    margin-bottom: 1rem;
  }
}
.wrap {
  display: flex;
  flex-direction: column;
}
.mes {
  padding: 1rem;
  width: 40%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  p {
    margin-bottom: 0;
  }
}
.owner {
  background: #f6f2f2;
  color: #000000;
  align-self: flex-end;
}
</style>
