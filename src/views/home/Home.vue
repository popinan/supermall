<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {getHomeMultidata} from 'network/home.js'
export default {
    name: 'Home',
    components: { NavBar },
    data() {
      return{
        banner: [],
        recommend: [],
      }
    },
    created() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list
      })
    }
}
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
}
</style>