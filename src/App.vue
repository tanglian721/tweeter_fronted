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
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@500&family=Lora&family=Roboto:wght@500&display=swap");
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);
* {
  margin: 0;
  padding: 0;
}
// body,html{
//   box-sizing: border-box;
//   height: 98vh;
//   box-sizing: border-box;
// }
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.desktop {
  display: none;
}

button {
  background-color: #00ffe1;
  padding: 2px 5px;
  border-radius: 5px;
  color: white;
  border: none;
  filter: drop-shadow(0px 0px 5px gray);
}
@media only screen and (min-width: 1280px) {
  .desktop {
    display: block;
  }
.mobile {
  display: none;
}
}
</style>
