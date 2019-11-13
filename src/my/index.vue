<template>
  <div class="my_info">
<!--    <div class="notification">-->
      <i class="iconfont icon_luluxiaoxitongzhi1"></i>
<!--    </div>-->
    <div class="my_info_first">
      <div class="my_info_first_info">
        <div class="user-basic">
          <img class="user-logo" src="../../src/assets/img/2.jpeg" style="height: 60px;width: 60px;"/>
<!--            <i v-else class="iconfont icontouxiang"></i>-->
          <div class="user_name_info">
            <div class="user-name">噜噜噜噜</div>
            <div class="vip-flag">未实名</div>
          </div>
        </div>
        <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>
      <div class="my_info_first_item" @click="collect"><i class="iconfont icon_lulushoucang1"></i>我的收藏<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>
      <div class="my_info_first_item" @click="question"><i class="iconfont icon_luluchangjianwenti"></i>常见问题<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>
      <div class="my_info_first_item" @click="suggestFeedback"><i class="iconfont icon_lulufankui1"></i>意见反馈<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    collect () {
      this.$router.push({path: '/collect'})
      // this.$router.push('/collect')
    },
    question () {
      this.$router.push('/commonQuestion')
    },
    suggestFeedback () {
      this.$router.push('/ideaFeedback')
    }
  }
}
</script>
<style scoped lang="scss">
  .my_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
.my_info:after { // 实现背景图片的透明度为0.8
  content: '';
  background: #fff url("../../src/assets/img/28.jpg") no-repeat;
  opacity: 0.8;
  background-size: 100% 190px;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
}
.icon_luluxiaoxitongzhi1 {
  font-size: 18px;
  position: absolute;
  color: rgb(196, 223, 184);
  /*color: indianred;*/
  margin-left: 88%;
  margin-top: 15px;
}
  .my_info_first {
    margin-top: 30%;
    margin-left: 20px;
    font-size: 15px;
    .iconfont {
      font-size: 17px;
      /*margin-left: 70%;*/
    }
  }
  .my_info_first_info {
    height: 80px;
    .iconfont {
      color: #f0f0f0;
      margin-left: 64%;
      transform: translateX(-31%);
      margin-right: 20px;
      position: fixed;
      margin-top: 25px;
    }
  }
  .user-basic {
    /*line-height: 70px;*/
    display: inline-block;
  }
  .user-logo {
    margin-top: 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 50%;
    /*border-radius: 10px;*/
    display: inline-block;
  }
  .user_name_info {
    /*height: 70px;*/
    /*border: 1px solid red;*/
    margin-left: 15px;
    display: inline-block;
    /*line-height: 35px;*/
  }
  .user-name {
    margin-top: -44px;
    position: fixed;
    font-size: 16px;
  }
  .vip-flag {
    position: fixed;
    margin-top: -20px;
    color: #9c9c9c;
    font-size: 6px;
    border: 1px dashed hotpink;
    border-radius: 4px;
  }
  .my_info_first_item {
    height: 50px;
    line-height: 60px;
    border-bottom: 1px solid #dcdcdc;
  }
  .my_info_first_item i:nth-child(2) {
    margin-left: 65%;
  }
  .icon_lulushoucang1 {
    color: red;
    margin-right: 8px;
  }
  .icon_luluchangjianwenti {
    color: #42b983;
    margin-right: 7px;
  }
  .icon_lulufankui1 {
    color: #ffbe00;
    margin-right: 7px;
  }
</style>
