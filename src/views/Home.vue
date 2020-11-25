<template>
  <div id="homepage">
    <div class="login">
      <top-bar />
      <default-list id="scroll" />
      <bottom-bar />
    </div>
    <!-- <div v-else class="unlogin">login</div> -->
  </div>
</template>

<script>
import axios from "axios";
import BottomBar from "../components/bottombar.vue";
import DefaultList from "../components/defaultList.vue";
import TopBar from "../components/topbar.vue";
export default {
  name: "Home",
  data() {
    return {
      iflogin: true,
      ifLoading: true,
    };
  },
  components: {
    DefaultList,
    TopBar,
    BottomBar,
  },
  methods: {
    loadMore() {
      this.ifLoading = false;
      axios
        .request({
          url: "http://127.0.0.1:5000/tweets",
          method: "get",
          params: {
            checkuserId: this.userId,
            index: this.$store.getters.showTweets.length,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length < 1) {
            console.log("to the end");
          } else {
            this.$store.state.defaultList = this.$store.state.defaultList.concat(
              response.data
            );
            setTimeout(() => {
              this.ifLoading = true;
            }, 1000); 
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    let div = document.getElementById("scroll");
    div.addEventListener("wheel", () => {
      console.log(div.scrollTop + div.offsetTop * 8);
      console.log(div.scrollHeight);
      if (div.scrollHeight <= div.scrollTop + div.offsetTop * 8) {
        if (this.ifLoading == true) {
          this.loadMore();
        }
      }
    });
  },
};
</script>

<style lang="scss">
#homepage {
  width: 100%;
  height: auto;
  overflow: hidden;
  .login {
    position: relative;
    // background-color: yellow;
    width: 100%;
    height: auto;
    display: grid;
    .top-bar {
      box-sizing: border-box;
      width: 100%;
      height: 10vh;
    }
    .default-list {
      box-sizing: border-box;
      width: 100%;
      height: 80vh;
      background-color: rgb(119, 244, 253);
      overflow-x: hidden;
    }
    .bottom-bar {
      box-sizing: border-box;
      width: 100%;
      height: 10vh;
    }
  }
}
</style>