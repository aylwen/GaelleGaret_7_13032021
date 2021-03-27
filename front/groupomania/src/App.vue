<template>
  <div id="app">
    <Nav />
    <Alert />
    <router-view/>
  </div>
</template>
<script>
import Nav from './components/partials/Nav.vue';
import Alert from './components/partials/Alert.vue';
export default {
  name: 'app',
  components: {
    Nav,
    Alert
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>