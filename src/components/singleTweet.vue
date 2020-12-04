<template>
  <div class="single-tweet">
    <div class="userimg" @mouseover="card" @mouseleave="hideCard">
      <img :src="tweet.url" alt="" @click="touser" />
      <transition
        class="my-element"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <user-card v-if="ifcard" :tweet="tweet" />
      </transition>
    </div>
    <div class="tweetarea">
      <div class="tweet-top">
        <span class="username">{{ tweet.username }}</span>
        <span class="tweet-time">{{ tweet.created_at }}</span>
      </div>
      <div class="tweet-content">
        <div class="tweet-text" v-html="tweet.content"></div>
        <div class="tweet-img">
          <img :src="tweet.image" alt="" />
        </div>
        <div v-if="ifretweet" class="retweet">
          <retweetview :retweet="tweet.retweet" />
        </div>
      </div>
      <div class="tweet-bar">
        <div class="bar comment">
          <div class="icon-div">
            <img
              class="icon"
              @click="getComments"
              src="../assets/comment.png"
              alt=""
            />
            <div v-if="ifuser">
              <div class="new" v-if="tweet.newcom_amount > 0"></div>
            </div>
          </div>
          <span class="barnumber">{{ tweet.com_amount }}</span>
        </div>
        <div class="bar like">
          <div class="icon-div">
            <img
              v-if="tweet.iflike == '1'"
              class="icon"
              src="../assets/like-red.png"
              alt=""
              @click="deletelike"
            />
            <img
              v-else
              class="icon"
              src="../assets/like.png"
              alt=""
              @click="postlike"
            />
          </div>
          <span class="barnumber">{{ tweet.like_amount }}</span>
        </div>
        <div class="bar retweet">
          <tweet-retweet :tweet="tweet" />
        </div>
        <div class="bar edit" v-if="ifuser">
          <tweetedit :tweet="tweet" />
        </div>
        <div class="bar delete" v-if="ifuser">
          <tweetdelete :tweet="tweet" />
        </div>
      </div>
      <tweet-like :tweet="tweet" v-if="ifuser" :like="user" />
      <div class="comment-area" v-if="ifcomment">
        <h4 id="comments">COMMENTS:</h4>
        <comment-new :tweet="tweet" @newcomment="newcomment" />
        <commentview
          v-for="comment in comments"
          :key="comment.key"
          :comment="comment"
          @deletecomment="deletecomment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tweetedit from "./tweetedit.vue";
import Tweetdelete from "./tweetdelete.vue";
import TweetRetweet from "./tweetRetweet.vue";
import cookies from "vue-cookies";
import Commentview from "./commentview.vue";
import CommentNew from "./commentNew.vue";
import Retweetview from "./retweetview.vue";
import TweetLike from "./tweetLike.vue";
import UserCard from "./userCard.vue";

export default {
  components: {
    tweetedit,
    Tweetdelete,
    TweetRetweet,
    Commentview,
    CommentNew,
    Retweetview,
    TweetLike,
    UserCard,
  },
  name: "single-tweet",
  data() {
    return {
      ifcomment: false,
      comments: "",
      user: {},
      ifAtNew: false,
      ifcard: false,
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
    },
    retweet: {
      type: Number,
    },
    like: {
      type: Object,
    },
  },
  methods: {
    getComments() {
      this.ifcomment = !this.ifcomment;
      if (this.ifcomment == true) {
        console.log(cookies.get("user"));
        axios
          .request({
            url: "https://ltweet.tk/api/comments",
            method: "get",
            params: {
              tweetId: this.tweet.id,
              userId: cookies.get("user").user_id,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.comments = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    postlike() {
      axios
        .request({
          url: "https://ltweet.tk/api/likes",
          method: "post",
          data: {
            loginToken: cookies.get("loginToken"),
            tweetId: this.tweet.id,
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(this.tweet.iflike);
          this.tweet.iflike = "1";
          this.tweet.like_amount++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletelike() {
      axios
        .request({
          url: "https://ltweet.tk/api/likes",
          method: "delete",
          data: {
            loginToken: cookies.get("loginToken"),
            tweetId: this.tweet.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tweet.iflike = "0";
          this.tweet.like_amount--;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newcomment(data) {
      console.log(data);
      this.comments.unshift(data);
      this.tweet.com_amount++;
    },
    deletecomment(data) {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].id == data) {
          console.log(this.comments[i]);
          this.comments.splice(i, 1);
        }
      }
      this.tweet.com_amount--;
    },
    touser() {
      this.$router.push("/user/" + this.tweet.user_id);
    },
    clearAtNotice() {
      axios
        .request({
          url: "https://ltweet.tk/api/@",
          method: "patch",
          data: {
            loginToken: cookies.get("loginToken"),
            tweetId: this.tweet.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < this.$store.state.AtUsers.length; i++) {
            if (this.$store.state.AtUsers[i].id == this.tweet.id) {
              this.$set(this.$store.state.AtUsers[i], "atNotice", "0");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    card() {
      this.ifcard = true;
    },
    hideCard() {
      this.ifcard = false;
    },
  },
  computed: {
    ifretweet() {
      if (this.tweet.retweet != undefined) {
        return true;
      } else {
        return false;
      }
    },
    ifuser() {
      if (cookies.get("user").user_id == this.tweet.user_id) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    if (this.tweet.atNotice == "1") {
      this.clearAtNotice();
    }
  },
};
</script>

<style lang="scss" scoped>
.single-tweet {
  display: grid;
  grid-template-columns: 1fr 7fr;
  margin-top: 2vh;
  width: 100%;
  .userimg {
    width: 80%;
    margin-top: 1vh;
    justify-self: end;
    position: relative;
    > img {
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
    }
    .atNew {
      .ifnewAtNew {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, 0.733);
        position: absolute;
        right: 0px;
        top: -0.5vh;
      }
    }
  }
  .tweetarea {
    box-sizing: border-box;
    justify-self: center;
    width: 90%;
    border-radius: 10px;
    padding: 15px;
    background-color: #fff;
    filter: drop-shadow(1px 1px 10px rgba(255, 255, 255, 0.287));
    .tweet-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: end;
      .username {
        font-size: 1.1rem;
        font-family: "Catamaran", sans-serif;
      }
      .tweet-time {
        width: 100%;
        text-align: right;
        font-size: 0.6rem;
        font-family: "Lora", serif;
      }
      border-bottom: 1px solid #f5f5f5;
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
          max-height: 30vh;
          object-fit: contain;
          border-radius: 20px;
        }
      }
    }
    .tweet-bar {
      box-sizing: border-box;
      border-top: 1px solid #f5f5f5;
      padding-top: 1vh;
      margin-top: 1vh;
      width: 100%;
      height: 5vh;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      #retweeticon {
        margin-left: 2.5vw;
        height: 2.5vh;
      }
      .bar {
        position: relative;
        width: 90%;
        display: grid;
        grid-template-columns: auto auto;
        height: 50%;
        span {
          font-size: 1rem;
        }
        img {
          margin-left: 2vw;
          height: 2vh;
        }

        .new {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 0, 0, 0.733);
          position: absolute;
          right: 4vw;
          top: -0.5vh;
        }
      }
    }
    .comment-area{
      box-sizing: border-box;
      border: 1px solid #f5f5f5;
      border-radius: 10px;
      padding: 10px;
      #comments{
        margin:2vh 0;
      }
    }
  }
}
.animate__animated.animate__fadeIn {
  --animate-delay: 3s;
  --animate-duration: 2s;
}
</style>