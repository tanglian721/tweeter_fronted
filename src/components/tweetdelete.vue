<template>
  <div>
    <img src="../assets/trash.png" @click="deleteTweet" />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  name: "tweetdelete",
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTweet() {
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "57WHq4ZjcDWSNiAIozIGNNzXKiPExaSL5CIoZ51rYk1YT",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            tweetId: this.tweet.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < this.$store.state.defaultList.length; i++) {
            if (this.$store.state.defaultList[i].id == this.tweet.id) {
              this.$store.state.defaultList.splice(i, 1);
            }
          }
          this.deleteStatus = true;
        })
        .catch((errorMessage) => {
          this.deleteStatus = false;
          this.errorInfo = errorMessage;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-left: 2.2vw;
  height: 2.2vh;
}
</style>