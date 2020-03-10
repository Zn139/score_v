<template>
  <div class="feedBack_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">关于我们</div>
    </div>
    <div class="feedBack_second">
      <div class="statement_content">
        {{usText}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      content: '',
      usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +
        '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',

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
