<template>
  <div class="post-single">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{post.user.firstName}} {{post.user.lastName}}
          </h1>
          <h2 class="subtitle ">
            @{{post.user.username}}
          </h2>
        </div>
      </div>
    </section>
    <section class="post-content">
      <div class="container mx-3">
        <div class="columns is-centered">
        <div class="column is-5-tablet is-6-desktop is-4-widescreen">
          <div class="post-card">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src=post.imageUrl alt="Placeholder image" />
                  <button v-show="user.id==post.UserId || user.isAdmin" class="delete is-large has-background-danger front" @click.stop="deletePost"></button>
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <em><time>{{post.createdAt | formatDate}}</time>:</em>
                  <br>
                  {{ post.content }}
                </div>
              </div>
              <footer class="card-footer">
                <input type="textarea" v-model="comment.content" class="card-footer-item input" placeholder="écrivez votre commentaire..."/>
              </footer>
              <footer class="card-footer">
                <button href="#" class="button card-footer-item is-dark" :disabled="!comment.content" @click="createComment">Commentez</button>
              </footer>
              <table class="table is-hoverable is-narrow is-striped is-fullwidth">
                <tbody v-for="com in post.comments" :com="com" :key="com.id">
                  <tr class="parent">
                    <th class="column is-three-quarter">
                      @{{com.user.username}}
                     <button v-show="user.id==com.UserId || user.isAdmin" class="delete is-pulled-right is-small has-background-danger front2" @click.stop="deleteComment(com.id)"></button>
                    </th>
                    <td class="column is-three-quarter">
                      <em><time>{{com.createdAt | formatDate}}</time>:</em>
                      <br>
                      {{com.content}}
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import postService from "../services/PostService";
import userService from "../services/UserService";
import router from "../router";
export default {
  name: 'PostSingle',
  data () {
    return {
      post: {},
      comment: {
        content: null,
        UserId: null
      }
    }    
  },
  created() {
    this.getPostData().then(post =>{
      this.post = post
    }

    )
  },
  computed: {
      ...mapState("account", ['user'])
  },
  methods: {
    async getPostData() {
      const post = await postService.getPostSingle(this.$route.params.id);
      const user = await userService.getById(post.UserId); 
      post.user = user;
      const comments = await postService.getComments(post.id);
      post.comments = comments
      for (const comment of post.comments) {
          const usercom = await userService.getById(comment.UserId);
          comment.user = usercom;
          }
      return post
    },
    deletePost() {
      postService.delete(this.post.id).then(() => {
        router.push('/');
      });
    },
    createComment() {
      this.comment.UserId = this.user.id;
      postService.createComment(this.comment, this.post.id).then(() =>{
        this.getPostData().then(post =>{
          this.post = post
        })
        this.comment.content=null;
      })
    },
    deleteComment(commentId){
      postService.deleteComment(commentId).then(() =>{
        this.getPostData().then(post =>{
          this.post = post
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .post-content {
    padding-top: 50px;
    background-color: #eaeaef;
  }
  .description {
    margin-bottom: 30px;
  }
  .front {
    z-index: 10;
    position: absolute; 
    top: 0; 
    right: 0;
  }
  .front2 {
    z-index: 10;
    position: relative; 
    top: 0; 
    right: 0;
  }
  .parent {
    position:relative;
  }
  tr { border-bottom: thin solid grey; }
</style>