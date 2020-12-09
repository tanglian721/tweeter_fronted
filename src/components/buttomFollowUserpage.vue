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
      // userfollows: this.$store.state.userfollows,
      iffollow: false,
      locationUserId: this.$router.history.current.params.pathMatch,
      userId:cookies.get('user').user_id
    };
  },

  methods: {
    followCheck() {
      console.log(this.iffollow)
      console.log(this.userfollows)
      for (let i = 0; i < this.userfollows.length; i++) {
        if (this.locationUserId == this.userfollows[i].following_id) {
          console.log(this.userfollows[i])
          this.iffollow = true;
          return;
        }
      }
    },
    followUser() {
      console.log("follow")
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
      console.log("unfollow")
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
     userfollows(){
       return this.$store.state.userfollows
     } 
  },
  mounted () {
      this.followCheck();
  },
};
</script>

<style lang="scss" scoped>
.button{
  z-index: 100;
}
</style>