<template>
  <div class="create-new">
    <img id="createBtn" src="../assets/createBtn.png" @click="createNew" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        createNew() {
            this.show =! this.show
            this.$store.state.ifnew = this.show
        }
    },
};
</script>

<style lang="scss" scoped>
.create-new {
  z-index: 200;
    position: fixed;
    top: 80vh;
    right: 15vw;
  #createBtn {
    height: clamp(40px, 15vw, 80px);
    filter: drop-shadow(2px 2px 5px gray);
  }
}
@media only screen and (min-width: 1280px) {
  .create-new {
  z-index: 200;
    position: fixed;
    top: 80vh;
    left: 15vw;
}}
</style>