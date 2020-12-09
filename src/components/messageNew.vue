<template>
  <div class="new-message">
    <input type="text" v-model="message" />
    <button @click="sendMessage">Submit</button>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      user: cookies.get("user"),
    };
  },
  props: {
    receiver: {
      type: Object,
    },
  },
  methods: {
    sendMessage() {
      console.log(cookies.get("loginToken"));
      console.log(this.receiver.chatId);
      console.log(this.message);
      axios
        .request({
          url: "https://ltweet.tk/api/message",
          method: "post",
          data: {
            loginToken: cookies.get("loginToken"),
            receiverId: this.receiver.chatId,
            content: this.message,
          },
        })
        .then((response) => {
            console.log(response.data)
            this.$emit("newMessage", response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-message {
  display: grid;
  grid-template-columns: 5fr 1fr;
  column-gap: 2vw;
  height: 4vh;
  position: fixed;

  bottom: 12vh;
 
}
@media only screen and (min-width: 1280px) {
.new-message {
  display: grid;
  grid-template-columns: 5fr 1fr;
  column-gap: 1vw;
  height: 4vh;
  position: fixed;
  bottom: 2vh;
  // >input{
  //   width: 18vw;
  // }
  button{
    position: relative;
    left: 0;
    top: 0;
  }
 
}
}
</style>