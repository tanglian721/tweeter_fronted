<template>
  <div class="top-bar">
    <img id="userImg" :src="user.url" alt="" @click="infoDisplay" />
    <div>
      <img
        v-if="TrendingDisplay"
        src="../assets/trending_A.png"
        alt=""
        @click="topic"
      />
      <img v-else src="../assets/refresh.png" alt="" @click="refresh" />
    </div>
    <div id="right">
      <img id="search" src="../assets/zoom.png" alt="" @click="search" />

    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  name: "top-bar",
  data() {
    return {
      user: cookies.get("user"),
      TrendingDisplay: false,
    };
  },

  methods: {
    infoDisplay() {
      this.$store.state.infoAppear = true;
    },
    search() {
      this.$router.push("/search");
    },
    
    refresh() {
      console.log("a")
      this.$emit("refresh");
    },
    touser() {
      this.$router.push("/user/" + cookies.get("user").user_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: #fff;
  img {
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
  }
  #userImg {
    margin-left: 5vw;
    height: 6vh;
    width: 6vh;
  }
  > div {
    justify-self: center;
  }
  #right {
    position: relative;
    margin-right: 5vw;
    justify-self: end;
    #search {
      border-radius: 0;
    }
    #new {
      position: absolute;
      top: -1vh;
      right: 0;
      font-weight: bolder;
      color: red;
      font-size: 1.2rem;
    }
  }
}
</style>