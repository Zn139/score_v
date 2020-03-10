<template>
  <div class="studyRecord_Info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">学习记录</div>
      <div class="subject">
        <span>{{subject_online}}</span>
        <span>{{levelName}}</span>
      </div>
    </div>
    <div v-if="basicContent.doQuestiondays === 0 & basicContent.doQuestionCount === 0 & basicContent.doTimeTotal === '00:00:00'" class="noData">
      暂无学习记录
    </div>
    <div v-else class="studyRecord_info_second" ref="studyRecord_info_second">
      <div>
<!--        <div class="xitiStatic_second">-->
<!--          <div class="xitiStatic_seconde_title">-->
<!--            <x-button class="xitiStatic_second_title_button">{{subject_online}}</x-button>-->
<!--            <popup-picker class="grade_info" disabled title="年级" :data="list1" v-model="value" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>-->
<!--          </div>-->
<!--        </div>-->
        <div class="studyRecord_third">
          <div class="studyRecord_third_info">
            <div class="studyRecord_third_info_top">{{basicContent.doQuestiondays}}天</div>
            <div>连续练习</div>
          </div>
          <div class="studyRecord_third_info">
            <div class="studyRecord_third_info_top">{{basicContent.doQuestionCount}}题</div>
            <div>做题总量</div>
          </div>
          <div class="studyRecord_third_info">
            <div class="studyRecord_third_info_top">{{basicContent.doTimeTotal}}</div>
            <div>总学时</div>
          </div>
        </div>
        <div class="studyRecord_four">
          <div ref="studyRecord_doQues" class="studyRecord_doQues"></div>
          <div ref="studyRecord_correctPercent" class="studyRecord_doQues"></div>
          <div ref="studyRecord_error" class="studyRecord_doQues"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getDoQuesInfo, getDoQuesTiming, getCollectError, getBasicInfo} from '@/api/index'
export default {
  data () {
    return {
      // list1: [['高一', '高二', '高三', '初一']],
      // value: ['高一'],
      doQuesChart: '', // 做题图表
      correctPercentChart: '', // 正确率-学时图表
      errorCollectChart: '', // 错题--收藏图表
      timeList: [], // 做题图表时间集--X轴
      doNum: [], // 做题图表数量集--Y轴
      studyHourList: [], // 学习时长
      correctPercentList: [], // 正确率
      correctTimeList: [], // 正确率图表时间集--X轴
      masterNum: 0, // 已掌握题数量
      notMasterNum: 0, // 未掌握题数量
      collectNum: 0, // 收藏题数量
      studyRecordScroll: null, // 滚动
      basicContent: [] // 三个值的信息
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
      return localStorage.SET_SCHOOLNUM
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    }
  },
  mounted () {
    this.init()
    this.getDoQuesInfo()
    this.getDoQuesCorrTim()
    this.getCollectError()
    this.getBasicInfo()
    // this.drawCorrectPercent()
    // this.drawErrorCollect()
  },
  methods: {
    returnBack () {
      // this.startTime()
      this.$router.push({name: 'lineCourse'})
    },
    init () {
      this.$nextTick(() => {
        this.studyRecordScroll = new BScroll(this.$refs.studyRecord_info_second, {
          click: true
        })
      })
    },
    getDoQuesInfo () { // 得到做题信息
      this.timeList = []
      this.doNum = []
      getDoQuesInfo({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        if (res.data.code === 0) {
          for (const item in res.data.data) {
            this.timeList.push(res.data.data[item].doDate)
            this.doNum.push(res.data.data[item].doCount)
          }
          this.drawDoQues()
        }
        // console.log(res.data.data)
      })
    },
    getDoQuesCorrTim () { // 获取做题时长和正确率数据
      this.studyHourList = []
      this.correctPercentList = []
      getDoQuesTiming({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        console.log('获取做题时长和正确率数据', res.data)
        if (res.data.code === 0) {
          for (const item in res.data.data) {
            const list = res.data.data[item].doTimeLength.split(':')
            // console.log(list[0], list[1], list[2])
            // this.studyHourList.push(res.data.data[item].doTimeLength)
            this.studyHourList.push(parseInt(list[0]) * 3600 + parseInt(list[1]) * 60 + parseInt(list[2]))
            this.correctPercentList.push(parseFloat(res.data.data[item].rightRate).toFixed(2) * 100)
            this.correctTimeList.push(res.data.data[item].doDate)
          }
          this.drawCorrectPercent()
        }
        // console.log(res.data.data)
      })
    },
    getCollectError () { // 获取收藏_错题数据
      getCollectError({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        console.log('获取收藏_错题数据', res.data)
        if (res.data.code === 0) {
          this.masterNum = res.data.data.masteredErrorQuestionsCount
          this.notMasterNum = res.data.data.notMasteredErrorQuestionsCount
          this.collectNum = res.data.data.collectQuestionsCount
          this.drawErrorCollect()
        }
        // console.log(res.data.data)
      })
    },
    getBasicInfo () { // 得到基础信息
      this.basicContent = []
      getBasicInfo({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        console.log('得到基础信息', res.data)
        if (res.data.code === 0) {
          console.log('三个值：', res.data.data)
          this.basicContent = res.data.data
        }
      })
    },
    drawDoQues () {
      // this.doQuesChart = this.echarts.init(document.getElementById(this.xitiStaticRightChart(id)))
      this.doQuesChart = this.echarts.init(this.$refs.studyRecord_doQues)
      this.doQuesChart.setOption({
        title: {
          text: '做题数', // 感觉头部有点乱，没使用自带的标题
          // subtext: '纯属虚构'
          x: 'center',
          textStyle: {
            marginLeft: 20,
            width: 10,
            height: 10,
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
          },
          align: 'center'
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross',
        //     label: {
        //       backgroundColor: '#6a7985'
        //     }
        //   }
        // },
        // legend: {
        //   data: ['做题数']
        // },
        // legend: {
        //   tooltip: {
        //     show: true // 点击某个图例可以隐藏
        //   },
        //   top: 4
        // },
        toolbox: {
          show: true,
          feature: {
            // dataView: { //数据视图
            //   show: true
            // },
            restore: { // 重置
              show: true
            },
            // dataZoom: { //数据缩放视图
            //   show: true
            // },
            saveAsImage: { // 保存图片
              show: true
            },
            magicType: { // 动态类型切换
              type: ['bar', 'line']
            },
            itemSize: '8'
          }
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeList
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        // grid: {
        //   x: 35,
        //   y: 25,
        //   x2: 25,
        //   y2: 35,
        //   borderWidth: 1
        // },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '3%',
          top: '23%',
          containLabel: true
        },
        series: [{
          data: this.doNum,
          // data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          stack: '数量',
          smooth: true,
          // symbol: 'circle',
          symbol: 'triangle',
          symbolSize: 10,
          lineStyle: {
            color: 'rgb(255, 114, 20)',
            width: 2,
            type: 'dashed'
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: 'yellow',
            color: 'rgb(255, 172, 0)'
          }
        }]
      })
    },
    drawCorrectPercent () {
      this.correctPercentChart = this.echarts.init(this.$refs.studyRecord_correctPercent)
      this.correctPercentChart.setOption({
        // title: {
        //   text: '雨量流量关系图',
        //   subtext: '数据来自西安兰特水电测控技术有限公司',
        //   left: 'center',
        //   align: 'right'
        // },
        grid: {
          top: '36%',
          bottom: '20%',
          left: '12%',
          right: '10%'
          // bottom: 0
        },
        toolbox: {
          // show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {},
            itemSize: 8
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          },
          // formatter : function(params){
          //   console.log(params);//打印params
          //   return  '你是好的';
          // }
          // formatter: '<span>{b} <br/>{a} : {c}%</span>'
          // formatter: '{b0}<br /> {a0}:{c0}s<br />{a1}: {c1}%'
          formatter: function (params) { // 设置提示文字框的样式
            console.log(params)
            let result = ''
            // params.forEach(function (item) {
            result += params[0].axisValue + '</br>' + params[0].marker + ' ' + params[0].seriesName + ' : ' + params[0].value + 's' + '</br>' +
                params[1].marker + ' ' + params[1].seriesName + ' : ' + params[1].value + '%' + '</br>'
            // });
            return result
          }
          // formatter: function(params){
          //   for (var i = 0;i<params.length;i++) {
          //     return params[i].marker+'<br/>'+params[i].seriesName+': '+params[i].value+'%'
          //   }
          // }
        },
        legend: {
          show: true,
          // orient: 'vertical',
          x: 'left',
          y: 'top',
          padding: [5, 0, 0, 20],
          data: ['学时', '正确率']
          // left: 10
        },
        // dataZoom: [ // 是否可以滚轮伸缩
        //   {
        //     show: true,
        //     realtime: true,
        //     start: 65,
        //     end: 85
        //   },
        //   {
        //     type: 'inside',
        //     realtime: true,
        //     start: 65,
        //     end: 85
        //   }
        // ],
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            // axisLine: {onZero: false},
            // data: ["2020-01-06", "2020-01-08", "2020-01-09", "2020-01-10"]
            data: this.correctTimeList
            // data: [].map(function (str) {
            //   return str.replace(' ', '\n');
            // })
          }
        ],
        yAxis: [
          {
            name: '学时',
            type: 'value'
            // max: 500
          },
          {
            name: '正确率',
            nameLocation: 'start',
            // max: 5,
            type: 'value',
            inverse: true
          }
        ],
        series: [
          {
            name: '学时',
            type: 'line',
            animation: false,
            areaStyle: {
              color: '#CCFF99'
            },
            lineStyle: {
              width: 1,
              color: '#CCCCCC'
            },
            itemStyle: {
              normal: {
                color: '#CCFF99', // 图例颜色
                borderColor: '#CCCCCC', // 拐点边框颜色
                borderWidth: 1 // 拐点边框大小
              },
              emphasis: {
                color: '#CCCCCC' // hover拐点颜色定义
              }
            },
            // lineStyle: {
            //   color: 'rgb(255, 114, 20)',
            //   width: 2,
            //   type: 'dashed'
            // },
            // symbol: 'triangle',
            // symbolSize: 10,
            // label: {
            //   normal: {
            //     show: true,
            //     formatter: "{a} \n{b}: {c}s"
            //   }
            // },
            data: this.studyHourList
          },
          {
            name: '正确率',
            type: 'line',
            yAxisIndex: 1,
            animation: false,
            areaStyle: {
              color: '#FFCC99'
            },
            lineStyle: {
              color: '#CCCCCC',
              width: 1
            },
            itemStyle: {
              normal: {
                color: '#FFCC99', // 图例颜色
                borderColor: '#CCCCCC', // 拐点边框颜色
                borderWidth: 1 // 拐点边框大小
              },
              emphasis: {
                color: '#CCCCCC' // hover拐点颜色定义
              }
            },
            data: this.correctPercentList
          }
        ]
      })
      // // 用于使chart自适应高度和宽度
      // window.onresize = function () {
      //   // 重置容器高宽
      //   // resizeWorldMapContainer()
      //   this.correctPercentChart.resize()
      // }
    },
    drawErrorCollect () {
      this.errorCollectChart = this.echarts.init(this.$refs.studyRecord_error)
      this.errorCollectChart.setOption({
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '错题数以及收藏数', // 感觉头部有点乱，没使用自带的标题
          // subtext: '纯属虚构'
          x: 'center',
          textStyle: {
            marginLeft: 20,
            width: 10,
            height: 10,
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
          },
          align: 'center'
        },
        // legend: {
        //   show: true
        // },
        grid: {
          top: '22%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['未掌握', '已掌握', '收藏'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '题数',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#FF9900', '#99CC33', '#FFCC00']
                  return colorList[params.dataIndex]
                }
              }
            },
            barWidth: '20%',
            data: [this.notMasterNum, this.masterNum, this.collectNum]
          }
        ]
      })
    },
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    }
  }
}
</script>
<style scoped lang="scss">
  .studyRecord_Info {
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    background: #f8f8f8;
  }
  .studyRecord_info_second {
    margin-top: 15px;
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    /*padding: 10px 0;*/
    height: calc(100% - 66px);
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
  .subject {
    position: absolute;
    top: 3px;
    right: 15px;
    color: #fff;
    font-size: 14px;
    span {
      padding-left: 3px;
    }
  }
  .xitiStatic_seconde_title {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 15px;
    /*border-bottom: 1px solid #ccc;*/
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
  .studyRecord_third {
    margin-top: 10px;
    padding: 5px 0;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
  }
  .studyRecord_third_info {
    width: 32%;
    display: inline-block;
    .studyRecord_third_info_top {
      font-weight: bold;
    }
  }
  .studyRecord_four {
    padding: 10px 0 5px;
    /*margin-top: 10px;*/
    .studyRecord_doQues {
      padding: 8px 0 10px;
      height: 160px;
      width: 100%;
      background-color: #fff;
      margin-left: 50%;
      transform: translateX(-50%);
      border-bottom: #c9c9c9;
      box-shadow: 3px 2px 1px 1px rgba(66,185,130,0.1);
      border-radius: 10px;
    }
    .studyRecord_doQues:nth-child(2) {
       margin-top: 10px;
       /*height: 13rem;*/
       /*height: 140px;*/
     }
    .studyRecord_doQues:nth-child(3) {
      margin-top: 10px;
      /*height: 13rem;*/
      /*height: 140px;*/
    }
  }
  .noData {
    margin-top: 15%;
    text-align: center;
    color: #9c9c9c;
  }
</style>
