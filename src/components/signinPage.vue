<template>
  <div>
    <div @keypress.enter="loginUser">
      <p>Username</p>
      <input type="text" id="username-input" v-model="username" />
      <p>Password</p>
      <input type="password" id="password-input" v-model="password" />
      <div id="buttons">
        <img src="../assets/enter.png" @click="loginUser" />
        <img src="../assets/signUp.png" @click="signUpForm" />
      </div>
      <facebook-logini />
      <h3>{{ loginStatus }}</h3>
    </div>
  </div>
</template>


<script>
import cookies from "vue-cookies"
import axios from "axios"
import facebookLogini from './facebookLogini.vue';
export default {
  components: { facebookLogini },
  name: "signin-page",
  data() {
      return {
          ifsignUp: false,
          username:"",
          password:"",
          loginStatus:""
      }
  },
  methods: {
      signUpForm() {
          this.ifsignUp =! this.ifsignUp
          this.$emit("signUp", this.ifsignUp)
      },
      loginUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/login",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(response => {
          console.log(response);
          this.loginStatus = "Success";
          cookies.set("loginToken", response.data.loginToken);
          cookies.set("user", response.data);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
          this.loginStatus = "Error";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: clamp(30px, 10vw, 50px);
}

#buttons {
  margin-top: 3vh;
  width: 50vw;
  display: flex;
  justify-content: space-evenly;
}

@media only screen and (min-width: 768px) {
  input {
    font-size: 1.5rem;
    height: 2rem;
    width: clamp(180px, 15vw, 250px);
  }

  p {
    font-size: 1.5rem;
    margin: 1vh 0;
  }

  #buttons {
    width: clamp(180px, 15vw, 250px);
  }
}
</style>