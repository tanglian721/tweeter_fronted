<template>
    <div>
<h3 id="profile" @click="toprofile" >
          <img src="../assets/user (2).png" alt="" />
          <span class="tabletHide">Profile</span>
        </h3>
        <h3 class="tablet">
          <img
            v-if="this.$router.history.current.path == '/'"
            src="../assets/home_A.png"
            alt=""
          />
          <img v-else src="../assets/home.png" alt="" @click="home" />
          <span class="tabletHide">Home</span>
        </h3>
        <h3 id="list">
          <img
            v-if="this.$router.history.current.path == '/userfollow'"
            src="../assets/userlist_A.png"
            alt=""
          />
          <img v-else src="../assets/userlist.png" alt=""  />
          <span class="tabletHide">Follow</span>
        </h3>
        <h3 class="tablet" id="atBtn">
          <img src="../assets/at.png" alt="" />
          <p v-if="this.newNumber > 0" id="number">{{ newNumber }}</p>
          <span class="tabletHide">Mail</span>
        </h3>
        <h3 id="topic" >
          <img src="../assets/topic_A.png" alt="" />
          <span class="tabletHide">Topic</span>
        </h3>
        <h3 id="back" class="tablet">
          <img
            v-if="topicDisplay"
            src="../assets/backBlack.png"
            alt=""
            @click="back"
          />
          <img  src="../assets/backBlack.png" alt="" @click="back" />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>