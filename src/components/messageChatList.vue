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
</style>