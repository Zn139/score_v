<template>
  <div class="simulationList_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">模拟考试</div>
      <div class="subject">{{subject_online}}</div>
    </div>
    <div class="simulationList_second" ref="simulationList_second">
      <div>
        <div class="xitiStatic_second">
<!--          <div class="xitiStatic_seconde_title">-->
<!--            <x-button class="xitiStatic_second_title_button">{{subject_online}}</x-button>-->
<!--&lt;!&ndash;            <popup-picker class="grade_info" disabled title="年级" :data="list1" v-model="levelName" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>&ndash;&gt;-->
<!--          </div>-->
        </div>
        <div class="simulationList_third">
          <div class="simulationList_third_title">
            <i class="iconfont icon_lulufengefu"></i><strong>热门模拟套卷</strong>
          </div>
          <div class="noData" v-if="finalExamList.length === 0">
            暂无热门模拟套卷
          </div>
          <div class="simulationList_third_content" v-if="finalExamList.length > 0" v-for="(item, index) in finalExamList" :key="index" @click="gotoDetail(item)">
            <div class="content_top">{{item.name}}</div>
            <div class="content_bottom">
              <span>共{{item.count}}道题</span>
              <span>满分：100分</span>
              <span>难度：中等</span>
            </div>
          </div>
        </div>
        <div class="simulationList_third">
          <div class="simulationList_third_title">
            <i class="iconfont icon_lulufengefu"></i><strong>模拟题</strong>
          </div>
          <div class="noData" v-if="mockList.length === 0">
            暂无模拟题
          </div>
          <div class="simulationList_third_content" v-for="(item, index) in mockList" :key="index" @click="gotoDetail(item)">
            <div class="content_top">{{item.name}}</div>
            <div class="content_bottom">
              <span>共{{item.count}}道题</span>
              <span v-if="item.totalScore !== ''">满分：{{item.totalScore}}分</span>
              <span v-if="item.difficult !== ''">难度：{{item.difficult}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getMockexamName} from '@/api/index'
export default {
  data () {
    return {
      list1: [['高一', '高二', '高三', '初一']],
      // value: ['高一'],
      simulationScroll: null,
      mockList: [], // 模拟考试list
      midExamList: [], // 期中考试list
      finalExamList: [], // 期末考试list
    }
  },
  computed: {
    subject_online () {
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    }
  },
  mounted () {
    this.init()
    this.getMockName()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    init () {
      this.$nextTick(() => {
        this.simulationScroll = new BScroll(this.$refs.simulationList_second, {
          click: true
        })
      })
    },
    getMockName () { // 获取模拟考试的名称和数量
      getMockexamName({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        gradeLevel: this.levelName,
        examCategory: '模拟考试'
      }).then(res => {
        // if (res.data.data.mockExam.length > 0 || res.data.data.midterm.length > 0 || res.data.data.finalExam.length > 0) {
        this.mockList = res.data.data.mockExam
        this.midExamList = res.data.data.midterm
        this.finalExamList = res.data.data.finalExam
        // }
        console.log('模拟信息：', res.data.data)
      })
    },
    gotoDetail (val) { // 跳转到模拟考试详情页
      this.$router.push({
        name: 'mockDetail',
        query: {
          paperName: val.name,
          type: 'mock'
        }
      })
    },
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    }
  }
}
</script>
<style scoped lang="scss">
  .simulationList_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;
    overflow: hidden;
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
  .icon_lulufanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .subject {
    position: absolute;
    top: 3px;
    right: 15px;
    color: #fff;
    font-size: 14px;
  }
  .simulationList_second {
    /*margin-top: 15px;*/
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    /*padding: 10px 0;*/
    height: calc(100% - 50px);
  }
  .xitiStatic_seconde_title {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 15px;
    /*border-bottom: 1px solid #ccc;*/
  }
  .xitiStatic_second_title_button {
    display: inline-block;
    width: 30%;
    /*text-align: center;*/
    /*margin-left: 10%;*/
    color: #fff;
    font-size: 14px;
    background-color: #42b982;
  }
  .xitiStatic_second >>> .vux-cell-box {
    width: 30%;
  }
  .xitiStatic_second >>> .weui-cell {
    padding: unset;
    margin-top: 3px;
    font-size: 14px;
  }
  .grade_info {
    float: right;
    /*display: inline-block;*/
  }
  /*第三部分*/
  .simulationList_third {
    margin: 10px 0;
    padding: 0 13px 10px;
    background-color: #fff;
  }
  .simulationList_third_title {
    padding-top: 5px;
    strong {
      font-size: 15px;
    }
    .icon_lulufengefu {
      color: #42b982;
      margin-right: 3px;
    }
  }
  .simulationList_third_content {
    margin-top: 8px;
    padding-bottom: 3px;
    text-indent: 1em;
    font-size: 15px;
    border-bottom: 1px solid #ececec;
    .content_top {
      color: rgb(70, 70, 70);
    }
    .content_bottom {
      margin-top: 3px;
      font-size: 12px;
      color: rgb(136, 136, 136);
      span {
        padding: 0 8px;
      }
      span:first-child {
        padding: 0 8px 0 0;
      }
    }
  }
  .noData {
    font-size: 14px;
    margin-top: 15px;
    text-align: center;
    color: #9c9c9c;
  }
</style>
