<template>
  <div class="chat-user" @click="toChat">
      <img :src="chatUser.chatUrl" alt="">
      <p id="name">{{chatUser.chatwith}}</p>
      <p id="new">NewMessage: {{chatUser.new}}</p>
  </div>
</template>

<script>
export default {
  props: {
    chatUser: {
      type: Object,
    },
    
    
  },
  methods: {
        toChat() {
            this.$emit("tochat", this.chatUser)
        }
    },
};
</script>

<style lang="scss" scoped>
.chat-user{
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    width: 90%;
    margin-left: 5%;
    margin-top: 3vh;
    align-items: center;
    img{
        height: 6vh;
        border-radius: 50%;
    }
    #name{
        font-size: 1.5rem;
      font-family: "Catamaran", sans-serif;
      margin-left: 2vw;

    }
    #new{
        justify-self: end;
    }
}
@media only screen and (min-width: 1280px) {
.chat-user{
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    width: 80%;
    margin-left: 10%;
    margin-top: 2vh;
    align-items: center;
    border: 1px solid #f5f5f5;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 30px;
    img{
        height: 3vw;
        width: 3vw;
        border-radius: 50%;
    }
    #name{
        font-size: 1.2rem;
      font-family: "Catamaran", sans-serif;
      margin-left: 2vw;

    }
    #new{
      font-size: 0.8rem;
        justify-self: end;
    }
}
}
</style>