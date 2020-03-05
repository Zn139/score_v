<template>
  <div class="xitiStatic_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">做题统计</div>
    </div>
    <div class="noData" v-if="xtContent.length === 0">
      该同学暂无做题统计数据
    </div>
    <div class="xitiStatic_second" v-if="xtContent.length > 0">
      <div class="xitiStatic_seconde_title">
        <x-button class="xitiStatic_second_title_button">{{subject_online}}</x-button>
        <popup-picker class="grade_info" title="年级" :data="list1" v-model="value" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
      </div>
      <div class="xitiStatic_second_date">
        <datetime
        v-model="dateValue"
        @on-change="change"
        title="开始时间">
      </datetime>
        <datetime
          v-model="dateEndValue"
          :start-date="dateValue"
          @on-change="changeEnd"
          title="结束时间">
        </datetime>
      </div>
      <div class="xitiStatic_second_dateInfo">
          <div class="xitiStatic_second_dateInfo_left">2019年</div>
          <div class="xitiStatic_second_dateInfo_right">共做50道题，正确率80%</div>
      </div>
    </div>
<!--    <div class="barChart" ref="wrongBarChart"></div>-->
    <div class="xitStatic_third">
      <div v-for="(item, index) in xtContent" :key="index" class="xitiStatic_third_info" @click="gotoStaticDetail(item.examPaperName, item.examSource)">
        <div class="xitiStatic_third_left">
          <div class="xitiStatic_third_left_top">{{item.examPaperName}}</div>
          <div class="xitiStatic_third_left_middle">
            <span><i class="iconfont icon_lulunaozhong"></i>{{item.doTimeLength}}</span><span>{{item.examSource}}</span>
<!--            <span><i class="iconfont icon_lulushijianlishijilujishizhongbiaomianxing"></i>10'12"</span><span>{{item.examSource}}</span>-->
          </div>
          <div class="xitiStatic_third_left_bottom">
            <span>{{item.doTime}}</span><span>{{item.completeRate}}</span>
          </div>
        </div>
        <div class="xitiStatic_third_right">
          <div :id="xitiStaticRightChart(index)" class="xitiStatic_third_right_chart"></div>
        </div>
<!--        <div ref="StaticRightChart" class="xitiStatic_third_right_chart"></div>-->
      </div>
    </div>
<!--    <div @click="gotoTest">-->
<!--      测试-->
<!--    </div>-->
  </div>
</template>
<script>
// import { InlineCalendar } from 'vux'
import {getXTStaticInfo} from '@/api/index'
function editTime (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
export default {
  // components: {InlineCalendar},
  data () {
    return {
      list1: [['高一', '高二', '高三', '初一']],
      value: ['高一'],
      xtContent: [], // 做题记录
      doQuesChart: '', // 做题统计正确率饼图
      rightPercent: 0,
      barChart: '', // 练习和考试饼图
      dateValue: '', // 默认时间
      // startD: '', // 开始时间
      // endD: '', // 结束时间
      showDate: true,
      showDateEnd: false,
      dateEndValue: '', // 结束时间
      weekBeforeTime: ''
    }
  },
  watch: { // 监听题号的索引的变化
    dateValue (val, oldval) {
      console.log('开始时间变了么：', val, oldval)
      console.log(this.dateValue, this.dateEndValue)
      this.getXTStaticInfo()
    },
    dateEndValue (val, oldval) {
      console.log('结束时间变了么：', val, oldval)
      console.log(this.dateValue, this.dateEndValue)
      this.getXTStaticInfo()
    }
  },
  computed: {
    subject_online () {
      // return this.$store.state.lineCourse.select_sub
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
    }
  },
  mounted () {
    // this.$nextTick(function () {
    //   this.getCurrentTime()
    // })
    this.getXTStaticInfo()
    // this.drawPie()
    // this.$nextTick(function () {
    //   this.drawDoQues(0)
    // })
    // this.drawDoQues()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    getCurrentTime () { // 得到系统时间
      let nowDate = new Date()
      let year = nowDate.getFullYear() // 得到当前年份
      let month = editTime(nowDate.getMonth() + 1) // 得到当前月份,加不加这个editTime方法无所谓
      let day = editTime(nowDate.getDate()) // 得到当前日
      // let befDate = new Date(nowDate.getTime() - 7 * 24 * 3600 * 1000)
      // let byear = befDate.getFullYear()
      // let bmonth = befDate.getMonth() + 1
      // let bday = befDate.getDate()
      // 默认日期赋值
      this.dateValue = year + '-' + month + '-' + day
      this.dateEndValue = year + '-' + month + '-' + day
      // this.dateValue = [new Date(byear + ', ' + bmonth + ', ' + bday), new Date(year + ', ' + month + ', ' + day)]
    },
    xitiStaticRightChart (index) { // 给赋予不同的id
      console.log('echart_' + index)
      return 'echart_' + index
    },
    gotoStaticDetail (val, source) { // 做题详情
      this.$router.push({
        name: 'staticDetail',
        params: {
          exname: val,
          source: source
        }
      })
    },
    getXTStaticInfo () { // 获取所有做题的记录
      this.xtContent = []
      getXTStaticInfo({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName,
        starTime: this.dateValue,
        endTime: this.dateEndValue
      }).then(res => {
        if (res.data.code === 0) {
          this.xtContent = res.data.data
          console.log('做题记录', res.data)
          for (const item in this.xtContent) {
            console.log(item)
            // console.log(this.xtContent[item].doRightNums)
            // console.log(this.xtContent[item].doQuestionsNums)
            // this.rightPercent = (1 / this.xtContent[item].doQuestionsNums) * 100
            this.rightPercent = parseFloat((this.xtContent[item].doRightNums / this.xtContent[item].doQuestionsNums) * 100).toFixed(2) + '%'
            // this.rightPercent = parseFloat((1 / this.xtContent[item].doQuestionsNums) * 100).toFixed(2) + '%'
            // this.rightPercent = (this.xtContent[item].doRightNums / this.xtContent[item].doQuestionsNums) * 100 %
            console.log(this.rightPercent)
            this.$nextTick(function () {
              this.drawDoQues(item)
            })
            // this.drawPie()
          }
        }
      })
    },
    change (value) {
      console.log('change', value)
      console.log('change', this.dateValue, this.dateEndValue)
      // this.getXTStaticInfo()
    },
    onChange (val) {
      console.log('val change', val)
    },
    changeEnd (val) {
      console.log('结束', val)
      console.log('change', this.dateValue, this.dateEndValue)
      // this.getXTStaticInfo()
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    drawDoQues (id) {
      // console.log(55555555555)
      console.log(this.xitiStaticRightChart(id))
      // this.doQuesChart = this.echarts.init(this.$refs.StaticRightChart[id])
      this.doQuesChart = this.echarts.init(document.getElementById(this.xitiStaticRightChart(id)))
      // console.log('dsfasfsdftghthg', this.doQuesChart)
      // this.doQuesChart = this.echarts.init(this.$refs.StaticRightChart)
      this.doQuesChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}:({d}%)'
        },
        graphic: [{ // 环形图中间添加文字
          type: 'text', // 通过不同top值可以设置上下显示
          left: 'center',
          top: '32%',
          style: {
            text: '正确率',
            textAlign: 'center',
            fill: '#3c3c3c', // 文字的颜色
            // fill: '#0066CC', // 文字的颜色
            width: 5,
            height: 5,
            fontSize: 10,
            fontFamily: 'Microsoft YaHei'
          }
        }, {
          type: 'text',
          left: 'center',
          top: '55%',
          style: {
            // text: 30,
            text: this.rightPercent,
            textAlign: 'center',
            fill: '#3c3c3c',
            // fill: '#0066CC',
            // fill: '#AE8F00',
            width: 10,
            height: 10,
            fontSize: 11
          }
        }],
        color: ['#e9e9e9', '#99CC00'],
        // color: ['#66B3FF', 'RGB(244,169,92)', '#6FB7B7', '#ff7575', '#73BF00', '#CA8EC2'],
        series: [
          {
            name: '比率',
            type: 'pie',
            radius: ['62%', '85%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            selectedOffset: 10,
            // label: {
            //   normal: {
            //     formatter: '{b}:\n{d}%',
            //     rich: {
            //       b: {
            //         fontSize: 13,
            //         lineHeight: 33,
            //         marginBottom: 10
            //       },
            //       d: {
            //         color: '#eee',
            //         backgroundColor: '#334455',
            //         padding: [2, 4],
            //         borderRadius: 3
            //       }
            //     },
            //     textStyle: {
            //       fontSize: 13,
            //       color: 'rgb(66,185,130)'
            //     }
            //   }
            // },
            labelLine: {
              show: false
            },
            // labelLine: {
            //   normal: {
            //     length: 7, // 指示线长度
            //     length2: 9,
            //     smooth: 0.1,
            //     lineStyle: {
            //       color: 'rgba(66,185,130,0.4)',
            //       fontWeight: 'bolder'
            //     }
            //   }
            // },
            data:
              [
                // {value: 20, name: '正确数'},
                // {value: 26, name: '错误数'}
                {value: 100 - this.rightPercent.split('%')[0], name: '错误率'},
                {value: this.rightPercent.split('%')[0], name: '正确率'}
              ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .xitiStatic_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;
    /*color: #3c3c3c;*/
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
  .icon_lulufanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .xitiStatic_seconde_title {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
  }
  .xitiStatic_second_title_button {
    display: inline-block;
    width: 30%;
    /*text-align: center;*/
    /*margin-left: 10%;*/
    color: #fff;
    font-size: 14px;
    background-color: #42b982;
  }
  .xitiStatic_second >>> .vux-cell-box {
    width: 30%;
  }
  .xitiStatic_second >>> .weui-cell {
    padding: unset;
    margin-top: 3px;
    font-size: 14px;
  }
  .grade_info {
    float: right;
    /*display: inline-block;*/
  }
  .xitiStatic_second_date {
    /*height: 25px;*/
    margin: 10px 0;
    line-height: 30px;
    padding: 0 15px;
    background-color: #fff;
    /*text-align: right;*/
  }
  .xitiStatic_second_dateInfo {
    padding: 0 15px;
    height: 33px;
    /*margin-top: ;*/
    /*line-height: 40px;*/
    background-color: #fff;
    font-size: 14px;
    .xitiStatic_second_dateInfo_left {
      margin-top: 8px;
      float: left;
    }
    .xitiStatic_second_dateInfo_right {
      margin-top: 8px;
      float: right;
    }
  }
  .xitStatic_third {
    margin-top: 10px;
    background-color: #fff;
  }
  .xitiStatic_third_info {
    height: 73px;
    padding: 5px 15px 8px;
    border-bottom: 1px solid #ececec;
  }
  .xitiStatic_third_left {
    width: 78%;
    display: inline-block;
    .xitiStatic_third_left_top {
      margin-left: 5px;
      font-size: 13px;
    }
    .xitiStatic_third_left_middle {
      margin-top: 5px;
      width: 80%;
      font-size: 13px;
      .icon_lulunaozhong {
        font-size: 14px;
        margin-right: 4px;
        /*color: #ec8b89;*/
        /*color: #ec8b89;*/
      }
      span:first-child {
        /*margin-left: 5px;*/
      }
      span:nth-child(2) {
        background-color: #ffbe00;
        padding: 0 3px;
        color: #fff;
        border-radius: 5px;
        float: right;
        margin-right: 40px;
      }
    }
    .xitiStatic_third_left_bottom {
      font-size: 13px;
      margin-top: 5px;
      span:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
  .xitiStatic_third_right {
    width: 20%;
    float: right;
    /*display: inline-block;*/
    .xitiStatic_third_right_chart {
      height: 75px;
    }
  }
  .noData {
    margin-top: 15%;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #9c9c9c;
  }
</style>
