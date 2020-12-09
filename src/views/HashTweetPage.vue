<template>
  <div class="hashPage">
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
         <hash-tweets />
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
import hashTweets from "../components/hashTweets.vue";
import BottomBar from "../components/bottombar.vue";
import TopBar from "../components/topbar.vue";
import TweetNew from "../components/tweetNew.vue";
import ButtonNewtweet from "../components/buttonNewtweet.vue";
import cookies from "vue-cookies";
import UserInfo from "../components/userInfo.vue";
import HashTagList from "../components/hashTagList.vue";
import MessageView from "../components/messageView.vue";



export default {
  components: { hashTweets, TopBar, BottomBar, TweetNew, ButtonNewtweet,UserInfo,
    HashTagList,
    MessageView, },
  data() {
    return {
        ifnew: this.$store.state.ifnew
    };
  },
  mounted () {
    if( cookies.get('loginToken') == undefined) {
      this.$router.push("/login")
    };
  },
};
</script>

<style lang="scss" scoped>
.hashPage {
  width: 100%;
  height: auto;
  overflow: hidden;
  .login {
    position: relative;
    width: 100%;
    height: auto;
    display: grid;
    background-color: rgba(149, 255, 250, 0.747);
    .top-bar {
      box-sizing: border-box;
      width: 100%;
      height: 10vh;
      background-color: #fff;
    }
    .hash-tweets {
      box-sizing: border-box;
      width: 100%;
      height: 80vh;
      overflow-x: hidden;
    }
    .bottom-bar {
      box-sizing: border-box;
      position: fixed;
      top: 90vh;
      width: 100%;
      height: 10vh;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .hashPage {
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
        .hash-tweets {
          box-sizing: border-box;
          width: 100%;
          height: 100vh;
          // overflow-x: hidden;
        }
      }
    }
    .desktop {
      display: block;
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