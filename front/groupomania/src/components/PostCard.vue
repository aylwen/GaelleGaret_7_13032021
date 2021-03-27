<template>
  <div class="post-card increase">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
            <img :src="post.imageUrl" alt="Placeholder image" />
        </figure>
      </div>
      <div class="media">
        <div class="media-content has-background-primary pt-1 pb-1">
          <p class="title is-4 mx-1 has-text-white is-family-primary">{{post.user["firstName"]+" "+post.user["lastName"]}}</p>
          <p class="subtitle is-6 has-text-white is-family-primary">@{{post.user["username"]}}</p>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
            {{ post.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'post'
  ]
}
</script>