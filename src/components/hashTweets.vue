<template>
  <div class="hash-tweets">
    <single-tweet v-for="tweet in tweets" :key=tweet.id :tweet="tweet" />
  </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
import singleTweet from '../components/singleTweet.vue';
export default {
  components: { singleTweet },
  data() {
    return {
      tag: this.$router.history.current.params.pathMatch,
      tweets:[],
      user: cookies.get("user"),

    };
  },
  props: {
      tweet: {
          type: Object,
      },
  },
  methods: {
    getHashTweet() {
        console.log(this.tag)
      axios
        .request({
          url: "https://ltweet.tk/api/hash",
          method: "get",
          params: {
            hashTag: this.tag,
            userId: this.user.user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
         this.tweets = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted () {
      this.getHashTweet();
  },
};
</script>

<style lang="scss" scoped>
</style>