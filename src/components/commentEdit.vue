<template>
  <div>
    <div v-if="status == 'unsuccess'" id="false"></div>
    <div v-else-if="status == 'success'" id="success"></div>
    <div v-else id="edit">
      <div>
        <textarea name="" id="" cols="30" rows="5" v-model="content"></textarea>
        <button @click="editComment">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      status: "edit",
      content: this.comment.content,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editComment() {
      axios
        .request({
          url: "https://ltweet.tk/api/comments",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            content: this.content,
            commentId: this.comment.id,
            loginToken: cookies.get("loginToken"),
            image: this.image,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$emit("editcomment", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>