<template>
  <div class="single-nestcomment" @click="clearNotice">
    <div class="userimg">
      <img :src="comment.url" alt="" />
      <div class="new" v-if="comment.notice == 1"></div>
    </div>
    <div class="commentarea">
      <div class="comment-top">
        <div class="username">{{ comment.username }}</div>
        <div class="comment-time">{{ comment.created_at }}</div>
      </div>
      <div class="comment-content">
        <div class="comment-text">{{ comment.content }}</div>
        <div class="comment-bar">
          <div class="bar like">
            <div class="icon-div">
              <img
                v-if="comment.iflike == '1'"
                class="icon"
                src="../assets/heart-red.png"
                alt=""
                @click="deletelike"
              />
              <img
                v-else
                class="icon"
                src="../assets/heart.png"
                alt=""
                @click="postlike"
              />
            </div>
            <span class="barnumber">{{ comment.like_amount }}</span>
          </div>
          <div class="bar edit" v-if="ifuser">
            <img src="../assets/edit.png" @click="edit" />
          </div>
          <div class="bar delete" v-if="ifuser">
            <com-commentdelete :comment="comment" @deletecomment="deletecomment" />
          </div>
        </div>
        <com-comment-edit
          v-if="ifedit"
          :comment="comment"
          @editcomment="editcomment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import cookies from "vue-cookies";
import comCommentEdit from "./com-commentEdit.vue";
import ComCommentdelete from "./com-commentdelete.vue";
export default {
  components: { comCommentEdit, ComCommentdelete },
  data() {
    return {
      ifedit: false,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    edit() {
      this.ifedit = !this.ifedit;
    },
    postlike() {
      console.log("post");
      axios
        .request({
          url: "https://ltweet.tk/api/com-comment-likes",
          method: "post",
          data: {
            loginToken: cookies.get("loginToken"),
            com_commentId: this.comment.id,
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(this.comment.iflike);
          this.comment.iflike = "1";
          console.log(this.comment.iflike);
          this.comment.like_amount++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletelike() {
      console.log("delete");
      axios
        .request({
          url: "https://ltweet.tk/api/com-comment-likes",
          method: "delete",
          data: {
            loginToken: cookies.get("loginToken"),
            com_commentId: this.comment.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(this.comment.iflike);
          this.comment.iflike = "0";
          console.log(this.comment.iflike);
          this.comment.like_amount--;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearNotice() {
      console.log(this.comment);
      if (this.comment.notice == 1) {
        axios
          .request({
            url: "https://ltweet.tk/api/notice",
            method: "patch",
            data: {
              loginToken: cookies.get("loginToken"),
              com_commentId: this.comment.id,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$set(this.comment, "notice", 0);
            this.$emit("clearComNotice");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editcomment(data) {
      this.$set(this.comment, "content", data.content);
      this.ifedit = false;
    },
    deletecomment(data) {
      this.$emit("deletecom_comment", data);
    },
  },
  computed: {
    ifuser() {
      if (cookies.get("user").user_id == this.comment.user_id) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.single-nestcomment {
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin-top: 2vh;
  width: 100%;
  .userimg {
    width: 80%;
    justify-self: end;
    position: relative;
    > img {
      width: 3vh;
      border-radius: 50%;
    }
    .new {
      position: absolute;
      width: 7px;
      height: 7px;
      background-color: red;
      border-radius: 50%;
      top: 0;
      left: 7vw;
    }
  }
  .commentarea {
    box-sizing: border-box;
    justify-self: center;
    width: 90%;
    // border: 1px solid black;
    padding: 1vw;
    .comment-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: end;
      .username {
        font-size: 0.8rem;
        font-family: "Catamaran", sans-serif;
      }
      .comment-time {
        text-align: right;
        font-size: 0.5rem;
        font-family: "Lora", serif;
      }
    }
    .comment-content {
      border-top: 1px solid #f5f5f5;
      margin-top: 1vh;
      .comment-text {
        font-size: 0.7rem;
        font-family: "Catamaran", sans-serif;
      }
      .comment-img {
        width: 90%;
        margin-left: 5%;
        > img {
          width: 100%;
        }
      }
      .comment-bar {
        box-sizing: border-box;
        border-top: 1px solid #f5f5f5;
        padding-top: 1vh;
        margin-top: 1vh;
        width: 100%;
        height: 5vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr ;
        .bar {
          position: relative;
          width: 90%;
          display: grid;
          grid-template-columns: auto auto;
          height: 50%;
          img {
            margin-left: 2.2vw;
            height: 1.6vh;
          }
          span {
            font-size: 0.8rem;
          }
          .icon-div {
            display: inline;
            height: 100%;
          }
          .new {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(255, 0, 0, 0.733);
            position: absolute;
            left: 25px;
            top: -0.5vh;
          }
        }
      }
    }
  }
}
</style>