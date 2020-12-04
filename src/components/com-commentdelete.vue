<template>
  <div>
    <img src="../assets/trash.png" @click="deleteComment">
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteComment() {
        console.log(this.comment.id)
      axios
        .request({
          url: "https://ltweet.tk/api/com-comments",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            com_commentId: this.comment.id,
          },
        })
        .then((response) => {
          console.log(response);
          this.$emit("deletecomment", this.comment.id);
        })
        .catch((errorMessage) => {
          this.deleteStatus = false;
          this.errorInfo = errorMessage;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-left: 2.2vw;
  height: 1.8vh;
}
</style>