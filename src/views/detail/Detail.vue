<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"></detail-nav-bar>
      <scroll class="detail-content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goodsInfo"></detail-base-info>
        <detail-shop-info :shop="shopInfo"></detail-shop-info>
        <detail-images-info :detailInfo="detailInfo" @loadDetailImg="loadDetailImg"/>
        <detail-params-info :itemParams="itemParams" ref="params"/>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
        <goods-list :goodslist="recommends" ref="recommend"/>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowTop"/>
  </div>
</template>

<script>
import {getDetailData, Goods, getRecommendData} from 'network/detail.js'
import {debounce} from 'common/utils/utils.js'
import {backTopMixin} from 'common/mixin.js'

import DetailNavBar from './childcomp/DetailNavBar.vue'
import DetailSwiper from './childcomp/DetailSwiper.vue'
import DetailBaseInfo from './childcomp/DetailBaseInfo.vue'
import DetailShopInfo from './childcomp/DetailShopInfo.vue'
import DetailImagesInfo from './childcomp/DetailImagesInfo.vue'
import DetailParamsInfo from './childcomp/DetailParamsInfo.vue'
import DetailCommentInfo from './childcomp/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailBottomBar from './childcomp/DetailBottomBar.vue'


export default {
    name: "Detail",
    components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailImagesInfo, DetailParamsInfo, DetailCommentInfo, GoodsList, Scroll, DetailBottomBar, },
    data () {
        return {
            id: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            itemParams: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            currentIndex: 0,
        }
    },
    mixins: [backTopMixin],
    created () {
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
            // 7.取出商品评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
                }
            });
            getRecommendData().then(res => {
                console.log(res);
                this.recommends = res.data.list;
            });
            // this.$bus.$on('loadItemImg', ()=>{
            //     // this.themeTopYs= []
            //     this.themeTopYs[0] = 0
            //     this.themeTopYs[1] = this.$refs.params.$el.offsetTop;
            //     this.themeTopYs[2] = this.$refs.comment.$el.offsetTop;
            //     this.themeTopYs[3] = this.$refs.recommend.$el.offsetTop;
            // })
        };
    },
    methods: {
        loadDetailImg() {
            console.log('--');
            this.$refs.scroll.refresh();
            debounce(()=>{
                this.themeTopYs[0] = 0
                this.themeTopYs[1] = this.$refs.params.$el.offsetTop;
                this.themeTopYs[2] = this.$refs.comment.$el.offsetTop;
                this.themeTopYs[3] = this.$refs.recommend.$el.offsetTop;
                this.themeTopYs[4] = Number.MAX_VALUE
                console.log(this.themeTopYs)
            },150)()
        },
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44)
        },
        contentScroll(pos) {
            const length = this.themeTopYs.length;
            for (let i=0; i<length-1; i++ ) {
                if (( this.currentIndex != i)&(-pos.y>=this.themeTopYs[i])&(-pos.y<this.themeTopYs[i+1])) {
                    // console.log(i)
                    this.currentIndex = i
                    this.$refs.detailnav.currentIndex = i
                }
            };
            this.isShowTop = -pos.y > 1000
        },
        addToCart() {
            const cartGoods = {}
            cartGoods.desc = this.goodsInfo.desc
            cartGoods.price = this.goodsInfo.realPrice
            cartGoods.image = this.topImages[0]
            cartGoods.title = this.goodsInfo.title
            cartGoods.iid = this.id
            this.$store.dispatch('addCart', cartGoods).then((res)=>{
                this.$toast.show(res, 2000)
            })
        },
    },
}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background: #fff;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
}
.detail-content {
    height: calc(100% - 44px - 49px);
}
</style>