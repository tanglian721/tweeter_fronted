<template>
  <div>
    {{user_id}}
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
      iffollow: false,
      // userId:cookies.get('user').user_id
    };
  },
  props: {
    user_id: {
      type: Number,
    }
  },
  methods: {
    followCheck() {
      // console.log(this.user_id)
      // console.log(this.userfollows);
      for (let i = 0; i < this.userfollows.length; i++) {
        if (this.user_id == this.userfollows[i].following_id) {
          this.iffollow = true;
          return;
        }
      }
    },
    followUser() {
      console.log(this.chatWith.id);
      axios
        .request({
          url: "https://ltweet.tk/api/follows",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            followId: this.user_id,
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
            followId: this.user_id,
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
  mounted () {
    console.log(this.user_id)
    this.followCheck();
  },
};
</script>

<style lang="scss" scoped>
</style>