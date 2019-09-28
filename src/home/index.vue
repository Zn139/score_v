<template>
  <div class="home-page" ref="homeWrapper">
    <div class="home_content">
      <div class="content">2019年期中考试</div>
      <sun-chart></sun-chart>
      <menus></menus>
      <hot-recommend></hot-recommend>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import menus from './menus'
import hotRecommend from './hotRecommend'
import sunChart from './sunChart'
import { mapState } from 'vuex'
export default {
  components: { menus, hotRecommend, sunChart },
  name: 'home',
  inject: ['reload'],
  data () {
    return {
      homeScroll: null,
      key: ''
    }
  },
  computed: {
    ...mapState({
      link: state => state.sunchart.link
    })
  },
  mounted () {
    // this.$store.commit('SET_ShowLink', true)
    // console.log(this.$store.state.sunchart.link)
    this.$nextTick(() => {
      this.homeScroll = new BScroll(this.$refs.homeWrapper, {
        click: true
      })
    })
  }
}
</script>
<style scoped="">
  .home-page {
       height: calc(100% - 50px);
       overflow: hidden;
       flex: 1;
       background: #fff;
     }
  .content {
    /*padding: 0;*/
    font-size: 16px;
    text-align: center;
    width: 100%;
    background-color: #42b983;
    height: 40px;
    line-height: 40px;
    /*padding-top: 5px;*/
    margin-bottom: 5px;
    /*background: url("../assets/img/home-bac.png") no-repeat;*/
    /*background-size: 100% 100%;*/
  }
</style>
