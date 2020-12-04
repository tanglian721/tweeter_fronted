<template>
  <div class="user-info" @click="back">
    <div class="user-area">
      <img id="userImg" :src="user.url" alt="" @click="userPage" />
      <div id="userInfo">
        <p id="user">{{ user.username }}</p>
        <p id="email">{{ user.email }}</p>
        <p id="birthday">{{ user.birthdate }}</p>
        <p id="follow">
          <span id="following">Following : {{ following }}</span>
          <span id="follower"> Follower : {{ follower }}</span>
          <span class="new" v-if="this.$store.getters.newFollower == 1"></span>
        </p>
        <p id="bio">{{ user.bio }}</p>
      </div>
      <userinfor-btn-m />
      <span id="logout" @click="logout">Logout</span>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import userinforBtnM from "./userinforBtnM.vue";
export default {
  components: { userinforBtnM },
  data() {
    return {
      user: cookies.get("user"),
      following: this.$store.state.userfollows.length,
      follower: this.$store.state.userfollowers.length,
    };
  },
  methods: {
    back() {
      this.$store.state.infoAppear = false;
    },
    userPage() {
      this.$router.push("/user/" + this.user.user_id);
    },
    logout() {
      cookies.remove("user");
      cookies.remove("loginToken");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  box-sizing: border-box;
  overflow: hidden;
  z-index: 50;
  .user-area {
    z-index: 99;
    box-sizing: border-box;
    height: 100%;
    width: 60%;
    background-color: #fff;
    #userImg {
      z-index: 99;
      position: relative;
      width: 20vw;
      height: 20vw;
      left: 10vw;
      top: 5vw;
      border-radius: 50%;
      margin-bottom: 5vh;
      // object-fit: fill;;
    }

    #userInfo {
      width: 100%;
      padding: 1vh 0;

      p {
        padding: 0 5vw;
        margin: 1vh 0;
      }
      #follow {
        position: relative;
        .new {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: red;
          border-radius: 50%;
          top: 0;
          right: 18vw;
        }
      }
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
    }

    .UIBM {
      width: 80%;
      margin-top: 5vh;
      padding-left: 10%;
    }

    #logout {
      position: absolute;
      background-color: #b2f7ef;
      border: none;
      width: 12vw;
      color: white;
      padding: 0.4rem;
      border-radius: 04rem;
      margin-left: 40vw;
      bottom: 6vh;
      filter: drop-shadow(2px 2px 5px gray);
    }
  }
}
</style>