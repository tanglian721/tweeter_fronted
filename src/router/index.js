import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue"
import UserPage from "../views/UserPage.vue"
import HashTweetPage from "../views/HashTweetPage.vue"
import ProfilePage from "../views/ProfilePage.vue"
import SearchPage from "../views/SearchPage.vue"
import FollowsTweetPage from "../views/FollowsTweetPage.vue"

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home
}, {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
}, {
    path: "/user/*",
    name: "UserPage",
    component: UserPage
}, {
    path: "/hash/*",
    name: "HashTweetPage",
    component: HashTweetPage
}, {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage
}, {
    path: "/search",
    name: "SearchPage",
    component: SearchPage
}, {
    path: "/followTweets",
    name: "FollowsTweetPage",
    component: FollowsTweetPage
}];

const router = new VueRouter({
    routes
});

export default router;