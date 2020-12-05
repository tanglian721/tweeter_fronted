<template>
  <div class="new-tweet">
    <div class="bg">
      <img id="delete" @click="disappear" src="../assets/delete.png" alt="" />
      <div v-if="status == 'unsuccess'" id="false"></div>
      <div v-else-if="status == 'success'" id="success"></div>
      <div v-else id="edit">
        <img :src="icon" alt="" />
        <div>
          <div
            id="text-area"
            contenteditable="true"
            @blur="onEdit"
            v-html="textContent"
            @keypress.@="getusers"
            @keypress.#="hashTag"
          ></div>
          <br />
          <div class="img-area">
            <input
              type="file"
              accept="image/*"
              @change="onchange"
              id="file-input"
            />
            <br />
            <div id="url-input">
              <br />
              <span>URL: </span><input type="text" v-model="url" />
            </div>
            <br />
            <img class="prewiew" v-if="url" :src="url" />
          </div>
          <div class="hash" v-if="hashtagdisplay">
            <input
              @click="hashTagEnd"
              id="hashTag-text"
              v-model="hashText"
              @keydown.enter="hashTagEnd"
            />
            <tweet-new-hash
              v-for="hashtag in hashtags"
              :key="hashtag.hashtag"
              :hashtag="hashtag"
              @hashSet="hashSet"
            />
          </div>
          <div class="at" v-if="usersdisplay">
            <tweet-new-at
              v-for="user in users"
              :key="user.id"
              :user="user"
              @userSet="userSet"
            />
          </div>

          <button @click="createTweet">submit</button>
          <retweetview
            v-if="this.$store.state.newRetweet != ''"
            :retweet="this.$store.state.newRetweet"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import Retweetview from ".//retweetview";
import TweetNewHash from "./tweetNewHash.vue";
import TweetNewAt from "./tweetNewAt.vue";
export default {
  components: { Retweetview, TweetNewHash, TweetNewAt },
  name: "tweet-new",
  data() {
    return {
      status: "",
      textContent: "",
      icon: cookies.get("user").url,
      hashtags: this.$store.state.hashList,
      hashtagdisplay: false,
      usersdisplay: false,
      hashText: "#",
      atUser: "",
      users: this.$store.state.users,
      file: "",
      url: "",
    };
  },
  props: {
    retweet: {
      type: Number,
    },
    hashtag: {
      type: Object,
    },
    user: {
      type: Object,
    },
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
          console.log(response);
          this.url = "https://ltweet.tk/img/" + file.name;
        });
    },
    createTweet() {
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            content: this.textContent,
            image: this.url,
            retweetId: this.$store.state.newRetweet.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.state.defaultList.unshift(response.data);
          if (this.hashText != "#") {
            this.createhash(response.data.id);
          }
          console.log(this.atUser);
          if (this.atUser != "") {
            console.log("1");
            this.createAt(response.data.id);
          }
          this.$store.state.ifnew = false;
          this.$store.state.newRetweet = "";
        })
        .catch((errorMessage) => {
          this.submit = false;
          this.errorInfo = errorMessage;
        });
    },
    createhash(data) {
      console.log(this.hashText);
      axios
        .request({
          url: "http://127.0.0.1:5000/hash",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            hash: this.hashText,
            tweetId: data,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((errorMessage) => {
          this.submit = false;
          this.errorInfo = errorMessage;
        });
    },
    createAt(data) {
      console.log("2");
      axios
        .request({
          url: "http://127.0.0.1:5000/@",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            atId: this.atUser,
            tweetId: data,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((errorMessage) => {
          this.submit = false;
          this.errorInfo = errorMessage;
        });
    },
    disappear() {
      console.log("a");
      this.$store.state.ifnew = false;
      console.log(this.$store.state.ifnew);
      this.$store.state.newRetweet = "";
    },
    onEdit(event) {
      this.textContent = event.target.innerHTML;
      console.log(this.content);
    },
    hashTag() {
      this.hashtagdisplay = true;
      setTimeout(() => {
        document.getElementById("hashTag-text").focus();
      }, 200);
    },
    hashTagEnd() {
      this.textContent =
        this.textContent.slice(0, this.textContent.length - 1) +
        "<a class='hash' href='#/hash/" +
        this.hashText.slice(1, this.hashText.length) +
        "'><u>" +
        this.hashText +
        "</u></a> &nbsp";
      this.hashText = this.hashText.slice(1, this.hashText.length);
      this.hashtagdisplay = false;
    },
    hashSet(data) {
      console.log(this.textContent);
      this.textContent =
        this.textContent.slice(0, this.textContent.length - 1) +
        "<a class='hash' href='#/hash/" +
        data +
        "'><u>#" +
        data +
        "</u></a> &nbsp";
      this.hashText = data;
      this.hashtagdisplay = false;
      console.log(this.textContent);
    },
    getusers() {
      this.usersdisplay = true;
    },
    userSet(data) {
      this.textContent =
        this.textContent.slice(0, this.textContent.length - 1) +
        "<a class='calluser' href='#/user/" +
        data.id +
        "'><u>@" +
        data.username +
        "</u></a> &nbsp";
      this.atUser = data.id;

      this.usersdisplay = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.new-tweet {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.26);
  display: grid;
  align-items: center;
  justify-items: center;
  .bg {
    box-sizing: border-box;
    width: 80%;
    min-height: 30vh;
    background-color: #fff;
    border-radius: 30px;
    z-index: 99;
    padding-bottom: 5%;
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.788));
    #delete {
      width: 5vw;
      position: relative;
      margin: 2vh 5vw 1vh 5vw;
    }
    #edit {
      width: 90%;
      margin-left: 5%;
      display: grid;
      grid-template-columns: 1fr 5fr;
      > img {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
      }
      #text-area {
        border: 1px solid black;
        width: 90%;
        height: 15vh;
      }
      .img-area {
        .prewiew {
          width: 50%;
          max-height: 30vh;
          object-fit: contain;
        }
      }
      .hash {
        height: auto;
      }
    }
  }
}
@media only screen and (min-width: 1280px) {
  .new-tweet {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.26);
    display: grid;
    align-items: center;
    justify-items: center;
    .bg {
      box-sizing: border-box;
      width: 50%;
      min-height: 30vh;
      background-color: #fff;
      border-radius: 30px;
      z-index: 99;
      padding-bottom: 5%;
      filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.788));
      #delete {
        width: 2vw;
        position: relative;
        margin: 2vh 5vw 1vh 5vw;
      }
      #edit {
        width: 90%;
        margin-left: 5%;
        display: grid;
        grid-template-columns: 1fr 5fr;
        > img {
          width: 4vw;
          height: 4vw;
          border-radius: 50%;
        }
        #text-area {
          border: 1px solid black;
          width: 90%;
          height: 15vh;
        }
        .img-area {
          .prewiew {
            width: 50%;
            max-height: 30vh;
            object-fit: contain;
          }
        }
        .hash {
          height: auto;
        }
      }
    }
  }
}
</style>