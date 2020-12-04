<template>
  <div class="at-user">
      <single-tweet  v-for="tweet in tweets" :key=tweet.id :tweet="tweet"/>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import singleTweet from './singleTweet.vue';
export default {
  components: { singleTweet },
    data() {
        return {
            user: cookies.get('user'),
            tweets:this.$store.state.AtUsers
        }
    },
    props: {
        tweet: {
            type: Object,
        },
    },
  methods: {
    
  },
  mounted () {
  },
};
</script>

<style lang="scss" scoped>
</style>