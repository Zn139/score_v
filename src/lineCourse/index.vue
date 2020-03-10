<template>
  <div class="lineCourse_info">
    <div class="score_header">
<!--      <div class="return__icon" @click="returnBack">-->
<!--        <i class="iconfont icon_lulufanhui"></i>-->
<!--      </div>-->
      <div class="title">乐练乐考</div>
      <div class="wrongQues_second_first">
        <popover placement="bottom" :gutter="5" class="wrongQues" style="left: 70%;">
          <div slot="content" class="popover-demo-content">
            <div class="add_score" v-for="(item, index) in levelList" @click="getClassifyContent(item)" :key="index">{{item}}</div>
<!--            <div class="add_score" @click="getClassifyContent('章节练习')">章节练习({{classifyContent.chapterNum}})</div>-->
          </div>
          {{classifyName}}
          <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i>
        </popover>
      </div>
<!--      <i class="iconfont icon_lulufanhui"></i>-->
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
import {Popover} from 'vux'
import BScroll from 'better-scroll'
import lineFirst from './lineFirst'
import lineSecond from './lineSecond'
import lineThird from './lineThird'
import {getAlllevels} from '@/api/index'
export default {
  components: {lineFirst, lineSecond, lineThird, Popover,},
  data () {
    return {
      lineCourseScroll: null,
      levelList: [],
      classifyName: ''
    }
  },
  computed: {
    subject_online () {
      // console.log(this.$store.state.lineCourse.select_sub)
      return localStorage.SET_SELECT_SUB
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    },
    // ifMastered () {
    //   console.log(this.$store.state.lineCourse.if_master)
    //   if (this.$store.state.lineCourse.if_master === -1) {
    //     this.$store.commit('SET_IF_MASTER', 1)
    //     // this.ifMastered = this.$store.state.lineCourse.if_master
    //     return 1
    //   } else {
    //     return this.$store.state.lineCourse.if_master
    //   }
    // }
  },
  mounted () {
    this.init()
    this.getAllLevels()
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
    },
    getAllLevels () { // 得到所有的年级
      this.classifyName = this.levelName
      getAlllevels().then(res => {
        this.levelList = res.data.data
        console.log('所有年级：', res.data)
      })
    },
    getClassifyContent (val) { // 得到某个分类的具体题
      this.classifyName = val
      // this.$store.commit('SET_LEVEL_NAME', val)
      localStorage.setItem('SET_LEVEL_NAME', val)
      console.log(localStorage.SET_LEVEL_NAME)
    },
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
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    text-align: center;
  }
  .wrongQues_second_first {
    position: absolute;
    top: 1px;
    right: 15px;
  }
  .popover-demo-content {
    padding: 5px 10px;
    font-size: 13px;
    text-align: center;
  }
  .lineCourse_info >>> .weui-cell_access {
    font-size: 14px;
    /*white-space: nowrap; // 强制一行显示*/
    /*width: 90%;*/
    /*overflow: hidden; // 超出部分隐藏*/
    /*text-overflow: ellipsis; // 超出部分显示省略号*/
  }
  .lineCourse_info >>> .vux-popover-arrow-up {
    left: 85%;
  }
  .lineCourse_info >>> .weui-cell__bd p {
    white-space: nowrap; /*强制一行显示*/
    width: 250px;
    overflow: hidden;  /*超出部分隐藏*/
    text-overflow: ellipsis; /*超出部分显示省略号*/
  }
  .icon_luluchangyongtubiao-xianxingdaochu-zhuanqu- {
    font-size: 15px;
  }
  .lineCourse_second {
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    /*padding: 10px 0;*/
    height: calc(100% - 90px);
    margin-bottom: 20px;
  }
</style>
