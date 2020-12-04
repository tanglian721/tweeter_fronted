<template>
  <div class="tweet-edit">
    <div v-if="ifedit" class="editarea">
      <img id="delete" @click="back" src="../assets/delete.png" alt="" />
      <div v-if="editstatus == 'unsuccess'" id="false"></div>
      <div v-else-if="editstatus == 'success'" id="success"></div>
      <div v-else id="edit">
        <img :src="tweet.url" alt="" />
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="content"
          ></textarea>
          <button @click="EditTweet">submit</button>
        </div>
      </div>
    </div>
    <img src="../assets/edit.png" @click="ifedit = !ifedit" />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "tweetedit",
  data() {
    return {
      //   ifedit: true,
      ifedit: false,
      editstatus: "",
      content: this.tweet.content,
      img: this.tweet.img,
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    EditTweet() {
      console.log(cookies.get("loginToken"));
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            content: this.content,
            tweetId: this.tweet.id,
            loginToken: cookies.get("loginToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          let newdata = response.data;
          for (let i = 0; i < this.$store.state.defaultList.length; i++) {
            if (this.$store.state.defaultList[i].id == newdata.tweet_id) {
              this.$set(
                this.$store.state.defaultList[i],
                "content",
                newdata.content
              );
              this.$set(
                this.$store.state.defaultList[i],
                "image",
                newdata.image
              );
            }
          }
          console.log(this.$store.state.defaultList);
          this.ifedit = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    back() {
      this.ifedit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tweet-edit {
  img {
    margin-left: 2.2vw;
    height: 2.2vh;
  }
  .editarea {
    box-sizing: border-box;
    width: 80%;
    min-height: 30vh;
    position: fixed;
    background-color: #fff;
    left: 10%;
    top: 30vh;
    border-radius: 30px;
    z-index: 99;
    padding-bottom: 5%;
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.788));
    #delete {
      width: 5vw;
      position: relative;
      margin: 2vh 5vw 1vh 5vw;
    }
    #edit {
      width: 90%;
      margin-left: 5%;
      display: grid;
      grid-template-columns: 1fr 5fr;
      > img {
        width: 80%;
        border-radius: 50%;
      }
    }
  }
}
</style>