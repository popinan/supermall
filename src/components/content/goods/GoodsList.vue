<template>
  <div class="goods-list">
      <goods-list-item v-for="item in goodslist" :key="item.id"
      :goodsItem='item'></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';

export default {
  components: { GoodsListItem },
    props: {
        goodslist: {
            type: Array,
            default() {
                return [];
            }
        }
    }
}
</script>

<style>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
}
</style>