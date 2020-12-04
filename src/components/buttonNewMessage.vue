<template>
  <div>
    <button @click="message">New message</button>
  </div>
</template>

<script>
export default {
  props: {
    chatWith: {
      type: Object,
    },
  },
  methods: {
    message() {
      console.log(this.chatWith);
      this.$store.state.homepageContentShift = "message";
      this.$store.state.newbtn = false;
      this.$store.state.messageShift = "message"
      this.$store.state.newchat = {
          "chatId":this.chatWith.id,
          "chatwith":this.chatWith.username
      }
      console.log(this.$store.state.chatList)
    },
  },
  mounted () {
  },
};
</script>

<style lang="scss" scoped>
</style>