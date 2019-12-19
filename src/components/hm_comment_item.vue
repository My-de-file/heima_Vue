<template>
  <div class="commentitem">
    <!-- 添加当前组件 -->
    <mycomment v-if="parent.parent" :parent='parent.parent' @replys="reply"></mycomment>
    <div class="head">
      <div>
        <span class="cname">{{parent.user.nickname}}</span>
        <span>2小时前</span>
      </div>
      <span @click="reply(parent)">回复</span>
    </div>
    <div class="text">{{parent.content}}</div>
  </div>
</template>

<script>
// 这种引入方式只能引入其它组件，不能引入自身
// import comm from '@/components/hm_comment_item.vue'
export default {
  name:'mycomment',
  props: ['parent'],
  methods: {
    reply(parent){
      this.$emit('replys',parent)
    }
  }
};
</script>

<style lang='less' scoped>
.commentitem {
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        color: #999;
      }
      .cname {
        margin-right: 10px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 10px 0;
  }
}
</style>