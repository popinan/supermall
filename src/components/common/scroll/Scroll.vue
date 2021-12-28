<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props:{
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        this.scroll= new BScroll(this.$refs.wrapper, {
            observeDOM: true,
            observeImage: {
                debounceTime: 100 // ms
            }, // 相当于observeImage:true
            probeType: this.probeType,
            click: true,
            pullUpLoad: this.pullUpLoad,
        });
        this.scroll.on("scroll", (pos)=>{
            this.$emit('scroll', pos)
        });
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp', ()=>{
            this.$emit('touchEnd')
            })
        };
    },
    methods: {
        scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll.refresh()
        }

    }
}
</script>

<style scoped>
</style>