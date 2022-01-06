import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue()  使用事件总线，写在此处
// this.$bus.$emit("事件名称", 参数)  向事件总线发射事件，写在子/孙组件中
// this.$bus.$on("事件名称", (参数)=>{}) 监听事件总线中的事件，写在父组件中

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
