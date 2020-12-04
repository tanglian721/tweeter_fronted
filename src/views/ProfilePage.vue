<template>
  <div class="profile">
    <div class="login">
      <div id="top">
        <div id="back">
          <img src="../assets/back.png" alt="" @click="backHome"/>
        </div>
      </div>
      <profile />
    </div>
  </div>
</template>

<script>
import profile from '../components/profile.vue';
import cookies from "vue-cookies";
export default {
  components: { profile },
  methods: {
      backHome() {
          window.history.back();
      }
  },
   mounted () {
    if( cookies.get('loginToken') == undefined) {
      this.$router.push("/login")
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .login {
    height: 100vh;
    width: 100%;
    #top {
      width: 100%;
      height: 20vh;
      background-color: #b2f7ef;

      #back {
        position: relative;
        top: 5vw;
        left: 5vw;
        width: 8vw;
        height: 8vw;
        background-color: rgba($color: #000000, $alpha: 0.5);
        border-radius: 50%;

        img {
          width: 4vw;
          margin: 2vw;
        }
      }
    }
  }
}
</style>