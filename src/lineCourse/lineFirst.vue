<template>
  <div class="line_first_info">
    <div>
      <tab :line-width=2 v-model="index">
        <tab-item :selected="select_sub === index" v-for="(item, index) in sub_lists" @click="select_sub = index" :key="index">{{item}}</tab-item>
      </tab>
<!--        <swiper v-model="index" height="100px" :show-dots="false">-->
<!--          <swiper-item v-for="(item, index) in list2" :key="index">-->
<!--            <div class="tab-swiper vux-center">{{item}} Container</div>-->
<!--          </swiper-item>-->
<!--        </swiper>-->
    </div>
    <div class="line_first_content">
      <img src="../assets/img/18.png"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sub_lists: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      select_sub: 5
    }
  }
}
</script>
<style scoped lang="scss">
  .line_first_content {
    /*height: 96px;*/
    /*width: 375px;*/
    width: 100%;
    height: 96px;
    /*background-image: url("../assets/img/18.png");*/
    /*background-size:100% 100%;*/
    img {
      height: 100%;
      width: 100%;
    }
  }
  .scrollable .vux-tab-item {
    flex: 0 0 15%;
  }
  .vux-tab-wrap {
    padding-top: 40px;
  }
  .line_first_info >>> .vux-tab-container,
  .line_first_info >>> .vux-tab {
    height: 40px;
  }
  .vux-tab .vux-tab-item {
    line-height: 40px;
  }
</style>
