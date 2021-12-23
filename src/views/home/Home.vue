<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="TabControl1" v-show="isShowTabcontrol"></tab-control>
    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="contentScroll" @touchEnd="loadMore">
      <home-swiper :banner="banner" @loadSwiperImg="loadSwiperImg"></home-swiper>
      <recommend-view :recommend="recommend" @loadRecomImg="loadRecomImg"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="TabControl2"></tab-control>
      <goods-list :goodslist="showList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childcomp/HomeSwiper.vue'
import RecommendView from './childcomp/RecommendView.vue'
import FeatureView from './childcomp/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'


export default {
    name: 'Home',
    components: { NavBar, HomeSwiper, RecommendView, FeatureView, 
    TabControl, GoodsList, Scroll, BackTop,
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
        currentType: 'pop',
        isShowTop: false,
        isShowTabcontrol: false,
        tabConOffsetTop: 0,
        saveY: 0
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
    mounted() {
      // const refresh = this.debounce(this.$refs.scroll.scroll.refresh, 100)
      // refresh()
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY);
    },
    deactivated() {
      this.saveY= this.$refs.scroll.scroll.y;
      console.log(this.saveY)
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
        };
        this.$refs.TabControl1.currentIndex = index;
        this.$refs.TabControl2.currentIndex = index;
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      contentScroll(pos) {
        this.isShowTop = -pos.y > 1000;
        this.isShowTabcontrol= -pos.y > this.tabConOffsetTop
      },

      loadMore() {
         this.getHomeGoods(this.currentType);
         this.$refs.scroll.finishPullUp()
      },

      loadSwiperImg() {
        console.log(this.$refs.TabControl2.$el.offsetTop)
        // this.tabConOffsetTop= this.$refs.TabControl2.$el.offsetTop
      },

      loadRecomImg() {
        console.log(this.$refs.TabControl2.$el.offsetTop)
        this.tabConOffsetTop= this.$refs.TabControl2.$el.offsetTop
      }

      // 防抖函数：解决某函数执行次数过多的问题
      // debounce(func, delay) {
      //   let timer = null;
      //   return function(...args) {
      //     if(timer) clearTimeout(timer);
      //     timer = setTimeout(()=>{
      //       func.apply(this, args)
      //     }, delay)
      //   };
      // },
    },
}
</script>

<style scoped>
#home {
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 9;
  position: relative;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* overflow: hidden; */
}
</style>