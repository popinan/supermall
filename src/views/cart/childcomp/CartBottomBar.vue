<template>
  <div class="bottom-menu">
      <check-button class="select-all" :isChecked="isSelectAll" @click.native="checkClick"/>
      <span @click="checkClick">全选</span>
      <span class="total-price">合计:¥{{totalPrice}}元</span>
      <span class="buy-product">去结算({{checkLength}})</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CheckButton from 'components/content/checkbutton/CheckButton.vue'
export default {
    components: {CheckButton},
    computed: {
        ...mapGetters(['getList']),
        totalPrice () {
            return this.getList.filter((item)=>{
                return item.checked;
            }).reduce((preValue,item)=>{
                return preValue+item.price*item.count 
            },0).toFixed(2);
        },
        checkLength() {
            return this.getList.filter((item)=>{
                return item.checked;
            }).length
        },
        isSelectAll() {
            if (this.getList.length == 0) {return false}
            return !(this.getList.find(item=> !item.checked))
        },
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {
                this.getList.forEach(item=>item.checked=false)
            }else{
                this.getList.forEach(item=>item.checked=true)}
        },
    },
}
</script>

<style scoped>
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
}
.bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
}
.bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
}

.bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
}
</style>