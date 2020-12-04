<template>
  <div class="user-page">
    <div v-if="loginStatus">
      <div id="userpage">
        <div id="top">
          <div id="back" @click="backHome">
            <img src="../assets/back.png" alt="" />
          </div>
        </div>
        <img id="userImg" :src="user.url" alt="" />
        <div class="follow">
          <buttom-follow-userpage />
        </div>
        <div id="userInfo">
          <p>
            <span>{{ user.username }}</span>
            <span>{{ user.birthdate }}</span>
          </p>
          <p>
            <span>{{ user.email }}</span>
          </p>
          <p id="bio">
            Bio:
            <span>{{ user.bio }}</span>
          </p>
          <span id="following"> following : {{ followsNumber }} </span>
          <span id="follower"> follower : {{ followersNumber }} </span>
        </div>
        <div id="button" class="desktopHide">
          <span class="display" id="tweetbtn" @click="tweetShow">Tweet</span>
          <span
            class="display desktopHide"
            id="followingbtn"
            @click="followingShow"
          >
            Following</span
          >
          <span
            class="display desktopHide"
            id="followersbtn"
            @click="followersShow"
          >
            Followers</span
          >
        </div>
        <div id="content-display">
          <userpage-tweets
            v-if="bottomDisplay == 'tweet'"
            :userId="locationUserId"
          />
          <follows
            v-else-if="bottomDisplay == 'following'"
            v-for="follow in follows"
            :key="follow.following_id"
            :follow="follow"
            @reget="reget"
          />
          <follower
            v-else-if="bottomDisplay == 'followers'"
            v-for="follow in followers"
            :key="follow.following_id"
            :follow="follow"
            @reget="reget"
          />
        </div>
        <bottombar />
      </div>
    </div>
    <div v-else>
      <router-link to="/signin"></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import bottombar from "../components/bottombar.vue";
import UserpageTweets from "../components/userpageTweets.vue";
import Follows from "../components/follows.vue";
import Follower from "../components/follower.vue";
import ButtomFollowUserpage from "../components/buttomFollowUserpage.vue";

export default {
  components: {
    bottombar,
    UserpageTweets,
    Follows,
    Follower,
    ButtomFollowUserpage,
  },
  data() {
    return {
      user: "",
      loginStatus: true,
      follows: [],
      followsNumber: "",
      followers: [],
      bottomDisplay: "tweet",
      followersNumber: "",
      locationUserId: this.$router.history.current.params.pathMatch,
      unfollow: false,
      userfollows: this.$store.state.userfollows,
    };
  },
  props: {
    follow: {
      type: Object,
    },
    userId: {
      type: Number,
    },
  },
  methods: {
    loginCheck() {
      if (cookies.get("loginToken") != undefined) {
        this.loginStatus = true;
      } else {
        this.$router.push("/signin");
      }
    },
    backHome() {
      this.$router.push("/");
      location.reload();
    },
    tweetShow() {
      this.bottomDisplay = "tweet";
      document.getElementById("tweetbtn").style.backgroundColor = "#B2F7EF";
      document.getElementById("followingbtn").style.backgroundColor = "white";
      document.getElementById("followersbtn").style.backgroundColor = "white";
    },
    followingShow() {
      this.bottomDisplay = "following";
      document.getElementById("tweetbtn").style.backgroundColor = "white";
      document.getElementById("followingbtn").style.backgroundColor = "#B2F7EF";
      document.getElementById("followersbtn").style.backgroundColor = "white";
    },
    followersShow() {
      this.bottomDisplay = "followers";
      document.getElementById("tweetbtn").style.backgroundColor = "white";
      document.getElementById("followingbtn").style.backgroundColor = "white";
      document.getElementById("followersbtn").style.backgroundColor = "#B2F7EF";
    },
    getUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/users",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: this.locationUserId,
          },
        })
        .then((response) => {
          this.user = response.data;
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
            userId: this.locationUserId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.follows = response.data;
          this.followsNumber = response.data.length;
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
            userId: this.locationUserId,
          },
        })
        .then((response) => {
          this.followers = response.data;
          this.followersNumber = response.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reget() {
      console.log("3");
      this.getFollows();
      this.getFollowers();
    },
  },
  computed: {
    followBtnDispaly() {
      if (this.locationUserId == cookies.get("user").user_id) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    if( cookies.get('loginToken') == undefined) {
      this.$router.push("/login")
    };
    this.getUser();
    this.getFollows();
    this.getFollowers();
  },
};
</script>

<style lang="scss" scoped>
.user-page {
  position: fixed;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  #top {
    width: 100%;
    height: 15vh;
    background-color: #b2f7ef;

    #back {
      position: relative;
      top: 5vw;
      left: 5vw;
      width: 8vw;
      height: 8vw;
      background-color: rgba($color: #000000, $alpha: 0.5);
      border-radius: 50%;

      > img {
        width: 4vw;
        margin: 2vw;
      }
    }
  }
  #userImg {
    width: 25vw;
    height: 25vw;
    position: absolute;
    top: 8vh;
    left: 5vw;
    border-radius: 50%;
  }

  #userInfo {
    position: relative;
    margin-left: 10vw;
    margin-top: 8vh;
    margin-bottom: 2vh;

    p {
      font-size: 1rem;

      span {
        margin-right: 20vw;
      }
    }

    #bio {
      width: 80vw;
    }
  }

  #button {
    position: relative;
    border-bottom: 1px solid black;
    text-align: center;

    .display {
      position: relative;
      display: inline-block;
      border: 1px solid black;
      width: 18vw;
      border-bottom: none;
      padding: 5px;
      margin-left: 1px;
      top: 1px;
      border-radius: 10px 10px 0 0;
    }

    #tweetbtn {
      background-color: #b2f7ef;
    }
  }

  #content-display {
    background-color: #b2f7ef;
    overflow: scroll;
    height: 50vh;
    position: relative;
  }

  .bottom-bar {
    z-index: 24;
    width: 100%;
    position: sticky;
    background-color: white;
    height: 10vh;
    bottom: 0;
  }

  .follow {
    border-radius: 1rem;
    padding: 5px;
    position: absolute;
    top: 22vh;
    right: 5vw;
  }

}
</style>