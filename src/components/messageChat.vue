<template>
  <div class="message-chat">
    <div class="chat">
      <div class="chatwith">
        <div v-if="chat.sender_id != user.user_id">
          <img
            v-if="chat.receiver_id == user.user_id"
            :src="chat.senderUrl"
            alt=""
          />
          <img v-else :src="chat.receiverUrl" alt="" />
        </div>
      </div>
      <div class="content">
        <p v-if="chat.sender_id == user.user_id" class="text" id="user">
          {{ chat.content }}
        </p>
        <p v-else class="text" id="chatuser">{{ chat.content }}</p>
      </div>
      <div class="user">
        <div v-if="chat.sender_id == user.user_id">
          <img
            v-if="chat.sender_id == user.user_id"
            :src="chat.senderUrl"
            alt=""
          />
          <img v-else :src="chat.receiverUrl" alt="" />
        </div>
      </div>
    </div>
    <p class="time">{{ chat.sent_time }}</p>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      user: cookies.get("user"),
      ifnew:false
    };
  },
  props: {
    chat: {
      type: Object,
    },
  },
  methods: {
    postNew() {
      if (this.chat.notice == "1" && this.chat.receiver_id == this.user.user_id) {
        console.log(this.chat.id)
        axios
        .request({
          url: "https://ltweet.tk/api/message",
          method: "patch",
          data: {
            loginToken: cookies.get("loginToken"),
            messageId: this.chat.id,
          },
        })
        .then((response) => {
          console.log(response);
          this.$emit("read", )
        })
        .catch((error) => {
          console.log(error);
        });
    
      }
    },
  },
  mounted () {
    this.postNew()
  },
};
</script>

<style lang="scss" scoped>
.message-chat {
  box-sizing: border-box;
  width: 90%;
  margin-left: 5%;
  .time {
    font-size: 0.8rem;
    text-align: center;
  }
  img {
    height: 6vh;
    border-radius: 50%;
  }
  .chat {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    justify-items: center;
    .chatwith {
      position: relative;
      #new {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .content {
      width: 90%;
      height: 6vh;
      background-color: #fff;
      border-radius: 15px;
      #user {
        text-align: right;
        position: relative;
        padding-right: 3vw;
        &::after {
          content: "";
          border: 15px solid rgba(252, 0, 0, 0);
          width: 0;
          height: 0;
          // background-color: #fff;
          border-left: 15px solid rgb(255, 255, 255);
          position: absolute;
          top: 0.9vh;
          right: -25px;
        }
      }
      #chatuser {
        text-align: left;
        padding-left: 2vw;
        position: relative;
        &::before {
          content: "";
          border: 15px solid rgba(255, 31, 31, 0);
          width: 0;
          height: 0;
          border-right: 15px solid rgb(255, 255, 255);
          position: absolute;
          left: -25px;
          top: 0.9vh;
        }
      }
    }
  }
}
</style>