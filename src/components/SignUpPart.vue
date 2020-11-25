<template>
  <div>
    <h3>SIGN UP</h3>
    <p>Email</p>
    <input type="text" id="email" v-model="email" />
    <p>Username</p>
    <input type="text" id="username" v-model="username" />
    <p>Password</p>
    <input type="password" id="password" v-model="password" />
    <p>Birthday</p>
    <input type="text" id="birthday" v-model="birthdate" />
    <p>Bio</p>
    <textarea name="" id="bio" cols="30" rows="10" v-model="bio"></textarea>
    <p>Icon url</p>
    <input type="text" id="image" v-model="url_input" />
    <button @click="urlConfirm">confirm</button>
    <img :src="url" alt="" />
    <div id="signUpBtn" @click="signUpUser">Sign Up</div>
  </div>
</template>

<script>
import signUpApi from "axios";
export default {
  name: "sign-up-part",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      birthdate: "",
      bio: "",
      url_input: "",
      url: "",
    };
  },
  methods: {
    urlConfirm() {
      this.url = this.url_input;
    },
    signUpUser() {
      signUpApi
        .request({
          url: "http://127.0.0.1:5000/users",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: this.email,
            username: this.username,
            password: this.password,
            birthdate: this.birthdate,
            bio: this.bio,
            url: this.url
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 2vh;
}

input,
textarea {
  width: 80%;
}

#signUpBtn {
  margin-top: 1vh;
  background-color: #00ffe1;
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  filter: drop-shadow(2px 2px 5px gray);
}

@media only screen and (min-width: 768px) {
  input {
    height: 1rem;
    width: 250px;
  }

  textarea {
    width: 255px;
  }
}
</style>