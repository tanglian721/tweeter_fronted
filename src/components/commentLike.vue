<template>
  <div class="like">
    <span v-for="like in likes" :key="like.id">
      <img class="like-img" :src="like.url" alt="" />
      <div class="new" v-if="like.notice == 1"></div>
    </span>
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
    like:{
      type: Object
    }
  },
  data() {
    return {
      likes: "",
    };
  },
  methods: {
    getLikes() {
      console.log(cookies.get("user").user_id);
      axios
        .request({
          url: "https://ltweet.tk/api/comment-likes",
          method: "get",
          params: {
            commentId: this.comment.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.likes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getLikes();
  },
};
</script>

<style lang="scss" scoped>
.like {
  height: 4vh;
  > span {
    position: relative;
    .like-img {
      height: 100%;
      margin-right: 2vw;
      border-radius: 50%;
    }
    .new {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
      top: -140%;
      right: 10%;
    }
  }
}
</style>