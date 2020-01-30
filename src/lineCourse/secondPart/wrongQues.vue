<template>
  <div class="wrongQues_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <search
        v-show="showWrongSearch"
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="key"
        :placeholder="placeholder"
        @on-submit="onSubmit"
        @on-cancel="cancelSearch"
        ref="search"></search>
      <div class="title" v-show="!showWrongSearch">错题记录</div>
      <i v-show="!showWrongSearch" class="iconfont icon_luluicon-search" @click="searchWrong"></i>
    </div>
    <div class="wrongQues_second">
      <div class="wrongQues_second_firstInfo">
        <div class="wrongQues_second_first one">
          年级：高一
        </div>
        <div class="wrongQues_second_first two">
<!--          <button-tab>-->
          <button-tab  v-model="ifMastered">
            <button-tab-item @on-item-click="consoleIndex()">掌握</button-tab-item>
            <button-tab-item @on-item-click="consoleIndex()">未掌握</button-tab-item>
<!--            <button-tab-item selected>未掌握</button-tab-item>-->
<!--            <button-tab-item>掌握</button-tab-item>-->
          </button-tab>
        </div>
        <div class="wrongQues_second_first three">
          <popover placement="bottom">
            <div slot="content" class="popover-demo-content">
              <div class="add_score" @click="getClassifyContent('章节练习')">章节练习({{classifyContent.chapterNum}})</div>
              <div class="add_score" @click="getClassifyContent('模拟考试')">模拟考试({{classifyContent.mockNum}})</div>
              <div class="add_score" @click="getClassifyContent('专项练习')">专项练习({{classifyContent.specialNum}})</div>
              <div class="add_score" @click="getClassifyContent('历年真题')">历年真题({{classifyContent.truthNum}})</div>
              <div class="add_score" @click="getClassifyContent('全部')">全部({{classifyContent.totalNum}})</div>
             </div>
            {{classifyName}}
            <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i>
          </popover>
        </div>
      </div>
    </div>
    <div class="wrongQues_third" ref="wrongQues_third">
      <div>
        <div v-for="(item, index) in classifyDetail" :key="index" class="wrongQues_third_detail">
<!--          <div class="wrongQues_third_detail_title" v-if="showList[index] === 0">{{item.question.questionContext}}</div><div @click="zhankai(index)">展开</div>-->
<!--          <div v-if="showList[index] === 1">{{item.question.questionContext}}</div>-->
          <div v-show="!item.show"><span class="wrongQues_third_detail_title">{{item.content.question.questionContext}}</span><span class="wrongQues_third_detail_open" @click="openContent(item)">展开</span></div>
          <div v-show="item.show" class="wrongQues_third_detail_title1">{{item.content.question.questionContext}}</div>
          <div>
            <span class="wrongQues_third_detail_label" v-for="(val, index) in item.content.labelList" :key="index">
              <span class="one" v-if="val === '章节练习'">章</span>
              <span class="two" v-else-if="val === '专项练习'">点</span>
              <span class="three" v-else-if="val === '模拟考试'">模</span>
              <span class="five" v-else-if="val === '历年真题'">真题</span>
              <span class="four" v-else>{{val}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {Flexbox, FlexboxItem, Popover} from 'vux'
import {getExecNum, getSectionExecNum, getErrorNumDetail, getWrongRecord, getClassifyDetail} from '@/api/index'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Popover
  },
  data () {
    return {
      classifyName: '全部', // 选中的值
      ifMastered: 1, // 是否掌握
      classifyContent: [], // 返回的分类信息以及数量
      classifyDetail: [], // 查询某个分裂具体的情况
      // flag: 0, // 标志是练习还是考试 1是练习，2是考试
      results: [],
      key: '',
      placeholder: '搜索',
      showWrongSearch: false,
      wrongQuesScroll: null,
      showAll: false,
      showList: [], // 所有题的展开与否
      // showList1: {}, // 所有题的展开与否
    }
  },
  watch: {
    showList (val, oldval) {
      console.log(val, oldval)
    }
  },
  computed: {
    paperName () {
      return this.$route.params.paperName
    },
    subject_online () {
      console.log(this.$store.state.lineCourse.select_sub)
      return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    },
    levelName () { // 年级
      return this.$store.state.lineCourse.levelName
    }
  },
  created () {
    this.getWrongClassfiRecord()
  },
  mounted () {
    this.init()
    this.getClassifyContent('全部')
    // this.$nextTick(function () {
    //   this.getWrongClassfiRecord()
    // })
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    init () {
      this.$nextTick(() => {
        this.wrongQuesScroll = new BScroll(this.$refs.wrongQues_third, {
          click: true
        })
      })
    },
    openContent (item) {
      const _this = this
      if (!_this.classifyDetail[item.index].show) {
        console.log('heiohsodfnsodnf', _this.classifyDetail[item.index])

        _this.classifyDetail[item.index].show = true
        console.log('heiohsod吼', _this.classifyDetail[item.index])
      }
    },
    getWrongClassfiRecord () { // 得到各种分类的数量
      getWrongRecord({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        gradeLevel: this.levelName,
        master: this.ifMastered + 1
      }).then(res => {
        this.classifyContent = res.data.data
        console.log('返回信息', this.classifyContent)
      })
    },
    getClassifyContent (val) { // 得到某个分类的具体题
      this.classifyName = val
      getClassifyDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        examCategory: val,
        gradeLevel: this.levelName,
        master: this.ifMastered + 1
      }).then(res => {
        // this.classifyDetail = res.data.data.questionInfo
        this.classifyDetail = res.data.data.questionInfo.map((item, index) => {
          return {
            show: false,
            index: index,
            content: item,
            // children: []
          }
        })
        // for (const item in this.classifyDetail) {
        //   this.classifyDetail[item]['show'] = false
        //   this.classifyDetail[item]['index'] = parseInt(item)
        //   this.showList.push(0)
        //   // this.showList1[item] = false
        // }
        // console.log('zhankaiyufou', this.showList)
        // console.log('zhankaiyufou', this.showList1)
        console.log(this.classifyDetail)
      })
    },
    consoleIndex () {
      console.log('click demo01', this.ifMastered)
      this.getClassifyContent(this.classifyName)
    },
    searchWrong () {
      // console.log(this.$refs.search)
      this.$refs.search.onFocus() // 获取搜索框的焦点
      this.showWrongSearch = true
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      // this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    cancelSearch () {
      this.showWrongSearch = false
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>
<style scoped lang="scss">
  .wrongQues_info {
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
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
    /*line-height: 40px;*/
    flex: none;
    z-index: 1;
  }
  .return__icon{
    position: absolute;
    left: 10px;
    /*top: 6px;*/
    z-index: 9;
    padding: 6px;
    color: #fff;
  }
  .icon_lulufanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .wrongQues_first {
    background-color: rgb(239, 255, 255);
  }
  .barChartButton {
    text-align: center;
    /*margin-bottom: 20px;
    margin-top: -10px;*/
    /*width: 40%;*/
  }
  .barChartButtonInfo {
    width: 35%;
    margin: 0 15px;
  }
  .popover-demo-content {
    font-size: 13px;
    padding: 5px;
  }
  .wrongQues_second {
    margin-top: 5px;
    /*padding-top: 10px;*/
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    /*margin-top: 15px;*/
    .vux-button-group {
      width: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .wrongQues_second_firstInfo {
      /*height: 40px;*/
      /*line-height: 40px;*/
      text-align: center;
      .wrongQues_second_first {
        display: inline-block;
        font-size: 14px;
      }
      .one {
        width: 26%;
        margin-right: 10px;
      }
      .two {
        width: 30%;
        margin: 0 10px;
      }
      .three {
        width: 26%;
        margin-left: 10px;
      }
    }
  }
  .wrongQues_Second_tab {
    background-color: #43b783;
  }
  .wrongQues_info >>>.vux-search-box  .weui-search-bar__label {
    border-radius: 20px;
    top: 4px;
  }
  .wrongQues_info >>> .weui-search-bar {
    padding: 10px 20px;
    height: 28px;
  }
  .wrongQues_info >>> .weui-search-bar:before,
  .wrongQues_info >>> .weui-search-bar:after {
    border-top: 0;
    border-bottom: 0;
  }
  .wrongQues_info >>> .weui-search-bar,
  .wrongQues_info >>> .weui-search-bar__form {
    background: transparent;
  }
  .wrongQues_info >>> .weui-search-bar__box .weui-icon-search {
    top: 15px;
    left: 8px;
  }
  .wrongQues_info >>> .weui-search-bar__box .weui-icon-clear {
    top: 50%;
  }
  .wrongQues_info >>> .weui-search-bar__cancel-btn {
    color: #fff;
  }
  .wrongQues_info >>> .vux-search-box {
    padding-left: 30px;
    padding-top: 6px;
    padding-bottom: 10px;
    width: calc(100% - 30px);
    background: transparent;
  }
  .icon_luluicon-search {
    float: right;
    margin-right: 15px;
    line-height: 40px;
    /*margin-top: 6px;*/
  }
  .title {
    display: inline-block;
    margin-top: 6px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .wrongQues_third {
    margin-top: 10px;
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 126px);
    /*margin-top: 10px;*/
    /*background-color: #fff;*/
  }
  .wrongQues_third_detail {
    margin-top: 8px;
    padding: 5px 15px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 3px 2px 1px 0 rgba(66,185,130,0.1);
    border-radius: 10px;
    /*line-height: 28px;*/
    .wrongQues_third_detail_title {
      /*margin-bottom: 5px;*/
      /*text-align: center;*/
      display: inline-block;
      white-space: nowrap;
      width: 90%;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .wrongQues_third_detail_title1 {
      line-height: 27px;
    }
    .wrongQues_third_detail_open {
      color: #5f95dc;
      position: absolute;
      font-size: 13px;
      margin-left: 2px;
      /*line-height: 20px;*/
    }
    .wrongQues_third_detail_label {
      font-size: 13px;
      margin-left: 3px;
      color: #fff;
      .one {
        padding: 1px 3px;
        border-radius: 4px;
        background-color: #ffbe00;
      }
      .two {
        padding: 1px 3px;
        border-radius: 4px;
        background-color: #ec8b89;
      }
      .three {
        padding: 1px 3px;
        border-radius: 4px;
        background-color: #42b982;
      }
      .four {
        padding: 1px 3px;
        border-radius: 4px;
        background-color: #5f95dc;
      }
      .five {
        padding: 1px 3px;
        border-radius: 4px;
        background-color: #CC99CC;
      }
    }
  }
</style>
