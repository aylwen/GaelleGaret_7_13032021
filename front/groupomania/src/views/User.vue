<template>
    <section class="hero is-dark is-fullheight">
        <div v-show="confirm" class="modal is-active">
            <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="message is-dark mx-3">
                        <div class="message-header">
                            <p >Confirmation</p>
                        </div>
                        <div class="message-body">
                            Voulez-vous vraiment supprimer votre compte ?
                        </div>
                        <div class="pb-3 mx-3">
                            <button class="button is-dark is-small is-rounded mx-1" @click="confirm=false;deleteAccount();">Oui</button>
                            <button class="button is-danger is-small is-rounded mx-1" @click="confirm=false">Non</button>
                        </div>
                </div>
            </div>
        </div>
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
                                    <button class="button is-danger" @click="confirmDeleteAccount">Supprimer mon compte</button>
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
            originaluser: null,
            confirm: false,
            deleted: false
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
             .then(() => {
                delete this.user.password;
                this.originaluser = JSON.parse(JSON.stringify(this.user))
                this.success("Compte modifé !") 
             })
             .catch(error =>{
                 this.user.firstName = this.originaluser.firstName;
                 this.user.lastName = this.originaluser.lastName;
                 this.user.username = this.originaluser.username;
                 this.user.email = this.originaluser.email;
                 delete this.user.password;
                 this.error(error);
             })
            },
        confirmDeleteAccount(){
            this.confirm=true
        },
        deleteAccount() {
            this.delete(this.user.id)
        }
    }
};
</script>
<style lang="scss" scoped>
</style>