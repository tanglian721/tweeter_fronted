<template>
  <div class="tag" @click="hashpage">
    <span>{{ num + 1 }}</span> .
    <span>
      {{ tag.hashTag }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
    },
    num: {
      type: Number,
    },
  },
  methods: {
    hashpage() {
      console.log("a");
      this.$router.push("/hash/" + this.tag.hashTag);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  box-sizing: border-box;
  font-size: 1.8rem;
  height: 6vh;
}
@media only screen and (min-width: 1280px) {
  .tag {
    font-size: 1.8rem;
    height: 5vh;
  }
}
</style>