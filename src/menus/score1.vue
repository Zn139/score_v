<template>
  <div class="score_info" style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">成绩单</div>
<!--      <tab v-model="index01" :line-width="1" bar-active-color="#668599">-->
<!--        <tab-item selected @on-item-click="clickAll">总评</tab-item>-->
<!--        <tab-item @on-item-click="clickLanguage">语文</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick">数学</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick">英语</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick">物理</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick">化学</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick">生物</tab-item>-->
<!--      </tab>-->
    </div>
<!--    <div class="score_second">-->
<!--        <div ref="yiBiaoChart" class="second_chart"></div>-->
<!--    </div>-->
<!--    <div class="score_second" v-show="drawYBLang">-->
<!--      <div ref="langYiBChart" class="second_chart"></div>-->
<!--    </div>-->
    <div class="second_choice">
      <popup-picker title="选择考试" :data="choiceList" :columns="3" v-model="choice" ref="picker3"></popup-picker>
    </div>
    <div class="third">
      <div class="third_second">
        <div class="third_second_p" v-for="(item, value, index) in three" :key="index">
<!--          {{item}}-&#45;&#45;{{value}}-&#45;&#45;{{index}}-->
          <span class="third_project">{{item.title}}</span><strong>{{item.score}}</strong><span class="itald">/</span>{{item.fullscoreStandard}}
<!--          <div v-if="index > 2" class="third_score"><span class="third_project">{{item.title}}</span><strong>{{item.score}}</strong><span class="itald">/</span>{{item.fullscoreStandard}}</div>-->
<!--          <div v-else class="third_score_index"><span class="third_project">{{item.title}}</span><strong>{{item.score}}</strong><span class="itald">/</span>{{item.fullscoreStandard}}</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, PopupPicker } from 'vux'
import { getScoreReport } from '@/api/index'

export default {
  components: {Tab, TabItem, PopupPicker},
  data () {
    return {
      choiceList: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      choice: [],
      drawYB: true,
      // drawYBLang: true,
      index01: 0,
      three: [],
      yiBChart: '',
      lYiBChart: '',
      language: 13,
      math: 20,
      english: 15,
      geography: 24,
      physics: 30,
      chemistry: 26,
      schoolNum: 0,
      classNum: 0,
      scoreNum: 0,
      allNumber: [{value: 0, name: '总分'}],
      classRank: [{value: 0, name: '班排'}],
      schoolRank: [{value: 0, name: '年排'}]
    }
  },
  computed: {
    examname () {
      return this.$store.state.exam.exam_name
    }
  },
  mounted () {
    // this.clickAll()
    // this.drawYiBLang()
    this.getAllScore()
    // this.clickLanguage()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    getAllScore () {
      getScoreReport({
        stuNumber: '08047737',
        examType: this.examname
        // examType: '19年3月考试'
      }).then(res => {
        this.three = res.data.data[0].map
        this.allNumber[0].value = parseInt(res.data.data[0].totalScore)
        this.classRank[0].value = parseInt(res.data.data[0].totalScoreClassRank)
        this.schoolRank[0].value = parseInt(res.data.data[0].totalScoreGradeRank)
        this.scoreNum = parseInt(res.data.data[0].totalScoreStandard)
        this.schoolNum = parseInt(res.data.data[0].totalGradeNumber)
        this.classNum = parseInt(res.data.data[0].totalClassNumber)
        console.log(this.three)
        this.drawYiBiao()
      })
    },
    // clickAll () {
    //   this.drawYBLang = false
    //   this.drawYB = true
    //   this.drawYiBiao()
    //   // this.drawYB = true
    // },
    // clickLanguage () {
    //   this.drawYB = false
    //   this.drawYBLang = true
    //   this.drawYiBLang()
    // },
    // onItemClick (index) {
    //   console.log('on item click:', index)
    // },
    drawYiBiao () {
      this.yiBChart = this.echarts.init(this.$refs.yiBiaoChart)
      this.yiBChart.setOption({
        // tooltip: {
        // formatter: '{a} <br/>{c} {b}'
        // },
        // toolbox: {
        // show: true,
        // feature: {
        //   restore: {show: true},
        //   saveAsImage: {show: true}
        // }
        // },
        series: [
          {
            name: '总分',
            type: 'gauge',
            // z: 1,
            center: ['50%', '30%'],
            min: 0,
            max: this.scoreNum, // 总分
            splitNumber: 5,
            radius: '55%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 6,
                color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
                // color: 'RGB(13,222,155)'
              }
            },
            axisTick: { // 坐标轴小标记
              length: 5, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: '#fff'
              }
            },
            splitLine: { // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5,
              length: '50%'
            },
            // axisLabel: {  //表盘字体样式
            // backgroundColor: 'auto',
            // borderRadius: 2,
            // color: '#eee',
            // padding: 3,
            // textShadowBlur: 2,
            // textShadowOffsetX: 1,
            // textShadowOffsetY: 1,
            // textShadowColor: '#222'
            // },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#adadad'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              // formatter: function (value) {
              //   value = (value + '').split('.')
              //   value.length < 2 && (value.push('00'))
              //   return ('00' + value[0]).slice(-2) +
              //     '.' + (value[1] + '00').slice(0, 2)
              // },
              offsetCenter: ['0', '35%'], // 实际值位置
              fontWeight: 'bolder',
              // borderRadius: 3,
              // backgroundColor: '#A6FFA6',
              // backgroundColor: '#444',
              // borderColor: '#aaa',
              // shadowBlur: 5,
              // shadowColor: '#333',
              // shadowOffsetX: 0,
              // shadowOffsetY: 3,
              // borderWidth: 2,
              // textBorderColor: 'RGB(13,222,155)',
              // textBorderColor: '#000',
              // textBorderWidth: 2,
              // textShadowBlur: 2,
              // textShadowColor: 'RGB(13,222,155)',
              // textShadowOffsetX: 0,
              // textShadowOffsetY: 0,
              fontFamily: 'Arial',
              width: 80,
              color: 'RGB(13,222,155)',
              rich: {}
            },
            // data: [{value: 401.5, name: '总分'}]
            data: this.allNumber
          },
          {
            name: '班级排名',
            type: 'gauge',
            center: ['25%', '70%'],
            // z: 1,
            min: 0,
            max: this.classNum, // 班级总人数
            splitNumber: 1,
            radius: '38%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 6,
                color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
              }
            },
            axisTick: { // 坐标轴小标记
              length: 5, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 5, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5,
              length: '50%'
            },
            // axisLabel: {  //表盘字体样式
            // backgroundColor: 'auto',
            // borderRadius: 2,
            // color: '#eee',
            // padding: 3,
            // textShadowBlur: 2,
            // textShadowOffsetX: 1,
            // textShadowOffsetY: 1,
            // textShadowColor: '#222'
            // },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bold',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#adadad'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              // formatter: function (value) {
              //   value = (value + '').split('.')
              //   value.length < 2 && (value.push('00'))
              //   return ('00' + value[0]).slice(-2) +
              //     '.' + (value[1] + '00').slice(0, 2)
              // },
              offsetCenter: ['0', '35%'],
              fontWeight: 'bold',
              // fontSize: '24',
              // borderRadius: 3,
              // backgroundColor: '#A6FFA6',
              // backgroundColor: '#444',
              // borderColor: '#aaa',
              // shadowBlur: 5,
              // shadowColor: '#333',
              // shadowOffsetX: 0,
              // shadowOffsetY: 3,
              // borderWidth: 2,
              // textBorderColor: '#000',
              // textBorderWidth: 2,
              // textShadowBlur: 2,
              // textShadowColor: '#fff',
              // textShadowOffsetX: 0,
              // textShadowOffsetY: 0,
              fontFamily: 'Arial',
              // width: 10,
              // color: '#eee',
              rich: {}
            },
            // data: [{value: 13, name: '班排'}]
            data: this.classRank
          },
          {
            name: '年级排名',
            type: 'gauge',
            center: ['75%', '70%'],
            // z: 1,
            min: 0,
            max: this.schoolNum, // nian级总人数
            splitNumber: 1,
            radius: '38%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 6,
                color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
              }
            },
            axisTick: { // 坐标轴小标记
              length: 5, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 5, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5,
              length: '50%'
            },
            // axisLabel: {  //表盘字体样式
            // backgroundColor: 'auto',
            // borderRadius: 2,
            // color: '#eee',
            // padding: 3,
            // textShadowBlur: 2,
            // textShadowOffsetX: 1,
            // textShadowOffsetY: 1,
            // textShadowColor: '#222'
            // },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bold',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#adadad'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              // formatter: function (value) {
              //   value = (value + '').split('.')
              //   value.length < 2 && (value.push('00'))
              //   return ('00' + value[0]).slice(-2) +
              //     '.' + (value[1] + '00').slice(0, 2)
              // },
              offsetCenter: ['-5%', '32%'],
              fontWeight: 'bold',
              fontSize: '24',
              // borderRadius: 3,
              // backgroundColor: '#A6FFA6',
              // backgroundColor: '#444',
              // borderColor: '#aaa',
              // shadowBlur: 5,
              // shadowColor: '#333',
              // shadowOffsetX: 0,
              // shadowOffsetY: 3,
              // borderWidth: 2,
              // textBorderColor: '#000',
              // textBorderWidth: 2,
              // textShadowBlur: 2,
              // textShadowColor: '#fff',
              // textShadowOffsetX: 0,
              // textShadowOffsetY: 0,
              fontFamily: 'Arial',
              // width: 10,
              // color: '#eee',
              rich: {}
            },
            // data: [{value: 13, name: '年排'}]
            data: this.schoolRank
          }
        ]
      })
    }
    // drawYiBLang () {
    //   this.lYiBChart = this.echarts.init(this.$refs.langYiBChart)
    //   this.lYiBChart.setOption({
    //     // tooltip: {
    //     // formatter: '{a} <br/>{c} {b}'
    //     // },
    //     // toolbox: {
    //     // show: true,
    //     // feature: {
    //     //   restore: {show: true},
    //     //   saveAsImage: {show: true}
    //     // }
    //     // },
    //     series: [
    //       {
    //         name: '考分',
    //         type: 'gauge',
    //         // z: 1,
    //         center: ['50%', '30%'],
    //         min: 0,
    //         max: 500,
    //         splitNumber: 5,
    //         radius: '55%',
    //         axisLine: { // 坐标轴线
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             width: 6,
    //             color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
    //             // color: 'RGB(13,222,155)'
    //           }
    //         },
    //         axisTick: { // 坐标轴小标记
    //           length: 5, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             color: '#fff'
    //           }
    //         },
    //         splitLine: { // 分隔线
    //           length: 10, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
    //             color: 'auto'
    //           }
    //         },
    //         pointer: {
    //           width: 5,
    //           length: '50%'
    //         },
    //         // axisLabel: {  //表盘字体样式
    //         // backgroundColor: 'auto',
    //         // borderRadius: 2,
    //         // color: '#eee',
    //         // padding: 3,
    //         // textShadowBlur: 2,
    //         // textShadowOffsetX: 1,
    //         // textShadowOffsetY: 1,
    //         // textShadowColor: '#222'
    //         // },
    //         title: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           fontWeight: 'bolder',
    //           fontSize: 14,
    //           fontStyle: 'italic',
    //           color: '#adadad'
    //         },
    //         detail: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           // formatter: function (value) {
    //           //   value = (value + '').split('.')
    //           //   value.length < 2 && (value.push('00'))
    //           //   return ('00' + value[0]).slice(-2) +
    //           //     '.' + (value[1] + '00').slice(0, 2)
    //           // },
    //           offsetCenter: ['0', '35%'], // 实际值位置
    //           fontWeight: 'bolder',
    //           // borderRadius: 3,
    //           // backgroundColor: '#A6FFA6',
    //           // backgroundColor: '#444',
    //           // borderColor: '#aaa',
    //           // shadowBlur: 5,
    //           // shadowColor: '#333',
    //           // shadowOffsetX: 0,
    //           // shadowOffsetY: 3,
    //           // borderWidth: 2,
    //           // textBorderColor: 'RGB(13,222,155)',
    //           // textBorderColor: '#000',
    //           // textBorderWidth: 2,
    //           // textShadowBlur: 2,
    //           // textShadowColor: 'RGB(13,222,155)',
    //           // textShadowOffsetX: 0,
    //           // textShadowOffsetY: 0,
    //           fontFamily: 'Arial',
    //           width: 80,
    //           color: 'RGB(13,222,155)',
    //           rich: {}
    //         },
    //         data: [{value: 401.5, name: '考分'}]
    //       },
    //       {
    //         name: '班级排名',
    //         type: 'gauge',
    //         center: ['25%', '70%'],
    //         // z: 1,
    //         min: 0,
    //         max: 58, // 班级总人数
    //         splitNumber: 1,
    //         radius: '35%',
    //         axisLine: { // 坐标轴线
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             width: 6,
    //             color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
    //           }
    //         },
    //         axisTick: { // 坐标轴小标记
    //           length: 5, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             color: 'auto'
    //           }
    //         },
    //         splitLine: { // 分隔线
    //           length: 5, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
    //             color: 'auto'
    //           }
    //         },
    //         pointer: {
    //           width: 5,
    //           length: '50%'
    //         },
    //         // axisLabel: {  //表盘字体样式
    //         // backgroundColor: 'auto',
    //         // borderRadius: 2,
    //         // color: '#eee',
    //         // padding: 3,
    //         // textShadowBlur: 2,
    //         // textShadowOffsetX: 1,
    //         // textShadowOffsetY: 1,
    //         // textShadowColor: '#222'
    //         // },
    //         title: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           fontWeight: 'bold',
    //           fontSize: 14,
    //           fontStyle: 'italic',
    //           color: '#adadad'
    //         },
    //         detail: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           // formatter: function (value) {
    //           //   value = (value + '').split('.')
    //           //   value.length < 2 && (value.push('00'))
    //           //   return ('00' + value[0]).slice(-2) +
    //           //     '.' + (value[1] + '00').slice(0, 2)
    //           // },
    //           offsetCenter: ['0', '35%'],
    //           fontWeight: 'bold',
    //           // borderRadius: 3,
    //           // backgroundColor: '#A6FFA6',
    //           // backgroundColor: '#444',
    //           // borderColor: '#aaa',
    //           // shadowBlur: 5,
    //           // shadowColor: '#333',
    //           // shadowOffsetX: 0,
    //           // shadowOffsetY: 3,
    //           // borderWidth: 2,
    //           // textBorderColor: '#000',
    //           // textBorderWidth: 2,
    //           // textShadowBlur: 2,
    //           // textShadowColor: '#fff',
    //           // textShadowOffsetX: 0,
    //           // textShadowOffsetY: 0,
    //           fontFamily: 'Arial',
    //           // width: 10,
    //           // color: '#eee',
    //           rich: {}
    //         },
    //         data: [{value: 13, name: '班排'}]
    //       },
    //       {
    //         name: '年级排名',
    //         type: 'gauge',
    //         center: ['75%', '70%'],
    //         // z: 1,
    //         min: 0,
    //         max: 58, // 班级总人数
    //         splitNumber: 1,
    //         radius: '35%',
    //         axisLine: { // 坐标轴线
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             width: 6,
    //             color: [[0.2, 'RGB(13,222,155)'], [0.8, 'RGB(13,222,155)'], [1, 'RGB(13,222,155)']]
    //           }
    //         },
    //         axisTick: { // 坐标轴小标记
    //           length: 5, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             color: 'auto'
    //           }
    //         },
    //         splitLine: { // 分隔线
    //           length: 5, // 属性length控制线长
    //           lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
    //             color: 'auto'
    //           }
    //         },
    //         pointer: {
    //           width: 5,
    //           length: '50%'
    //         },
    //         // axisLabel: {  //表盘字体样式
    //         // backgroundColor: 'auto',
    //         // borderRadius: 2,
    //         // color: '#eee',
    //         // padding: 3,
    //         // textShadowBlur: 2,
    //         // textShadowOffsetX: 1,
    //         // textShadowOffsetY: 1,
    //         // textShadowColor: '#222'
    //         // },
    //         title: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           fontWeight: 'bold',
    //           fontSize: 14,
    //           fontStyle: 'italic',
    //           color: '#adadad'
    //         },
    //         detail: {
    //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
    //           // formatter: function (value) {
    //           //   value = (value + '').split('.')
    //           //   value.length < 2 && (value.push('00'))
    //           //   return ('00' + value[0]).slice(-2) +
    //           //     '.' + (value[1] + '00').slice(0, 2)
    //           // },
    //           offsetCenter: ['0', '35%'],
    //           fontWeight: 'bold',
    //           // borderRadius: 3,
    //           // backgroundColor: '#A6FFA6',
    //           // backgroundColor: '#444',
    //           // borderColor: '#aaa',
    //           // shadowBlur: 5,
    //           // shadowColor: '#333',
    //           // shadowOffsetX: 0,
    //           // shadowOffsetY: 3,
    //           // borderWidth: 2,
    //           // textBorderColor: '#000',
    //           // textBorderWidth: 2,
    //           // textShadowBlur: 2,
    //           // textShadowColor: '#fff',
    //           // textShadowOffsetX: 0,
    //           // textShadowOffsetY: 0,
    //           fontFamily: 'Arial',
    //           // width: 10,
    //           // color: '#eee',
    //           rich: {}
    //         },
    //         data: [{value: 13, name: '年排'}]
    //       }
    //     ]
    //   })
    // }
  }
}
</script>
<style scoped>
  /*.score_info {*/
  /*  !*background-color: #f8f8f8;*!*/
  /*  !*height: 100%;*!*/
  /*  height: calc(100% - 50px);*/
  /*  overflow: hidden;*/
  /*  flex: 1;*/
  /*  background: #f8f8f8;*/
  /*}*/
  .score_header {
    /*padding: 0;*/
    font-size: 16px;
    /*text-align: center;*/
    width: 100%;
    background-color: #42b983;
    /*background-color: #f8f8f8;*/
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
  .second_choice {
    margin-left: 20px;
  }
.score_second{
  height: 330px;
  /*background-color: #f0f0f0;*/
  /*margin-top: 10px;*/
  padding-top: 5px;
}
  .second_chart{
    height: 330px;
    margin-top: 10px;
  }
  .third_second {
    /*text-align: center;*/
    /*margin-left: 25%;*/
    margin-top: 10px;
    /*transform: translate(-50%);*/
    display: inline-block;
  }
  .third_second_p{
    color: #8e8e8e;
    /*margin-left: 45%;*/
    /*transform: translate(-50%);*/
    margin-bottom: 15px;
    margin-right: 20px;
    margin-left: 17px;
    display: inline-block;
  }
  .third {
    text-align: center;
    border-radius: 10px;
    /*padding-left: 15px;*/
    background-color: #f7f7f7;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border: 1px rgba(66,185,130,0.4) dashed;
    margin: 5px 20px;
  }
  .third_project {
    padding: 1px 5px 1px 0;
    margin-right: 5px;
  }
  .itald {
    margin: 0 5px;
  }
</style>
