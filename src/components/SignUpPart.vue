<template>
  <div class="sign-up">
    <div class="bg">
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
      <textarea name="" id="bio" cols="30" rows="5" v-model="bio"></textarea>
      <br />
      <br />
      <input type="file" accept="image/*" @change="onchange" id="file-input" />
      <br />
      <div id="url-input">
        <span>URL: </span><input type="text" v-model="url" />
      </div>
      <img class="prewiew" v-if="url" :src="url" />
      <br />
      <div>
        <button id="signUpBtn" @click="signUpUser">Sign Up</button>
        <button id="back" @click="back">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from "form-data";
import axios from "axios";
export default {
  name: "sign-up-part",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      birthdate: "",
      bio: "",
      file: "",
      url: "",
      path:"",
    };
  },
  methods: {
    onchange(e) {
      const file = e.target.files[0];
      console.log(file.name);
      let formData = new FormData();
      formData.set("file", file);
      axios
        .post("https://ltweet.tk/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response)
            this.url = "https://ltweet.tk/img/"+file.name;
        
        });
    },
    signUpUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/users",
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
            url: this.url,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    back() {
      this.$emit("signUp", false);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.sign-up {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  .bg {
    box-sizing: border-box;
    width: 90%;
    position: absolute;
    border: 1px solid gray;
    padding: 5vw;
    background-color: white;
    border-radius: 5vw;
    display: grid;
    align-items: center;
    justify-items: center;
    filter: drop-shadow(10px 10px 15px gray);

    h3 {
      margin-bottom: 2vh;
    }

    input,
    textarea {
      width: 80%;
    }
    .prewiew {
      width: 30vw;
      height: 30vw;
      object-fit: contain;
    }
    #signUpBtn,
    #back {
      margin: 0 5vw;
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
  }
}
#url-input {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 8fr;
  column-gap: 2vw;
}
</style>