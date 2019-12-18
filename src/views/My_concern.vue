<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list" v-for="(item,index) in Mydata" :key="item.id">
      <div class="box">
        <img :src="item.head_img" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancel(item.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/hm_header.vue";
import {Myconcern} from '@/api/article.js'
import {Unfriended} from '@/api/article.js'
export default {
    data () {
        return {
            Mydata:[]
        }
    },
  components: {
    myheader
  },
  async mounted () {
    let res = await Myconcern()
    // window.console.log(res)
    if(res.status===200){
        this.Mydata = res.data.data.map(value=>{
            value.head_img = localStorage.getItem('hema_img')+value.head_img
            return {...value}
        })
    }
    window.console.log(this.Mydata)
  },
  methods: {
     async cancel(id,index){
         let res = await Unfriended(id)
         window.console.log(res)
         if(res.status===200){
            //  alert(index)
         this.Mydata.splice(index,1)
         }
      }
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>