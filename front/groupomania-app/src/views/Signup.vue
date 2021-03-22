<template>
    <section class="hero is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-5-desktop is-4-widescreen">
                        <form @submit.prevent="handleSubmit" class="box">
                            <div class="field">
                                <label class="label">Prénom</label>
                                <input type="text" v-model="user.firstName" name="firstName" class="input" />
                            </div>
                            <div class="field">
                                <label class="label">Nom</label>
                                <input type="text" v-model="user.lastName" name="lastName" class="input" />
                            </div>
                            <div class="field">
                                <label class="label">Pseudo</label>
                                <input type="text" v-model="user.username" name="username" class="input" />
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <input type="text" v-model="user.email" name="email" class="input" />
                            </div>
                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <input type="password" v-model="user.password" name="password" class="input"/>
                            </div>
                            <div class="field">
                                <button class="button is-dark is-center" :disabled="status.registering">S'inscrire</button>
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

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
        ...mapActions(['register', 'login']),
        handleSubmit() {
             this.submitted = true;
             this.register(this.user); 
            }
    }
};
</script>