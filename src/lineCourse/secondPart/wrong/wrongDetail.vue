<template>
  <div class="chapter_exer_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">{{firstTitle}}</div>
<!--      <div class="title">错题详情</div>-->
    </div>
    <div class="section_exec_second" ref="section_exec_second">
      <div>
        <div>
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <!-- 这个是内容 -->
              <div class="section_exec_ques" v-if="Object.keys(errorSectionList).length !== 0">
                <span>{{errorSectionList.question.questionType}}</span>
                {{errorSectionList.question.questionContext}}
                <!--                {{item.question_imgs}}-->
                <div class="section_exec_second_img" v-if="errorSectionList.imgList.length !== 0">
                  <img v-for="(item, index) in errorSectionList.imgList" :src="item" alt="" style="width: 100%;height: 100%;" :key="index">
                </div>
                <div class="box">
                  <!--未选择选项时，selectRight为0-->
                  <div v-if="selectRight === 0" v-for="(c,index) of errorSectionList.optionList" class="ques_option" :class="{checked:index === n}" @click="changeList(c, index)" :key="index"><span :class="{checked:index === n}">{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                  <!--选择正确时，selectRight为1-->
                  <div v-if="selectRight === 1">
                    <div v-for="(c,index) of errorSectionList.optionList" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-if="index !== n"><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
                    <x-button v-if="newIndex !== parseInt(newIdList.length) - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>
<!--                    <x-button v-if="newIndex !== parseInt(idList.length) - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                    <x-button v-else class="right_button" @click.native="gotoNextQues">回答正确</x-button>
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2">
                    <div  v-for="(c,index) of errorSectionList.optionList" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('.')[1]}}</div>
                      <div v-else-if="index === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-else><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
                    <x-button class="right_button" v-if="newIndex !== newIdList.length - 1" @click.native="gotoNextQues">正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}，跳至下题</x-button>
<!--                    <x-button class="right_button" v-if="newIndex !== idList.length - 1" @click.native="gotoNextQues">正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}，跳至下题</x-button>-->
                    <x-button class="right_button" v-else>正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}</x-button>
                  </div>
                </div>
              </div>
              <div class="section_exec_jiexi" v-if="selectRight !== 0">
                <div v-if="selectRight === 1">
                  <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>
                  <div v-if="showDetail">
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
<!--                    <div class="jiexi_second">-->
                    <div class="jiexi_second" v-if="errorSectionList.question.correctAnalysis !== null">
                      <div class="smallKuang"></div><h4>解析</h4>
                      <div class="jiexi_content">
                        {{errorSectionList.question.correctAnalysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{errorSectionList.question.questionAttribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{errorSectionList.question.questionDifficult}}</span>
                      <!--                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>-->
                    </div>
                  </div>
                </div>
                <div v-if="selectRight === 2">
                  <!--              <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>-->
                  <div>
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
<!--                    <div class="jiexi_second">-->
                    <div class="jiexi_second" v-if="errorSectionList.question.correctAnalysis !== null">
                      <div class="smallKuang"></div><h4>解析</h4>
                      <div class="jiexi_content">
                        {{errorSectionList.question.correctAnalysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{errorSectionList.question.questionAttribute}}</span></div>
                    </div>
                    <div class="jiexi_second">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{errorSectionList.question.questionDifficult}}</span>
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
    <div class="section_exec_third" v-if="Object.keys(errorSectionList).length !== 0">
      <!--判断是否收藏 1表示收藏  2表示没有收藏-->
<!--      <div v-if="errorSectionList.collect === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
      <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
      <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
<!--      <div v-if="errorSectionList.collect === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>-->
      <!--掌握与否，1表示已掌握，2表示未掌握-->
      <div class="section_exec_third_center" v-show="ifMaster === 1"><span @click="delCurrentQues"><i class="iconfont icon_lulushanchu-copy-copy"></i>删除</span></div>
      <div class="section_exec_third_center" v-show="ifMaster === 2 "></div>
      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{newIndex + 1}}/{{newIdList.length}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showSum" position="bottom" max-height="50%">
        <div class="section_exec_third">
<!--          <div v-if="errorSectionList.collect === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
          <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
          <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
<!--          <div v-if="errorSectionList.collect === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>-->
          <!--          <div class="section_exec_third_left"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
          <div class="section_exec_third_center" v-if="ifMaster === 1"><span @click="delCurrentQues"><i class="iconfont icon_lulushanchu-copy-copy"></i>删除</span></div>
          <div class="section_exec_third_center" v-if="ifMaster === 2"></div>
          <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{newIndex + 1}}/{{newIdList.length}}</span></div>
        </div>
        <group>
          <div class="section_exec_third_title">
<!--            {{quesList}}-->
          </div>
          <div v-for="(i, index) in quesList" :key="index" class="section_exec_third_content" @click="selectNoItem(i.index)">
            <cell v-if="currentRightList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell right"></cell>
            <cell v-else-if="currentErrorList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell error"></cell>
            <cell v-else :key="i.index" :title="i.question_id" class="section_exec_cell nodo"></cell>
            <!--            <x-button class="enter_submit" @click.native="submitTranscript">重新做题</x-button>-->
          </div>
<!--          <div class="redoQues" v-if="ifMaster === 1 && currentRight + currentError === allSum">-->
<!--            <x-button class="enter_submit" @click.native="redoQues">重新做题</x-button>-->
<!--          </div>-->
<!--          <div class="redoQues" v-if="ifMaster === 2 && currentRight + currentError !== allSum">-->
<!--            <x-button class="enter_submit1" disabled>重新做题</x-button>-->
<!--          </div>-->
        </group>
      </popup>
    </div>
<!--    <confirm-->
<!--      v-model="showConfirm"-->
<!--      :show-cancel-button="false"-->
<!--      @on-confirm="onConfirm">-->
<!--      <p style="text-align:center;">{{showTitle}}</p>-->
<!--    </confirm>-->
    <confirm v-model="delShow" @on-cancel="onCancel" @on-confirm="determineDel"><p style="text-align:center;">确定删除吗？</p></confirm>
  </div>
</template>
<script>
import {getErrorDetail, cancelCollectCurrentQues, collectCurrentQues, delMasterErrorQues, commitKnowledgeDoRecord, gotoMaster} from '@/api/index'
import BScroll from 'better-scroll'
import { LoadMore, Group, Cell, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {LoadMore, Group, Cell},
  data () {
    return {
      // showConfirm: false, // 当用户进来时，未携带学号等信息，变没有错题的信息，提示框出现
      // showTitle: '', // 提示框内容
      showCollec: 0, // 是否收藏此题
      errorSectionList: [], // 错题详情
      // selectIndexd: 0, // 索引
      // collectSectionList: [], // 收藏详情
      n: -1, // 当前题的选项的索引
      quesList: [], // 所有题刚开始的情况，有没有选项啥的
      selectRight: 0, // 选项的初始状态
      // showDetail: false, // 是否展示答案详解
      rightOp: -1, // 选错以后正确选项的判断
      exerScroll: null,
      newIndex: 0, // 新的索引
      newQuesId: 0, // 新的题号id
      showDetail: false, // 是否展示详解
      // allSum: 0, // 此份卷子所有的题的个数
      showSum: false, // 此份卷子所有做的详情--下面的题号的情况
      currentRight: 0, // 当前正确的个数
      currentError: 0, // 当前错误的个数
      currentRightList: [], // 当前做对的题号
      currentErrorList: [], // 当前做错的题号
      // allQuesNum: [], // 所有题号
      id: -1, // 针对所有题的当前题的题号
      // paperid: -1, // 试卷id
      newIdList: [], // 新的idList
      delShow: false, // 是不是要真的删除，提示框
      firstTitle: '练习详情', // 题目
      // 计时
      h: 0, // 定义时，分，秒，毫秒并初始化为0；
      m: 0,
      ms: 0,
      s: 0,
      time: 0,
      str: '',
      // str: '00:00:00:000',
      mytime: '',
      hour: '00',
      min: '00',
      sen: '00',
      msen: '00'
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
      return this.$store.state.exam.schoolNum
    },
    quesId () {
      return this.$route.query.id
      // return this.$route.params.id
    },
    ifMaster () {
      console.log('ifMaster:', this.$route.query.ifMaster)
      console.log('ifMaster:', typeof this.$route.query.ifMaster)
      return parseInt(this.$route.query.ifMaster)
      // return this.$route.params.ifMaster
    },
    selectIndexd () {
      return parseInt(this.$route.query.selectIndexd)
      // return this.$route.params.selectIndexd
    },
    sourceType () {
      return parseInt(this.$route.query.type)
      // return this.$route.params.type
    },
    questionIdList () {
      console.log('id列表', this.$route.query.questionIdList)
      return this.$route.query.questionIdList
      // return this.$route.params.questionIdList
    },
    levelName () { // 年级
      return this.$store.state.lineCourse.levelName
    },
    // selectIndexd: {
    //   get () {
    //     // this.newIndex = this.$route.params.selectIndexd
    //     // return this.newIndex
    //     return this.$route.params.selectIndexd
    //   },
    //   set (val) {
    //     console.log('setleme')
    //     console.log(typeof this.$route.params.selectIndexd)
    //     console.log(val)
    //     this.$route.params.selectIndexd = val
    //     this.newIndex = val
    //     console.log(this.$route.params.selectIndexd)
    //     console.log(this.newIndex)
    //     return val
    //     // return this.newIndex
    //   }
    // },
    idList () {
      // console.log('索引为：', this.$route.params.idList.length === 7)
      // console.log('索引为2：', JSON.stringify(this.idList).indexOf(JSON.stringify(this.quesId)))
      return this.$route.query.idList
      // return this.$route.params.idList
    }
  },
  watch: { // 监听题号的索引的变化
    newIndex (val, oldval) {
      // var flag = 0
      // console.log(val, oldval)
      // console.log('新的index值：', this.newIndex)
      // // this.selectRight = 0
      // // this.n = -1
      // for (const item in this.quesList) {
      //   if (this.quesList[item].index === this.newIndex) {
      //     flag = 1
      //     return
      //   } else {
      //     flag = 0
      //   }
      // }
      // if (flag === 1) {
      this.selectRight = this.quesList[this.newIndex].selectRight
      if (this.quesList[this.newIndex].showDetail === true) {
        this.showDetail = true
      } else {
        this.showDetail = false
      }
      this.n = this.quesList[this.newIndex].n
      // } else {
      // this.newQuesId = this.newIdList[this.newIndex]
      // this.newQuesId = this.idList[this.newIndex]
      this.getErrorDetail()
      this.str = ''
      this.reset()
      this.start()
      // }
      // this.getCollect()
    }
  },
  mounted () {
    this.init()
    // this.getErrorDetail()
    this.transNum()
  },
  methods: {
    returnBack () {
      if (this.sourceType === 2) {
        this.$router.push({path: '/wrongQues'})
      } else if (this.sourceType === 1) {
        this.$router.push({path: '/specialItem'})
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
    transNum () { // 更改id和索引的值
      if (this.sourceType === 1) {
        this.firstTitle = '专项练习详情'
      } else if (this.sourceType === 2) {
        this.firstTitle = '错题详情'
      }
      this.quesList = []
      this.newIndex = this.selectIndexd
      // this.newQuesId = this.quesId
      this.newIdList = this.idList
      this.getErrorDetail()
      for (const item in this.newIdList) {
        const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.newIdList[item], 'question_id': this.questionIdList[item]}
        this.quesList.push(oneDetail)
      }
      this.str = ''
      this.reset()
      this.start()
      console.log('newIndex:', this.newIndex)
      console.log('newQuesId:', this.newQuesId)
    },
    getErrorDetail () { // 获取题的详情
      this.errorSectionList = []
      this.newQuesId = this.newIdList[this.newIndex]
      getErrorDetail({
        id: this.newQuesId,
        studentNumber: this.schoolNumber,
        openid: this.openid
      }).then(res => {
        this.errorSectionList = res.data.data
        this.showCollec = this.errorSectionList.collect
        // this.quesList[this.newIndex].question_id = this.errorSectionList.question.questionId
        // const oneDetail = {'index': this.newIndex, 'n': -1, 'selectRight': 0, 'id': this.newQuesId, 'question_id': this.errorSectionList.question.questionId}
        // // 判断quesList中是否存在oneDetail
        // let index = this.quesList.findIndex((item) => {
        //   if (oneDetail.index === item.index) {
        //     return true
        //   } else {
        //     return false
        //   }
        // })
        // if (index === -1) {
        //   this.quesList.push(oneDetail)
        //   // console.log()
        //   // 不存在
        // } else {
        //   console.log(oneDetail, this.quesList)
        //   // 存在，并且index是obj在arr中的索引值
        // }
        console.log(res.data.data)
        // // console.log(Object.keys(this.errorSectionList).length)
        // console.log(typeof oneDetail)
        // console.log(typeof this.quesList)
        console.log('this.quesList:', this.quesList)
      })
    },
    // onConfirm () {
    //   this.$router.push({name: 'wrongQues'})
    // },
    determineDel () {
      if (this.newIndex === this.newIdList.length - 1) {
      // if (this.newIndex === this.idList.length - 1) {
        this.delQues()
        this.quesList.splice(this.newIndex, 1)
        this.newIdList.splice(this.newIndex, 1)
        this.newIndex -= 1
      } else if (this.newIndex < this.newIdList.length - 1) {
      // } else if (this.newIndex < this.idList.length - 1) {
        this.delQues()
        this.quesList.splice(this.newIndex, 1)
        this.newIdList.splice(this.newIndex, 1)
        console.log('ques表内了么', this.quesList)
        this.getErrorDetail()
      }
    },
    delQues () {
      delMasterErrorQues({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        questionId: this.quesList[this.newIndex].id,
        questionSource: '' // 考试错题
      }).then(res => {
        if (res.data.code === 0) {
          if (res.data.data.delete === 1) {
            this.$vux.toast.text('删除成功')
            // if (this.newIndex === this.idList.length - 1) {
            //   this.newIndex -= 1
            // } else if (this.newIndex < this.idList.length - 1) {
            //   this.newIndex += 1
            // }
            // this.quesList.splice(this.newIndex, 1)
            // this.currentError -= 1
            // this.getErrorDetail()
          }
        }
      })
    },
    delCurrentQues () {
      // 确定删除吗？
      this.delShow = true
      // console.log(this.selectIndexd)
    },
    onCancel () {
      this.delShow = false
    },
    selectNoItem (i) { // 下面的查看做题详情，点击其中的题号，跳到当前的题
      // console.log(i)
      // this.n = -1 // 未进行点击选项
      // this.selectRight = 0 // 未选择状态
      this.showSum = false // 当前答题情况关闭==未查看
      this.newIndex = i // 跳到下一个答题页面
    },
    // redoQues () { // 重新做题
    //   this.showSum = false
    //   this.selectRight = 0
    //   this.selectIndexd = 0
    //   this.n = -1
    //   // this.selectToRight = 0
    //   this.currentError = 0
    //   this.currentErrorList = []
    //   // this.currentNotList = []
    //   this.currentRight = 0
    //   this.currentRightList = []
    //   this.getErrorDetail()
    // },
    // getCollect () { // 此题的收藏情况
    //   // console.log(232423234)
    //   getShowCollect({
    //     studentNumber: this.schoolNumber,
    //     openid: this.openid,
    //     subject: this.subject_online,
    //     question_id: this.quesList[this.selectIndexd].id
    //   }).then(res => {
    //     this.showCollec = res.data.data.collect
    //     console.log('当前题的收藏状态：', this.showCollec)
    //   })
    // },
    get_noselect_current () { // 当前所答题情况框，是否显示
      this.showSum = !this.showSum
    },
    // getErrorDetail () {
    //   this.quesList = []
    //   getExamErrorDetail({
    //     studentNumber: this.schoolNumber,
    //     openid: this.openid,
    //     subject: this.subject_online,
    //     examName: this.exname,
    //     ifMastered: this.ifMastered
    //   }).then(res => {
    //     // this.quesList = []
    //     console.log('考试错题情况：', res.data.data)
    //     if (res.data.code === 0) {
    //       this.errorSectionList = res.data.data
    //       this.allSum = res.data.data.length // 所有题的个数
    //       this.showCollec = this.errorSectionList[this.selectIndexd].ifCollect
    //       for (const item in this.errorSectionList) {
    //         const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.errorSectionList[item].id, 'question_id': this.errorSectionList[item].question_id}
    //         this.quesList.push(oneDetail)
    //       }
    //     } else {
    //       this.errorSectionList = []
    //       // this.showConfirm = true
    //       // this.showTitle = res.data.data
    //     }
    //   })
    // },
    collectCurrentQues () { // 收藏当前题
      // console.log('点击了么')
      if (this.showCollec === 2) { // 表示未收藏
        collectCurrentQues({
          id: this.errorSectionList.question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          classification: '错题'
        }).then(res => {
          // console.log('收藏', res.data)
          this.$vux.toast.text('收藏成功')
          this.showCollec = 1
        })
      } else if (this.showCollec === 1) {
        cancelCollectCurrentQues({
          id: this.errorSectionList.question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          paperName: '',
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
      // this.newIndex += 1
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.newIndex < this.newIdList.length - 1) {
      // if (this.newIndex < this.idList.length - 1) {
        this.newIndex += 1
      }
    },
    swiperright: function () {
      // this.newIndex -= 1
      // this.n = -1 // 左滑或者右滑时，所选选项变为-1
      if (this.newIndex > 0) {
        this.newIndex -= 1
      }
    },
    // 计时
    timer () { // 定义计时函数
      this.ms = this.ms + 50 // 毫秒
      if (this.ms >= 1000) {
        this.ms = 0
        this.s = this.s + 1 // 秒
      }
      if (this.s >= 60) {
        this.s = 0
        this.m = this.m + 1 // 分钟
      }
      if (this.m >= 60) {
        this.m = 0
        this.h = this.h + 1 // 小时
      }
      this.str = this.toDub(this.h) + ':' + this.toDub(this.m) + ':' + this.toDub(this.s)
      // this.str = this.toDub(this.h) + ':' + this.toDub(this.m) + ':' + this.toDub(this.s) + ' ' + this.toDubms(this.ms)
      // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
      this.hour = this.toDub(this.h)
      this.min = this.toDub(this.m)
      this.sen = this.toDub(this.s)
      this.msen = this.toDubms(this.ms)
    },
    reset () { // 重置
      clearInterval(this.time)
      this.h = 0
      this.m = 0
      this.ms = 0
      this.s = 0
      this.str = '00:00:00'
      // this.str = '00:00:00:000'
      this.hour = '00'
      this.min = '00'
      this.sen = '00'
      this.msen = '00'
      console.log('重置时间：', this.time)
    },

    start () { // 开始
      clearInterval(this.time)
      this.time = setInterval(this.timer, 50)
      console.log('开始时间：', this.time)
    },

    stop () { // 暂停
      clearInterval(this.time)
      console.log('结束时间：', this.time)
    },

    toDub (n) { // 补0操作
      if (n < 10) {
        return '0' + n
      } else {
        return '' + n
      }
    },

    toDubms (n) { // 给毫秒补0操作
      if (n < 10) {
        return '00' + n
      } else {
        return '' + n
      }
    },
    changeList (answer, index) { // 选选项时的操作
      this.n = index // index为选项的索引
      // console.log(this.quesList)
      this.quesList[this.newIndex].n = index
      // this.answer_to_ques[this.selectIndexd] = answer.split('.')[0]
      const that = this
      setTimeout(function () {
        // console.log('选项及答案：', '111' + answer.split('.')[1].replace(/(^\s*)|(\s*$)/g, '') + '333', '222' + that.errorSectionList.question.correctText.replace(/(^\s*)|(\s*$)/g, '') + '33333333333')
        // console.log('选项及答案type：', typeof answer.split('.')[1], typeof that.errorSectionList.question.correctText)
        if (answer.split('.')[1].replace(/(^\s*)|(\s*$)/g, '') === that.errorSectionList.question.correctText.replace(/(^\s*)|(\s*$)/g, '')) {
          that.selectRight = 1 // 答对
          that.currentRight += 1 // 做对的个数加1
          that.currentRightList.push(that.newIndex)
          that.quesList[that.newIndex].selectRight = 1
        } else {
          const options = that.errorSectionList.optionList
          for (const item in options) {
            // console.log(options[item].split('.')[0], that.errorSectionList[that.selectIndexd].correct_option)
            if (options[item].split('.')[0] === that.errorSectionList.question.correctOption) {
              that.rightOp = parseInt(item)
              console.log('正确选项：', item)
            }
          }
          that.selectRight = 2 // 答错
          that.currentError += 1 // 做对的个数加1
          that.currentErrorList.push(that.newIndex)
          that.quesList[that.newIndex].selectRight = 2
        }
        that.id = that.errorSectionList.question.id // 针对所有题的题号
        if (that.sourceType === 1) { // 专业练习做题
          that.commitRecord(answer)
        }
        if (that.ifMaster === 2) { // 如果是错题里面未掌握的题
        // if (that.ifMaster === 2 && that.selectRight === 1) { // 如果是错题里面未掌握的题
          that.gotoMaster()
        }
        // that.id = that.errorSectionList.question.id // 针对所有题的题号
        // that.paperid = that.errorSectionList[that.selectIndexd].exam_id // 试卷id
        // that.notMasterToMastered(answer.split('.')[1])
        // that.paperid = that.one_section_content[that.selectIndexd].sourcePaperId // 组卷id
        // that.getCurrentRecord(answer)
      }, 400)
      // console.log('答案是：', this.answer_to_ques)
    },
    gotoMaster () {
      gotoMaster({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        question_id: this.id,
        doright: this.selectRight
      }).then(res => {
        console.log('是否跳到已掌握', res.data)
      })
    },
    // notMasterToMastered (ans) {
    //   notMasterToMaster({
    //     studentNumber: this.schoolNumber,
    //     openid: this.openid,
    //     subject: this.subject_online,
    //     questionId: this.id,
    //     questionSource: '2', // 表示练习错题
    //     userAnswer: ans,
    //     examPaperId: this.paperid,
    //     examPaperName: this.exname
    //   }).then(res => {
    //     console.log('sdfdfl;fghgfh', res.data.data)
    //   })
    // },
    commitRecord (ans) { // 提交专项练习做题记录
      console.log('时间：', this.str)
      commitKnowledgeDoRecord({
        id: this.id,
        studentNumber: this.schoolNumber,
        openid: this.openid,
        commitString: ans,
        examCategory: '专项练习',
        subject: this.subject_online,
        gradeLevel: this.levelName,
        doTime: this.str
      }).then(res => {

      })
    },
    gotoNextQues () { // 回答正确时，跳到下一个
      this.newIndex += 1
      console.log('duima', this.newIndex)
      console.log(this.newIdList[this.newIndex])
      // console.log(this.idList[this.newIndex])
      // this.newQuesId = this.idList[this.newIndex]
      // this.getErrorDetail()
    },
    seeDetail () { // 回答正确时，查看详情
      this.showDetail = true
      this.quesList[this.newIndex].showDetail = true
    }
  }
}
</script>
<style scoped lang="scss">
  .chapter_exer_info {
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
    height: calc(100% - 86px);
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
  /*  width: 27%;*/
  /*  text-align: center;*/
  /*  display: inline-block;*/
  /*}*/
  /*.section_exec_third_left {*/
  /*  .icon_luluenjoy1 {*/
  /*    color: red;*/
  /*  }*/
  /*}*/
  /*.section_exec_third_center {*/
  /*  line-height: 25px;*/
  /*  width: 40%;*/
  /*  text-align: center;*/
  /*  display: inline-block;*/
  /*  span {*/
  /*    margin-right: 20px;*/
  /*  }*/
  /*}*/
  /*.section_exec_third_right {*/
  /*  width: 30%;*/
  /*  line-height: 25px;*/
  /*  display: inline-block;*/
  /*  .iconfont {*/
  /*    margin-left: 30px;*/
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
