<template>
  <div class="lineCourse_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">在线课程</div>
    </div>
    <div class="lineCourse_second" ref="lineCourse_second">
      <div>
        <line-first></line-first>
        <line-second></line-second>
        <line-third></line-third>
      </div>

<!--      <div class="lineCourse_second_chapter" @click="gotoChapter">章节练习</div>-->
<!--      <x-button @click.native="gotoSimulate">模拟考试</x-button>-->
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import lineFirst from './lineFirst'
import lineSecond from './lineSecond'
import lineThird from './lineThird'
export default {
  components: {lineFirst, lineSecond, lineThird},
  data () {
    return {
      lineCourseScroll: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      this.$nextTick(() => {
        this.lineCourseScroll = new BScroll(this.$refs.lineCourse_second, {
          click: true
        })
      })
    }
    // gotoChapter () {
    //   this.$router.push('/chapterList')
    // },
    // gotoSimulate () {
    //   this.$router.push('/simulationList')
    // }
  }
}
</script>
<style scoped>
  .lineCourse_info {
    height: 100%;
    display: flex;
    flex-direction: column;
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
  /*.lineCourse_second {*/
  /*  margin: 20px;*/
  /*}*/
  .lineCourse_second_chapter {
    margin: 10px 10px 30px;
    padding: 5px;
    text-align: center;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 10px;
  }
  .lineCourse_second {
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    /*padding: 10px 0;*/
    height: calc(100% - 100px);
  }
</style>
