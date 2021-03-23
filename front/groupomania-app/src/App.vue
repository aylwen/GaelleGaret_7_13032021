<template>
  <div id="app">
    <Nav />
    <div v-show="alert.message" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div :class="alert.type" class="message">
          <div class="message-header">
            <p v-if="alert.type=='is-danger'">Erreur</p>
            <p v-if="alert.type=='is-success'">Succès</p>
            <button class="delete" aria-label="delete" @click="clearAlert"></button>
          </div>
          <div class="message-body">
            {{alert.message}}
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Nav from './components/partials/Nav.vue';
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Nav
  },
  computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
  methods: {
      ...mapActions({
          clearAlert: 'alert/clear' 
      })
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