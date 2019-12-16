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
          <div class="section_exec_jiexi" v-if="selectIndex === index">
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
      </div>
    </div>
    <div class="section_exec_third">
      <div>heheh </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {LoadMore} from 'vux'
import {getOneSectionQues} from '@/api/index'
export default {
  components: {
    LoadMore
  },
  data () {
    return {
      showDetail: false,
      selectRight: 0,
      one_section_content: [],
      selectIndex: 0,
      picked: 'study',
      n: -1,
      rightOp: -1,
      exerScroll: null
    }
  },
  computed: {
    paperName () {
      // console.log(this.$route.params.fullName)
      return this.$route.params.paperName
    },
    subject_online () {
      // console.log(this.$route.params.fullName)
      return this.$route.params.subject
    }
    // openid () {
    //   return this.$store.state.exam.openid
    // },
    // schoolNumber () {
    //   return this.$store.state.exam.schoolNum
    // }
  },
  mounted () {
    this.init()
    this.getOneSectionQues()
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
    getOneSectionQues () {
      getOneSectionQues({
        paperName: this.paperName,
        subject: this.subject_online
      }).then(res => {
        this.one_section_content = res.data.data
        console.log('所有信息：', res.data)
      })
    },
    changeList (answer, index) {
      console.log(answer)
      this.n = index // index为选项的索引
      if (answer.split('．')[1] === this.one_section_content[this.selectIndex].question.correctText) {
        this.selectRight = 1 // 答对
        console.log('right')
      } else {
        console.log('答错')
        const options = this.one_section_content[this.selectIndex].randomOption
        console.log(options)
        for (const item in options) {
          if (options[item].split('．')[0] === this.one_section_content[this.selectIndex].rightOption) {
            console.log('正确选项：', typeof item)
            this.rightOp = parseInt(item)
          }
        }
        // this.a = this.randomOption.indexOf()
        // this.one_section_content[this.selectIndex].option.indexOf()
        this.selectRight = 2 // 答错
      }
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
  /*.choose-box{*/
  /*  padding-left:10px;*/
  /*  position:relative;*/
  /*  display:inline-block;*/
  /*  height:40px;*/
  /*  line-height:40px;*/
  /*}*/
  /*.choose-box input[type="radio"]::before{*/
  /*  content:'';*/
  /*  display:inline-block;*/
  /*  width:10px;*/
  /*  height:10px;*/
  /*  border-radius:50%;*/
  /*  border:1px solid #0069AB;*/
  /*  margin-right:15px;*/
  /*  position:absolute;*/
  /*  top:15px;*/
  /*  left:0;*/
  /*}*/
  /*.choose-box input[type="radio"]:checked::before{*/
  /*  background-clip: content-box;*/
  /*  background-color:#0069AB;*/
  /*  width:6px;*/
  /*  height:6px;*/
  /*  padding:2px;*/
  /*}*/
  /*.choose-box input[type="radio"]{*/
  /*  width:0;*/
  /*  height:0;*/
  /*}*/
  .section_exec_second {
    /*margin-top: 15px;*/
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 71px);
    /*background-color: #fff;*/
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
    /*span.checked {*/
    /*  !*color:#0CF;*!*/
    /*  !*color:#42b983;*!*/
    /*  !*background-color: #42b983;*!*/
    /*}*/
    span.checked:before{
      background-color:#42b983;
      /*background-color:#0CF;*/
      /*border:2px #9c9c9c solid;*/
    }
    /*span:before{*/
    /*  display:inline-block;*/
    /*  !*width:10px;*!*/
    /*  !*height:10px;*!*/
    /*  !*line-height:10px;*!*/
    /*  !*content:"";*!*/
    /*  !*border:2px #9c9c9c solid;*!*/
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
  /*.smallKuang1 {*/
  /*  height: 15px;*/
  /*  width: 5px;*/
  /*  margin-top: 15px;*/
  /*  background-color: rgba(0,0,139,0.8);*/
  /*  !*float: left;*!*/
  /*  display: inline-block;*/
  /*}*/
  h4 {
    display: inline-block;
    margin-left: 10px;
    /*margin-top: -3px;
    float: left;*/
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
    /*background-color: #42b983;*/
  }
  .section_exec_third {
    background-color: rgb(255,255, 223);
    /*margin-top: calc(100% - 91px);*/
    /*height: 20px;*/
  }
</style>
