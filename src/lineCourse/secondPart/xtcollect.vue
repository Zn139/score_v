<template>
  <div class="wrongQues_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <search
        v-show="showWrongSearch"
        @on-result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="key"
        class="searchColor"
        :placeholder="placeholder"
        @on-submit="onSubmit"
        @on-cancel="cancelSearch"
        ref="search"></search>
<!--      <search-->
<!--        v-show="showWrongSearch"-->
<!--        @result-click="resultClick"-->
<!--        @on-change="getResult"-->
<!--        :results="results"-->
<!--        v-model="key"-->
<!--        :placeholder="placeholder"-->
<!--        @on-submit="onSubmit"-->
<!--        @on-cancel="cancelSearch"-->
<!--        ref="search"></search>-->
      <div class="title" v-show="!showWrongSearch">错题记录</div>
      <i v-show="!showWrongSearch" class="iconfont icon_luluicon-search" @click="searchWrong"></i>
    </div>
    <div class="wrongQues_second">
      <div class="wrongQues_second_firstInfo">
        <div class="wrongQues_second_first one">
          年级：{{levelName}}
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
          <popover placement="bottom" :gutter="5" class="wrongQues">
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
        <div v-for="(item, index) in classifyDetail" :key="index" class="wrongQues_third_detail" v-if="classifyDetail.length > 0" @click="gotoDetail(item.content.question.id, index)">
<!--          <div class="wrongQues_third_detail_title" v-if="showList[index] === 0">{{item.question.questionContext}}</div><div @click="zhankai(index)">展开</div>-->
<!--          <div v-if="showList[index] === 1">{{item.question.questionContext}}</div>-->
          <div v-show="!item.show"><span class="wrongQues_third_detail_title">{{item.content.question.questionContext}}</span><span class="wrongQues_third_detail_open" @click.stop="openContent(item)">展开</span></div>
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
        <div class="wrongQues_third_detail_noData" v-if="classifyDetail.length === 0">
          暂无此分类的题
<!--          <div class="wrongQues_third_detail_title1"></div>-->
        </div>
      </div>
    </div>
    <div class="section_exec_third" v-if="classifyName !== '全部'">
      <!--判断是否收藏 1表示收藏  2表示没有收藏-->
      <div class="section_exec_third_left">分类</div>
      <div class="section_exec_third_right" @click="gotoClassifyDetail" v-if="classifyName === '章节练习'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.chapterNum}}</span></div>
      <div class="section_exec_third_right" @click="gotoClassifyDetail" v-if="classifyName === '模拟考试'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.mockNum}}</span></div>
      <div class="section_exec_third_right" @click="gotoClassifyDetail" v-if="classifyName === '专项练习'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.specialNum}}</span></div>
      <div class="section_exec_third_right" @click="gotoClassifyDetail" v-if="classifyName === '历年真题'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.truthNum}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showClassify" position="bottom" max-height="50%">
        <div class="section_exec_third">
          <div class="section_exec_third_left">分类</div>
          <div class="section_exec_third_right" @click="gotoClose" v-if="classifyName === '章节练习'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.chapterNum}}</span></div>
          <div class="section_exec_third_right" @click="gotoClose" v-if="classifyName === '模拟考试'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.mockNum}}</span></div>
          <div class="section_exec_third_right" @click="gotoClose" v-if="classifyName === '专项练习'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.specialNum}}</span></div>
          <div class="section_exec_third_right" @click="gotoClose" v-if="classifyName === '历年真题'"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.truthNum}}</span></div>
<!--          <div class="section_exec_third_right" @click="gotoClose"><i class="iconfont icon_lulujiugongge"></i><span>{{classifyContent.totalNum}}</span></div>-->
        </div>
        <group>
          <div class="section_exec_third_title">
            <div v-for="(item, index) in bottomClassifyList_one" :key="index" v-if="bottomClassifyList_two.length === 0">
              {{item.key}}<span>（{{item.value}}）</span>
            </div>
            <div v-for="(item, index) in bottomClassifyList_one" :key="index" v-if="bottomClassifyList_two.length > 0">
              {{item.key}}
              <div class="section_exec_third_content" v-for="(itemTwo, index) in bottomClassifyList_two" :key="index">
                {{itemTwo.key}}<span>（{{itemTwo.value}}）</span>
              </div>
            </div>
          </div>
        </group>
      </popup>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {Flexbox, FlexboxItem, Popover, TransferDom, Group} from 'vux'
import {getClassifyClassify, getWrongRecord, getClassifyDetail, gotoSearch} from '@/api/index'
export default {
  directives: {
    TransferDom
  },
  components: {
    Flexbox, FlexboxItem, Popover, TransferDom, Group
  },
  data () {
    return {
      classifyName: '全部', // 选中的值
      ifMastered: -1, // 是否掌握,1表示掌握，2表示未掌握
      classifyContent: [], // 返回的分类信息以及数量
      classifyDetail: [], // 查询某个分裂具体的情况
      // flag: 0, // 标志是练习还是考试 1是练习，2是考试
      results: [],
      key: '',
      placeholder: '搜索',
      searchContent: [], // 搜索返回内容
      showWrongSearch: false,
      wrongQuesScroll: null,
      // showAll: false,
      idList: [], // 所有题的id（唯一）
      questionIdList: [], // 所有题的题号（入库时（不唯一，一套卷子一个id））id
      showClassify: false, // 是否展示最下面分类模块
      bottomClassify: [], // 最下面的分类模块
      bottomClassifyList_one: [], // 最下面分类模块key列表
      bottomClassifyList_two: [], // 最下面分类模块key列表
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
      // console.log(this.$store.state.lineCourse.select_sub)
      return localStorage.SET_SELECT_SUB
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    },
    levelName () { // 年级
      return this.$store.state.lineCourse.levelName
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
  created () {
    this.getWrongClassfiRecord()
  },
  mounted () {
    this.getOriginInfo() // 获取是否掌握的状态信息
    // this.ifMastered = this.$store.state.lineCourse.if_master
    this.init()
    this.getClassifyContent('全部')
    // this.$nextTick(function () {
    //   this.getWrongClassfiRecord()
    // })
  },
  methods: {
    getOriginInfo () {
      console.log('掌握状态：', this.$store.state.lineCourse.if_master)
      if (this.$store.state.lineCourse.if_master === -1) {
        this.ifMastered = 1
      } else {
        this.ifMastered = this.$store.state.lineCourse.if_master
      }
    },
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
    openContent (item) { // 展开题目
      const _this = this
      if (!_this.classifyDetail[item.index].show) {
        // console.log('heiohsodfnsodnf', _this.classifyDetail[item.index])

        _this.classifyDetail[item.index].show = true
        // console.log('heiohsod吼', _this.classifyDetail[item.index])
      }
    },
    gotoDetail (id, ind) { // 跳转到详情页
      console.log('index:', ind)
      this.$router.push({
        path: '/wrongDetail',
        query: {
          id: id,
          idList: this.idList,
          selectIndexd: ind,
          ifMaster: this.ifMastered + 1,
          questionIdList: this.questionIdList,
          type: 2 // 错题详情
        }
      })
      console.log(id)
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
      this.classifyDetail = []
      this.idList = []
      this.questionIdList = []
      this.classifyName = val
      getClassifyDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        examCategory: val,
        gradeLevel: this.levelName,
        master: this.ifMastered + 1
      }).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.classifyDetail = res.data.data.questionInfo.map((item, index) => {
            return {
              show: false,
              index: index,
              content: item
              // children: []
            }
          })
          for (const i in res.data.data.questionInfo) {
            this.idList.push(res.data.data.questionInfo[i].question.id)
            this.questionIdList.push(res.data.data.questionInfo[i].question.questionId)
          }
          console.log('id列表1', this.questionIdList)
        } else {
          this.classifyDetail = []
        }

        // this.classifyDetail = res.data.data.questionInfo
        // for (const item in this.classifyDetail) {
        //   this.classifyDetail[item]['show'] = false
        //   this.classifyDetail[item]['index'] = parseInt(item)
        //   this.showList.push(0)
        //   // this.showList1[item] = false
        // }
        console.log('7894565431')
        console.log(this.idList)
        console.log(this.classifyDetail.length)
      })
    },
    gotoClassifyDetail () { // 查看最下面的分类模块
      this.bottomClassifyList_one = []
      this.bottomClassifyList_two = []
      getClassifyClassify({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        examCategory: this.classifyName,
        gradeLevel: this.levelName,
        master: this.ifMastered + 1
      }).then(res => {
        // if (res.data.data.info !== '') {
        this.bottomClassify = res.data.data.info
        for (const item in Object.keys(this.bottomClassify)) {
          this.bottomClassifyList_one.push({
            'key': Object.keys(this.bottomClassify)[item],
            'value': this.bottomClassify[Object.keys(this.bottomClassify)[item]]
          })
          console.log(typeof this.bottomClassify[Object.keys(this.bottomClassify)[item]])
          console.log(this.bottomClassify[Object.keys(this.bottomClassify)[item]])
          if (this.bottomClassify[Object.keys(this.bottomClassify)[item]] instanceof Object) {
            let valueValue = this.bottomClassify[Object.keys(this.bottomClassify)[item]]
            console.log(Object.keys(valueValue))
            for (const twoItem in Object.keys(valueValue)) {
              this.bottomClassifyList_two.push({
                'key': Object.keys(valueValue)[twoItem],
                'value': valueValue[Object.keys(valueValue)[twoItem]]
              })
            }
          }
        }
        console.log('45644444444', this.bottomClassifyList_one)
        console.log('1111111111111', this.bottomClassifyList_two)
        console.log(res.data.data)
        // }
        this.showClassify = true
      })
    },
    gotoClose () { // 最下面的弹起关闭
      this.showClassify = false
    },
    consoleIndex () {
      this.$store.commit('SET_IF_MASTER', this.ifMastered)
      console.log('click demo01', this.ifMastered)
      this.getWrongClassfiRecord()
      this.getClassifyContent(this.classifyName)
    },
    searchWrong () {
      // console.log(this.$refs.search)
      this.$refs.search.onFocus() // 获取搜索框的焦点
      this.showWrongSearch = true
    },
    resultClick (item) {
      this.key = item.title
      this.gotoSearchDetail(item.other)
      // window.alert('you click the result item: ' + JSON.stringify(item))
    },
    gotoSearchDetail (val) {
      this.$router.push({
        path: '/gotoSearchDetail',
        query: {
          id: val,
          // ifMaster: this.ifMastered + 1
        }
      })
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = []
      gotoSearch({
        desc: this.key,
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online
      }).then(res => {
        console.log('搜索结果：', res.data.data)
        this.searchContent = res.data.data
        for (const item in res.data.data) {
          const val = {title: res.data.data[item].questionContext, other: res.data.data[item].id}
          this.results.push(val)
        }
      })
      // this.results = val ? getResult(this.key) : []
      console.log('结果：', this.results)
    },
    onSubmit () {
      this.$refs.search.setBlur()
    },
    cancelSearch () {
      this.showWrongSearch = false
    }
  }
}
// function getResult (val) {
//   let rs = []
//   for (let i = 0; i < 20; i++) {
//     rs.push({
//       title: `${val} result: ${i + 1} `,
//       other: i
//     })
//   }
//   return rs
// }
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
  /*.wrongQues >>> .vux-popover {*/
  /*  left: 60%;*/
  /*}*/
  .popover-demo-content {
    padding: 5px 10px;
    font-size: 13px;
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
        text-align: center;
      }
      .two {
        width: 30%;
        margin: 0 10px;
        text-align: center;
      }
      .three {
        width: 26%;
        margin-left: 10px;
        text-align: left;
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
  .wrongQues_info >>> .weui-cells.vux-search_show {
    width: 85%;
    color: #3c3c3c;
    max-height: none;
  }
  .wrongQues_info >>> .weui-cell_access {
    font-size: 14px;
    /*white-space: nowrap; // 强制一行显示*/
    /*width: 90%;*/
    /*overflow: hidden; // 超出部分隐藏*/
    /*text-overflow: ellipsis; // 超出部分显示省略号*/
  }
  .wrongQues_info >>> .weui-cell__bd p {
    white-space: nowrap; // 强制一行显示
    width: 250px;
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
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
    /*margin-top: 10px;*/
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 141px);
    /*margin-top: 10px;*/
    /*background-color: #fff;*/
  }
  .wrongQues_third_detail_noData {
    text-align: center;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 0;
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
  .section_exec_third {
    height: 25px;
    background-color: rgba(255,255, 223, 0.7);
    font-size: 13px;
    line-height: 25px;
    .iconfont {
      font-size: 14px;
      margin-right: 7px;
      /*line-height: 25px;*/
    }
  }
  .section_exec_third_left {
    line-height: 25px;
    width: 25%;
    text-align: center;
    /*margin-left: 10px;*/
    display: inline-block;
  }
  .section_exec_third_right {
    width: 65%;
    line-height: 25px;
    text-align: right;
    display: inline-block;
  }
  .section_exec_third_title {
    text-indent: 2em;
    padding: 10px 0;
    font-size: 14px;
    line-height: 25px;
    span {
      margin-left: 5px;
    }
  }
  .section_exec_third_content {
    text-indent: 3em;
  }
</style>
