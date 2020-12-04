<template>
  <div @click="hashSet">{{hashtag.hashTag}}</div>
</template>

<script>
export default {
  props: {
    hashtag: {
      type: Object,
    },
  },
  methods: {
      hashSet() {
          console.log("as")
          this.$emit("hashSet", this.hashtag.hashTag)
      }
  },
};
</script>

<style lang="scss" scoped>
</style>