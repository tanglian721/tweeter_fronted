<template>
  <div class="tweet-edit">
    <div class="editarea">
      <div  id="edit">
        <img :src="tweet.url" alt="" />
        <div>
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
          <div class="img">
            <input
              type="file"
              accept="image/*"
              @change="onchange"
              id="file-input"
            />
            <br />wqew
            <div id="url-input">
              <span>URL: </span><input type="text" v-model="url" />
            </div>
            <br />
            <img class="prewiew" v-if="url" :src="url" />
            <br />
          </div>
          <button @click="EditTweet">submit</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import TweetNewHash from "./tweetNewHash.vue";
import TweetNewAt from "./tweetNewAt.vue";

export default {
  name: "tweetedit",
  components: { TweetNewHash, TweetNewAt },
  data() {
    return {
      //   ifedit: true,
      editstatus: "",
      textContent: this.tweet.content,
      hashtags: this.$store.state.hashList,
      img: this.tweet.img,
      url:this.tweet.image,
       hashtagdisplay: false,
      usersdisplay: false,
        hashText: "#",
      atUser: "",
      users: this.$store.state.users,
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
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
    EditTweet() {
      console.log(cookies.get("loginToken"));
      axios
        .request({
          url: "https://ltweet.tk/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            content: this.textContent,
            tweetId: this.tweet.id,
            image: this.url,
            loginToken: cookies.get("loginToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          let newdata = response.data;
          for (let i = 0; i < this.$store.state.defaultList.length; i++) {
            if (this.$store.state.defaultList[i].id == newdata.tweet_id) {
              this.$set(
                this.$store.state.defaultList[i],
                "content",
                newdata.content
              );
              this.$set(
                this.$store.state.defaultList[i],
                "image",
                newdata.image
              );
            }
          }
          this.$emit("editSuccess","1")
        })
        .catch((error) => {
          console.log(error);
        });
    },
    back() {
      this.ifedit = false;
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
.tweet-edit {
  position: relative;
  .editarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 30vh;
    // position: fixed;
    background-color: #fff;
    left: 10%;
    top: 30vh;
    border-radius: 30px;
    z-index: 200;
    padding-bottom: 5%;
    #delete {
      width: 5vw;
      position: relative;
      margin: 2vh 5vw 1vh 5vw;
    }
    #text-area {
        border: 1px solid black;
        width: 90%;
        height: 10vh;
      }
    #edit {
      width: 90%;
      margin-left: 5%;
      display: grid;
      grid-template-columns: 1fr 5fr;
      > img {
        width: 80%;
        border-radius: 50%;
      }
    }
  }
  .prewiew{
    width:20vw;
    max-height: 30vw;
    object-fit: contain;

  }
}
</style>