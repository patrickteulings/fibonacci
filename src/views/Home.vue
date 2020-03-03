<template>
  <div class="home">
    <h1>Home Sweet Home</h1>
    <small>But you were probably looking for the <router-link to="/fibonacci">Fibonacci grid assignment</router-link>?</small>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home'
});
</script>
