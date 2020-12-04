<template>
  <div class="hashPage">
    <div class="login">
      <top-bar />
      <hash-tweets />
      <tweet-new v-if="ifnew" />
      <button-newtweet v-if="this.$store.state.newbtn" />
      <bottom-bar />
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
export default {
  components: { hashTweets, TopBar, BottomBar, TweetNew, ButtonNewtweet },
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
</style>