<template>
  <div class="like-icon">
    <img class="like-img" @click="clearNotice" :src="like.url" alt="" />
    <div class="new" v-if="like.notice == 1"></div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  props: {
    like: {
      type: Object,
    },
  },
  methods: {
    clearNotice() {
      axios
        .request({
          url: "https://ltweet.tk/api/notice",
          method: "patch",
          data: {
            loginToken: cookies.get("loginToken"),
            likeId: this.like.id,
          },
        })
        .then((response) => {
          console.log(response.data);

          this.$set(this.like, "notice", 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.like-icon {
  position: relative;
  display: inline-block;
  .like-img {
    width: 3vh;
    height: 3vh;
    margin-right: 2vw;
    border-radius: 50%;
  }
  .new {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    top: 0;
    left: 2vh;
  }
}
</style>