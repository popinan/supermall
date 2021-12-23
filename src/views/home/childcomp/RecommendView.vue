<template>
  <div class="recommend">
      <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" @load="loadRecomImg"><div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        recommend: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            isLoadImg: true
        }
    },
    methods: {
      loadRecomImg() {
        if (this.isLoadImg) {
            this.$emit("loadRecomImg");
            this.isLoadImg= false
        }
      }  
    },
}
</script>

<style>
.recommend {
    display: flex;
    text-align: center;
    padding: 10px 0px 20px;
    border-bottom: 10px solid #eee
}
.recommend-item {
    flex: 1;
    margin: 5px;
    font-size: 14px;
}
.recommend-item img{
    margin-bottom: 10px;
}
</style>