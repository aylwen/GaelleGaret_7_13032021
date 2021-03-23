<template>
    <section class="hero is-dark is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-5-desktop is-4-widescreen">
                        <form @submit.prevent="handleSubmit" class="box">
                            <div class="field">
                                <label class="label">Email</label>
                                <input type="text" v-model="email" name="email" class="input" />
                                <div v-show="submitted && !email" class="invalid-feedback">Un email est requis</div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <input type="password" v-model="password" name="password" class="input" :class="{ 'is-invalid': submitted && !password }" />
                                <div v-show="submitted && !password" class="invalid-feedback">Un mot de passe est requis</div>
                            </div>
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-dark" :disabled="status.loggingIn">Se connecter</button>
                                </div>
                                <div class="control">
                                    <router-link to="/signup" class="button is-light">S'inscrire</router-link>
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

export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState("account", ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions("account", ['login', 'logout']),
        handleSubmit () {
            this.submitted = true;
            const { email, password } = this;
            if (email && password) {
                this.login({ email, password })
            }
            
        }
    }
};
</script>