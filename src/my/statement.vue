<template>
  <div class="feedBack_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">免责声明</div>
    </div>
    <div class="feedBack_second">
      <div class="statement_content">
        免责声明：本系统部分资源来自网络，如有侵犯您的版权请通知，我们立即删除。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .feedBack_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    /*background: #fff;*/
    background: #f8f8f8;
  }
  .score_header {
    /*padding: 0;*/
    font-size: 16px;
    /*text-align: center;*/
    width: 100%;
    background-color: #42b983;
    color: #fff;
    height: 40px;
    line-height: 40px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    margin-left: 20px;
    width: 20px;
    height: 20px;
    /*margin-top: 10px;*/
    /*color: #fff;*/
    display: inline-block;
  }
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .feedBack_second {
    margin-top: 20px;
    padding: 0 18px;
    /*border: 1px solid red;*/
  }
  .statement_content {
    text-indent: 2em;
    font-size: 14px;
    line-height: 27px;
    color: #3c3c3c;
  }
</style>
