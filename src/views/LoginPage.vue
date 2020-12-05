<template>
  <div class="loginpage">
    <div id="img">
      <img src="../assets/logo.png" />
    </div>
    <signin-page id="login-form" @signUp="signUp" />
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutUp"
    >
      <sign-up-part v-if="ifsignUp" id="sign-up" @signUp="signUp" />
    </transition>
  </div>
</template>

<script>
import SigninPage from "../components/signinPage.vue";
import SignUpPart from "../components/SignUpPart.vue";
export default {
  name: "login-page",
  components: {
    SignUpPart,
    SigninPage,
  },
  data() {
    return {
      ifsignUp: false,
    };
  },
  methods: {
    signUp(data) {
      this.ifsignUp = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.loginpage {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  align-items: center;
  justify-items: center;

  img {
    position: relative;
    width: clamp(200px, 60vw, 300px);
    top: 10vh;
  }

  #login-form {
    position: relative;
    top: -10vh;
    align-items: center;
    justify-items: center;
    display: grid;
  }
}
@media only screen and (min-width: 768px) {
}
@media only screen and (min-width: 1280px) {
  .loginpage {
    grid-template-columns: 1fr 1fr;

    img {
      top: 0;
    }

    #login-form {
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #ADE8F4;
    }
  }
}
</style>