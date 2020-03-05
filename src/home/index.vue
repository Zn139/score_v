<template>
  <div class="home-page" ref="homeWrapper">
    <div class="home_content">
      <first></first>
      <sun-chart></sun-chart>
      <menus></menus>
<!--      <div @click="gotoTest">测试扫一扫</div>-->
<!--      <div @click="gotoTest2">测试扫一扫2</div>-->
      <hot-recommend></hot-recommend>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import menus from './menus'
import hotRecommend from './hotRecommend'
import sunChart from './sunChart'
import first from './first'
export default {
  components: { menus, hotRecommend, sunChart, first },
  name: 'home',
  inject: ['reload'],
  data () {
    return {
      homeScroll: null,
      key: ''
    }
  },
  // computed: {
  //   ...mapState({
  //     link: state => state.sunchart.link
  //   })
  // },
  mounted () {
    // this.$store.commit('SET_ShowLink', true)
    // console.log(this.$store.state.exam.link)
    this.$nextTick(() => {
      this.homeScroll = new BScroll(this.$refs.homeWrapper, {
        click: true
      })
    })
  },
  methods: {
    gotoTest () {
      this.$router.push('/test')
    },
    gotoTest2 () {
      this.$router.push('/test2')
    }
  }
}
</script>
<style scoped="">
  .home-page {
     height: calc(100% - 50px);
     overflow: hidden;
     flex: 1;
     background: #f8f8f8;
     /*background: #fff;*/
   }
</style>
