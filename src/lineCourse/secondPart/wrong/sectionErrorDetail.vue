<template>
  <div class="chapter_exer_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">练习错题</div>
    </div>
    <div class="section_exec_second" ref="section_exec_second">
      <div>
        <div v-for="(item, index) in errorSectionList" :key="index" v-if="errorSectionList.length > 0">
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <!-- 这个是内容 -->
              <div v-if="selectIndex === index" class="section_exec_ques">
                <span>{{item.question_type}}</span>
                {{item.question_context}}
                <!--                {{item.question_imgs}}-->
                <div class="section_exec_second_img" v-if="item.question_imgs !== ''">
                  <img :src="item.question_imgs" alt="" style="width: 100%;height: 100%;">
                </div>
                <!--{{item.question.questionContext.split('）')[0] + '）'}}-->
                <!--          <div class="choose-box" v-for="(a,index) in item.option" :key="index">-->
                <!--            <input name="biological" type="radio" value="" />-->
                <!--            <label style="cursor:pointer">{{a}}</label>-->
                <!--          </div>-->
                <div class="box">
                  <!--未选择选项时，selectRight为0-->
                  <div v-if="selectRight === 0" v-for="(c,index) of item.question_option" class="ques_option" :class="{checked:index === n}" @click="changeList(c, index)" :key="index"><span :class="{checked:index === n}">{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                  <!--选择正确时，selectRight为1-->
                  <div v-if="selectRight === 1">
                    <div v-for="(c,index) of item.question_option" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-if="index !== n"><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
                    <x-button v-if="selectIndex !== allSum - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>
                    <!--                    <x-button v-if="selectIndex === allSum" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2">
                    <div  v-for="(c,index) of item.question_option" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('.')[1]}}</div>
                      <div v-else-if="index === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-else><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
                    <x-button class="right_button" v-if="selectIndex !== allSum - 1" @click.native="gotoNextQues">正确答案是{{item.correct_option}}，你的答案是{{item.question_option[n].split('.')[0]}}，跳至下题</x-button>
                    <x-button class="right_button" v-if="selectIndex === allSum - 1">正确答案是{{item.correct_option}}，你的答案是{{item.question_option[n].split('.')[0]}}</x-button>
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
                        {{item.correct_analysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{item.question_attribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question_difficult}}</span>
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
                        {{item.correct_analysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{item.question_attribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question_difficult}}</span>
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
    <div class="section_exec_third" v-if="errorSectionList.length > 0">
      <!--判断是否收藏 1表示收藏  2表示没有收藏-->
      <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
      <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
      <div class="section_exec_third_center" v-if="ifMastered === '已掌握'"><span @click="delCurrentQues"><i class="iconfont icon_lulushanchu-copy-copy"></i>删除</span></div>
      <div class="section_exec_third_center" v-if="ifMastered === '未掌握'"></div>
      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showSum" position="bottom" max-height="50%">
        <div class="section_exec_third">
          <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
          <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
          <!--          <div class="section_exec_third_left"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
          <div class="section_exec_third_center" v-if="ifMastered === '已掌握'"><span @click="delCurrentQues"><i class="iconfont icon_lulushanchu-copy-copy"></i>删除</span></div>
          <div class="section_exec_third_center" v-if="ifMastered === '未掌握'"></div>
          <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>
        </div>
        <group>
          <div class="section_exec_third_title">
            {{section}}
          </div>
          <div v-for="(i, index) in quesList" :key="index" class="section_exec_third_content" @click="selectNoItem(i.index)">
            <cell v-if="currentRightList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell right"></cell>
            <cell v-else-if="currentErrorList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell error"></cell>
            <cell v-else :key="i.index" :title="i.question_id" class="section_exec_cell nodo"></cell>
            <!--            <x-button class="enter_submit" @click.native="submitTranscript">重新做题</x-button>-->
          </div>
          <div class="redoQues" v-if="ifMastered === '已掌握' && currentRight + currentError === allSum">
            <x-button class="enter_submit" @click.native="redoQues">重新做题</x-button>
          </div>
          <div class="redoQues" v-if="ifMastered === '已掌握' && currentRight + currentError !== allSum">
            <x-button class="enter_submit1" disabled>重新做题</x-button>
          </div>
        </group>
        <!--        <div class="redoQues">重新做题</div>-->
        <!--        <div style="padding: 15px;">-->
        <!--          <x-button @click.native="showSum = false" plain type="primary"> Close Me </x-button>-->
<!--                </div>-->
      </popup>
    </div>
    <confirm
      v-model="showConfirm"
      :show-cancel-button="false"
      @on-confirm="onConfirm">
      <p style="text-align:center;">{{showTitle}}</p>
    </confirm>
    <confirm v-model="delShow" @on-cancel="onCancel" @on-confirm="determineDel"><p style="text-align:center;">确定删除吗？</p></confirm>
  </div>
</template>
<script>
import {getSectionDetail, getShowCollect, collectCurrentQues, cancelCollectCurrentQues, delMasterErrorQues, notMasterToMaster} from '@/api/index'
import BScroll from 'better-scroll'
import { LoadMore, TransferDom, Group, Cell } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {LoadMore, Group, Cell},
  data () {
    return {
      showConfirm: false, // 当用户进来时，未携带学号等信息，变没有错题的信息，提示框出现
      showTitle: '', // 提示框内容
      showCollec: 0, // 是否收藏此题
      errorSectionList: [], // 错题详情
      selectIndex: 0, // 索引
      collectSectionList: [], // 收藏详情
      n: -1, // 当前题的选项的索引
      quesList: [], // 所有题刚开始的情况，有没有选项啥的
      selectRight: 0, // 选项的初始状态
      showDetail: false, // 是否展示答案详解
      rightOp: -1, // 选错以后正确选项的判断
      exerScroll: null,
      showSum: false, // 此份卷子所有做的详情--下面的题号的情况
      allSum: 0, // 此份卷子所有的题的个数
      currentRight: 0, // 当前正确的个数
      currentError: 0, // 当前错误的个数
      currentRightList: [], // 当前做对的题号
      currentErrorList: [], // 当前做错的题号
      allQuesNum: [], // 所有题号
      delShow: false, // 是不是要真的删除，提示框
      id: -1, // 针对所有题的当前题的题号
      paperid: -1 // 试卷id
    }
  },
  computed: {
    subject_online () {
      // console.log(this.$route.params.fullName)
      // return this.$route.params.subject
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    },
    chapter () {
      return this.$route.params.chapter
    },
    section () {
      return this.$route.params.section
    },
    ifMastered () {
      console.log('掌握了么', this.$route.params.ifMastered)
      return this.$route.params.ifMastered
    }
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
      this.getCollect()
    }
  },
  mounted () {
    this.init()
    this.getErrorDetail()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      // console.log('初始化：', this.$refs.section_exec_second)
      this.$nextTick(() => {
        this.exerScroll = new BScroll(this.$refs.section_exec_second, {
          click: true
        })
      })
    },
    onConfirm () {
      this.$router.push({name: 'wrongQues'})
    },
    redoQues () { // 重新做题
      this.showSum = false
      this.selectRight = 0
      this.selectIndex = 0
      this.n = -1
      // this.selectToRight = 0
      this.currentError = 0
      this.currentErrorList = []
      // this.currentNotList = []
      this.currentRight = 0
      this.currentRightList = []
      this.getErrorDetail()
    },
    selectNoItem (i) { // 下面的查看做题详情，点击其中的题号，跳到当前的题
      // console.log(i)
      // this.n = -1 // 未进行点击选项
      // this.selectRight = 0 // 未选择状态
      this.showSum = false // 当前答题情况关闭==未查看
      this.selectIndex = i // 跳到下一个答题页面
    },
    getCollect () { // 此题的收藏情况
      // console.log(232423234)
      getShowCollect({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        question_id: this.quesList[this.selectIndex].id
      }).then(res => {
        this.showCollec = res.data.data.collect
        console.log('当前题的收藏状态：', this.showCollec)
      })
    },
    get_noselect_current () { // 当前所答题情况框，是否显示
      this.showSum = !this.showSum
    },
    determineDel () {
      delMasterErrorQues({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        questionId: this.quesList[this.selectIndex].id,
        questionSource: 1 // 练习错题
      }).then(res => {
        if (res.data.code === 0) {
          if (res.data.data.delete === 1) {
            // this.$vux.toast.text('删除成功')
            this.currentError -= 1
            this.getErrorDetail()
          }
        }
      })
    },
    delCurrentQues () {
      // 确定删除吗？
      this.delShow = true
      // console.log(this.selectIndex)
    },
    onCancel () {
      this.delShow = false
    },
    getErrorDetail () { // 得到错误题详细信息
      this.quesList = []
      getSectionDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        chapter: this.chapter,
        section: this.section,
        ifMastered: this.ifMastered
      }).then(res => {
        // this.quesList = []
        console.log('错题情况：', res.data.data)
        if (res.data.code === 0) {
          this.errorSectionList = res.data.data
          this.allSum = res.data.data.length // 所有题的个数
          this.showCollec = this.errorSectionList[this.selectIndex].ifCollect
          for (const item in this.errorSectionList) {
            const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.errorSectionList[item].id, 'question_id': this.errorSectionList[item].question_id}
            this.quesList.push(oneDetail)
            // const quesInfo = {'index': parseInt(item), }
          }
        } else {
          this.errorSectionList = []
          // this.showConfirm = true
          // this.showTitle = res.data.data
        }
      })
    },
    collectCurrentQues () { // 收藏当前题
      console.log('点击了么')
      if (this.showCollec === 2) { // 表示未收藏
        collectCurrentQues({
          id: this.errorSectionList[this.selectIndex].id,
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
          id: this.errorSectionList[this.selectIndex].id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          paperName: this.section,
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
    swiperleft: function () {
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex < this.errorSectionList.length - 1) {
        this.selectIndex += 1
      }
    },
    swiperright: function () {
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.selectIndex > 0) {
        this.selectIndex -= 1
      }
    },
    changeList (answer, index) { // 选选项时的操作
      this.n = index // index为选项的索引
      this.quesList[this.selectIndex].n = index
      // console.log(this.quesList)
      // this.answer_to_ques[this.selectIndex] = answer.split('.')[0]
      const that = this
      setTimeout(function () {
        if (answer.split('.')[1] === that.errorSectionList[that.selectIndex].correct_text) {
          that.selectRight = 1 // 答对
          that.currentRight += 1 // 做对的个数加1
          that.currentRightList.push(that.selectIndex)
          that.quesList[that.selectIndex].selectRight = 1
          console.log('正确列表', that.currentRightList)
        } else {
          const options = that.errorSectionList[that.selectIndex].question_option
          for (const item in options) {
            console.log(options[item].split('.')[0], that.errorSectionList[that.selectIndex].correct_option)
            if (options[item].split('.')[0] === that.errorSectionList[that.selectIndex].correct_option) {
              that.rightOp = parseInt(item)
              console.log(item)
            }
          }
          that.selectRight = 2 // 答错
          that.currentError += 1 // 做对的个数加1
          that.currentErrorList.push(that.selectIndex)
          console.log('错误列表', that.currentErrorList)
          that.quesList[that.selectIndex].selectRight = 2
        }
        that.id = that.errorSectionList[that.selectIndex].id // 针对所有题的题号
        that.paperid = that.errorSectionList[that.selectIndex].exam_id // 试卷id
        if (that.ifMastered === '未掌握') { // 如果是未掌握，才调这个接口，已掌握的话，不调这个接口
          that.notMasterToMastered(answer.split('.')[1])
        }
        // that.getCurrentRecord(answer)
      }, 400)
      // console.log('答案是：', this.answer_to_ques)
    },
    notMasterToMastered (ans) {
      notMasterToMaster({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        questionId: this.id,
        questionSource: '1', // 表示练习错题
        userAnswer: ans,
        examPaperId: this.paperid,
        examPaperName: this.section
      }).then(res => {
        console.log('sdfdfl;fghgfh', res.data.data)
      })
    },
    gotoNextQues () { // 回答正确时，跳到下一个
      this.selectIndex += 1
    },
    seeDetail () { // 回答正确时，查看详情
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
    width: 95%;
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
    text-align: center;
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
  /*.section_exec_third_left {*/
  /*  line-height: 25px;*/
  /*  width: 40%;*/
  /*  text-align: left;*/
  /*  display: inline-block;*/
  /*}*/
  /*.section_exec_third_left {*/
  /*  .icon_luluenjoy1 {*/
  /*    color: red;*/
  /*    margin-left: 30px;*/
  /*  }*/
  /*  .icon_lulucollect {*/
  /*    margin-left: 30px;*/
  /*  }*/
  /*}*/
  /*!*.section_exec_third_center {*!*/
  /*!*  line-height: 25px;*!*/
  /*!*  width: 40%;*!*/
  /*!*  text-align: center;*!*/
  /*!*  display: inline-block;*!*/
  /*!*  span {*!*/
  /*!*    margin-right: 20px;*!*/
  /*!*  }*!*/
  /*!*}*!*/
  /*.section_exec_third_right {*/
  /*  width: 50%;*/
  /*  line-height: 25px;*/
  /*  display: inline-block;*/
  /*  text-align: right;*/
  /*  .iconfont {*/
  /*    margin-left: 50px;*/
  /*  }*/
  /*}*/
  .section_exec_third_left {
    line-height: 25px;
    width: 25%;
    text-align: center;
    /*margin-left: 10px;*/
    display: inline-block;
  }
  .section_exec_third_left {
    .icon_luluenjoy1 {
      color: red;
    }
  }
  .section_exec_third_center {
    line-height: 25px;
    width: 45%;
    text-align: center;
    display: inline-block;
    span {
      /*margin-right: 20px;*/
    }
  }
  .section_exec_third_right {
    width: 25%;
    line-height: 25px;
    text-align: center;
    display: inline-block;
    /*padding-right: 5px;*/
    .iconfont {
      /*margin-left: 30px;*/
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
    margin-top: 35px;
    background-color: #42b982;
  }
  .enter_submit1 {
    width: 90%;
    font-size: 16px;
    margin-top: 35px;
    /*color: #fff;*/
    /*background-color: #ececec;*/
    /*.weui-btn:after {*/
    /*  border: unset;*/
    /*}*/
  }
</style>
