<template>
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="../../assets/icon-left-font-monochrome-black.svg"/>
    </router-link>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbar" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/about" class="navbar-item">About</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
        <router-link v-show="!status.loggedIn" to="/login" class="button is-dark">Connexion</router-link>
        <router-link v-show="status.loggedIn" to="/me" class="button is-dark">Mon profil</router-link>
        <button v-show="status.loggedIn" class="button is-dark-invert" @click="disconnect">Déconnexion</button>
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
      isOpen: false
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
    }  
  } 
</style>