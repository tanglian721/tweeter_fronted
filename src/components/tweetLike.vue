<template>
  <div class="like">
    <tweet-likeicon v-for="like in likes" :key="like.id" :like="like" />    
  </div>
</template>

<script>
import axios from "axios";
import tweetLikeicon from './tweetLikeicon.vue';
export default {
  components: { tweetLikeicon },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
    like: {
      type: Object,
    },
  },
  data() {
    return {
      likes: "",
    };
  },
  methods: {
    getLikes() {
      axios
        .request({
          url: "https://ltweet.tk/api/likes",
          method: "get",
          params: {
            tweetId: this.tweet.id,
          },
        })
        .then((response) => {
          this.likes = response.data;
  
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getLikes();
  },
};
</script>

<style lang="scss" scoped>
.like {
  height: 4vh
  }
</style>