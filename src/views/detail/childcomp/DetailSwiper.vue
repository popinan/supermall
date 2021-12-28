<template>
  <swiper class="detail-swiper">
      <swiperitem v-for="item in topImages" :key="item.index">
          <img :src="item" alt="">
      </swiperitem>
  </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import Swiperitem from 'components/common/swiper/Swiperitem.vue'

export default {
  components: { Swiper, Swiperitem },
  props: {
      topImages: {
          type: Array,
          default(){
              return []
          }
      }
  },
}
</script>

<style>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
.detail-swiper img{
    height: 100%;
    width: 100%;
}
</style>