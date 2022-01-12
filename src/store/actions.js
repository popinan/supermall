import {ADD_COUNTER, ADD_TO_CART} from './mutation-types';

export default {
    addCart(context, payload) {
      return new Promise((resolve, reject)=>{
        let cartItem = context.state.cartList.find(
          (item)=>{return item.iid === payload.iid });
        if(cartItem){
          context.commit(ADD_COUNTER, cartItem)
          resolve('当前商品数量+1')
        }else{
          context.commit(ADD_TO_CART, payload)
          resolve('该商品已添加至购物车')
        }
      })
    },
}