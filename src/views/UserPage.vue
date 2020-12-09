<template>
  <div class="user-page">
    <div id="login" v-if="loginStatus">
      <user-info class="desktop" />
      <div id="userpage">
        <div id="info">
          <div id="top">
            <div id="back" @click="backHome">
              <img src="../assets/back.png" alt="" />
            </div>
          </div>
          <img id="userImg" :src="user.url" alt="" />
          <div class="follow" v-if="ifuser">
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
          <div id="button" class="mobile">
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
            class="mobile"
          />
          <follower
            v-else-if="bottomDisplay == 'followers'"
            v-for="follow in followers"
            :key="follow.following_id"
            :follow="follow"
            @reget="reget"
            class="mobile"
          />
        </div>
        <bottombar class="mobile" />
      </div>
      <div class="right desktop">
        <div class="right-follows">
          <h4>Follows</h4>
          <div>
            <follows
              v-for="follow in follows"
              :key="follow.following_id"
              :follow="follow"
              @reget="reget"
            />
          </div>
        </div>
        <div class="right-follower">
          <h4>Followers</h4>
          <div>
            <follower
              v-for="follow in followers"
              :key="follow.following_id"
              :follow="follow"
              @reget="reget"
            />
          </div>
        </div>
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
import UserInfo from "../components/userInfo.vue";

export default {
  components: {
    bottombar,
    UserpageTweets,
    Follows,
    Follower,
    ButtomFollowUserpage,
    UserInfo,
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
    ifuser(){
      if( this.locationUserId == cookies.get('user').user_id){
        return false
      }else{
        return true
      }
    }
  },
  mounted() {
    if (cookies.get("loginToken") == undefined) {
      this.$router.push("/login");
    }
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
  #userpage {
    height: 100vh;
    display: grid;
    grid-template-rows: 4fr 5fr 1fr;
    #info {
      height: 40vh;
      overflow: hidden;
      position: relative;
      #top {
        width: 100%;
        height: 15vh;
        background-color: #caf0f8;

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
        position: absolute;
        border-bottom: 1px solid black;
        text-align: center;
        bottom: 0;
        margin-left: 17vw;

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
          background-color: #caf0f8;
        }
      }
    }
    #content-display {
      background-color: #caf0f8;
      overflow: scroll;
      height: 100%;
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
      top: 20vh;
      right: 5vw;
    }
  }
}
.desktop{
  display: none;
}
@media only screen and (min-width: 1280px) {
  .mobile {
    display: none;
  }
  .user-page {
    #login {
      width: 100%;
      height: 100%;
      display: grid;
      position: relative;
      grid-template-columns: 2fr 5fr 3fr;

      #userpage {
        grid-template-rows: 4fr 6fr;
        #info {
          #top {
            width: 100%;
            height: 15vh;
            background-color: #caf0f8;
            #back {
              position: relative;
              top: 5vw;
              left: 5vw;
              width: 2vw;
              height: 2vw;
              background-color: rgba($color: #000000, $alpha: 0.5);
              border-radius: 50%;
              > img {
                width: 1vw;
                margin: 0.5vw;
              }
            }
          }
          #userImg {
            width: 8vw;
            height: 8vw;
            position: absolute;
            top: 6vh;
            left: 10vw;
            border-radius: 50%;
          }

          #userInfo {
            position: relative;
            margin-left: 10vw;
            margin-top: 10vh;
            margin-bottom: 2vh;
            font-size: 1.2rem;
            p {
              font-size: 1rem;

              span {
                margin-right: 10vw;
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
            height: 100%;
            position: relative;
  overflow-x: hidden;

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
      }
    }
  }
.right {
  height: 98vh;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  overflow: hidden;
  .right-follows {
    height: 49vh;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
  }
  .right-follower {
    height: 49vh;
    width: 100%;
    overflow: scroll;
  overflow-x: hidden;

  }

}
}
</style>