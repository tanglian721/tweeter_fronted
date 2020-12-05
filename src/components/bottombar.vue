<template>
  <div class="bottom-bar">
    <div>
      <img
        v-if="this.$router.history.current.path == '/'"
        src="../assets/home_C.png"
        alt=""
        @click="home"
      />
      <img v-else src="../assets/home.png" alt="" @click="home" />
    </div>
    <div>
      <img id="message" src="../assets/message.png" alt="" @click="message" />
      <div id="new" v-if="this.$store.getters.newChat > 0">
        {{ this.$store.getters.newChat }}
      </div>
    </div>
    <div id="at" @click="atUser">
      <img src="../assets/at.png" alt="" />
      <p v-if="this.newNumber > 0" id="number">{{ newNumber }}</p>
    </div>
    <div>
      <img
        v-if="topicDisplay"
        src="../assets/backBlack.png"
        alt=""
        @click="toall"
      />
      <img v-else src="../assets/backBlack.png" alt="" @click="back" />
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom-bar",
  data() {
    return {
      // newNumber: this.$store.getters.NewAtUsers,
      topicDisplay: "",
    };
  },
  methods: {
    home() {
      if (this.$router.history.current.path != "/") {
        this.$router.push("/");
      }
      this.$store.state.homepageContentShift = "default";
      console.log(this.$store.state.homepageContentShift);
      this.$store.state.newbtn = true;
    },
    userFollow() {
      this.$store.state.homepageContentShift = "hash";
    },
    message() {
      this.$store.state.homepageContentShift = "message";
      this.$store.state.newbtn = false;
    },
    atUser() {
      this.$store.state.homepageContentShift = "atUser";
    },
    back() {
      window.history.back();
    },
    test() {
      console.log(this.icon);
    },
    toall() {},
  },
  computed: {
    newNumber() {
     return this.$store.getters.NewAtUsers
    },
  },
  mounted() {
    console.log(this.newNumber);
  },
};
</script>

<style lang="scss" scoped>
.bottom-bar {
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr;
  align-items: center;
  justify-items: center;
  > div {
    position: relative;
  }
  img {
    height: 4vh;
  }
  #at {
    position: relative;
    #number {
      font-size: 2rem;
      color: red;
      position: absolute;
      right: -1vw;
      top: -2vh;
    }
  }
  #new {
    position: absolute;
    color: crimson;
    right: -1vh;
    top: -1vh;
    font-weight: bolder;
  }
}
</style>