<template>
  <div id="retweet">
    <img src="../assets/retweet.png" @click="retweet">
  </div>
</template>

<script>
export default {
  name: "tweet-retweet",
  props: {
    tweet: {
      type: Object,
    },
  },
  methods: {
      retweet() {
          this.$store.state.ifnew = true
          this.$store.state.newRetweet = this.tweet
      }
  },
};
</script>

<style lang="scss" scoped>
#retweet {
  position: relative;
   img {
          margin-left: 2.5vw;
          height: 2.5vh;
        }
}
</style>