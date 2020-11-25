<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&family=Lora&family=Roboto:wght@500&display=swap');
* {
  margin: 0;
  padding:0;;
}
body,html{
  height: auto;
}
#app{
  width: 100vw;
  height: auto;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
