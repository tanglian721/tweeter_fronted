<template>
  <div class="single-tweet">
    <div class="userimg">
      <img :src="tweet.url" alt="" />
    </div>
    <div class="tweetarea">
      <div class="username">{{ tweet.username }}</div>
      <div class="tweet-time">{{ tweet.created_at }}</div>
      <div class="tweet-content">
        <div class="tweet-text">{{ tweet.content }}</div>
        <div class="tweet-img">
          <img :src="tweet.image" alt="" />
        </div>
        <div v-if="ifretweet" class="retweet">
          <div class="userimg">
            <img :src="retweet[0].url" alt="" />
          </div>
          <div class="retweetarea">
            <div class="reusername">{{ retweet[0].username }}</div>
            <div class="retweet-time">{{ retweet[0].created_at }}</div>
            <div class="retweet-content">
              <div class="retweet-text">{{ retweet[0].content }}</div>
              <div class="retweet-img">
                <img :src="retweet[0].image" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tweet-bar">
        <div class="bar comment">
          <div class="icon-div">
            <img class="icon" src="../assets/speech.png" alt="" />
          </div>
          <span class="barnumber">{{ tweet.com_amount }}</span>
          <div class="new" v-if="tweet.newcom_amount > 0"></div>
        </div>
        <div class="bar like">
          <div class="icon-div">
            <img
              v-if="tweet.iflike"
              class="icon"
              src="../assets/heart-red.png"
              alt=""
            />
            <img v-else class="icon" src="../assets/heart.png" alt="" />
          </div>
          <span class="barnumber">{{ tweet.like_amount }}</span>
          <div class="new" v-if="tweet.newcom_amount > 0"></div>
        </div>
        <div class="bar edit">
            <tweetedit />
        </div>
        <div class="bar delete"></div>
        <div class="bar retweet"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tweetedit from './tweetedit.vue';
export default {
  components: { tweetedit },
  name: "single-tweet",
  data() {
    return {
      retweet: "",
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getTweets() {
      if (this.ifretweet == true) {
        axios
          .request({
            url: "http://127.0.0.1:5000/tweets",
            method: "get",
            params: {
              tweetId: this.tweet.retweet,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.retweet = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  computed: {
    ifretweet() {
      console.log(this.tweet.retweet);
      if (this.tweet.retweet != undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getTweets();
  },
};
</script>

<style lang="scss" scoped>
.single-tweet {
  background-color: rgba(149, 255, 250, 0.747);
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin-top: 2vh;
  width: 100%;
  .userimg {
    width: 80%;
    justify-self: end;
    > img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .tweetarea {
    box-sizing: border-box;
    justify-self: center;
    width: 90%;
    // border: 1px solid black;
    padding: 1vw;
    .username {
      font-size: 1.1rem;
      font-family: "Catamaran", sans-serif;
      border-bottom: 1px solid black;
    }
    .tweet-time {
      width: 100%;
      text-align: right;
      font-size: 0.6rem;
      font-family: "Lora", serif;
    }
    .tweet-content {
      margin-top: 1vh;
      .tweet-text {
        font-size: 1rem;
        font-family: "Catamaran", sans-serif;
      }
      .tweet-img {
        width: 90%;
        margin-left: 5%;
        > img {
          width: 100%;
        }
      }
      .retweet {
        box-sizing: border-box;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 6fr;
        border: 1px solid black;
        border-radius: 10px;
        padding: 1vw;
        .userimg {
          width: 90%;
          justify-self: center;
          > img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .reusername {
          font-size: 1.1rem;
          font-family: "Catamaran", sans-serif;
          border-bottom: 1px solid black;
        }
        .retweet-time {
          width: 100%;
          text-align: right;
          font-size: 0.6rem;
          font-family: "Lora", serif;
        }
        .retweet-content {
          margin-top: 1vh;
          .retweet-text {
            font-size: 1rem;
            font-family: "Catamaran", sans-serif;
          }
          .retweet-img {
            width: 90%;
            margin-left: 5%;
            > img {
              width: 100%;
            }
          }
        }
      }
    }
    .tweet-bar {
      box-sizing: border-box;
      border-top: 1px solid black;
      padding-top: 1vh;
      margin-top: 1vh;
      width: 100%;
      height: 5vh;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      .bar {
        background-color: #fff;
        position: relative;
        width: 90%;
        border: 1px solid black;
        display: grid;
        grid-template-columns: auto auto;
        height: 50%;
        span {
          font-size: 1.2rem;
        }
        .icon-div {
          display: inline;
          height: 100%;
          .icon {
            margin-left: 2vw;
            height: 2vh;
          }
        }
        .new {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 0, 0, 0.733);
          position: absolute;
          left: 25px;
          top: -0.5vh;
        }
      }
    }
  }
}
</style>