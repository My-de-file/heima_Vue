<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder='写跟贴' @focus="handlerFocus" />
      <span class="comment" @click="$router.push({path:`/comments/${$route.params.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{transmission.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="collect" :class="{icon:transmission.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" v-model="fromdata"></textarea>
        <div>
            <span @click="from">发送</span>
            <span @click="quxiao">取消</span>
        </div>
    </div>
  </div>
</template>


<script>
//comment
import {collect1} from '@/api/article.js'
export default {
    props:['transmission','parameter'],
  data () {
    return {
      isFocus: false,
      fromdata:'',
      handlertext:''
    }
  },
  watch: {
    parameter(){
      window.console.log(this.parameter)
      if(this.parameter){
        this.isFocus = true
        this.handlertext = this.parameter.user.nickname
      }
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = true
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
   async collect(){
        // alert(1)
     let res = await collect1(this.transmission.id)
     this.$toast.success(res.data.message)
     this.transmission.has_star = !this.transmission.has_star
    },
    async from(){
      this.isFocus=false
      // window.console.log(this.fromdata)
      // window.console.log(this.transmission.id)
        this.$emit('addcomment',this.fromdata,this.parameter.id)
      },
    quxiao(){
    this.isFocus=false
    this.$emit('click')
  }
  }
}
</script>


<style lang='less' scoped>
.comment{
    position: fixed;
    bottom: 0;
    left: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.icon{
    color: #f00
}
</style>