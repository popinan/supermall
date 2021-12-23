<template>
  <div class="wrapper" ref="aaa">
    <ul>
      <li>列表菜单1</li>
      <li>列表菜单2</li>
      <li>列表菜单3</li>
      <li>列表菜单4</li>
      <li>列表菜单5</li>
      <li>列表菜单6</li>
      <li>列表菜单7</li>
      <li>列表菜单8</li>
      <li>列表菜单9</li>
      <li>列表菜单10</li>
      <li>列表菜单11</li>
      <li>列表菜单12</li>
      <li>列表菜单13</li>
      <li>列表菜单14</li>
      <li>列表菜单15</li>
      <li>列表菜单16</li>
      <li>列表菜单17</li>
      <li>列表菜单18</li>
      <li>列表菜单19</li>
      <li>列表菜单20</li>
      <li>列表菜单21</li>
      <li>列表菜单22</li>
      <li>列表菜单23</li>
      <li>列表菜单24</li>
      <li>列表菜单25</li>
      <li>列表菜单26</li>
      <li>列表菜单27</li>
      <li>列表菜单28</li>
      <li>列表菜单29</li>
      <li>列表菜单30</li>
      <li>列表菜单31</li>
      <li>列表菜单32</li>
      <li>列表菜单33</li>
      <li>列表菜单34</li>
      <li>列表菜单35</li>
      <li>列表菜单36</li>
      <li>列表菜单37</li>
      <li>列表菜单38</li>
      <li>列表菜单39</li>
      <li>列表菜单40</li>
      <li>列表菜单41</li>
      <li>列表菜单42</li>
      <li>列表菜单43</li>
      <li>列表菜单44</li>
      <li>列表菜单45</li>
      <li>列表菜单46</li>
      <li>列表菜单47</li>
      <li>列表菜单48</li>
      <li>列表菜单49</li>
      <li>列表菜单50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Category',
    data(){
        return {
          scroll: null,
        }
    },
    mounted() {
      this.scroll= new BScroll(this.$refs.aaa, {
        probeType: 3,
        pullUpLoad: true,
      });
      this.scroll.on('scroll', (pos) => {
        console.log(pos)
      });
      this.scroll.on('pullingUp', ()=>{
        console.log('上啦加载更多')
      })
    }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background-color:brown;
  overflow: hidden;
}
</style>