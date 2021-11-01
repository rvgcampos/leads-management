<template>
  <div id="app">
    <!-- <Login /> -->
    <router-view />
  </div>
</template>

<script>
// import Login from "./views/Login/Login.vue";

export default {
  name: "App",
  components: {
    // Login,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

* {
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
