<template>
  <div class="tweet-sort-like">
      haha
      <div id="load"></div>
      <div id="content-area">
        <single-tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </div>
  </div>
</template>

<script>
import singleTweet from "./singleTweet.vue";

export default {
  components: { singleTweet },

  data() {
    return {
      searchContent: null,
      tweets: this.$store.getters.tweetAllByLike,
    };
  },
  props: {
    tweet: {
      type: Object,
    },
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>