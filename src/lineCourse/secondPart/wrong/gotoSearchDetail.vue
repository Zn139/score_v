<template>
  <div class="chapter_exer_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">错题详情</div>
      <!--      <div class="title">错题详情</div>-->
    </div>
    <div class="section_exec_second" ref="section_exec_second">
      <div>
        <div>
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
<!--                    <x-button v-if="newIndex !== parseInt(newIdList.length) - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                    <!--                    <x-button v-if="newIndex !== parseInt(idList.length) - 1" class="right_button" @click.native="gotoNextQues">回答正确，直接跳至下一题</x-button>-->
                    <x-button class="right_button" @click.native="gotoNextQues">回答正确</x-button>
                  </div>
                  <!--选择错误时，selectRight为2-->
                  <div v-if="selectRight === 2">
                    <div  v-for="(c,index) of errorSectionList.optionList" :key="index" class="ques_option">
                      <div v-if="index === n"><i class="iconfont icon_luluchahao-copy-copy-copy"></i>{{c.split('.')[1]}}</div>
                      <div v-else-if="index === rightOp"><i class="iconfont icon_luluduigou"></i>{{c.split('.')[1]}}</div>
                      <div v-else><span>{{c.split('.')[0]}}</span>{{c.split('.')[1]}}</div>
                    </div>
<!--                    <x-button class="right_button" v-if="newIndex !== newIdList.length - 1" @click.native="gotoNextQues">正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}，跳至下题</x-button>-->
                    <!--                    <x-button class="right_button" v-if="newIndex !== idList.length - 1" @click.native="gotoNextQues">正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}，跳至下题</x-button>-->
                    <x-button class="right_button">正确答案是{{errorSectionList.question.correctOption}}，你的答案是{{errorSectionList.optionList[n].split('.')[0]}}</x-button>
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
<!--      <div class="section_exec_third_center" v-show="ifMaster === 1"><span @click="delCurrentQues"><i class="iconfont icon_lulushanchu-copy-copy"></i>删除</span></div>-->
      <div class="section_exec_third_center"></div>
      <div class="section_exec_third_right"><i class="iconfont icon_lulujiugongge"></i><span>1/1</span></div>
    </div>
    <confirm v-model="delShow" @on-cancel="onCancel" @on-confirm="delQues"><p style="text-align:center;">确定删除吗？</p></confirm>
  </div>
</template>
<script>
import {getErrorDetail, cancelCollectCurrentQues, collectCurrentQues, delMasterErrorQues} from '@/api/index'
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
      // id: -1, // 针对所有题的当前题的题号
      paperid: -1, // 试卷id
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
      // console.log(this.$route.params.fullName)
      // return this.$route.params.subject
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    },
    // ifMaster () {
    //   return parseInt(this.$route.query.ifMaster)
    // },
    id () {
      return parseInt(this.$route.query.id)
    },
    levelName () { // 年级
      return this.$store.state.lineCourse.levelName
    }
  },
  mounted () {
    this.str = ''
    this.reset()
    this.start()
    this.init()
    this.getErrorDetail()
    // this.getknowledgeDetail()
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
    getErrorDetail () { // 获取题的详情
      this.errorSectionList = []
      getErrorDetail({
        id: this.id,
        studentNumber: this.schoolNumber,
        openid: this.openid
      }).then(res => {
        this.errorSectionList = res.data.data
        this.showCollec = this.errorSectionList.collect
        console.log(res.data.data)
        // console.log('this.quesList:', this.quesList)
      })
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
    delCurrentQues () {
      // 确定删除吗？
      this.delShow = true
      // console.log(this.selectIndexd)
    },
    delQues () {
      delMasterErrorQues({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        questionId: this.id,
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
    onCancel () {
      this.delShow = false
    },
    collectCurrentQues () { // 收藏当前题
      console.log('点击了么')
      if (this.showCollec === 2) { // 表示未收藏
        collectCurrentQues({
          id: this.id,
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
          id: this.id,
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
      }
    },
    changeList (answer, index) { // 选选项时的操作
      this.n = index // index为选项的索引
      const that = this
      setTimeout(function () {
        console.log('选项及答案：', answer.split('.')[1], that.errorSectionList.question.correctText)
        if (answer.split('.')[1] === that.errorSectionList.question.correctText) {
          that.selectRight = 1 // 答对
        } else {
          const options = that.errorSectionList.optionList
          for (const item in options) {
            console.log(options[item].split('.')[0], that.errorSectionList.question.correctOption)
            if (options[item].split('.')[0] === that.errorSectionList.question.correctOption) {
              that.rightOp = parseInt(item)
              console.log(item)
            }
          }
          that.selectRight = 2 // 答错
        }
        console.log('总结用时：', that.str)
      }, 400)
    },
    gotoNextQues () { // 回答正确时，跳到下一个
      this.selectIndex += 1
    },
    seeDetail () { // 回答正确时，查看详情
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
      margin-right: 8px;
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
