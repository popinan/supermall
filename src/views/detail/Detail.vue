<template>
  <div>
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-images-info :detailInfo="detailInfo"/>
      <detail-params-info :itemParams="itemParams"/>
  </div>
</template>

<script>
import DetailNavBar from './childcomp/DetailNavBar.vue'
import DetailSwiper from './childcomp/DetailSwiper.vue'
import DetailBaseInfo from './childcomp/DetailBaseInfo.vue'
import DetailShopInfo from './childcomp/DetailShopInfo.vue'
import DetailImagesInfo from './childcomp/DetailImagesInfo.vue'
import DetailParamsInfo from './childcomp/DetailParamsInfo.vue'

import {getDetailData, Goods} from 'network/detail.js'

export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailImagesInfo, DetailParamsInfo },
    data () {
        return {
            id: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            itemParams: {},
        }
    },
    activated () {
        // console.log('detail activated')
        this.id= this.$route.query.id
        if(this.id) {
            getDetailData(this.id).then(res => {
            console.log(res);
            // 1.获取数据
            const data = res.result
            // 2.取出轮播图数据
            this.topImages = data.itemInfo.topImages;
            // 3.创建商品对象
            this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 4.取出店铺数据
            this.shopInfo = data.shopInfo
            // 5.取出商品图片信息
            this.detailInfo = data.detailInfo
            // 6.取出商品参数信息
            this.itemParams = data.itemParams
            }) 
        };
    },
}
</script>

<style>

</style>