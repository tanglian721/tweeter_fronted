<template>
  <div class="profile-view">
    <img id="userImg" :src="user.url" alt="" />
    <span id="editBtn" @click="ifedit"> Edit Profile </span>
    <div id="userInfo">
      <p id="user">
        Username:
        <input v-if="edit" type="text" v-model="username" />
        <span v-else>{{ username }}</span>
      </p>
      <p id="email">
        Email:
        <input v-if="edit" type="text" v-model="email" />
        <span v-else>{{ email }}</span>
      </p>
      <p id="birthday">
        birthdate:
        <input v-if="edit" type="text" v-model="birthdate" />
        <span v-else>{{ birthdate }}</span>
      </p>
      <p id="bio">
        Bio:
        <textarea class="bio" v-if="edit" type="text" v-model="bio"></textarea>
        <span class="bio" v-else>{{ bio }}</span>
      </p>
      <p id="follow">
        <span id="following">following : 2</span>
        <span id="follower"> follower :4</span>
      </p>
      <div class="icon" v-if="edit">
        <input
          type="file"
          accept="image/*"
          @change="onchange"
          id="file-input"
        />
        <br />
        <div id="url-input">
          <span>URL: </span><input type="text" v-model="url" />
        </div>
        <br />
        <img class="prewiew" v-if="url" :src="url" />
        <br />
      </div>
      <!-- <portrait-set v-if="edit" id="portrait-set"></portrait-set> -->
    </div>
    <span id="submit" v-if="edit" @click="editProfile">Submit</span>
    <span id="password" v-if="edit" @click="inputPassword">Delete</span>
    <div v-if="deleteShow" id="deleteConfirm">
      <h2 v-if="deleteFalse == 'failed'">Delete failed!</h2>
      <h2 v-else-if="deleteFalse == 'success'">Delete Success!</h2>
      <div v-else>
        <p>Please input your password:</p>
        <input type="password" v-model="password" />
        <div id="btns">
          <span id="deleteBTN" @click="back">Back</span>
          <span id="deleteBTN" @click="deleteUser">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      user: cookies.get("user"),
      username: cookies.get("user").username,
      email: cookies.get("user").email,
      birthdate: cookies.get("user").birthdate,
      bio: cookies.get("user").bio,
      url: cookies.get("user").url,
      edit: false,
      deleteShow: false,
      deleteFalse: "on",
      password: "",
    };
  },
  methods: {
    ifedit() {
      console.log(this.edit);
      this.edit = !this.edit;
    },
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
          console.log(response);
          this.url = "https://ltweet.tk/img/" + file.name;
        });
    },
    editProfile() {
      axios
        .request({
          url: "https://ltweet.tk/api/users",
          method: "patch",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            email: this.email,
            username: this.username,
            birthdate: this.birthdate,
            bio: this.bio,
            url: this.url,
            userId: this.user.user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          cookies.set("user", response.data);
          this.edit = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    inputPassword() {
      this.deleteShow = "password";
    },
    deleteUser() {
      axios
        .request({
          url: "https://ltweet.tk/api/users",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            password: this.password,
          },
        })
        .then((response) => {
          console.log(response.data);
          cookies.remove("user");
          cookies.remove("loginToken");
          this.$router.push("/login");
          this.deleteFalse == "success";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-view {
  position: relative;
  #userImg {
    width: 25vw;
    position: relative;
    top: -13vw;
    left: 10vw;
    border-radius: 50%;
  }

  #editBtn {
    border: 1px solid black;
    border-radius: 1rem;
    padding: 3px;
    position: absolute;
    top: 1vh;
    right: 5vw;
  }

  #userInfo {
    position: relative;
    left: 10vw;

    p {
      width: 70%;
      font-size: 1.2rem;
      margin-bottom: 2vh;
    }
  }

  .bio {
    width: 50vw;
    height: 20vw;
  }

  #submit,
  #password {
    position: relative;
    background-color: #b2f7ef;
    border: none;
    color: white;
    padding: 0.4rem;
    border-radius: 04rem;
    margin-left: 10vw;
    top: 4vh;
    filter: drop-shadow(2px 2px 5px gray);

    &:active {
      filter: none;
    }
  }

  #portrait-set {
    width: 70vw;
  }

  #deleteConfirm {
    box-sizing: border-box;
    padding: 30px;
    border-radius: 30px;
    background-color: white;
    filter: drop-shadow(2px 2px 5px gray);
    position: fixed;
    top: 30vh;
    width: 60%;
    left: 20%;

    #btns {
      display: flex;
      justify-content: space-evenly;

      #deleteBTN {
        border: none;
        color: white;
        padding: 0.4rem;
        border-radius: 04rem;
        margin-top: 2vh;
        position: relative;
        background-color: #b2f7ef;
        filter: drop-shadow(2px 2px 5px gray);

        &:active {
          filter: none;
        }
      }
    }
  }
}
.prewiew {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}
</style>