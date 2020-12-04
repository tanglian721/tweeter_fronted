<template>
  <div @click="userSet">
    {{ user.username }}
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
      userSet() {
          console.log("as")
          this.$emit("userSet", this.user)
      }
  },
};
</script>

<style lang="scss" scoped>
</style>