<template>
    <div>
        <div id="content-area">
      <single-tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
 
    </div>
    </div>
</template>

<script>
// import cookies from "vue-cookies"
import axios from "axios";
import singleTweet from "./singleTweet.vue";
export default {
  components: { singleTweet },
  name: "default-list",
  data() {
    return {
      
    };
  },
  props: {
    tweet: {
      type: Object,
    },
    userId:{
        type:String,
    }
  },
  methods: {
    getTweets() {
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "get",
          params: {
            userId: this.userId,
          },
        })
        .then((response) => {
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

</style>