<template>
  <div>
    <div class="userimg">
      <div v-if="status == 'unsuccess'" id="false"></div>
      <div v-else-if="status == 'success'" id="success"></div>
      <div v-else id="edit">
        <img :src="user.url" alt="" />
        <div id="area">
          <textarea
            name=""
            id=""
            cols="25"
            rows="4"
            v-model="content"
          ></textarea>
          <button @click="createComment">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      user: cookies.get("user"),
      status: "edit",
      content: "",
      image: "",
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createComment() {
      console.log(this.tweet);
      axios
        .request({
          url: "https://ltweet.tk/api/comments",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            tweetId: this.tweet.id,
            content: this.content,
            image: this.image,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$emit("newcomment", response.data);
        })
        .catch((errorMessage) => {
          this.submit = false;
          this.errorInfo = errorMessage;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#edit {
  width: 90%;
  margin-left: 5%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  > img {
    width: 80%;
    border-radius: 50%;
  }
  #area {
    position: relative;
  }
}
button {
  font-size: 0.7rem;
  position: relative;
  left: 35vw;
}
</style>