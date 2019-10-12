<template>
  <div class="ul-btns">
    <div class="menu-icon_1" @click="gotoPage('score')">
      <i class="iconfont icon_luluchengjidan"></i>
      <div class="icon-text">成绩单</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('subAnalysis')">
      <i class="iconfont icon_lulufenxi"></i>
      <div class="icon-text">学科分析</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('comAnalysis')">
      <i class="iconfont icon_luludbfx"></i>
      <div class="icon-text">对比分析</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('hisAnalysis')">
      <div class="icon-bac">
        <i class="iconfont icon_lululishifenxi"></i>
      </div>
      <div class="icon-text">历史分析</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('question')">
      <i class="iconfont icon_lulujiachang_cuotiben"></i>
      <div class="icon-text">错题诊断</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('classSchedule')">
      <i class="iconfont icon_lulukechengbiao"></i>
      <div class="icon-text">课程表</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('schoolInquire')">
      <i class="iconfont icon_luluchaxun"></i>
      <!--      <div class="icon-bac"><i class="iconfont iconxuexiao"></i></div>-->
      <div class="icon-text">高校查询</div>
    </div>
    <div class="menu-icon_1" @click="gotoPage('more')">
      <i class="iconfont icon_lulugengduo-2"></i>
      <!--      <div class="icon-bac"><i class="iconfont iconxuexiao"></i></div>-->
      <div class="icon-text">更多</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    gotoPage (name) {
      this.$router.push({ name: name })
      // if (name === 'school') {
      //   this.$router.push({
      //     name: name,
      //     params: { type: 'all' }
      //   })
      // } else if (name === 'bbs') {
      //   this.$router.push({ path: '/bbs/hot' })
      // } else {
      //   this.$router.push({ name: name })
      // }
    }
  }
}
</script>
<style scoped>
  .menu-icon_1{
    margin: 10px 16px 20px;
    /*margin-top: 10px;*/
    /*margin-left: 20px;*/
    height: 50px;
    width: 50px;
    background-color: #42b983;
    border-radius: 50%;
    box-shadow: 0px 0px 6px 0px rgba(88, 88, 88, 0.35);
    display: inline-block;
    text-align: center;
    position: relative;
  }
  .icon-text{
    font-size: 12px;
    padding-top: 6px;
  }
  .iconfont {
    color: #fff;
    font-size: 26px;
    line-height: 50px;
  }
  .ul-btns {
    min-height: 170px;
    margin: 10px 14px;
    text-align: center;
    font-size: 0;
    position: relative;
    /*border-radius: 50px;*/
    border-radius: 4px;
    background: #f7f7f7;
    box-shadow: 0px 0px 5px 0px rgba(66,185,130,0.4);
    /*background-color: #72b7e4;*/
  }
  .menu-circle {
    position: absolute;
    z-index: 2;
    font-size: 14px;
    /*background:  url("../assets/img/icon.png") no-repeat;*/
    background-size: cover;
    color: #ffffff;
    width: 90px;
    height: 90px;
    border-radius: 100px;
    line-height: 90px;
    text-align: center;
    left: 50%;
    top: 50%;
    margin: -46px;
  }
  .menu-icon {
    position: relative;
    display: inline-block;
    width: 22%;
    margin: 1.5%;
    text-align: center;
    padding-top: 6px;
    padding-bottom: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 12px 0px #10184852;
    &:nth-child(1) {
      background: #4b6a98;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    &:nth-child(2) {
      background: #4c8365 ;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    &:nth-child(3) {
      background: #f4a95c;
      color: #fff;
      .iconfont {
        color: #fff;
      }
      }
  &:nth-child(4) {
      background: #a47bb9;
      color: #fff;
      .iconfont {
        color: #fff;
      }
    }
    .icon-bac {
      margin: 0 auto;
      width: 40px;
      height: 40px;
      color: #72b7e4;
      border-radius: 40px;
      text-align: center;
      line-height: 40px;
    }

    .icon-text {
      font-size: 13px;
    }
  }
</style>
