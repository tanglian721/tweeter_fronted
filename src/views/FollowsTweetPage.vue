<template>
  <div id="followpage">
      <div class="login">
      <transition
        enter-active-class="animate__animated animate__slideInLeft"
        leave-active-class="animate__animated animate__slideOutLeft"
      >
        <user-info class="mobile" v-if="this.$store.state.infoAppear" />
      </transition>
      <user-info class="desktop" />
      <top-bar class="mobile" @refresh="refresh" />
      <div id="body">
         <follow-tweets />
      </div>
      <div class="right desktop">
        <hash-tag-list />
        <message-view />
      </div>
      <bottom-bar class="mobile" />
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <tweet-new v-if="ifnew" />
      </transition>
      <button-newtweet v-if="this.$store.state.newbtn" />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
import BottomBar from "../components/bottombar.vue";
import TopBar from "../components/topbar.vue";
import TweetNew from "../components/tweetNew.vue";
import ButtonNewtweet from "../components/buttonNewtweet.vue";
import FollowTweets from '../components/followTweets.vue';
import UserInfo from "../components/userInfo.vue";
import HashTagList from "../components/hashTagList.vue";
import MessageView from "../components/messageView.vue";
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
    HashTagList,
    MessageView,
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
@media only screen and (min-width: 1280px) {
  #followpage {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .login {
      position: relative;
      grid-template-rows: 1fr;
      grid-template-columns: 2fr 5fr 3fr;

      .user-info {
        position: relative;
        background-color: rgb(255, 255, 255);
      }
      #body {
        box-sizing: border-box;
        width: 100%;
        overflow-x: hidden;
        display: grid;
        justify-items: center;
        > img {
          height: 10vh;
        }
        .followpage {
          box-sizing: border-box;
          width: 100%;
          height: 100vh;
          // overflow-x: hidden;
        }
      }
    }
    .desktop {
      display: grid;
    }
    .right {
      height: 100vh;
      display: grid;
      grid-template-rows: 2fr 3fr;
    }
    .mobile {
      display: none;
    }
  }
}
</style>