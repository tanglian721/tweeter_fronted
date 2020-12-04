<template>
  <div class="message">
    <div v-if="this.$store.state.messageShift == 'chatlist'" class="usersList">
      <h2>Chat List</h2>
      <message-chat-list
        v-for="chatUser in chatList"
        :key="chatUser.chatId"
        :chatUser="chatUser"
        @tochat="tochat"
      />
    </div>
    <div v-else class="usersMessage">
      <div @click="backtolist" id="chatname">
        <img src="../assets/left-arrow.png" alt="" />
        <span id="messageName">{{ chatwith.chatwith }}</span>
      </div>
      <message-chat v-for="chat in chats" :key="chat.id" :chat="chat" @read="read"/>
      <message-new :receiver="chatwith" @newMessage="newMessage"/>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import MessageChatList from "./messageChatList.vue";
import MessageChat from "./messageChat.vue";
import MessageNew from "./messageNew.vue";
export default {
  components: { MessageChatList, MessageChat, MessageNew },
  data() {
    return {
      MessageChatListuser: cookies.get("user"),
      chatList: this.$store.state.chatList,
      chats: "",
      chatwith: "",
    };
  },
  props: {
    chatUser: {
      type: Object,
    },
    chat: {
      type: Object,
    },
    receiver:{
        type: Object,
    }
  },
  methods: {
    tochat(data) {
      axios
        .request({
          url: "https://ltweet.tk/api/message",
          method: "get",
          params: {
            userId: cookies.get("user").user_id,
            chatwithId: data.chatId,
          },
        })
        .then((response) => {
          this.chats = response.data;
          console.log(this.chats)
          this.chatwith = data;
          this.$store.state.messageShift = "message";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    backtolist() {
      this.$store.state.messageShift = "chatlist";
    },
    newMessage(data){
        this.chats.unshift(data)
    },
    read(){
        console.log(this.chatwith)
        for (let i = 0; i < this.chatList.length; i++){
            if(this.chatList[i].chatId == this.chatwith.chatId){
                this.$set(this.chatList[i], 'new', 0)
            }
        }
    }
  },
  mounted() {

    console.log(this.$store.state.newchat)
    for (let i = 0; i < this.chatList.length; i++){
      if(this.chatList[i].chatId == this.$store.state.newchat.chatId){
        this.chatwith =  this.chatList[i]
      } else {
        this.chatwith = this.$store.state.newchat
        }    }
  },
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  h2 {
    text-align: center;
    margin: 2vh 0;
    text-transform: uppercase;
  }
  .usersMessage {
    width: 90%;
    #chatname {
      height: 6vh;
      margin: 5vw;
      #messageName {
        font-size: 2rem;
        font-family: "Catamaran", sans-serif;
        margin-left: 2vw;
        line-height: 8vh;
      }
      > img {
        height: 50%;
      }
    }
    .new-message {
      width: 80%;
      margin-left: 10%;
    }
  }
}
</style>