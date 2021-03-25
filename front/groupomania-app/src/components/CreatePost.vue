<template>
    <div class="container mx-3">
        <div class="columns is-centered">
             <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form @submit.prevent="createPost">
                    <div class="field">
                        <label class="label">Image</label>
                        <div class="control">
                        <div class="file has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="resume" v-on:change="onFileChange">
                                    <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choisissez une image
                                    </span>
                                    </span>
                                    <span class="file-name" id="file-name">
                                    ...
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div v-show="submitted && !image" class="invalid-feedback">Une image est requise</div>
                    </div>

                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea v-model="post.content" class="textarea" placeholder="Ecrivez ici..."></textarea>
                            <div v-show="submitted && !post.content" class="invalid-feedback">Une description est requise</div>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-dark">Publier</button>
                        </div>
                        <div class="control">
                            <button class="button is-light is-light">Annuler</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import postService from "@/services/PostService";
export default {
  name: "CreatePost",
  data() {
    return {
      submitted: false,
      image : null,
      post: {
        content: null,
        UserId: null
      }
    };
  },
  computed: {
    ...mapState("account", ["user"])
  },
  methods: {
      createPost(){
        this.submitted = true;
        if (this.image && this.post.content){
            this.post.UserId = this.user.id;
            postService.createPost(this.image, this.post).then(response => {
                console.log(response);
                this.$parent.creation = false;
                this.$parent.componentKey += 1;
            });
        }
      },
      onFileChange(e) {
        this.image = e.target.files[0] || e.dataTransfer.files;
        document.getElementById('file-name').innerText = e.target.files[0].name
    }
  }
}
</script>
<style lang="scss" scoped>
</style>