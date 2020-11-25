<template>
  <div class="default-list">
    <div id="load"></div>
    <div id="content-area">
      <single-tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import singleTweet from "./singleTweet.vue";
export default {
  components: { singleTweet },
  name: "default-list",
  data() {
    return {
      userId: "1",
      
    };
  },
  props: {
    tweet: {
      type: Object,
    },
  },
  methods: {
    getTweets() {
      axios
        .request({
          url: "http://127.0.0.1:5000/tweets",
          method: "get",
          params: {
            checkuserId: this.userId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.defaultList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    tweets() {
      return this.$store.getters.showTweets;
    },
  },
  mounted () {
      this.getTweets()
  },
};
</script>

<style lang="scss" scoped>
#content-area{
    height: 100%;
}
</style>