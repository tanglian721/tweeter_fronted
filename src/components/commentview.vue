<template>
  <div class="single-comment" @click="clearNotice">
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
        <div class="comment-img">
          <img :src="comment.image" alt="" />
        </div>
        <div class="comment-bar">
          <div class="bar comment" @click="ifnest = !ifnest">
            <div class="icon-div">
              <img class="icon" src="../assets/comment.png" alt="" />
            </div>
            <span class="barnumber">{{ comment.com_amount }}</span>
            <div class="new" v-if="comment.newcom_amount > 0"></div>
          </div>
          <div class="bar like">
            <div class="icon-div">
              <img
                v-if="comment.iflike == '1'"
                class="icon"
                src="../assets/like-red.png"
                alt=""
                @click="deletelike"
              />
              <img
                v-else
                class="icon"
                src="../assets/like.png"
                alt=""
                @click="postlike"
              />
            </div>
            <span class="barnumber">{{ comment.like_amount }}</span>
            <div class="new" v-if="comment.newlike_amount > 0"></div>
          </div>
          <div class="bar edit" v-if="ifuser">
            <img src="../assets/edit.png" @click="edit" />
          </div>
          <div class="bar delete" v-if="ifuser">
            <comment-delete :comment="comment" @deletecomment="deletecomment" />
          </div>
        </div>
        <comment-like :comment="comment" v-if="ifuser" />
        <comment-edit
          v-if="ifedit"
          :comment="comment"
          @editcomment="editcomment"
        />
      </div>
      <div class="nest-commnet" v-if="ifnest">
        <com-commentsview
          v-for="nest_comment in nest_comments"
          :key="nest_comment.id"
          :comment="nest_comment"
          @clearComNotice="clearComNotice"
          @deletecom_comment="deletecom_comment"
        />
        <com-comment-new @newcomment="newcomment" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentDelete from "./commentDelete.vue";
import cookies from "vue-cookies";
import commentEdit from "./commentEdit.vue";
import CommentLike from "./commentLike.vue";
import ComCommentsview from "./com-commentsview.vue";
import ComCommentNew from "./com-commentNew.vue";
export default {
  components: {
    commentEdit,
    CommentDelete,
    CommentLike,
    ComCommentsview,
    ComCommentNew,
  },
  name: "commentview",
  data() {
    return {
      ifedit: false,
      ifnest: false,
      nest_comments: [],
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
      console.log(this.ifedit);
      this.ifedit = !this.ifedit;
    },
    newcomment(data) {
      this.nest_comments.unshift(data);
      this.comment.com_amount++
    },
    editcomment(data) {
      console.log(data);
      this.comment.content = data.content;
      this.comment.image = data.image;
      this.ifedit = false;
    },
    deletecomment(data) {
      this.$emit("deletecomment", data);
    },
    getNestComment() {
      axios
        .request({
          url: "https://ltweet.tk/api/com-comments",
          method: "get",
          params: {
            commentId: this.comment.id,
            userId: cookies.get("user").user_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.nest_comments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postlike() {
      console.log("post");
      axios
        .request({
          url: "https://ltweet.tk/api/comment-likes",
          method: "post",
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.id,
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
          url: "https://ltweet.tk/api/comment-likes",
          method: "delete",
          data: {
            loginToken: cookies.get("loginToken"),
            commentId: this.comment.id,
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
      if (this.comment.notice == 1) {
        axios
          .request({
            url: "https://ltweet.tk/api/notice",
            method: "patch",
            data: {
              loginToken: cookies.get("loginToken"),
              commentId: this.comment.id,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$set(this.comment, "notice", 0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    clearComNotice(){
      this.comment.newcom_amount--
    },
    deletecom_comment(data){
        for (let i = 0; i < this.nest_comments.length; i++) {
        if (this.nest_comments[i].id == data) {
          console.log(this.nest_comments[i]);
          this.nest_comments.splice(i, 1);
        }
      }
      this.comment.com_amount--;
    }
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
  mounted() {
    this.getNestComment();
  },
};
</script>

<style lang="scss" scoped>
.single-comment {
  display: grid;
  grid-template-columns: 1fr 7fr;
  margin-top: 2vh;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  filter: drop-shadow(1px 1px 5px rgba(255, 255, 255, 0.479));

  width: 100%;
  .userimg {
    width: 80%;
    justify-self: end;
    > img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
    }
    .new {
      position: absolute;
      width: 7px;
      height: 7px;
      background-color: red;
      border-radius: 50%;
      top: 0;
      left: 8vw;
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
        font-size: 0.6rem;
        font-family: "Lora", serif;
      }
    }
    .comment-content {
      border: 1px solid #f5f5f5;
      margin-top: 1vh;
      .comment-text {
        font-size: 0.9rem;
        font-family: "Catamaran", sans-serif;
      }
      .comment-img {
        display: grid;
        justify-items: center;
        > img {
          width: 80%;
          max-height: 25vh;
          object-fit: contain;
        }
      }
      .comment-bar {
        box-sizing: border-box;
        border: 1px solid #f5f5f5;
        padding-top: 1vh;
        margin-top: 1vh;
        width: 100%;
        height: 5vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .bar {
          position: relative;
          width: 90%;
          display: grid;
          grid-template-columns: auto auto;
          height: 50%;
          justify-content: center;
          img {
            margin-left: 2.2vw;
            height: 1.8vh;
          }
          span {
            font-size: 0.8rem;
            margin-left: 1vw;
          }
          .icon-div {
            display: inline;
            height: 100%;
          }
          .new {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: rgba(255, 0, 0, 0.733);
            position: absolute;
            left: 6vw;
            top: -0.5vh;
          }
        }
      }
    }
    .nest-commnet {
      margin-left: -10vw;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .single-comment {
  // display: grid;
  // grid-template-columns: 1fr 7fr;
  // margin-top: 2vh;
  // border: 1px solid #f5f5f5;
  // border-radius: 10px;
  // filter: drop-shadow(1px 1px 5px rgba(255, 255, 255, 0.479));

  // width: 100%;
  .userimg {
    // width: 80%;
    // justify-self: end;
    > img {
      width: 3vw;
      height: 3vw;
    }
    .new {
      position: absolute;
      width: 7px;
      height: 7px;
      background-color: red;
      border-radius: 50%;
      top: 0;
      left: 4vw;
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
        font-size: 1rem;
      }
      .comment-time {
        font-size: 0.8rem;
      }
    }
    .comment-content {
      .comment-text {
        font-size: 1rem;
      }
      .comment-img {
        display: grid;
        justify-items: center;
        > img {
          width: 80%;
          max-height: 25vh;
          object-fit: contain;
        }
      }
      .comment-bar {
        .bar {
          position: relative;
          width: 90%;
          display: grid;
          grid-template-columns: auto auto;
          height: 50%;
          justify-content: center;
          img {
            margin-left: 2.2vw;
            height: 1.8vh;
          }
          span {
            font-size: 0.8rem;
            margin-left: 1vw;
          }
          .icon-div {
            display: inline;
            height: 100%;
          }
          .new {
     
            left: 3.5vw;
          }
        }
      }
    }
    .nest-commnet {
      margin-left: -10vw;
    }
  }
}
}
</style>