<template>
  <div class="chapter_exer_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">练习答题</div>
    </div>
    <div class="section_exec_second" ref="section_exec_second">
      <div>
        <div v-for="(item, index) in one_section_content" :key="index">
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <!-- 这个是内容 -->
              <div v-if="selectIndex === index" class="section_exec_ques">
                <span>{{item.question.questionType}}</span>
                {{item.question.questionContext.split('）')[0] + '）'}}
                <!--          <div class="choose-box" v-for="(a,index) in item.option" :key="index">-->
                <!--            <input name="biological" type="radio" value="" />-->
                <!--            <label style="cursor:pointer">{{a}}</label>-->
                <!--          </div>-->
                <div class="box">
                  <!--未选择选项时，selectRight为0-->
                  <div v-if="selectRight === 0" v-for="(c,index) of item.randomOption" class="ques_option" :class="{checked:index === n}" @click="changeList(c, index)" :key="index"><span :class="{checked:index === n}">{{c.split('．')[0]}}</span>{{c.split('．')[1]}}</div>
                  <!--选择正确时，selectRight为1-->
                  <div v-if="selectRight === 1">
                    <div v-for="(c,index) of item.randomOption" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluduigou"></i>{{c.split('．')[1]}}</div>
                      <div v-if="index !== n"><span>{{c.split('．')[0]}}</span>{{c.split('．')[1]}}</div>
                    </div>
                    <x-button class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2">
                    <div  v-for="(c,index) of item.randomOption" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('．')[1]}}</div>
                      <div v-else-if="index === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('．')[1]}}</div>
                      <div v-else><span>{{c.split('．')[0]}}</span>{{c.split('．')[1]}}</div>
                    </div>
                    <x-button class="right_button">正确答案是{{item.rightOption}}，你的答案是{{item.randomOption[n].split('．')[0]}}</x-button>
                  </div>
                </div>
              </div>
              <div class="section_exec_jiexi" v-if="selectIndex === index && selectRight !== 0">
                <div v-if="selectRight === 1">
                  <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>
                  <div v-if="showDetail">
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>解析</h4>
                      <div class="jiexi_content">
                        {{item.question.correctAnalysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{item.question.questionAttribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question.questionDifficult}}</span>
                      <!--                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>-->
                    </div>
                  </div>
                </div>
                <div v-if="selectRight === 2">
                  <!--              <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>-->
                  <div>
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>解析</h4>
                      <div class="jiexi_content">
                        {{item.question.correctAnalysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{item.question.questionAttribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question.questionDifficult}}</span>
                      <!--                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-touch>
        </div>
      </div>
    </div>
    <div class="section_exec_third">
      <div v-if="!showCollec" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
      <div v-if="showCollec" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
      <div class="section_exec_third_center"><i class="iconfont icon_luluduigou"></i><span>{{currentRight}}</span><i class="iconfont icon_luluchahao-copy-copy-copy"></i><span>{{currentError}}</span></div>
      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showSum" position="bottom" max-height="50%">
        <div class="section_exec_third">
          <div class="section_exec_third_left"><i class="iconfont icon_lulucollect"></i>收藏</div>
          <div class="section_exec_third_center"><i class="iconfont icon_luluduigou"></i><span>{{currentRight}}</span><i class="iconfont icon_luluchahao-copy-copy-copy"></i><span>{{currentError}}</span></div>
          <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>
        </div>
        <group>
          <div class="section_exec_third_title">
            {{paperName.split('\\n')[1]}}
          </div>
<!--          <div v-for="(i, index) in allSum" :key="index" class="section_exec_third_content">-->
          <div v-for="(i, index) in allSum" :key="index" class="section_exec_third_content" @click="selectNoItem(i)">
            <cell v-if="currentRightList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell right"></cell>
            <cell v-else-if="currentErrorList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell error"></cell>
            <cell v-else :key="i" :title="i" class="section_exec_cell nodo"></cell>
          </div>
        </group>
<!--        <div style="padding: 15px;">-->
<!--          <x-button @click.native="showSum = false" plain type="primary"> Close Me </x-button>-->
<!--        </div>-->
      </popup>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getOneSectionQues, getCurrentRecord, getNoSelectCurrentRecord, collectCurrentQues} from '@/api/index'
import { LoadMore, TransferDom, Group, XSwitch, Cell } from 'vux'
// import ToggleText from './ToggleText'
export default {
  directives: {
    TransferDom
  },
  components: {
    LoadMore, Group, XSwitch, Cell
    // ToggleText
  },
  data () {
    return {
      showCollec: false, // 是否收藏此题
      showDetail: false, // 是否展示答案详解
      selectRight: 0,
      one_section_content: [],
      selectIndex: 0, // 当前展示的题的索引
      // picked: 'study',
      n: -1, // 当前题的选项的索引
      rightOp: -1, // 选错以后正确选项的判断
      exerScroll: null,
      currentRight: 0, // 当前正确的个数
      currentRightList: [], // 当前正确的列表
      currentErrorList: [], // 当前错误的列表
      currentNotList: [], // 当前未做的列表
      currentError: 0, // 当前错误的个数
      allSum: 0, // 此份卷子所有的题的个数
      showSum: false, // 此份卷子所有未做的详情
      id: -1, // 当前题的id
      paperid: -1 // 组卷id
    }
  },
  computed: {
    paperName () {
      // console.log(this.$route.params.fullName)
      return this.$route.params.paperName
    },
    subject_online () {
      // console.log(this.$route.params.fullName)
      // return this.$route.params.subject
      return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    }
  },
  mounted () {
    this.init()
    this.getOneSectionQues() // // 此试卷的所有题
    // this.getNoSelect_allQues() // 未点击时出现的正确错误个数
  },
  watch: {
    selectIndex (val, oldval) {
      this.showCollec = false
      console.log('suoyinbianhuale :', val, oldval)
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      this.$nextTick(() => {
        this.exerScroll = new BScroll(this.$refs.section_exec_second, {
          click: true
        })
      })
    },
    collectCurrentQues () { // 收藏当前题
      if (this.showCollec === false) {
        collectCurrentQues({
          id: this.one_section_content[this.selectIndex].question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          classification: ''
        }).then(res => {
          console.log('收藏', res.data)
        })
        this.showCollec = true
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: '您已收藏此题啦！'
        })
      }
    },
    selectNoItem (i) { // 下面的查看做题详情，点击其中的题号，跳到当前的题
      console.log(i)
      this.n = -1 // 未进行点击选项
      this.selectRight = 0 // 未选择状态
      this.showSum = false // 当前答题情况关闭==未查看
      this.selectIndex = i - 1 // 跳到下一个答题页面
    },
    getNoSelect_allQues () { // 未点击时出现的正确错误个数
      getNoSelectCurrentRecord({
        studentNumber: this.schoolNumber,
        paperName: this.paperName,
        subject: this.subject_online
      }).then(res => {
        console.log(res.data.data)
        this.currentRight = res.data.data.doRight
        this.currentError = res.data.data.doError
        // this.currentNotList = res.data.data.notDoList
      })
    },
    get_noselect_current () {
      this.showSum = !this.showSum
      // if (this.showSum === false) {
      //   getNoSelectCurrentRecord({
      //     studentNumber: this.schoolNumber,
      //     paperName: this.paperName,
      //     subject: this.subject_online
      //   }).then(res => {
      //     console.log(res.data.data)
      //     this.currentRightList = res.data.data.doRightList
      //     this.currentErrorList = res.data.data.doErrorList
      //     this.currentNotList = res.data.data.notDoList
      //   })
      //   this.showSum = true
      // } else {
      //   this.showSum = false
      // }
    },
    // getNoSelect_allQues () {
    //   getNoSelectCurrentRecord({
    //     studentNumber: this.schoolNumber,
    //     paperName: this.paperName,
    //     subject: this.subject_online
    //   }).then(res => {
    //     this.allSum = res.data.data.questionCount
    //   })
    // },
    swiperleft: function () {
      this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex < this.one_section_content.length - 1) {
        this.selectIndex += 1
        console.log('展示的题：', this.selectIndex)
        this.selectRight = 0
        this.showDetail = false
        // this.$router.push({'path': '/home'})
        console.log('左划')
      }
    },
    swiperright: function () {
      this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex > 0) {
        this.selectIndex -= 1
        this.selectRight = 0
        this.showDetail = false
      }
    },
    getOneSectionQues () {
      getOneSectionQues({
        paperName: this.paperName,
        subject: this.subject_online,
        studentNumber: this.schoolNumber,
        openid: this.openid
      }).then(res => {
        this.one_section_content = res.data.data
        this.allSum = res.data.data.length // 所有题的个数
        console.log('所有信息：', res.data)
      })
    },
    changeList (answer, index) {
      this.n = index // index为选项的索引
      const that = this
      setTimeout(function () {
        if (answer.split('．')[1] === that.one_section_content[that.selectIndex].question.correctText) {
          that.selectRight = 1 // 答对
          console.log('right')
        } else {
          console.log('答错')
          const options = that.one_section_content[that.selectIndex].randomOption
          console.log(options)
          for (const item in options) {
            if (options[item].split('．')[0] === that.one_section_content[that.selectIndex].rightOption) {
              console.log('正确选项：', typeof item)
              that.rightOp = parseInt(item)
            }
          }
          that.selectRight = 2 // 答错
        }
        that.id = that.one_section_content[that.selectIndex].question.id
        that.paperid = that.one_section_content[that.selectIndex].sourcePaperId // 组卷id
        that.getCurrentRecord(answer)
      }, 400)
      console.log(answer)
      // this.n = index // index为选项的索引
      // if (answer.split('．')[1] === this.one_section_content[this.selectIndex].question.correctText) {
      //   this.selectRight = 1 // 答对
      //   console.log('right')
      // } else {
      //   console.log('答错')
      //   const options = this.one_section_content[this.selectIndex].randomOption
      //   console.log(options)
      //   for (const item in options) {
      //     if (options[item].split('．')[0] === this.one_section_content[this.selectIndex].rightOption) {
      //       console.log('正确选项：', typeof item)
      //       this.rightOp = parseInt(item)
      //     }
      //   }
      //   this.selectRight = 2 // 答错
      // }
      // this.id = this.one_section_content[this.selectIndex].question.id
      // this.answer = answer
      // console.log('id:', typeof this.id)
      // const that = this
      // setTimeout(function () {
      //
      // }, 3000)
      // that.getCurrentRecord(answer)
      // this.n = -1
    },
    // changeList (answer, index) {
    //   // const that = this
    //   // setTimeout(function () {
    //   //
    //   // }, 3000)
    //   console.log(answer)
    //   this.n = index // index为选项的索引
    //   if (answer.split('．')[1] === this.one_section_content[this.selectIndex].question.correctText) {
    //     this.selectRight = 1 // 答对
    //     console.log('right')
    //   } else {
    //     console.log('答错')
    //     const options = this.one_section_content[this.selectIndex].randomOption
    //     console.log(options)
    //     for (const item in options) {
    //       if (options[item].split('．')[0] === this.one_section_content[this.selectIndex].rightOption) {
    //         console.log('正确选项：', typeof item)
    //         this.rightOp = parseInt(item)
    //       }
    //     }
    //     this.selectRight = 2 // 答错
    //   }
    //   this.id = this.one_section_content[this.selectIndex].question.id
    //   // this.answer = answer
    //   console.log('id:', typeof this.id)
    //   // const that = this
    //   // setTimeout(function () {
    //   //
    //   // }, 3000)
    //   this.getCurrentRecord(answer)
    //   // this.n = -1
    // },
    getCurrentRecord (ans) {
      getCurrentRecord({
        id: this.id,
        studentNumber: this.schoolNumber,
        openid: this.openid,
        commitString: ans,
        paperName: this.paperName,
        subject: this.subject_online,
        sourcePaperId: this.paperid
      }).then(res => {
        console.log('当前大体情况', res.data.data)
        this.currentError = res.data.data.doError
        this.currentRight = res.data.data.doRight
        this.currentRightList = res.data.data.doRightList
        this.currentErrorList = res.data.data.doErrorList
        this.currentNotList = res.data.data.notDoList
        // this.allSum = res.data.data.questionCount
        // console.log(res.data)
      })
    },
    gotoNextQues () {
      this.selectIndex += 1
      console.log('展示的题：', this.selectIndex)
      this.selectRight = 0
      this.showDetail = false
    },
    seeDetail () {
      this.showDetail = true
    }
  }
}
</script>
<style scoped lang="scss">
  .chapter_exer_info {
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
  .section_exec_second {
    /*margin-top: 15px;*/
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 71px);
    /*background-color: #fff;*/
  }
  .wrapper {
    touch-action: pan-y!important;
  }
  .section_exec_ques {
    background-color: #fff;
    padding: 20px 17px 15px;
    line-height: 30px;
    span {
      background-color: #417dda;
      font-size: 11px;
      color: #fff;
      padding: 2px 4px 2px 3px;
      margin-right: 5px;
      /*border-radius: 2em 1em 4em / 0.5em 3em;*/
      border-top-left-radius: 12px;
      border-top-right-radius: 1em;
      /*border-bottom-right-radius: 4em 0.5em;*/
      border-bottom-left-radius: 12px;
    }
  }
  .box{
    /*text-align: center;*/
    margin-top:20px;
    line-height: 40px;
    /*margin-left: 50%;
    transform: translateX(-50%);*/
    .icon_luluduigou {
      color: #42b983;
      margin-right: 15px;
      line-height: 40px;
    }
    .icon_luluchahao-copy-copy-copy {
      color: red;
      /*font-size: 23px;*/
      margin-right: 15px;
      line-height: 40px;
    }
    span {
      line-height: 40px;
      margin-right: 15px;
      cursor:pointer;
      color: #3c3c3c;
      font-size: 16px;
      font-weight: bold;
      background-color: #fff;
      /*border:2px #9c9c9c solid;*/
      border-radius: 50%;
    }
    /*选择当前选项时，出现checked属性，并且变色*/
    .checked {
      color: #42b983;
      /*background-color:  #CCFF99;;*/
    }
    /*span.checked {*/
    /*  !*color:#0CF;*!*/
    /*  color:#42b983;*/
    /*  background-color: #42b983;*/
    /*}*/
    /*span.checked:before{*/
    /*  background-color:#42b983;*/
    /*  !*background-color:#0CF;*!*/
    /*  border:2px #9c9c9c solid;*/
    /*}*/
    /*span:before{*/
    /*  display:inline-block;*/
    /*  width:10px;*/
    /*  height:10px;*/
    /*  line-height:10px;*/
    /*  content:"";*/
    /*  border:2px #9c9c9c solid;*/
    /*  border-radius: 10px;*/
    /*  margin-right:10px;*/
    /*  transition:all 0.3s linear;*/
    /*}*/
  }
  .ques_option {
    margin-left: 20px;
    /*text-align: left;*/
    /*margin-left: 50%;
    transform: translateX(-50%);*/
  }
  /*.select-right {*/
  /*  color: red;*/
  /*}*/
  .right_button {
    margin-top: 15px;
    font-size: 16px;
    /*border-color: #42b983;*/
    width: 90%;
  }
  .weui-btn:after {
    border: 1px solid #42b983;
  }
  .section_exec_jiexi {
    padding: 15px 17px 15px;
    margin-top: 10px;
    background-color: #fff;
  }
  .right_button_jiexi {
    width: 90%;
    font-size: 16px;
  }
  .vux-loadmore.weui-loadmore_line {
    margin: 0.6em auto 0.8em;
  }
  .vux-loadmore.weui-loadmore_line:before, .vux-loadmore.weui-loadmore_line:after {
    margin-top: 0.9em;
  }
  .weui-loadmore_line .weui-loadmore__tips {
    top: unset;
  }
  .smallKuang {
    height: 15px;
    width: 5px;
    background-color: rgba(0,0,139,0.8);
    /*float: left;*/
    display: inline-block;
  }
  h4 {
    display: inline-block;
    margin-left: 10px;
  }
  .jiexi_content {
    margin-top: 10px;
    text-indent: 2em;
    font-size: 14px;
  }
  .jiexi_second {
    margin-bottom: 15px;
    span {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .jiexi_knowledge_point {
    margin-top: 15px;
    font-size: 14px;
    text-indent: 2em;
    color: #fff;
    span {
      padding: 5px 8px;
      border-radius: 10px;
      background-color: #42b983;
    }
  }
  .section_exec_third {
    height: 25px;
    background-color: rgba(255,255, 223, 0.7);
    font-size: 13px;
    .iconfont {
      font-size: 14px;
      margin-right: 7px;
    }
    .icon_luluduigou {
      color: #42b983;
    }
    .icon_luluchahao-copy-copy-copy {
      color: red;
    }
  }
  .section_exec_third_left {
    line-height: 25px;
    width: 27%;
    text-align: center;
    display: inline-block;
  }
  .section_exec_third_left {
    .icon_luluenjoy1 {
      color: red;
    }
  }
  .section_exec_third_center {
    line-height: 25px;
    width: 40%;
    text-align: center;
    display: inline-block;
    span {
      margin-right: 20px;
    }
  }
  .section_exec_third_right {
    width: 30%;
    line-height: 25px;
    display: inline-block;
    .iconfont {
      margin-left: 30px;
    }
  }
  .section_exec_third_title {
    /*background-color: rgba(255,255, 223, 0.7);*/
    /*margin-left: 20px;*/
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    /*font-weight: bold;*/
  }
  .section_exec_third_content {
    margin-top: 15px;
    display: inline-block;
    margin-left: 25px;
    color: red;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
  }
  .section_exec_cell {
    padding: unset;
  }
  .section_exec_third_tan >>> .weui-cells {
    background-color: #FFF;
    /*background-color: rgba(255,255, 223, 0.7);*/
    margin-top: unset;
    padding: 10px 0 25px;
  }
  .section_exec_third_tan {
    .right {
      width: 40px;
      height: 40px;
      border: 1px solid #ececec;
      border-radius: 50%;
      /*background-color: #c4dfb8;*/
      background-color: #CCFF99;
    }
    .error {
      width: 40px;
      height: 40px;
      border: 1px solid #ececec;
      border-radius: 50%;
      /*background-color: #ec8b89;*/
      background-color: #FFCC99;
    }
    .nodo {
      width: 40px;
      height: 40px;
      border: 1px solid #ececec;
      border-radius: 50%;
      background-color: #fff;
      /*background-color: #ccc;*/
    }
  }
</style>
