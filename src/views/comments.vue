<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="commentList" v-for="item in user" :key="item.id">
      <div class="item">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="huifu(item)">回复</span>
        </div>
        <comments v-if="item.parent" :parent='item.parent' @replys="reply"></comments>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <bottoncom :transmission='wenzhang' :parameter='huifuitem' @click="huifuitem=null" @addcomment="appcomment"></bottoncom>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import {comment1} from '@/api/article.js'
import {comment} from '@/api/article.js'
import comments from '@/components/hm_comment_item.vue'
import bottoncom from '@/components/hm_bottom_com.vue'
import {getArticleDetail} from '@/api/article.js'
export default {
  components: {
    myheader,comments,bottoncom
  },
  data () {
      return {
          user:{

          },
          wenzhang:{

          },
          huifuitem:{

          }
      }
  },
  async mounted () {
      this.mycom()
    // window.console.log(this.user)
   let res1 = await getArticleDetail(this.$route.params.id)
        //    window.console.log(res1)
        if(res1.status===200){
            this.wenzhang = res1.data.data
        }
  },
  methods: {
        async  mycom(){
        let res = await comment1(this.$route.params.id,{
        pageIndex:1,
        pageSize:10})
        if(res.status === 200){
        this.user = res.data.data.map(value=>{
            value.user.head_img = localStorage.getItem('hema_img')+value.user.head_img
            return {...value}
        })
        }
      },
      huifu(item){
        //   window.console.log(item)
         this.huifuitem = item
      },
     async appcomment(fromdata,id){
         
         window.console.log(fromdata)
        let res = await comment(this.wenzhang.id,{
          content: fromdata,
          parent_id: id
        })
        window.console.log(res)
        this.$toast.success('成功');
        this.mycom()
      },
      reply(data){
        //   window.console.log(data)
          this.huifuitem = data
      }
  
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
