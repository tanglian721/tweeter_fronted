import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultList: []
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        showTweets: state => {
            console.log(state.defaultList)
            return state.defaultList;
        }
    }
})