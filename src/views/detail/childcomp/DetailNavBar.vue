<template>
  <div class="detail-nav">
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg">
          </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" :key="index" @click="itemClick(index)" :class="{active: currentIndex == index}" class="item-title">
                  {{item}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
  data () {
      return {
          titles: ['商品','参数','评论','推荐'],
          currentIndex: 0
      }
  },
  methods: {
      itemClick(index) {
          this.currentIndex = index;
      },
      backClick() {
          this.$router.go(-1);
        //   this.$router.back();
      }
  }

}
</script>

<style scoped>
.back{
    height: 20px;
    width: 20px;
    margin-left: 15px;
}
.title{
    display: flex;
    font-size: 15px;
}
.item-title{
    flex: 1;
}
.active{
    color: #ff8198;
}
</style>