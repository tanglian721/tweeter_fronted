<template>
  <div>
    <button v-if="iffollow" @click="unfollowUser">following</button>
    <button v-else @click="followUser">follow</button>
  </div>
</template>

<script>
import cookies from "vue-cookies"
import axios from "axios";
export default {
  data() {
    return {
      userfollows: this.$store.state.userfollows,
      iffollow: this.followbtn,
      locationUserId: this.$router.history.current.params.pathMatch,
      userId:cookies.get('user').user_id
    };
  },

  methods: {
    followCheck() {
      for (let i = 0; i < this.userfollows.length; i++) {
        if (this.locationUserId == this.userfollows[i].following_id) {
          this.iffollow = true;
          return;
        }
      }
    },
    followUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/follows",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            followId: this.locationUserId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.iffollow = true; 
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unfollowUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/follows",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            followId: this.locationUserId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.iffollow = false; 
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
      btnShow() {
          if ( this.locationUserId == this.userId ){
              return true 
          }else {
              return false
          }
      }
  },
  mounted () {
      this.followCheck();
  },
};
</script>

<style lang="scss" scoped>
</style>