<template>
  <div class="hot_recom">
    <div class="recommend">
      <div class="recomend_info">
        <i class="iconfont icon_luluremen2"></i>
        <span>热门推荐</span>
      </div>
      <div class="recomend_info">
        <span class="recomend_title">更多</span>
        <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i>
      </div>
    </div>
<!--    <hr class="devide_line">-->
    <div class="hot_img_block">
      <swiper auto loop :aspect-ratio="300/600" height="180px" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex" dots-position="center">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in img_list" :key="index">
          <div class="hot_img"><img :src="item"></div>
        </swiper-item>
      </swiper>
<!--      <div class="hot_img"><img src="../assets/img/14.jpg"></div>-->
<!--      <div class="hot_img"><img src="../assets/img/15.jpg"></div>-->
<!--      <div class="hot_img"><img src="../assets/img/16.jpg"></div>-->
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from 'vux'
const imgList = [
  // require('../assets/img/14.jpg'),
  require('../assets/img/17.png'),
  require('../assets/img/17.png'),
  require('../assets/img/17.png')
]
export default {
  components: {
    Swiper, SwiperItem
  },
  data () {
    return {
      swiperItemIndex: 1,
      img_list: imgList
    }
  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    }
  }
}
</script>
<style scoped lang="scss">
  .recommend{
    font-weight: bold;
    font-size: 15px;
    height: 40px;
    width: 100%;
    /*margin-top: 10px;*/
    color: #454545;
    padding: 0 10px;
    /*padding-top: 3px;*/
    background: #fff;
    line-height: 40px;
  }
  .recomend_info {
    display: inline;
    /*margin-left: 40px;*/
  }
  .recomend_title {
    margin-left: 60%;
    transform: translateX(-50%);
    /*text-align: right;*/
  }
  .iconfont{
    font-size: 14px;
  }
  .icon_luluremen2 {
    color: rgb(253,116,120);
  }
  /*.devide_line {*/
  /*  color: ;*/
  /*}*/
  /*.icon_luluyoujiantou{*/
  /*  margin-left: 70%;*/
  /*}*/
  .hot_img_block {
    margin-top: 1px;
    text-align: center;
    background-color: #fff;
  }
  .hot_img{
    /*display: inline-block;*/
    /*height: 200px;*/
    /*width: 280px;*/
    margin: 10px 20px;
  }
  .hot_img img {
    width: 90%;
    height: 90%;
  }
  /*.swiper-demo-img {*/
  /*  margin: 10px;*/
  /*}*/

</style>
