<template>
  <div class="hot_recom">
    <div class="recommend">
      <i class="iconfont icon_luluremen"></i>
      热门推荐
      <i class="iconfont icon_luluyoujiantou"></i>
    </div>
    <div class="hot_img_block">
      <div class="hot_img"><img src="../assets/img/14.jpg"></div>
      <div class="hot_img"><img src="../assets/img/15.jpg"></div>
      <div class="hot_img"><img src="../assets/img/16.jpg"></div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped lang="scss">
  .recommend{
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
  .hot_img_block {
    text-align: center;
  }
  .hot_img{
    display: inline-block;
    height: 60px;
    width: 100px;
    margin: 4px;
  }
  .hot_img img {
    width: 100%;
    height: 100%;
  }
  .recommend{
    margin: 0 10px 4px;
    padding-left: 4px;
    border-radius: 10px;
  }

</style>
