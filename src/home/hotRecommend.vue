<template>
  <div class="hot_recom">
    <div class="recommend">
      <i class="iconfont icon_luluremen"></i>
      热门推荐
      <i class="iconfont icon_luluyoujiantou"></i>
    </div>
    <div>
      <img src="../assets/img/14.jpg" class="hot_img">
      <img src="../assets/img/15.jpg" class="hot_img">
      <img src="../assets/img/16.jpg" class="hot_img">
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.recommend{
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: 14px;
  height: 25px;
  padding-top: 3px;
}
  .iconfont{
    color: #d81e06;
  }
  .icon_luluyoujiantou{
    margin-left: 70%;
  }
  .hot_img{
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 5px;
  }
/*.icon_luluyoujiantou{*/
/*  padding-left: 90%;*/
/*  transform: translate(-10%);*/
/*  position: relative;*/
/*}*/
  .recommend{
    margin: 0 10px 10px;
    padding-left: 5px;
    box-shadow: 4px 4px 4px 0px rgba(71, 89, 172, 0.12);
    border-radius: 10px;
  }

</style>
