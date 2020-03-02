<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/fibonacci">Fibonacci Grid</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss" src="@/styles/index.scss">

</style>
