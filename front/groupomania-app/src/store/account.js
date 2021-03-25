 
import userService from '../services/UserService'
import router from '../router'


const state = {
        user:{
            username: '',
            UserId: '',
            email: '',
            token: null,
            isAdmin: false
        },
        status: { loggedIn: false }
    }
const actions = {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest', { email });
        
            userService.login(email, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        console.log(error);
                        commit('loginFailure', error);
                        dispatch('alert/error', error, {root:true});
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        },
        register({ dispatch, commit }, user) {
            commit('registerRequest', user);
            userService.register(user)
                .then(
                    msg => {
                        commit('registerSuccess', msg);
                        const {email, password} = user;
                        dispatch('login', {email, password})
                    },
                    error => {
                        commit('registerFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        delete({ dispatch, commit }, userid) {
            userService.delete(userid).then(response => {
                console.log(response);
                dispatch('alert/success', "Compte supprimé!", { root: true });
                commit('logout');
                router.push('/');
            })
        },
    }
const mutations= {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true },
            state.user = user.user,
            state.user.token = user.token
        },
        loginFailure(state) {
            state.status = { loggedIn: false };
            state.user = null;
        },
        logout(state) {
            state.status = { loggedIn: false };
            state.user = null;
        },
        registerRequest(state, user) {
            state.user = user;
            state.status = { registering: true };
        },
        registerSuccess(state, user) {
            state.user = user;
            state.status = {};
        },
        registerFailure(state, error) {
            state.status = {error};
        }
    }

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
