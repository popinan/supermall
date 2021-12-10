<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <router-view/>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
  @import 'assets/css/base.css' ;
</style>
