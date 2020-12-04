<template>
  <div class="UIBM">
    <h3 id="profile" @click="toprofile">
      <img src="../assets/user (2).png" alt="" />
      <span >Profile</span>
    </h3>
    <h3 id="follow" @click="follow">
      <img src="../assets/align-left.png" alt="" />
      <span >Follow Tweets</span>
    </h3>
    <h3 id="topic">
      <img src="../assets/topic_A.png" alt="" @click="topic"/>
      <span >Topic</span>
    </h3>
    <h3 id="back" class="tablet">
      <img src="../assets/backBlack.png" alt="" @click="back" />
    </h3>
  </div>
</template>

<script>

export default {
    methods: {
    back() {
      this.$store.state.infoAppear = false;
    },
    follow(){
      this.$router.push('/followTweets')
    },
    toprofile() {
      
      this.$router.push('/profile')
    },
    topic(){
      if (this.$router.history.current.path != "/") {
        this.$router.push("/");
        this.$store.state.homepageContentShift = 'byLike'
      } else {
        this.$store.state.homepageContentShift = 'byLike'
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.UIBM {
  display: grid;
  row-gap: 3vh;
  h3 {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    > img {
      width: 70%;
    }
  }
}
</style>