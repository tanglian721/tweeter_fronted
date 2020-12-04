<template>
  <div class="search">
    <div class="search-bar">
      <input type="text" v-model="searchContent" />
      <button @click="searchTweets">SEARCH</button>
    </div>
    <div class="result">
      <div id="load"></div>
      <div id="content-area">
        <single-tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import singleTweet from "./singleTweet.vue";

export default {
  components: { singleTweet },

  data() {
    return {
      searchContent: null,
      tweets: null,
    };
  },
  props: {
    tweet: {
      type: Object,
    },
  },
  methods: {
    searchTweets() {
      axios
        .request({
          url: "https://ltweet.tk/api/search",
          method: "get",
          params: {
            searchContent: this.searchContent,
            checkuserId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tweets = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  .search-bar {
    padding: 2vh 0;
    width: 70%;
    margin-left: 17%;
    display: grid;
    grid-template-columns: 6fr 1fr;
    column-gap: 2vw;
    > input {
      height: 3vh;
      font-size: 1.2rem;
    }
    button {
        font-size: 0.6rem;
    }
  }
}
</style>