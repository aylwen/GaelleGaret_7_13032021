import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert';
import { account } from './account';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        alert,
        account
    }
});

export default store;