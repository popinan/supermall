<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <!-- <router-view/> -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="showTabBar" ignore></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';
export default {
  name: "App",
  components: {
    MainTabBar,
  },
  computed: {
    showTabBar() {
      // console.log(this.$route.path.indexOf('/detail'))
      return this.$route.path.indexOf('/detail') == -1
    }
  },
};
</script>

<style>
  @import 'assets/css/base.css' ;
</style>
