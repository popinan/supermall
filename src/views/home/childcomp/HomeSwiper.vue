<template>
  <swiper v-if="banner.length != 0">
      <swiperitem v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="loadSwiperImg">
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
  data() {
    return {
      isLoadImg: true
    }
  },
  components: { Swiper, Swiperitem },
  methods: {
    loadSwiperImg() {
      if (this.isLoadImg) {
        this.$emit("loadSwiperImg");
        this.isLoadImg= false
      }
    }
  },
}
</script>

<style>

</style>