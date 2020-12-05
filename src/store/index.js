import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultList: [],
        ifnew: false,
        newRetweet: "",
        newbtn: true,
        userfollows: [],
        userfollowers: [],
        infoAppear: false,
        homepageContentShift: "default",
        messageShift: "chatlist",
        chatList: [],
        AtUsers: [],
        hashList: [],
        users: [],
        newchat: {},
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        showTweets: state => {
            return state.defaultList;
        },
        newChat: state => {
            let num = 0;
            for (let i = 0; i < state.chatList.length; i++) {
                num = state.chatList[i].new + num
            }
            console.log(num)
            return num;
        },
        NewAtUsers: state => {
            // console.log(state.AtUsers)
            let num = 0;
            for (let i = 0; i < state.AtUsers.length; i++) {
                if (state.AtUsers[i].atNotice == "1") {
                    num++
                }
            }
            console.log(num)
            return num;
        },
        tweetAllByLike: function(state) {
            function compare(a, b) {
                let tweetA = a.like_amount;
                let tweetB = b.like_amount;
                let comparision = 0;
                if (tweetA < tweetB) {
                    comparision = 1;
                } else if (tweetA > tweetB) {
                    comparision = -1;
                }
                return comparision
            }
            return state.defaultList.sort(compare);
        },
        newFollower: function(state) {
            for (let i = 0; i < state.userfollowers.length; i++) {
                // console.log(state.userfollowers[i])
                if (state.userfollowers[i].notice == 1) {
                    return true
                }
            }
        }
    }
})