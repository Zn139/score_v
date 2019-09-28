<template>
  <div>
    <div class="score_header">
      <tab v-model="index01" :line-width="1" bar-active-color="#668599">
        <tab-item selected @on-item-click="clickAll">总评</tab-item>
        <tab-item @on-item-click="clickLanguage">语文</tab-item>
        <tab-item @on-item-click="onItemClick">数学</tab-item>
        <tab-item @on-item-click="onItemClick">英语</tab-item>
        <tab-item @on-item-click="onItemClick">物理</tab-item>
        <tab-item @on-item-click="onItemClick">化学</tab-item>
        <tab-item @on-item-click="onItemClick">生物</tab-item>
      </tab>
    </div>
    <div class="score_second" v-show="drawYB">
        <div ref="yiBiaoChart" class="second_chart"></div>
    </div>
    <div class="score_second" v-show="drawYBLang">
      <div ref="langYiBChart" class="second_chart"></div>
    </div>
    <div class="third_second" v-show="drawYB">
        <p class="third_second_p">语文{{language}}/130</p>
        <p class="third_second_p">数学{{language}}/130</p>
        <p class="third_second_p">英语{{language}}/130</p>
        <p class="third_second_p">地理{{language}}/130</p>
        <p class="third_second_p">生物{{language}}/130</p>
        <p class="third_second_p">化学{{language}}/130</p>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import { getScoreAnalysis } from '@/api/index'

export default {
  components: {Tab, TabItem},
  data () {
    return {
      drawYB: true,
      drawYBLang: true,
      index01: 0,
      yiBChart: '',
      lYiBChart: '',
      language: 13,
      math: 20,
      english: 15,
      geography: 24,
      physics: 30,
      chemistry: 26
    }
  },
  mounted () {
    this.clickAll()
    this.drawYiBLang()
    this.getAllScore()
    // this.clickLanguage()
  },
  methods: {
    getAllScore () {
      getScoreAnalysis({

      })
    },
    clickAll () {
      this.drawYBLang = false
      this.drawYB = true
      this.drawYiBiao()
      // this.drawYB = true
    },
    clickLanguage () {
      this.drawYB = false
      this.drawYBLang = true
      this.drawYiBLang()
    },
    onItemClick (index) {
      console.log('on item click:', index)
    },
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
            max: 500,
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
            data: [{value: 401.5, name: '总分'}]
          },
          {
            name: '班级排名',
            type: 'gauge',
            center: ['25%', '70%'],
            // z: 1,
            min: 0,
            max: 58, // 班级总人数
            splitNumber: 1,
            radius: '35%',
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
            data: [{value: 13, name: '班排'}]
          },
          {
            name: '年级排名',
            type: 'gauge',
            center: ['75%', '70%'],
            // z: 1,
            min: 0,
            max: 58, // 班级总人数
            splitNumber: 1,
            radius: '35%',
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
            data: [{value: 13, name: '年排'}]
          }
        ]
      })
    },
    drawYiBLang () {
      this.lYiBChart = this.echarts.init(this.$refs.langYiBChart)
      this.lYiBChart.setOption({
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
            name: '考分',
            type: 'gauge',
            // z: 1,
            center: ['50%', '30%'],
            min: 0,
            max: 500,
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
            data: [{value: 401.5, name: '考分'}]
          },
          {
            name: '班级排名',
            type: 'gauge',
            center: ['25%', '70%'],
            // z: 1,
            min: 0,
            max: 58, // 班级总人数
            splitNumber: 1,
            radius: '35%',
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
            data: [{value: 13, name: '班排'}]
          },
          {
            name: '年级排名',
            type: 'gauge',
            center: ['75%', '70%'],
            // z: 1,
            min: 0,
            max: 58, // 班级总人数
            splitNumber: 1,
            radius: '35%',
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
            data: [{value: 13, name: '年排'}]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
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
  .third_second_p{
    color: #8e8e8e;
    margin-left: 55%;
    transform: translate(-50%);
    margin-bottom: 5px;
  }
</style>
