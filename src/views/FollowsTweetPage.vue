<template>
  <div id="followpage">
    <div class="login">
      <user-info v-if="this.$store.state.infoAppear" />
      <top-bar />
      <follow-tweets />
      <bottom-bar />
      <tweet-new v-if="ifnew" />
      <button-newtweet v-if="this.$store.state.newbtn" />
    </div>
    <!-- <div v-else class="unlogin">login</div> -->
  </div>
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
import BottomBar from "../components/bottombar.vue";
import TopBar from "../components/topbar.vue";
import TweetNew from "../components/tweetNew.vue";
import ButtonNewtweet from "../components/buttonNewtweet.vue";
import UserInfo from "../components/userInfo.vue";
import FollowTweets from '../components/followTweets.vue';
export default {

  name: "SearchPage",
  data() {
    return {
      iflogin: true,
      ifLoading: true,
      user: cookies.get("user"),
    };
  },
  components: {
    TopBar,
    BottomBar,
    TweetNew,
    ButtonNewtweet,
    UserInfo,
    FollowTweets,
  },
  methods: {

  },
  computed: {
    ifnew() {
      return this.$store.state.ifnew;
    },
  },
};
</script>

<style lang="scss">
#followpage {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    background-color: rgba(149, 255, 250, 0.747);

    .user-info {
      box-sizing: border-box;
      position: fixed;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.568);
    }
    .top-bar {
      box-sizing: border-box;
      width: 100%;
      background-color: #fff;
    }
    .follow-tweets {
      box-sizing: border-box;
      width: 100%;
      overflow-x: hidden;
    }
    .bottom-bar {
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      height: 10vh;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>