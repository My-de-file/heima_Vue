<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
    <span :class='{active:mydata.has_follow}' @click="attention">{{mydata.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{mydata.title}}</div>
      <div class="desc">
        <span>{{mydata.user&&mydata.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-19</span>
      </div>
      <div class="content" v-if="mydata.type===1" v-html="mydata.content"></div>
      <video v-if="mydata.type===2" v-html="mydata.content" controls></video>
      <div class="opt">
        <span class="like" @click="Likede" :class='{atciv1:mydata.has_like}'>
          <van-icon name="good-job-o" />
          {{mydata.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(item, index) in comment1" :key="index">
        <div class="head">
          <img :src='item.user.head_img?item.user.head_img:imgs' alt />
          <!--   ../assets/logo.png-->
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <bottoncom v-if='mydata.content' :transmission='mydata' @click="fabu"></bottoncom>
  </div>
</template>

<script>
import {getArticleDetail} from '@/api/article.js'
import {attention1} from '@/api/article.js'
import {Unfriended} from '@/api/article.js'
import {Like} from '@/api/article.js'
import bottoncom from '@/components/hm_bottom_com.vue'
import {comment1} from '@/api/article.js'
import {comment} from '@/api/article.js'
export default {
    data () {
        return {
            mydata:{},
            comment1:{},
            imgs:'/img/logo.82b9c7a5.png',
        }
    },
    components: {
      bottoncom
    },
  async mounted () {
    // if(localStorage.getItem('hema_img')){
    //   this.imgs = localStorage.getItem('hema_img')
    // }else{
    //   this.imgs = "../assets/logo.png"
    // }
    
    //   window.console.log(this.$route.params.id)
     let res = await getArticleDetail(this.$route.params.id)
    //  window.console.log(res)
     if(res.status===200){
         this.mydata = res.data.data
     }
     window.console.log(this.mydata)
     let res2 = await comment1(this.mydata.id)
    //  window.console.log(res2)
    if(res2.status===200){
      window.console.log(res2.data.data)
      this.comment1 = res2.data.data.map((value)=>{
          if(value.user.head_img){
           value.user.head_img = localStorage.getItem('hema_img')+value.user.head_img
           }
           return{
             ...value,
           }
         })
      // window.console.log(this.comment1)
    }
    },
    methods: {
        async  attention(){
            if(this.mydata.has_follow){
        let res = await Unfriended(this.mydata.user.id)
        window.console.log(res)
        this.mydata.has_follow = !this.mydata.has_follow
            } else{
        let res = await attention1(this.mydata.user.id)
        // window.console.log(res)
        this.$toast.success(res.data.message)
        this.mydata.has_follow = !this.mydata.has_follow
            }
        },
       async Likede(){
          let res = await Like(this.mydata.id)
          // window.console.log(res)
          if(res.data.message ==='点赞成功'){
              this.mydata.like_length++
          } else{
             this.mydata.like_length--
          }
          this.mydata.has_like = !this.mydata.has_like
          this.$toast.success(res.data.message)
        },
       async fabu(fromdata){
        let res = await comment(this.mydata.id,{content:fromdata})
        // window.console.log(res)
        if(res.data.message === "评论发布成功"){
          this.$toast.success('发布成功')
          this.isFocus = false
        }
        }
    }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border:1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active{
        color: #fff;
        background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video{
      width: 100%;
      margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.atciv1{
      color: #f00;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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

/deep/.photo{
    img {
        width: 100%!important;
        display: block;
    }
}
</style>