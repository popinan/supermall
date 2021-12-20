<template>
  <div id="home">
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
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"
    @tabClick="tabClick"></tab-control>
    <goods-list :goodslist="showList"></goods-list>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childcomp/HomeSwiper.vue'
import RecommendView from './childcomp/RecommendView.vue'
import FeatureView from './childcomp/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'


export default {
    name: 'Home',
    components: { NavBar, HomeSwiper, RecommendView, FeatureView, 
    TabControl, GoodsList,
    },
    data() {
      return{
        banner: [],
        recommend: [],
        goods:{
          pop:{page:0, list:[]},
          new:{page:0, list:[]},
          sell:{page:0, list:[]},
        },
        currentType: 'pop'
      }
    },
    created() {
      // 1.请求swiper数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showList() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      getHomeMultidata() {getHomeMultidata().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list
      })},
      getHomeGoods(type) {
        this.goods[type].page += 1;
        getHomeGoods(type, this.goods[type].page).then(res =>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
      })},

      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
    },
}
</script>

<style>
#home {
  padding-top:44px;
}
.home-nav {
  background-color: var(--color-tint);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>