<template>
  <div id="retweet">
    <div class="userimg">
      <img :src="tweet.url" alt="" />
    </div>
    <div class="retweetarea">
      <div class="tweet-top">
        <div class="reusername">{{ tweet.username }}</div>
        <div class="retweet-time">{{ tweet.created_at }}</div>
      </div>
      <div class="retweet-content">
        <div class="retweet-text" v-html="tweet.content"></div>
        <div class="retweet-img">
          <img class="image" :src="tweet.image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tweet: "",
    };
  },
  props: {
    retweet: {
      type: Number,
    },
  },
  methods: {
    getTweets() {
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "get",
          params: {
            tweetId: this.retweet,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tweet = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log(this.$store.state.newRetweet);
    if (this.$store.state.newRetweet != "") {
      this.tweet = this.$store.state.newRetweet;
    } else {
      console.log("ss");
      this.getTweets();
    }
  },
};
</script>

<style lang="scss" scoped>
#retweet {
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr;
  border: 2px solid #f5f5f5;
  border-radius: 10px;
  padding: 1vw;
  .userimg {
    width: 90%;
    justify-self: center;
    > img {
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
    }
  }
  .tweet-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    border-bottom: 1px solid #f5f5f5;
    .reusername {
      font-size: 0.9rem;
      font-family: "Catamaran", sans-serif;
    }
    .retweet-time {
      width: 100%;
      text-align: right;
      font-size: 0.6rem;
      font-family: "Lora", serif;
    }
  }
  .retweet-content {
    margin-top: 1vh;
    .retweet-text {
      font-size: 0.9rem;
      font-family: "Catamaran", sans-serif;
    }
    .retweet-img {
      width: 90%;
      margin-left: 5%;
      > img {
        width: 30vw;
        max-height: 20vw;
        object-fit: contain;
      }
    }
  }
}
</style>