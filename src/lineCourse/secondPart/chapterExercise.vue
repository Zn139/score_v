<template>
  <div class="chapter_exer_info" id="dblclicks">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">练习答题</div>
    </div>
    <div class="section_exec_second" ref="section_exec_second">
<!--    <div class="section_exec_second" ref="section_exec_second" @dblclick="collectCurrentQues">-->
      <div>
        <div v-for="(item, index) in one_section_content" :key="index">
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <!-- 这个是内容 -->
              <div v-if="selectIndex === index" class="section_exec_ques">
                <span>{{item.question.questionType}}</span>
                {{item.question.questionContext}}
                <div class="section_exec_second_img" v-if="item.question.questionImgs !== ''">
                  <img :src="item.question.questionImgs" alt="" style="width: 100%;height: 100%;">
                </div>
                <!--{{item.question.questionContext.split('）')[0] + '）'}}-->
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
                    <x-button v-if="selectIndex !== allSum - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>
<!--                    <x-button v-if="selectIndex === allSum" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
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
      <!--判断是否收藏 1表示收藏  2表示没有收藏-->
      <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
      <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
      <div class="section_exec_third_center"><i class="iconfont icon_luluduigou"></i><span>{{currentRight}}</span><i class="iconfont icon_luluchahao-copy-copy-copy"></i><span>{{currentError}}</span></div>
      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showSum" position="bottom" max-height="50%">
        <div class="section_exec_third">
          <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
          <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
          <!--          <div class="section_exec_third_left"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
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
<!--            <x-button class="enter_submit" @click.native="submitTranscript">重新做题</x-button>-->
          </div>
          <div class="redoQues" v-if="currentNotList.length === 0">
            <x-button class="enter_submit" @click.native="redoQues">重新做题</x-button>
          </div>
          <div class="redoQues" v-if="currentNotList.length > 0">
            <x-button class="enter_submit1" disabled>重新做题</x-button>
          </div>
        </group>
<!--        <div class="redoQues">重新做题</div>-->
<!--        <div style="padding: 15px;">-->
<!--          <x-button @click.native="showSum = false" plain type="primary"> Close Me </x-button>-->
<!--        </div>-->
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showTanTip"
               confirm-text="重新做"
               cancel-text="查看上次记录">
        <p style="text-align:center;">重新做还是查看上次记录？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getOneSectionQues, getCurrentRecord, getNoSelectCurrentRecord, collectCurrentQues, cancelCollectCurrentQues, recordCurrentAnsToQues, getPreRecord, getShowCollect} from '@/api/index'
import { LoadMore, TransferDom, Group, XSwitch, Cell } from 'vux'
// import ToggleText from './ToggleText'
export default {
  directives: {
    TransferDom
  },
  components: {LoadMore, Group, XSwitch, Cell},
  data () {
    return {
      showTanTip: false, // 再次进入时，是否展示弹框提示
      showCollec: 0, // 是否收藏此题
      showDetail: false, // 是否展示答案详解
      selectRight: 0,
      one_section_content: [],
      selectIndex: 0, // 当前展示的题的索引
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
      paperid: -1, // 组卷id
      quesList: [], // 所有题刚开始的情况，有没有选项啥的
      answer_to_ques: {}, // 用户返回时的答卷信息
      userOption: -1, // 后台返回的用户的选项
      selectToRight: 0, // 后台返回的用户的选项是否正确
      flag: 0 // 退出时要不要保存记录
    }
  },
  computed: {
    paperName () { // 表示节的名称
      console.log('paperName:', this.$route.params.paperName)
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
    // this.getOneSectionQues() // // 此试卷的所有题
    this.getPreRecord() // 获取之前的记录
    // this.getNoSelect_allQues() // 未点击时出现的正确错误个数
  },
  watch: { // 监听题号的索引的变化
    selectIndex (val, oldval) {
      this.selectRight = this.quesList[this.selectIndex].selectRight
      if (this.quesList[this.selectIndex].showDetail === true) {
        // console.log('daduileme :', this.showDetail)
        this.showDetail = true
      } else {
        this.showDetail = false
      }
      this.n = this.quesList[this.selectIndex].n
      // console.log('索引李：', this.selectIndex)
      // if (this.flag === 0) {
      this.getCollect()
      // this.showCollec = this.quesList[this.selectIndex].showCollec
      // this.showCollec = this.one_section_content[this.selectIndex].collect
      // } else {
      //   this.showCollec = this.one_section_content[this.selectIndex].collection
      // }
    }
  },
  methods: {
    returnBack () {
      console.log(this.answer_to_ques)
      for (const a in this.answer_to_ques) {
        console.log(this.answer_to_ques[a])
        if (this.answer_to_ques[a] === '') {
          this.flag = 0 // 全是空，则不保存
        } else {
          this.flag = 1 // 但凡有一个不为空，即保存
          break
        }
      }
      if (this.flag === 1) {
        recordCurrentAnsToQues({
          studentNumber: this.schoolNumber,
          openid: this.openid,
          paperName: this.paperName,
          subject: this.subject_online,
          examPaperContent: JSON.stringify(this.one_section_content),
          examPaperAnwer: this.answer_to_ques
        }).then(res => {
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },
    init () {
      console.log('初始化：', this.$refs.section_exec_second)
      this.$nextTick(() => {
        this.exerScroll = new BScroll(this.$refs.section_exec_second, {
          click: true
        })
      })
    },
    redoQues () {
      this.showSum = false
      this.selectRight = 0
      this.selectIndex = 0
      this.n = -1
      // this.selectToRight = 0
      this.currentError = 0
      this.currentErrorList = []
      this.currentNotList = []
      this.currentRight = 0
      this.currentRightList = []
      this.getOneSectionQues()
    },
    getCollect () {
      getShowCollect({
        id: this.quesList[this.selectIndex].id
      }).then(res => {
        this.showCollec = res.data.data.collect
        // console.log('收藏了？', res.data.data.collect)
      })
    },
    getPreRecord () {
      this.quesList = []
      getPreRecord({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        paperName: this.paperName
      }).then(res => {
        console.log(res.data)
        // console.log(res.data.data[0].effective)
        if (res.data.code === 0) { // 做过题
          this.allSum = res.data.data[0].list.length // 所有题的个数
          // this.flag = 1 // 做过题
          // if (res.data.data[0].effective === 1) { // 上次记录做完了
          // this.showSum = true
          // this.selectIndex = this.allSum - 1
          if (parseInt(res.data.data[0].firstNoDoneNum) === this.allSum) {
            this.showSum = true
            this.selectIndex = this.allSum - 1
          } else {
            this.selectIndex = parseInt(res.data.data[0].firstNoDoneNum)
          }
          this.one_section_content = res.data.data[0].list
          console.log(this.one_section_content)
          this.currentRightList = []
          this.currentError = 0
          this.currentRight = 0
          this.currentErrorList = []
          this.currentNotList = []
          for (const item in this.one_section_content) {
            this.userOption = -1
            this.selectToRight = 0
            if (this.one_section_content[item].complete === 1) { // 表示这道题做了
              if (this.one_section_content[item].userOption === 'A') {
                this.userOption = 0
              } else if (this.one_section_content[item].userOption === 'B') {
                this.userOption = 1
              } else if (this.one_section_content[item].userOption === 'C') {
                this.userOption = 2
              } else if (this.one_section_content[item].userOption === 'D') {
                this.userOption = 3
              }
              if (this.one_section_content[item].userOption === this.one_section_content[item].question.rightOption) {
                this.selectToRight = 1 // right
                this.currentRight += 1
                this.currentRightList.push(parseInt(item) + 1)
              } else {
                this.selectToRight = 2 // error
                for (const j in this.one_section_content[item].randomOption) {
                  if (this.one_section_content[item].randomOption[j].split('．')[0] === this.one_section_content[item].rightOption) {
                    this.rightOp = parseInt(j)
                  }
                }
                this.currentError += 1
                this.currentErrorList.push(parseInt(item) + 1)
              }
              // console.log('this.selectToRight:', this.selectToRight)
            } else if (res.data.data[0].list[item].complete === 2) { // 这道题没做
              this.currentNotList.push(parseInt(item) + 1)
              this.selectToRight = 0
              this.userOption = -1
            }
            const oneDetail = {'index': item, 'n': this.userOption, 'selectRight': this.selectToRight, 'id': this.one_section_content[item].question.id}
            // console.log('当前选项：', oneDetail)
            this.quesList.push(oneDetail)
            this.answer_to_ques[item] = this.one_section_content[item].userOption
          }
        } else { // 没做过题
          this.getOneSectionQues()
        }
        // console.log('之前的记录~~~~', res.data.data)
      })
    },
    collectCurrentQues () { // 收藏当前题
      if (this.showCollec === 2) { // 表示未收藏
        collectCurrentQues({
          id: this.one_section_content[this.selectIndex].question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          classification: ''
        }).then(res => {
          // console.log('收藏', res.data)
          this.$vux.toast.text('收藏成功')
          this.showCollec = 1
        })
      } else if (this.showCollec === 1) {
        cancelCollectCurrentQues({
          id: this.one_section_content[this.selectIndex].question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          paperName: this.paperName,
          subject: this.subject_online,
          cancel: 2
        }).then(res => {
          // console.log('cancel', res.data)
          this.$vux.toast.text('取消收藏成功')
          this.showCollec = 2
        })
        // this.$vux.alert.show({
        //   title: '提示',
        //   content: '您已收藏此题啦！'
        // })
      }
    },
    selectNoItem (i) { // 下面的查看做题详情，点击其中的题号，跳到当前的题
      // console.log(i)
      // this.n = -1 // 未进行点击选项
      // this.selectRight = 0 // 未选择状态
      this.showSum = false // 当前答题情况关闭==未查看
      this.selectIndex = i - 1 // 跳到下一个答题页面
    },
    getNoSelect_allQues () { // 未点击时出现的正确错误个数
      getNoSelectCurrentRecord({
        studentNumber: this.schoolNumber,
        paperName: this.paperName,
        subject: this.subject_online
      }).then(res => {
        // console.log(res.data.data)
        this.currentRight = res.data.data.doRight
        this.currentError = res.data.data.doError
        // this.currentNotList = res.data.data.notDoList
      })
    },
    // getclick () {
    //   var clicks = document.getElementById('dblclicks')
    //   clicks.addEventListener('doubleTap', function () {
    //     alert('ss')
    //   })
    // },
    get_noselect_current () { // 当前所答题情况框，是否显示
      this.showSum = !this.showSum
    },
    swiperleft: function () {
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex < this.one_section_content.length - 1) {
        this.selectIndex += 1
        // console.log('展示的题：', this.selectIndex)
        // this.selectRight = 0
        // this.showDetail = false
        // this.$router.push({'path': '/home'})
        // console.log('左划')
      }
    },
    swiperright: function () {
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex > 0) {
        this.selectIndex -= 1
        // this.selectRight = 0
        // this.showDetail = false
      }
    },
    getOneSectionQues () {
      this.quesList = []
      getOneSectionQues({
        paperName: this.paperName,
        subject: this.subject_online,
        studentNumber: this.schoolNumber,
        openid: this.openid
      }).then(res => {
        this.one_section_content = res.data.data
        // console.log('所有题：', this.one_section_content)
        this.allSum = res.data.data.length // 所有题的个数
        this.showCollec = this.one_section_content[this.selectIndex].collect
        // 给每个题都加上一个字典，未做题的情况
        for (const item in this.one_section_content) {
          const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.one_section_content[item].question.id}
          this.currentNotList.push(parseInt(item) + 1)
          // const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'showDetail': false}
          this.quesList.push(oneDetail)
          this.answer_to_ques[item] = ''
          // console.log(parseInt(item) + 1)
        }
        console.log(this.currentNotList)
        console.log(this.currentNotList.length)
      })
    },
    changeList (answer, index) {
      this.n = index // index为选项的索引
      this.quesList[this.selectIndex].n = index
      // console.log(this.quesList)
      this.answer_to_ques[this.selectIndex] = answer.split('．')[0]
      const that = this
      setTimeout(function () {
        if (answer.split('．')[1] === that.one_section_content[that.selectIndex].question.correctText) {
          that.selectRight = 1 // 答对
          that.quesList[that.selectIndex].selectRight = 1
        } else {
          const options = that.one_section_content[that.selectIndex].randomOption
          for (const item in options) {
            if (options[item].split('．')[0] === that.one_section_content[that.selectIndex].rightOption) {
              that.rightOp = parseInt(item)
            }
          }
          that.selectRight = 2 // 答错
          that.quesList[that.selectIndex].selectRight = 2
        }
        that.id = that.one_section_content[that.selectIndex].question.id
        that.paperid = that.one_section_content[that.selectIndex].sourcePaperId // 组卷id
        that.getCurrentRecord(answer)
      }, 400)
      // console.log('答案是：', this.answer_to_ques)
    },
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
      })
    },
    gotoNextQues () {
      this.selectIndex += 1
      // console.log('展示的题：', this.selectIndex)
      // this.selectRight = 0
      // this.showDetail = false
    },
    seeDetail () {
      this.showDetail = true
      this.quesList[this.selectIndex].showDetail = true
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
  .section_exec_second_img {
    max-height: 100px;
    height: 100px;
    margin-top: 10px;
    width: 80%;
    margin-left: 10%;
  }
  .box{
    /*text-align: center;*/
    margin-top: 10px;
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
  }
  .ques_option {
    margin-left: 20px;
  }
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
  .section_exec_jiexi >>> .weui-loadmore_line .weui-loadmore__tips {
    top: 0;
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
  .redoQues {
    background-color: #fff;
    margin-top: 35px;
  }
  .enter_submit {
    width: 88%;
    color: #fff;
    font-size: 16px;
    /*margin-left: 70%;*/
    margin-top: 45px;
    background-color: #42b982;
  }
  .enter_submit1 {
    width: 90%;
    font-size: 16px;
    margin-top: 45px;
    /*color: #fff;*/
    /*background-color: #ececec;*/
    /*.weui-btn:after {*/
    /*  border: unset;*/
    /*}*/
  }
  /*.enter_submit1 >>> .weui-btn {*/
  /*  border: unset;*/
  /*}*/
  /*.weui-btn:after {*/
  /*  border: unset;*/
  /*}*/
</style>
