<template>
  <div class="posts container">
<div class="columns is-multiline">
      <div v-for="post in posts" :post="post" :key="post.id" class="column is-one-quarter">
        <router-link :to="'/post/' + post.id">
          <PostCard :post="post" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import postService from '@/services/PostService';
import userService from '@/services/UserService';
import PostCard from '@/components/PostCard'; 
export default {
  name: 'PostsList',
  data () {
    return {
      posts: []
    }    
  }, 
  created() {
    this.getAllPosts().then(posts =>{
        this.posts = posts
      }
    )
  },
  methods: {
    async getAllPosts(){
      const posts = await postService.getAllPosts();
      for (const post of posts) {
          const user = await userService.getById(post.UserId);
          post.user = user;
          }
      return posts
    }
  },
  components : {
    PostCard
  },
}
</script>
<style lang="scss" scoped>
  .posts {
    margin-top: 100px;
    text-align: center;
  }
</style>