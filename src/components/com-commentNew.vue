<template>
  <div>
    <div class="userimg">
      <div v-if="status == 'unsuccess'" id="false"></div>
      <div v-else-if="status == 'success'" id="success"></div>
      <div v-else id="edit">
        <img :src="user.url" alt="" />
        <div id="area">
          <textarea
            name=""
            id=""
            cols="25"
            rows="3"
            v-model="content"
          ></textarea>
          <button @click="createComment">submit</button>
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
      status: "edit",
      content: "",
      image: "",
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createComment() {
      console.log(this.comment.id);
      console.log(this.content);
      axios
        .request({
          url: "https://ltweet.tk/api/com-comments",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.id,
            content: this.content,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$emit("newcomment", response.data);
        })
        .catch((errorMessage) => {
          this.submit = false;
          this.errorInfo = errorMessage;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#edit {
  width: 90%;
  margin-left: 5%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  column-gap: 2vw;
  > img {
    width: 3vh;
    height: 3vh;
    border-radius: 50%;
  }
}

@media only screen and (min-width: 1280px) {
  #edit {
    width: 80%;
    margin-left: 20%;
    display: grid;
    grid-template-columns: 1fr 6fr;
    justify-items: center;
    column-gap: 0;
    > img {
      width: 2vw;
      height: 2vw;
      border-radius: 50%;
    }
    #area {
      textarea {
        width: 100%;
      }
    }
  }
  button {
  font-size: 0.7rem;
  position: relative;
  left: 13vw;
}
}
</style>