<template>
  <div class="chapter_exer_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">考试错题</div>
    </div>
    <div class="section_exec_second" ref="section_exec_second">
      <div>
        <div v-for="(item, index) in errorSectionList" :key="index">
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <!-- 这个是内容 -->
              <div v-if="selectIndex === index" class="section_exec_ques">
                <span>{{item.question_type}}</span>
                {{item.question_context.split('）')[0] + '）'}}
                <!--                {{item.question_imgs}}-->
                <div class="section_exec_second_img" v-if="item.question_imgs !== null">
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
                    <x-button v-else class="right_button" @click.native="gotoNextQues">回答正确</x-button>
                    <!--                    <x-button v-if="selectIndex === allSum" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2">
                    <div  v-for="(c,index) of item.question_option" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('.')[1]}}</div>
                      <div v-else-if="index === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-else><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
                    <x-button class="right_button">正确答案是{{item.correct_option}}，你的答案是{{item.question_option[n].split('.')[0]}}</x-button>
                  </div>
                </div>
              </div>
<!--              <div class="section_exec_jiexi" v-if="selectIndex === index && selectRight !== 0">-->
<!--                <div v-if="selectRight === 1">-->
<!--                  <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>-->
<!--                  <div v-if="showDetail">-->
<!--                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>解析</h4>-->
<!--                      <div class="jiexi_content">-->
<!--                        {{item.correct_analysis.split('】')[1]}}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>知识点</h4>-->
<!--                      <div class="jiexi_knowledge_point"><span>{{item.question_attribute}}</span></div>-->
<!--                    </div>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question_difficult}}</span>-->
<!--                      &lt;!&ndash;                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>&ndash;&gt;-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-if="selectRight === 2">-->
<!--                  &lt;!&ndash;              <x-button class="right_button_jiexi" @click.native="seeDetail" v-if="!showDetail">查看题目详解</x-button>&ndash;&gt;-->
<!--                  <div>-->
<!--                    <load-more tip="题目详解" :show-loading="false" background-color="#fbf9fe"></load-more>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>解析</h4>-->
<!--                      <div class="jiexi_content">-->
<!--                        {{item.correct_analysis.split('】')[1]}}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>知识点</h4>-->
<!--                      <div class="jiexi_knowledge_point"><span>{{item.question_attribute}}</span></div>-->
<!--                    </div>-->
<!--                    <div class="jiexi_second">-->
<!--                      <div class="smallKuang"></div><h4>难度：</h4><span>{{item.question_difficult}}</span>-->
<!--                      &lt;!&ndash;                  <div class="jiexi_knowledge_point"><span>{{item.question.questionDifficult}}</span></div>&ndash;&gt;-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </v-touch>
        </div>
      </div>
    </div>
    <confirm
      v-model="showConfirm"
      :show-cancel-button="false"
      @on-confirm="onConfirm">
      <p style="text-align:center;">{{showTitle}}</p>
    </confirm>
  </div>
</template>
<script>
import {getExamErrorDetail} from '@/api/index'
import BScroll from 'better-scroll'
import { LoadMore } from 'vux'
export default {
  components: {LoadMore},
  data () {
    return {
      showConfirm: false, // 当用户进来时，未携带学号等信息，变没有错题的信息，提示框出现
      showTitle: '', // 提示框内容
      errorSectionList: [], // 错题详情
      selectIndex: 0, // 索引
      collectSectionList: [], // 收藏详情
      n: -1, // 当前题的选项的索引
      quesList: [], // 所有题刚开始的情况，有没有选项啥的
      selectRight: 0, // 选项的初始状态
      showDetail: false, // 是否展示答案详解
      rightOp: -1, // 选错以后正确选项的判断
      exerScroll: null,
      allSum: 0, // 此份卷子所有的题的个数
    }
  },
  computed: {
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
    },
    exname () {
      return this.$route.params.exname
    },
    ifMastered () {
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
      // console.log('索引李：', this.selectIndex)
      // if (this.flag === 0) {
      // this.getCollect()
      // this.showCollec = this.quesList[this.selectIndex].showCollec
      // this.showCollec = this.one_section_content[this.selectIndex].collect
      // } else {
      //   this.showCollec = this.one_section_content[this.selectIndex].collection
      // }
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
      console.log('初始化：', this.$refs.section_exec_second)
      this.$nextTick(() => {
        this.exerScroll = new BScroll(this.$refs.section_exec_second, {
          click: true
        })
      })
    },
    onConfirm () {
      this.$router.push({name: 'wrongQues'})
    },
    getErrorDetail () {
      getExamErrorDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        examName: this.exname,
        ifMastered: this.ifMastered
      }).then(res => {
        console.log('考试错题情况：', res.data.data)
        if (res.data.code === 0) {
          this.errorSectionList = res.data.data
          this.allSum = res.data.data.length // 所有题的个数
          for (const item in this.errorSectionList) {
            const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'id': this.errorSectionList[item].id}
            // this.currentNotList.push(parseInt(item) + 1)
            // const oneDetail = {'index': parseInt(item), 'n': -1, 'selectRight': 0, 'showDetail': false}
            this.quesList.push(oneDetail)
            // console.log('错题情况：', res.data.data)
          }
        } else {
          this.showConfirm = true
          this.showTitle = res.data.data
        }
      })
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
          that.quesList[that.selectIndex].selectRight = 1
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
          that.quesList[that.selectIndex].selectRight = 2
        }
        that.id = that.errorSectionList[that.selectIndex].id
        // that.paperid = that.one_section_content[that.selectIndex].sourcePaperId // 组卷id
        // that.getCurrentRecord(answer)
      }, 400)
      // console.log('答案是：', this.answer_to_ques)
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
</style>
