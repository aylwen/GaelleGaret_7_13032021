<template>
    <div v-show="alert.message" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
        <div :class="alert.type" class="message  mx-3">
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
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Alert',
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