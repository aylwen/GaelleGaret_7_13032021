<template>
    <section class="hero is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-5-desktop is-4-widescreen">
                        <form @submit.prevent="changed=false" class="box">
                            <div class="field">
                                <label class="label">Prénom</label>
                                <div class=control>
                                    <input type="text" v-model="user.firstName" name="firstName" class="input" @change="changed=true"/>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Nom</label>
                                <div class=control>
                                    <input type="text" v-model="user.lastName" name="lastName" class="input" @change="changed=true"/>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Username</label>
                                <div class="control has-icons-left">
                                    <input type="text" v-model="user.username" name="username" class="input" @change="changed=true"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="text" v-model="user.email" name="email" class="input" @change="changed=true"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">                                
                                    <input type="password" v-model="user.password" name="password" class="input" placeholder="*****" @change="changed=true"/>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                Inscrit depuis le {{ user.createdAt| formatDate }}
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-dark" @click="updateAccount" :disabled="!changed">Mettre à jour</button>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-danger" @click="deleteAccount">Supprimer mon compte</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import userService from "@/services/UserService"
export default {
    data () {
        return {
            changed: false,
            submitted: false,
            originaluser: null
        }
    },
    created() {
        this.originaluser = JSON.parse(JSON.stringify(this.user))
    },
    computed: {
        ...mapState("account", ['user', 'status']),
    },

    methods: {
        ...mapActions("account", ['logout', 'delete']),
        ...mapActions("alert", ['error', 'success']),
        updateAccount() {
             userService.update(this.user)
             .then(response => {
                console.log(response)
                delete this.user.password;
                this.originaluser = JSON.parse(JSON.stringify(this.user))
                this.success("Compte modifé !") 
             })
             .catch(error =>{
                 console.log(error);
                 this.user.firstName = this.originaluser.firstName;
                 this.user.lastName = this.originaluser.lastName;
                 this.user.username = this.originaluser.username;
                 this.user.email = this.originaluser.email;
                 delete this.user.password;
                 this.error(error);
             })
            },
        deleteAccount() {
            this.delete(this.user.id)
        }
    }
};
</script>
<style lang="scss" scoped>
</style>