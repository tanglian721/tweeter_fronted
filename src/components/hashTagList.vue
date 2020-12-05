<template>
  <div class="hash">
    <h2>HASH TAG</h2>
    <div class="hashlist">
      <div class="fire">
        <img class="icon" src="../assets/flame.png" alt="" />
        <img class="icon" src="../assets/flame.png" alt="" />
        <img class="icon" src="../assets/flame.png" alt="" />
      </div>
      <div class="hashtags">
        <hashtag
          v-for="(tag, num) in hashList"
          :key="tag.hashTag"
          :tag="tag"
          :num="num"
        />
      </div>
    </div>
  </div>
</template>

<script>
import hashtag from "./hashtag.vue";
export default {
  components: { hashtag },
  data() {
    return {};
  },
  props: {
    tag: {
      type: Object,
    },
    num: {
      type: Number,
    },
  },
  computed: {
    hashList() {
      return this.$store.state.hashList;
    },
  },
};
</script>

<style lang="scss" scoped>
.hash {
  h2 {
    text-align: center;
    margin: 2vh;
    font-size: 2rem;
  }
  .hashlist {
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 80%;
    margin-left: 10%;
    .fire {
      display: grid;
      row-gap: 1vh;
      .icon {
        box-sizing: border-box;
        height: 4vh;
      }
    }
    .hashtags {
      display: grid;
      row-gap: 1vh;
    }
  }
}
@media only screen and (min-width: 1280px) {
  .hash {
    h2 {
      font-size: 1.5rem;
    }
    .hashlist {
      .fire {
        height: 4vh;
        .icon {
          box-sizing: border-box;
          height: 4.5vh;
        }
      }
      .hashtags {
        display: grid;
        row-gap: 1vh;
      }
    }
  }
}
</style>