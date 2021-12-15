<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- <swiper>
      <swiperitem v-for="item in banner" :key="item.id">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiperitem>
    </swiper> -->
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childcomp/HomeSwiper.vue'
import RecommendView from './childcomp/RecommendView.vue'

import {getHomeMultidata} from 'network/home.js'

export default {
    name: 'Home',
    components: { NavBar, HomeSwiper, RecommendView,},
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