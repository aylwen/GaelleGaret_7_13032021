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
                                <div v-show="submitted && !user.firstname" class="invalid-feedback">Un prénom est requis</div>
                            </div>
                            <div class="field">
                                <label class="label">Nom</label>
                                <input type="text" v-model="user.lastName" name="lastName" class="input" />
                                <div v-show="submitted && !user.lastName" class="invalid-feedback">Un nom est requis</div>
                            </div>
                            <div class="field">
                                <label class="label">Pseudo</label>
                                <input type="text" v-model="user.username" name="username" class="input" />
                                <div v-show="submitted && !user.username" class="invalid-feedback">Un pseudo est requis</div>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <input type="email" v-model="user.email" name="email" class="input" />
                                <div v-show="submitted && !user.email" class="invalid-feedback">Un email est requis</div>
                            </div>
                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <input type="password" v-model="user.password" name="password" class="input"/>
                                <div v-show="submitted && !user.password" class="invalid-feedback">Un mot de passe est requis</div>
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
        ...mapState("account", ['status'])
    },
    methods: {
        ...mapActions("account", ['register']),
        handleSubmit() {
             this.submitted = true;

             if (this.user.firstName && this.user.lastName && this.user.username && this.user.email && this.user.password && this.validEmail(this.user.email)){
                this.register(this.user); 
             }
            },
        validEmail(email) {
            var re = /^\S+@\S+\.\S+$/;
            return re.test(email);
        }
    }
};
</script>