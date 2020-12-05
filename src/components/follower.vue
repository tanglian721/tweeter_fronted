<template>
  <div class="follows" @click="clearNotice">

    <img :src="follow.url" alt="" />
    <div class="new" v-if="follow.notice == 1"></div>
    <div class="content">
      <div class="top">
        <span class="name">{{ follow.username }}</span>
        <span class="email">{{ follow.email }}</span>
      </div>
      <div class="bottom">
        {{ follow.bio }}
      </div>
    </div>
    <!-- <buttom-follow id="follow" :follow="follow" @reget="reget" /> -->
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
// import buttomFollow from "./buttomFollow.vue";
export default {
  components: { 
    // buttomFollow 
    },
  props: {
    follow: {
      type: Object,
      required: true,
    },
  },
  methods: {
    reget() {
      console.log("2");
      this.$emit("reget");
    },
    clearNotice() {
      if (this.follow.notice == 1) {
        axios
          .request({
            url: "https://ltweet.tk/api/notice",
            method: "patch",
            data: {
              loginToken: cookies.get("loginToken"),
              followingId: this.follow.id,
            },
          })
          .then((response) => {
            this.likes = response.data;
            this.$set(this.follow, "notice", 0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.follows {
  box-sizing: border-box;
  width: 90%;
  margin-top: 2vh;
  margin-left: 5%;
  //   background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
  border: 1px solid bisque;
  border-radius: 30px;
  box-shadow: 0 0 15px wheat;
  padding: 2vw 3vw;
  position: relative;
  > img {
    height: 6vh;
    width: 6vh;
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
  .content {
    margin-left: 5vw;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    .top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .email {
        font-size: 0.8rem;
        margin-left: 5vw;
      }
    }
  }

  #follow {
    justify-self: end;
  }
}
@media only screen and (min-width: 1280px) {
  .follows {
    box-sizing: border-box;
    width: 90%;
    margin-top: 2vh;
    margin-left: 5%;
    //   background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 4fr 2fr;
    align-items: center;
    border: 1px solid bisque;
    border-radius: 30px;
    box-shadow: 0 0 15px wheat;
    padding: 20px 30px;
    position: relative;
    > img {
      height: 3vw;
      width: 3vw;
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
    .content {
      margin-left: 1vw;
      display: grid;
      grid-template-rows: 1fr 1fr;
      font-size: 0.9rem;
      .top {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .email {
          font-size: 0.8rem;
          margin-left: 2vw;
        }
      }
    }

    #follow {
      justify-self: end;
    }
  }
}
</style>