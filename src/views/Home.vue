<template>
  <div id="homepage">
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
        <img v-if="loading_top" src="../assets/loading.gif" alt="" />
        <default-list
          id="scroll"
          v-if="$store.state.homepageContentShift == 'default'"
        />
        <message-view
          v-else-if="$store.state.homepageContentShift == 'message'"
        />
        <at-user v-else-if="$store.state.homepageContentShift == 'atUser'" />
        <hash-tag-list
          v-else-if="$store.state.homepageContentShift == 'hash'"
        />
        <div v-if="$store.state.homepageContentShift == 'default'">
          <img
            v-if="loading_bottom"
            ref="test"
            v-show="show"
            v-observe-visibility="visibilityChanged"
            src="../assets/loading.gif"
            alt=""
          />
          <h2 v-else>No more tweets!</h2>
        </div>
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
import axios from "axios";
import cookies from "vue-cookies";
import BottomBar from "../components/bottombar.vue";
import DefaultList from "../components/defaultList.vue";
import TopBar from "../components/topbar.vue";
import TweetNew from "../components/tweetNew.vue";
import ButtonNewtweet from "../components/buttonNewtweet.vue";
import UserInfo from "../components/userInfo.vue";
import MessageView from "../components/messageView.vue";
import AtUser from "../components/atUser";
import HashTagList from "../components/hashTagList.vue";
import VueObserveVisibility from "vue-observe-visibility";
import Vue from "vue";
Vue.use(VueObserveVisibility);
export default {
  name: "Home",
  data() {
    return {
      iflogin: true,
      ifLoading: true,
      user: cookies.get("user"),
      loading_top: false,
      loading_bottom: true,
      show: true,
      isVisible: true,
    };
  },
  components: {
    DefaultList,
    TopBar,
    BottomBar,
    TweetNew,
    ButtonNewtweet,
    UserInfo,
    MessageView,
    AtUser,
    HashTagList,
    // TweetsLikeSorting,
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
      this.loadMore();
    },
    refresh() {
      this.getTweets();
    },
    getTweets() {
      this.loading_top = true;
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "get",
          params: {
            checkuserId: this.user.user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.defaultList = response.data;
          this.loading_top = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadMore() {
      this.loading_bottom = true;
      this.ifLoading = false;
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "get",
          params: {
            index: this.$store.getters.showTweets[
              this.$store.getters.showTweets.length - 1
            ].id,
            checkuserId: this.user.user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length < 1) {
            console.log("to the end");
            this.loading_bottom = false;
          } else {
            this.$store.state.defaultList = this.$store.state.defaultList.concat(
              response.data
            );
            setTimeout(() => {
              this.ifLoading = true;
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFollows() {
      axios
        .request({
          url: "https://ltweet.tk/api/follows",
          method: "get",
          params: {
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.userfollows = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFollowers() {
      axios
        .request({
          url: "https://ltweet.tk/api/followers",
          method: "get",
          params: {
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.userfollowers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChatList() {
      axios
        .request({
          url: "https://ltweet.tk/api/message",
          method: "get",
          params: {
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.chatList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHashList() {
      axios
        .request({
          url: "https://ltweet.tk/api/hash",
          method: "get",
          params: {},
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.hashList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAtUserTweet() {
      axios
        .request({
          url: "https://ltweet.tk/api/@",
          method: "get",
          params: {
            userId: this.user.user_id,
            checkuserId: this.user.user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.AtUsers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsers() {
      axios
        .request({
          url: "https://ltweet.tk/api/users",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data)
          this.$store.state.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleWheel() {
      console.log("aa");
      window.addEventListener("wheel", function (event) {
        if (event.deltaY < 0) {
          console.log("scrolling up");
        } else if (event.deltaY > 0) {
          console.log("scrolling down");
        }
      });
    },
    load() {
      console.log("a");
    },
  },
  computed: {
    ifnew() {
      return this.$store.state.ifnew;
    },
  },
  mounted() {
    console.log(cookies.get("loginToken"));
    if (cookies.get("loginToken") == undefined) {
      this.$router.push("/login");
    }
    this.getTweets();
    this.getFollows();
    this.getFollowers();
    this.getChatList();
    this.getAtUserTweet();
    this.getHashList();
    this.getUsers();
    // if (this.$store.state.homepageContentShift == "default") {
    //   let div = document.getElementById("body");
    //   div.addEventListener("scroll", () => {
    //     console.log(div.scrollHeight);
    //     console.log(div.scrollTop);
    //     console.log(div.offsetTop);
    //     if (div.scrollHeight <= div.scrollTop + div.offsetTop * 10) {
    //       if (this.ifLoading == true) {
    //         this.loadMore();
    //       }
    //     }
    //   });
    // }
  },
};
</script>

<style lang="scss" scoped>
#homepage {
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
    background-color: #caf0f8;

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
    }
    #body {
      box-sizing: border-box;
      width: 100%;
      overflow-x: hidden;
      display: grid;
      justify-items: center;
      > img {
        height: 10vh;
        .default-list,
        .at-user,
        .hash,
        .message,
        .tweet-sort-like {
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }
      }
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
  .desktop {
    display: none;
  }
}
@media only screen and (min-width: 1280px) {
  #homepage {
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
        .default-list,
        .at-user,
        .hash,
        .message,
        .tweet-sort-like {
          box-sizing: border-box;
          width: 100%;
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
