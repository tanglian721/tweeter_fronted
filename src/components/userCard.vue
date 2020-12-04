<template>
  <div class="card">
    <div class="top">
      <img :src="user.url" alt="" />
      <div v-if="ifuser" class="button">
        <button-follow-card :user_id="user.id"/>
        <button-new-message :chatWith="user" />
      </div>
    </div>
    <div class="bottom">
      <span>{{ user.username }}</span>
      <span class="birth">{{ user.birthdate }}</span>
      <p>{{ user.email }}</p>
      <P>Bio: {{ user.bio }}</P>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import buttonNewMessage from "./buttonNewMessage.vue";
import ButtonFollowCard from "./buttonFollowCard.vue";
import cookies from "vue-cookies";
export default {
  components: { buttonNewMessage, ButtonFollowCard },
  data() {
    return {
      user: {},
      ifuser:false
    };
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
    chatWith: {
      type: Object,
    },
    user_id: {
      type: Number,
    }
  },
  methods: {
    getUser() {
      console.log(this.tweet);
      axios
        .request({
          url: "https://ltweet.tk/api/users",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: this.tweet.user_id,
          },
        })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getUser();
    if(this.tweet.user_id != cookies.get('user').user_id){
      this.ifuser = true
    }
    console.log(this.user)
  },

};
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: #fff;
  border-radius: 30px;
  z-index: 100;
  filter: drop-shadow(0 0 15px black);
  .top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    img {
      width: 18vw;
      height: 18vw;
      border-radius: 50%;
    }
    .button {
      display: grid;
      row-gap: -10px;
    }
  }
  .bottom {
    font-size: 1rem;
    font-family: "Catamaran", sans-serif;
    .birth {
      margin-left: 20px;
    }
  }
}
</style>