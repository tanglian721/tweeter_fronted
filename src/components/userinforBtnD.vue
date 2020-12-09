<template>
  <div class="userinfoBtnD">
    <h3 id="profile" @click="toprofile">
      <img src="../assets/user (2).png" alt="" />
      <span>Profile</span>
    </h3>
    <h3 @click="home">
      <img
        v-if="this.$router.history.current.path == '/'"
        src="../assets/home_C.png"
        alt=""
      />
      <img v-else src="../assets/home.png" alt=""  />
      <span class="tabletHide">Home</span>
    </h3>
    <h3 id="list" @click="follow">
      <img
        v-if="this.$router.history.current.path == '/userfollow'"
        src="../assets/userlist_A.png"
        alt=""
      />
      <img v-else src="../assets/userlist.png" alt="" />
      <span class="tabletHide">Follow</span>
    </h3>
    <h3 class="tablet" id="atBtn" @click="atUser">
      <img src="../assets/at.png" alt="" />
      <p v-if="this.newNumber > 0" id="number">{{ newNumber }}</p>
      <span class="tabletHide">Mail</span>
    </h3>
   
    <h3 @click="search">
      <img id="search" src="../assets/zoom.png" alt=""  />
      <span>Search</span>
    </h3>
    <h3 id="back" class="tablet">
      <img
        v-if="topicDisplay"
        src="../assets/backBlack.png"
        alt=""
        @click="back"
      />
      <img src="../assets/backBlack.png" alt="" @click="back" />
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNumber: this.$store.getters.NewAtUsers,
      topicDisplay: "",
    };
  },
  methods: {
    home() {
      if (this.$router.history.current.path != "/") {
        this.$router.push("/");
      }
      this.$store.state.homepageContentShift = "default";
      console.log(this.$store.state.homepageContentShift)
      this.$store.state.newbtn = true;
    },
    back() {
      this.$store.state.infoAppear = false;
    },
    follow() {
      this.$router.push("/followTweets");
    },
    toprofile() {
      this.$router.push("/profile");
    },
    atUser() {
      this.$store.state.homepageContentShift = "atUser";
    },
    message() {
      this.$store.state.homepageContentShift = "message";
      this.$store.state.newbtn = false;
    },
 
     search() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="scss" scoped>
.userinfoBtnD {
  margin-top: 5vh;
  margin-left: 20%;
  display: grid;
  row-gap: 2vh;
  h3 {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    img {
      width: 2.5vw;
    }
  }
}
</style>