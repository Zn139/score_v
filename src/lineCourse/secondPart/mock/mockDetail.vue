<template>
  <div class="chapter_exer_info" id="dblclicks">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">{{headerTitle}}</div>
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
                {{item.question.questionContext}}（{{item.question.questionScore}}分）
                <div class="section_exec_second_img" v-if="item.imgList.length !== 0">
                  <!--                  <img v-for="(j, inde) in item.imgList" :src="j" alt="" style="width: 100%;height: 100%;" :key="inde">-->
                  <img :src="item.question.questionImgs" alt="" style="width: 100%;height: 100%;">
                </div>
                <!--                {{str}}-->
                <!--{{item.question.questionContext.split('）')[0] + '）'}}-->
                <!--          <div class="choose-box" v-for="(a,index) in item.option" :key="index">-->
                <!--            <input name="biological" type="radio" value="" />-->
                <!--            <label style="cursor:pointer">{{a}}</label>-->
                <!--          </div>-->
                <div class="box">
                  <!--未选择选项时，selectRight为0-->
                  <div v-if="selectRight === 0" v-for="(c,a) of item.randomOption" class="ques_option" :class="{checked:a === n}" @click="changeList(c, a)" :key="a"><span :class="{checked:a === n}">{{c.split('.')[0]}}</span>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
<!--                  <div v-if="selectRight === 0" v-for="(c,a) of item.randomOption" class="ques_option" :class="{checked:a === n}" @click="changeList(c, a)" :key="a"><span :class="{checked:a === n}">{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>-->
                  <!--选择选项，无论对错-->
                  <div v-if="selectRight !== 0 && !showAfterSubmit">
                    <div v-for="(c, a) in item.randomOption" :key="a" class="ques_option" @click="changeList(c, a)" :class="{checked:a === n}">
                      <div v-if="a !== n"><span>{{c.split('.')[0]}}</span>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
                      <div v-if="a === n">
                        <span :class="{checked:a === n}">{{c.split('.')[0]}}</span>{{c.replace(c.split('.')[0]+ '.', '')}}
<!--                        <span class="selectedOption">{{c.split('.')[1]}}</span>-->
                      </div>
                    </div>
                  </div>
                  <!--选择正确时，selectRight为1-->
                  <div v-if="selectRight === 1 && showAfterSubmit">
                    <div v-for="(c,i) of item.randomOption" :key="i" class="ques_option">
                      <div v-if="i === quesList[index].n"><i class="iconfont icon_luluduigou"></i>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
                      <div v-if="i !== quesList[index].n"><span>{{c.split('.')[0]}}</span>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
<!--                      <div v-if="i === n"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>-->
<!--                      <div v-if="i !== n"><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>-->
                    </div>
                    <x-button v-if="selectIndex !== allSum - 1" class="right_button">回答正确</x-button>
<!--                    <x-button v-if="selectIndex !== allSum - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                    <!--                    <x-button v-if="selectIndex === allSum" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2 && showAfterSubmit">
                    <div  v-for="(c,j) of item.randomOption" :key="j" class="ques_option">
                      <div v-if="j === quesList[index].n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
<!--                      <div v-if="j === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('.')[1]}}</div>-->
                      <div v-else-if="j === quesList[index].rightOp"><i class="iconfont icon_luluduigou"></i>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
<!--                      <div v-else-if="j === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>-->
                      <div v-else><span>{{c.split('.')[0]}}</span>{{c.replace(c.split('.')[0]+ '.', '')}}</div>
                    </div>
                    <!--                    <x-button class="right_button">正确答案是{{item.rightOption}}，你的答案是{{item.randomOption[n].split('．')[0]}}</x-button>-->
<!--                    <x-button class="right_button" v-if="selectIndex !== allSum - 1" @click.native="gotoNextQues">正确答案是{{item.rightOption}}，你的答案是{{item.randomOption[n].split('.')[0]}}，跳至下题</x-button>-->
<!--                    <x-button class="right_button" v-if="selectIndex === allSum - 1">正确答案是{{item.rightOption}}，你的答案是{{item.randomOption[n].split('.')[0]}}</x-button>-->
                    <x-button class="right_button">正确答案是{{item.rightOption}}，你的答案是{{item.randomOption[n].split('.')[0]}}</x-button>
                  </div>
                  <div class="pre_next_ques">
                    <x-button mini plain type="primary" v-if="selectIndex > 0" @click.native="gotoPrevious">上一题</x-button>
                    <x-button mini plain type="primary" v-else @click.native="gotoPrevious" disabled>上一题</x-button>
                    <x-button mini plain type="primary" v-if=" selectIndex < one_section_content.length - 1" @click.native="gotoNext" class="nextQues">下一题</x-button>
                    <x-button mini plain type="primary" v-else @click.native="gotoNext" class="nextQues" disabled>下一题</x-button>
                  </div>
                </div>
              </div>
              <div class="section_exec_jiexi" v-if="selectIndex === index && selectRight !== 0 && showAfterSubmit">
                <div v-if="selectRight === 1">
                  <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>
                  <div v-if="showDetail">
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
                    <div class="jiexi_second" v-if="item.question.correctAnalysis !== null">
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
                  <div v-if="item.question.correctAnalysis !== null || item.question.questionAttribute !== '' || item.question.questionDifficult !== ''" >
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
                    <div class="jiexi_second" v-if="item.question.correctAnalysis !== null">
                      <div class="smallKuang"></div><h4>解析</h4>
                      <div class="jiexi_content">
                        {{item.question.correctAnalysis.split('】')[1]}}
                      </div>
                    </div>
                    <div class="jiexi_second" v-if="item.question.questionAttribute !== ''">
                      <div class="smallKuang"></div><h4>知识点</h4>
                      <div class="jiexi_knowledge_point"><span>{{item.question.questionAttribute}}</span></div>
                    </div>
                    <div class="jiexi_second" v-if="item.question.questionDifficult !== ''">
                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question.questionDifficult}}</span>
                      <!--                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>-->
                    </div>
                  </div>
                  <div v-else>
                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>
                    <div class="noData">暂未公布解析</div>
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
      <div class="section_exec_third_center">
        <div v-if="showAfterSubmit">
          <i class="iconfont icon_luluduigou"></i><span>{{currentRight}}</span><i class="iconfont icon_luluchahao-copy-copy-copy"></i><span>{{currentError}}</span>
        </div>
        <div v-if="!showAfterSubmit">
          <span class="doneQues">已做</span><span>{{doneQuesList.length}}</span><span class="nodoQues">未做</span><span>{{allSum-doneQuesList.length}}</span>
        </div>
      </div>
<!--      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>-->
      <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{doneQuesList.length}}/{{allSum}}</span></div>
    </div>
    <div v-transfer-dom class="section_exec_third_tan">
      <popup v-model="showSum" position="bottom" max-height="50%">
        <div class="section_exec_third">
          <div v-if="showCollec === 2" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_lulucollect"></i>收藏</div>
          <div v-if="showCollec === 1" class="section_exec_third_left" @click="collectCurrentQues"><i class="iconfont icon_luluenjoy1"></i>收藏</div>
          <!--          <div class="section_exec_third_left"><i class="iconfont icon_lulucollect"></i>收藏</div>-->
          <div class="section_exec_third_center">
            <div v-if="showAfterSubmit">
              <i class="iconfont icon_luluduigou"></i><span>{{currentRight}}</span><i class="iconfont icon_luluchahao-copy-copy-copy"></i><span>{{currentError}}</span>
            </div>
            <div v-if="!showAfterSubmit">
              <span class="doneQues">已做</span><span>{{doneQuesList.length}}</span><span class="nodoQues">未做</span><span>{{allSum-doneQuesList.length}}</span>
            </div>
         </div>
          <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{doneQuesList.length}}/{{allSum}}</span></div>
<!--          <div class="section_exec_third_right" @click="get_noselect_current"><i class="iconfont icon_lulujiugongge"></i><span>{{currentRight + currentError}}/{{allSum}}</span></div>-->
        </div>
        <group>
          <div class="section_exec_third_title">
            {{paperName.split('\\n')[1]}}
          </div>
          <!--          <div v-for="(i, index) in allSum" :key="index" class="section_exec_third_content">-->
          <div v-for="(i, index) in quesList" v-if="!showAfterSubmit" :key="index" class="section_exec_third_content" @click="selectNoItem(i.index)">
<!--            <cell v-if="currentRightList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell does"></cell>-->
<!--            <cell v-if="currentRightList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell right"></cell>-->
            <cell v-if="doneQuesList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell done"></cell>
<!--            <cell v-else-if="currentErrorList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell error"></cell>-->
            <cell v-else :key="i.index" :title="i.question_id" class="section_exec_cell nodo"></cell>
            <!--            <x-button class="enter_submit" @click.native="submitTranscript">重新做题</x-button>-->
          </div>
          <div v-for="(i, index) in quesList" v-if="showAfterSubmit" :key="index" class="section_exec_third_content" @click="selectNoItem(i.index)">
            <cell v-if="currentRightList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell right"></cell>
            <cell v-else-if="currentErrorList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell error"></cell>
            <cell v-else :key="i.index" :title="i.question_id" class="section_exec_cell nodo"></cell>

            <!--            <cell v-if="currentRightList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell does"></cell>-->
<!--                        <cell v-if="currentRightList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell right"></cell>-->
<!--&lt;!&ndash;            <cell v-if="doneQuesList.indexOf(i.index) > -1" :key="i.index" :title="i.question_id" class="section_exec_cell done"></cell>&ndash;&gt;-->
<!--                        <cell v-else-if="currentErrorList.indexOf(i) > -1" :key="i" :title="i" class="section_exec_cell error"></cell>-->
<!--            <cell v-else :key="i.index" :title="i.question_id" class="section_exec_cell nodo"></cell>-->
            <!--            <x-button class="enter_submit" @click.native="submitTranscript">重新做题</x-button>-->
          </div>
          <x-button @click.native="submitResult" v-if="!showAfterSubmit" class="gotoSubmit">提交</x-button>
<!--          <div class="redoQues" v-if="currentNotList.length === 0">-->
<!--            <x-button class="enter_submit" @click.native="redoQues">重新做题</x-button>-->
<!--          </div>-->
<!--          <div class="redoQues" v-if="currentNotList.length > 0">-->
<!--            <x-button class="enter_submit1" disabled>重新做题</x-button>-->
<!--          </div>-->
        </group>
        <!--        <div class="redoQues">重新做题</div>-->
        <!--        <div style="padding: 15px;">-->
        <!--          <x-button @click.native="showSum = false" plain type="primary"> Close Me </x-button>-->
        <!--        </div>-->
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showTanTip"
               @on-confirm="gotoDetail"
               @on-cancel="cancelDetail"
               confirm-text="查看详解"
               cancel-text="退出">
        <p style="text-align:center;">选择题总分为{{allScore}}</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showSubmit"
               @on-confirm="submitResult"
               @on-cancel="cancelSubmit">
        <p style="text-align:center;">是否提交？</p>
      </confirm>
    </div>
    <!--    <div v-transfer-dom>-->
    <!--      <confirm v-model="showTanTip"-->
    <!--               confirm-text="重新做"-->
    <!--               cancel-text="查看上次记录">-->
    <!--        <p style="text-align:center;">重新做还是查看上次记录？</p>-->
    <!--      </confirm>-->
    <!--    </div>-->
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getOneSectionQues, collectCurrentQues, cancelCollectCurrentQues, getShowCollect, getMockSubmit} from '@/api/index'
import { LoadMore, TransferDom, Group, XSwitch, Cell } from 'vux'
// import ToggleText from './ToggleText'
export default {
  directives: {
    TransferDom
  },
  components: {LoadMore, Group, XSwitch, Cell},
  data () {
    return {
      headerTitle: '模拟答题', // 标题
      showAfterSubmit: false, // 展示提交以后的结果
      showTanTip: false, // 再次进入时，是否展示弹框提示
      showSubmit: false, // 是否提交框
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
      doneQuesList: [], // 做了的个数
      allSum: 0, // 此份卷子所有的题的个数
      showSum: false, // 此份卷子所有未做的详情
      id: -1, // 当前题的id
      paperid: -1, // 组卷id
      quesList: [], // 所有题刚开始的情况，有没有选项啥的
      answer_to_ques: {}, // 用户返回时的答卷信息
      userOption: -1, // 后台返回的用户的选项
      selectToRight: 0, // 后台返回的用户的选项是否正确
      flag: 0, // 退出时要不要保存记录
      allScore: 0, // 整份卷子总分
      idList: [], // 题目id列表
      idStr: '', // id字符串
      optionList: [], // 选项列表
      optionStr: '', // 选项str
      doTimeList: [], // 做题时间列表
      doTimeStr: '', // 做题时间str
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
    paperName () { // 表示节的名称
      console.log('paperName:', this.$route.params.paperName)
      return this.$route.params.paperName
    },
    subject_online () {
      // console.log(this.$route.params.fullName)
      // return this.$route.params.subject
      // console.log('科目：', this.$store.state.lineCourse.select_sub)
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    },
    firstTitle () {
      return this.$route.params.type
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    }
  },
  mounted () {
    this.init()
    this.getMockDetail()
    this.getInitTime() // // 获取当索引为0时的时间
  },
  watch: { // 监听题号的索引的变化
    selectIndex (val, oldval) {
      console.log(val, oldval)
      console.log(this.quesList, this.selectIndex)
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
      this.str = ''
      this.reset()
      this.start()
      // this.showCollec = this.quesList[this.selectIndex].showCollec
      // this.showCollec = this.one_section_content[this.selectIndex].collect
      // } else {
      //   this.showCollec = this.one_section_content[this.selectIndex].collection
      // }
    }
  },
  methods: {
    returnBack () {
      if (this.firstTitle === 'mock') {
        this.$router.push({name: 'simulationList'})
      } else if (this.firstTitle === 'year') {
        this.$router.push({name: 'overYearsZT'})
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
    getInitTime () {
      if (this.firstTitle === 'mock') {
        this.headerTitle = '模拟答题'
      } else if (this.firstTitle === 'year') {
        this.headerTitle = '历年答题'
      }
      if (this.selectIndex === 0) {
        this.str = ''
        this.reset()
        this.start()
      }
    },
    gotoDetail () { // 查看详解
      this.showTanTip = false
    },
    cancelDetail () {
      if (this.firstTitle === 'mock') {
        this.$router.push({name: 'simulationList'})
      } else if (this.firstTitle === 'year') {
        this.$router.push({name: 'overYearsZT'})
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
    getMockDetail () {
      this.quesList = []
      getOneSectionQues({
        paperName: this.paperName,
        subject: this.subject_online,
        studentNumber: this.schoolNumber,
        openid: this.openid,
        gradeLevel: this.levelName
      }).then(res => {
        this.one_section_content = res.data.data
        console.log('所有题：', this.one_section_content)
        this.allSum = res.data.data.length // 所有题的个数
        this.showCollec = this.one_section_content[this.selectIndex].collect
        // 给每个题都加上一个字典，未做题的情况
        for (const item in this.one_section_content) {
          const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.one_section_content[item].question.id, 'question_id': this.one_section_content[item].question.questionId, 'score': this.one_section_content[item].question.questionScore}
          // this.currentNotList.push(parseInt(item) + 1)
          // const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'showDetail': false}
          this.quesList.push(oneDetail)
          // this.answer_to_ques[item] = ''
          // console.log(parseInt(item) + 1)
        }
        console.log('存入的初始化信息：', this.quesList)
        console.log(this.currentNotList)
        console.log(this.currentNotList.length)
      })
    },
    // redoQues () {
    //   this.showSum = false
    //   this.selectRight = 0
    //   this.selectIndex = 0
    //   this.n = -1
    //   // this.selectToRight = 0
    //   this.currentError = 0
    //   this.currentErrorList = []
    //   this.currentNotList = []
    //   this.currentRight = 0
    //   this.currentRightList = []
    //   this.getOneSectionQues()
    // },
    getCollect () {
      getShowCollect({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        question_id: this.quesList[this.selectIndex].id
        // id: this.quesList[this.selectIndex].id
      }).then(res => {
        this.showCollec = res.data.data.collect
        console.log('收藏了？', res.data.data.collect)
      })
    },
    collectCurrentQues () { // 收藏当前题
      // console.log('22222222222222222')
      if (this.showCollec === 2) { // 表示未收藏
        collectCurrentQues({
          id: this.one_section_content[this.selectIndex].question.id,
          studentNumber: this.schoolNumber,
          openid: this.openid,
          classification: '模拟'
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
      console.log('当前锁芯:', i)
      // this.n = -1 // 未进行点击选项
      // this.selectRight = 0 // 未选择状态
      this.showSum = false // 当前答题情况关闭==未查看
      this.selectIndex = i // 跳到下一个答题页面
    },
    // getNoSelect_allQues () { // 未点击时出现的正确错误个数
    //   getNoSelectCurrentRecord({
    //     studentNumber: this.schoolNumber,
    //     paperName: this.paperName,
    //     subject: this.subject_online
    //   }).then(res => {
    //     // console.log(res.data.data)
    //     this.currentRight = res.data.data.doRight
    //     this.currentError = res.data.data.doError
    //     // this.currentNotList = res.data.data.notDoList
    //   })
    // },
    // getclick () {
    //   var clicks = document.getElementById('dblclicks')
    //   clicks.addEventListener('doubleTap', function () {
    //     alert('ss')
    //   })
    // },
    get_noselect_current () { // 当前所答题情况框，是否显示
      this.showSum = !this.showSum
    },
    gotoPrevious () {
      if (this.selectIndex > 0) {
        this.selectIndex -= 1
      }
    },
    gotoNext () {
      if (this.selectIndex < this.one_section_content.length - 1) {
        this.selectIndex += 1
      }
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
    // getOneSectionQues () {
    //   this.quesList = []
    //   getOneSectionQues({
    //     paperName: this.paperName,
    //     subject: this.subject_online,
    //     studentNumber: this.schoolNumber,
    //     openid: this.openid,
    //     gradeLevel: this.levelName
    //   }).then(res => {
    //     this.one_section_content = res.data.data
    //     // console.log('所有题：', this.one_section_content)
    //     this.allSum = res.data.data.length // 所有题的个数
    //     this.showCollec = this.one_section_content[this.selectIndex].collect
    //     // 给每个题都加上一个字典，未做题的情况
    //     for (const item in this.one_section_content) {
    //       const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.one_section_content[item].question.id}
    //       this.currentNotList.push(parseInt(item) + 1)
    //       // const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'showDetail': false}
    //       this.quesList.push(oneDetail)
    //       this.answer_to_ques[item] = ''
    //       // console.log(parseInt(item) + 1)
    //     }
    //     console.log(this.currentNotList)
    //     console.log(this.currentNotList.length)
    //   })
    // },
    changeList (answer, index) {
      // console.log('666666666666666666', this.selectRight)
      this.selectRight = 0
      this.n = index // index为选项的索引
      this.quesList[this.selectIndex].n = index
      // console.log(this.quesList)
      this.answer_to_ques[this.selectIndex] = answer.split('.')[0]
      console.log(this.answer_to_ques)
      const that = this
      setTimeout(function () {
        // {{c.replace(c.split('.')[0]+ '.', '')}}
        if (answer.replace(answer.split('.')[0] + '.', '').replace(/(^\s*)|(\s*$)/g, '') === that.one_section_content[that.selectIndex].question.correctText.replace(/(^\s*)|(\s*$)/g, '')) {
          that.selectRight = 1 // 答对
          that.quesList[that.selectIndex].selectRight = 1
          that.quesList[that.selectIndex].score = that.one_section_content[that.selectIndex].question.questionScore
          console.log('that.quesList[that.selectIndex]:', that.quesList[that.selectIndex])
          // that.currentRight += 1 // 做对的个数加1
          // that.currentRightList.push(that.selectIndex)
          // that.allScore += that.one_section_content[that.selectIndex].question.questionScore
          // console.log('当前获得的总分为：', that.allScore)
        } else {
          const options = that.one_section_content[that.selectIndex].randomOption
          // console.log('正确选项为：', that.one_section_content[that.selectIndex].rightOption)
          // console.log('所有选项为：', options)
          for (const item in options) {
            if (options[item].split('.')[0] === that.one_section_content[that.selectIndex].rightOption) {
              that.rightOp = parseInt(item)
              console.log('that.rightOp:', that.rightOp)
            }
          }
          that.selectRight = 2 // 答错
          that.quesList[that.selectIndex].rightOp = that.rightOp
          that.quesList[that.selectIndex].score = 0
          that.quesList[that.selectIndex].selectRight = 2
          console.log('that.quesList[that.selectIndex]:', that.quesList[that.selectIndex])
          // that.currentError += 1 // 做对的个数加1
          // that.currentErrorList.push(that.selectIndex)
        }
        that.idList.push(that.one_section_content[that.selectIndex].question.id)
        that.optionList.push(answer.replace(answer.split('.')[0] + '.', '').replace(/(^\s*)|(\s*$)/g, ''))
        that.doTimeList.push(that.str)
        console.log('已经做了的', that.doneQuesList)
        if (that.doneQuesList.indexOf(that.selectIndex) === -1) {
          that.doneQuesList.push(that.selectIndex)
          if (that.doneQuesList.length === that.allSum) {
            that.showSubmit = true
          }
        }
        console.log('正确', that.currentRight, that.currentRightList)
        console.log('error', that.currentError, that.currentErrorList)
        console.log(that.currentNotList)
        console.log(that.quesList)
        that.id = that.one_section_content[that.selectIndex].question.id
        that.paperid = that.one_section_content[that.selectIndex].sourcePaperId // 组卷id
        // that.getCurrentRecord(answer)
        console.log('总结用时：', that.str)
      }, 50)
      // console.log('答案是：', this.answer_to_ques)
    },
    cancelSubmit () { // 取消提交
      this.showSubmit = false
    },
    submitResult () {
      this.showSum = false
      this.allScore = 0
      this.currentRightList = []
      this.currentErrorList = []
      this.currentNotList = []
      this.currentRight = 0
      this.currentError = 0
      this.showAfterSubmit = true
      for (const item in this.quesList) {
        console.log(this.allScore)
        console.log(this.quesList[item])
        if (this.quesList[item].selectRight === 1) {
          this.allScore += this.quesList[item].score
          this.currentRight += 1
          this.currentRightList.push(this.quesList[item].index)
        } else if (this.quesList[item].selectRight === 2) {
          this.currentError += 1
          this.currentErrorList.push(this.quesList[item].index)
        } else {
          this.currentNotList.push(this.quesList[item].index)
        }
      }
      this.idStr = this.idList.join(',')
      console.log('string:', typeof this.idStr)
      this.optionStr = this.optionList.join(',')
      this.doTimeStr = this.doTimeList.join(',')
      getMockSubmit({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        level: this.levelName,
        examId: this.one_section_content[0].question.examId,
        questionId: this.idStr,
        optionText: this.optionStr,
        doTime: this.doTimeStr
      }).then(res => {
        console.log('提交反应：', res.data)
      })
      this.showTanTip = true
      console.log('提交成功')
      console.log('满分', this.allScore)
    },
    // getCurrentRecord (ans) {
    //   getCurrentRecord({
    //     id: this.id,
    //     studentNumber: this.schoolNumber,
    //     openid: this.openid,
    //     commitString: ans,
    //     paperName: this.paperName,
    //     subject: this.subject_online,
    //     sourcePaperId: this.paperid,
    //     gradeLevel: this.levelName,
    //     doTime: this.str
    //   }).then(res => {
    //     console.log('当前大体情况', res.data.data)
    //     // this.currentError = res.data.data.doError
    //     // this.currentRight = res.data.data.doRight
    //     // this.currentRightList = res.data.data.doRightList
    //     // this.currentErrorList = res.data.data.doErrorList
    //     // this.currentNotList = res.data.data.notDoList
    //   })
    // },
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
  .box .selectOption span {
    background-color: #9c9c9c;
    font-weight: normal;
  }
  .ques_option {
    margin-left: 20px;
    /*.selectedOption {*/
    /*  background-color: #9c9c9c;*/
    /*}*/
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
  .pre_next_ques {
    margin-top: 10px;
    text-align: center;
  }
  .nextQues {
    margin-left: 45%;
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
    /*color: #FF9999;*/
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
    .done {
      width: 40px;
      height: 40px;
      border: 1px solid #ececec;
      border-radius: 50%;
      background-color: #e5e8e8;
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
  .noData {
    margin-top: 23px;
    color: #9c9c9c;
    font-size: 13px;
    text-align: center;
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
  .gotoSubmit {
    width: 90%;
    margin-top: 25px;
    font-size: 14px;
    color: #3c3c3c;
  }
  .section_exec_third_center .doneQues {
    padding: 0 3px;
    font-size: 12px;
    background-color: #42b983;
    color: #fff;
    border-radius: 5px;
    margin-right: 5px;
  }
  .section_exec_third_center .nodoQues {
    padding: 0 3px;
    font-size: 12px;
    background-color: #FF9999;
    color: #fff;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
