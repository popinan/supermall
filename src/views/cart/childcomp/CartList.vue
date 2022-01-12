<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
          <cart-list-item v-for="(item, index) in getList" :key="index" :product="item"/>
      </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
  components: { Scroll,CartListItem },
  computed: {
      ...mapGetters(['getList'])
  },
  activated() {
      this.$refs.scroll.refresh()
  },

}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 44px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>