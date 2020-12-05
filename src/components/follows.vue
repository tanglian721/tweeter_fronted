<template>
  <div class="follows">
    <img :src="follow.url" alt="" />
    <div class="content">
      <div class="top">
        <span class="name">{{ follow.username }}</span>
        <span class="email">{{ follow.email }}</span>
      </div>
      <div class="bottom">
        {{ follow.bio }}
      </div>
    </div>
    <buttom-follow id="follow" :follow="follow" @reget="reget"/>
  </div>
</template>

<script>

import buttomFollow from "./buttomFollow.vue";
export default {
  components: { buttomFollow },
  data() {
      return {
      }
  },
  props: {
    follow: {
      type: Object,
      required: true,
    },
    
  },
  methods: {
      reget(){
          console.log("2")
          this.$emit("reget")
      }
      
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
  border:1px solid bisque;
  border-radius: 30px;
  box-shadow: 0 0 15px wheat;
  padding: 2vw 3vw;
  > img {
    height: 6vh;
    border-radius: 50%;
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