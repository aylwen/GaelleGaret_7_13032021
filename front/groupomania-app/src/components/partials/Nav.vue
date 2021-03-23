<template>
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="../../assets/icon-left-font-monochrome-black.svg"/>
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/about" class="navbar-item">About</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
        <router-link v-show="!status.loggedIn" to="/login" class="button is-dark">Connexion</router-link>
        <router-link v-show="status.loggedIn" to="/me" class="button is-dark">Mon profil</router-link>
        <button v-show="status.loggedIn" class="button is-dark" @click="disconnect">Déconnexion</button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import router from "@/router"
export default {
  name: 'Nav',
  data() {
    return {
    }
  },
  computed: {
      ...mapState("account", ['status', 'user'])
  },
  methods: {
      ...mapActions("account", ['logout']),
      disconnect() {
        this.logout()
        router.push('/');
    }
  }
}
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    a, button{
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #d88d00;
      }
    }  
  } 
</style>