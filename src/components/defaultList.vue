<template>
  <div class="default-list">
    <div id="load"></div>
    <div id="content-area">
      <single-tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
 
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import singleTweet from "./singleTweet.vue";
export default {
  components: { singleTweet },
  name: "default-list",
  data() {
    return {
      userId: "1",
      
    };
  },
  props: {
    tweet: {
      type: Object,
    },
  },
  methods: {
  },
  computed: {
    tweets() {
      return this.$store.state.defaultList;
    },
  },
  mounted () {
  },
};
</script>

<style lang="scss" scoped>
#content-area{
    height: 100%;
}
</style>