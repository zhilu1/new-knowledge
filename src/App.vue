<template>
  <DemoPage msg="Welcome to Your Vue.js App"/>
</template>

<script>
import DemoPage from './components/DemoPage.vue'

export default {
  name: 'App',
  components: {
    DemoPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
