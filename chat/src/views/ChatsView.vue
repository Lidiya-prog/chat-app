<template>
  <div class="c-wrap">
    <h1>Выберите реализацию</h1>
    <ul>
      <li><router-link to="/ws">Web-socket</router-link></li>
      <li><router-link to="/long-polling">Long polling</router-link></li>
      <li><router-link to="/polling">Polling</router-link></li>
    </ul>
  </div>
</template>
