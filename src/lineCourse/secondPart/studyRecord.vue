<template>
  <div class="studyRecord_Info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">学习记录</div>
    </div>
    <div class="xitiStatic_second">
      <div class="xitiStatic_seconde_title">
        <x-button class="xitiStatic_second_title_button">{{subject_online}}</x-button>
        <popup-picker class="grade_info" title="年级" :data="list1" v-model="value" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
      </div>
    </div>
    <div class="studyRecord_third">
      <div class="studyRecord_third_info">
        <div class="studyRecord_third_info_top">5天</div>
        <div>连续练习</div>
      </div>
      <div class="studyRecord_third_info">
        <div class="studyRecord_third_info_top">89题</div>
        <div>做题总量</div>
      </div>
      <div class="studyRecord_third_info">
        <div class="studyRecord_third_info_top">60min</div>
        <div>总学时</div>
      </div>
    </div>
    <div class="studyRecord_four">
      <div ref="studyRecord_doQues" class="studyRecord_doQues"></div>
      <div ref="studyRecord_correctPercent" class="studyRecord_doQues"></div>
      <div ref="studyRecord_error" class="studyRecord_doQues"></div>
    </div>
  </div>
</template>
<script>
import {getDoQuesInfo, getDoQuesTiming} from '@/api/index'
export default {
  data () {
    return {
      list1: [['高一', '高二', '高三', '初一']],
      value: ['高一'],
      doQuesChart: '',
      correctPercentChart: '',
      errorCollectChart: '',
      timeList: [], // 做题图表时间集--X轴
      doNum: [], // 做题图表数量集--Y轴
    }
  },
  computed: {
    subject_online () {
      return this.$store.state.lineCourse.select_sub
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
    this.getDoQuesInfo()
    // this.getDoQuesCorrTim()
    this.drawCorrectPercent()
    this.drawErrorCollect()
  },
  methods: {
    returnBack () {
      // this.startTime()
      this.$router.push({name: 'lineCourse'})
    },
    getDoQuesInfo () { // 得到做题信息
      getDoQuesInfo({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        this.timeList = []
        for (const item in res.data.data) {
          this.timeList.push(res.data.data[item].doDate)
          this.doNum.push(res.data.data[item].doCount)
        }
        this.drawDoQues()
        // console.log(res.data.data)
      })
    },
    getDoQuesCorrTim () {
      getDoQuesTiming({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        console.log(res.data.data)
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
            }
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
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
  }
}
</script>
<style scoped lang="scss">
  .studyRecord_Info {
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
    margin-top: 10px;
    background-color: #fff;
    .studyRecord_doQues {
      height: 160px;
      width: 97%;
      margin-left: 50%;
      transform: translateX(-50%);
      border-bottom: #c9c9c9;
    }
    .studyRecord_doQues:nth-child(2) {

    }
  }
</style>
