<template>
<div class="home">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-3-mobile">
          Groupomania Forum 
        </h1>
        <div v-if="!status.loggedIn">
          <h2 class="subtitle is-size-4-mobile">
            Echangez et détendez-vous ! 
          </h2>
          <div class="button-block">
            <router-link to="/signup" class="button is-xl is-light is-size-4-mobile increase">Inscrivez-vous</router-link>
          </div>
        </div>
        <div v-if="status.loggedIn">
          <h2 v-if="!creation" class="subtitle is-size-4-mobile">
            Mon fil d'actualité
          </h2>
          <h2 v-if="creation" class="subtitle is-size-4-mobile">
            Nouveau post
          </h2>
        </div>
      </div>
    </div>
  </section>
  <section v-if="status.loggedIn && !creation" class="section2 pt-5">
    <div class="block has-text-centered">
      <button class="button is-xl is-dark is-size-5-mobile increase" @click="creation=true">
        <i class="fas fa-pen fa-fw fa-fw"></i>Ecrire un nouveau post
      </button>
    </div>
    <PostsList  :key="componentKey"/>
  </section>
  <section v-if="status.loggedIn && creation" class="pt-5">
    <CreatePost />
  </section>
</div>
</template>
<script>
import PostsList from '../components/PostsList';
import CreatePost from '../components/CreatePost';
import { mapState} from 'vuex'

export default {
  name: 'home',
  components: {
    PostsList, 
    CreatePost
  },
  data() {
    return {
      componentKey: 0,
      creation: false
    }
  },
  computed: {
      ...mapState("account", ['status'])
  }
}
</script>
<style lang="scss" scoped>
  .hero {    
    text-align: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    .button {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
  .section2 {
      background-color: #eaeaef;
  }
</style>