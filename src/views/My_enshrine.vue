<template>
<div id="ens">
      <myheader title='视频收藏'> <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span></myheader>
<div v-for="(value,index) in post1" :key="index.id">
    <div id="box">
    <van-swipe-cell :on-close="onClose">

  <!-- <van-cell :border="false" title="单元格" value="内容" /> -->

    <mybox :post='value'></mybox>
  <template slot="right">
    <van-button square type="danger" text="删除" class="vabtn"/>
  </template>
</van-swipe-cell>
</div>
</div>
</div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import {enshrine} from '@/api/article.js'
import mybox from '@/components/hm_articleBlock.vue'
// import {collect1} from '@/api/article.js'
// collect1
export default {
components: {
    myheader,mybox
},
data () {
    return {
        post1:{}
    }
},
async mounted () {
   let res = await enshrine()
   window.console.log(res)
   if(res.status===200){
       this.post1 = res.data.data
   }
},
methods: {
    onClose(clickPosition,name){
        
        
        if(clickPosition==='right'){
            window.console.log(name)
            // collect1()
        // this.$refs.close = true

        }
    }
}
}
</script>

<style>
    .vabtn{
        height: 100%;
    }
</style>