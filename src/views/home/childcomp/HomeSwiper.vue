<template>
  <swiper v-if="banner.length != 0">
      <swiperitem v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiperitem>
    </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import Swiperitem from 'components/common/swiper/Swiperitem.vue'
export default {
  name: 'HomeSwiper',
  props: {
    banner: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: { Swiper, Swiperitem },
}
</script>

<style>

</style>