<template>
  <div class="line-second-info">
    <div class="line-second-first">
      <div class="line-second-first_title">
        <i class="iconfont icon_lulufengefu"></i><strong>考试演练</strong>
      </div>
      <div class="line-second-first_content">
        <div class="line-second-first_content1">
<!--          2-->
          <i class="iconfont icon_lulumonishijuan"></i>
          <div>
            <strong>模拟考试</strong>
            <span>模拟演练发现自身问题</span>
          </div>
        </div>
        <div class="fenge"></div>
        <div class="line-second-first_content2">
          <i class="iconfont icon_lululinianzhenti"></i>
          <div>
            <strong>历年真题</strong>
            <span>多年试题积累更多经验</span>
          </div>

        </div>
      </div>
    </div>
    <div class="line-second-second">
      <div class="line-second-first_title">
        <i class="iconfont icon_lulufengefu"></i><strong>平时练习</strong>
      </div>
      <div class="line-second-first_content">
        <div class="line-second-first_content1">
          <i class="iconfont icon_luluzhangjiekecheng-copy"></i>
          <div>
            <strong>章节练习</strong>
            <span>每章每节巩固重点知识</span>
          </div>
        </div>
        <div class="fenge"></div>
        <div class="line-second-first_content2">
          <i class="iconfont icon_luluzhuanxiangjiance"></i>
          <div>
            <strong>专项练习</strong>
            <span>短板决定木桶的容量</span>
          </div>

        </div>
      </div>
    </div>
    <div class="line-second-third">
      <div class="menu-icon_1" @click="gotoPage('more')">
        <i class="iconfont icon_lulutongji-copy1"></i>
        <div class="icon-text">习题统计</div>
      </div>
      <div class="menu-icon_1" @click="gotoPage('more')">
        <i class="iconfont icon_lulucuotiben"></i>
        <div class="icon-text">错题记录</div>
      </div>
      <div class="menu-icon_1" @click="gotoPage('more')">
        <i class="iconfont icon_luluwodeshoucang2"></i>
        <div class="icon-text">我的收藏</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
  .line-second-first {
    margin-bottom: 6px;
    background-color: #fff;
  }
  strong {
    font-size: 15px;
  }
  .line-second-first_title {
    margin: 0 10px;
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #ececec;
    .icon_lulufengefu {
      color: #42b982;
      /*font-weight: ;*/
    }
  }
  .line-second-first_content {
    padding: 5px 0;
    margin: 10px 10px 0;
    /*background-color: #fff;*/
    /*text-align: center;*/
  }
  .line-second-first_content1 {
    width: 46%;
    height: 60px;
    position: relative;
    margin-right: 7px;
    display: inline-block;
    .icon_lulumonishijuan {
      margin-left: 2px;
      margin-top: 5px;
      position: absolute;
      font-size: 32px;
      color: #42b982;
    }
    .icon_luluzhangjiekecheng-copy {
      margin-top: 7px;
      margin-left: 4px;
      position: absolute;
      /*font-weight: 600;*/
      font-size: 30px;
      color: rgb(239, 146, 0);
    }
    strong {
      font-size: 14px;
      position: absolute;
      margin-top: 7px;
      margin-left: 42px;
    }
    span {
      position: absolute;
      color: #bbb;
      margin-top: 35px;
      margin-left: 42px;
      font-size: 9px;
    }
  }
  .fenge {
    height: 40px;
    width: 1px;
    display: inline-block;
    background-color: #ececec;
    position: absolute;
    margin-top: 12px;
  }
  .line-second-first_content2 {
    width: 46%;
    height: 60px;
    position: relative;
    margin-left: 14px;
    /*margin-right: 7px;*/
    display: inline-block;
    .icon_lululinianzhenti {
      margin-top: 5px;
      position: absolute;
      font-size: 32px;
      color: rgb(113, 167, 239);
    }
    .icon_luluzhuanxiangjiance {
      margin-top: 7px;
      position: absolute;
      font-size: 30px;
      color: rgb(246, 140, 140);
    }
    strong {
      font-size: 14px;
      position: absolute;
      margin-top: 7px;
      margin-left: 42px;
    }
    span {
      position: absolute;
      color: #bbb;
      margin-top: 35px;
      margin-left: 42px;
      font-size: 9px;
    }
  }
  .line-second-second {
    background-color: #fff;
  }
  .line-second-third {
    background-color: #fff;
    margin-top: 6px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    .menu-icon_1{
      margin: 7px 7px 30px;
      height: 35px;
      width: 20%;
      display: inline-block;
      text-align: center;
      position: relative;
    }
    .icon-text{
      font-size: 12px;
      color: #454545;
    }
    .icon_lulutongji-copy1 {
      font-size: 28px;
      color: rgb(113, 167, 239);
    }
    .icon_lulucuotiben {
      font-size: 27px;
      color: rgb(246, 140, 140);
    }
    .icon_luluwodeshoucang2 {
      font-size: 27px;
      color: rgb(239, 202, 0);
    }
  }
</style>
