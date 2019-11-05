<template>
  <div class="subAna_info">
<!--    <button-tab>-->
<!--      <button-tab-item selected>周</button-tab-item>-->
<!--      <button-tab-item><span class="vux-reddot-s">末</span></button-tab-item>-->
<!--    </button-tab>-->
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">学科分析</div>
    </div>
    <div class="subAna_second_choice">
      <popup-picker :data="choiceList" :title="examname" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name ></popup-picker>
    </div>
    <div>
      <tab>
        <tab-item selected @on-item-click="onItemClick">贡献率</tab-item>
        <tab-item @on-item-click="onItemClick">均衡分析</tab-item>
<!--        <tab-item @on-item-click="onItemClick">全部订单</tab-item>-->
      </tab>
    </div>
    <div v-show="showSelect === 'contribute'">
      <div class="subAna_third">
        <h4 class="subAna_third_title">学科贡献率</h4>
        <div ref="subAna_third_chart" class="subAna_third_chart"></div>
      </div>
      <div class="subAna_four">
        <h4 class="subAna_four_title">各次考试学科贡献率</h4>
<!--        <load-more tip="各次考试学科贡献率" :show-loading="false" background-color="#fbf9fe"></load-more>-->
        <x-table class="subAna_four_table">
          <thead>
          <tr class="subAna_four_table_thead">
            <th>学科</th>
            <th>本次</th>
            <th>上次</th>
            <th>前三次平均</th>
            <th>贡献率提升</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, value, index) in subTable" :key="index" v-if="item.length = 5">
            <td>{{item.title || '未公开'}}</td>
            <td>{{item.currentRate || '未公开'}}</td>
            <td>{{item.lastRate || '未公开'}}</td>
            <td>{{item.averageRate || '未公开'}}</td>
            <td v-if="item.rateDifference > 0" style="color: green;"><i class="iconfont icon_lulu-xiangshangjiantou "></i>{{item.rateDifference || '未公开'}}</td>
            <td v-else style="color: red"><i class="iconfont icon_luluarrow-"></i>{{item.rateDifference || '未公开'}}</td>
          </tr>
          </tbody>
        </x-table>
        <div class="subAna_four_tip">
          <p>贡献率提升：学科本次贡献率和前三次平均贡献率相比的提升率。</p>
          <p>未公开：是表示当前系统中录入成绩不够四次，不能进行贡献率的计算，及提升。</p>
        </div>
      </div>
    </div>
    <div v-show="showSelect === 'balanced'">
      <div class="subAna_third">
        <h4 class="subAna_third_title">学科均衡分析</h4>
        <div ref="balance_chart" class="subAna_balance_chart"></div>
      </div>
      <div class="subAna_balance_tip">
        <h4>说明：</h4>
        <p>绿色代表该科目年级排名高于学生总分年级排名;</p>
        <p>红色代表科目年级排名名低于学生总分年级排名;</p>
        <p>柱形偏高总分排名越远，说明学生学科间发展越不均衡。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, XTable, LoadMore, ButtonTab, ButtonTabItem } from 'vux'
import {getSubjectAnalysisInfo, getAllExam} from '@/api/index'
export default {
  components: {XTable, LoadMore, ButtonTab, ButtonTabItem, Tab, TabItem},
  data () {
    return {
      pieChart: '',
      contiChart: '',
      titleList: [],
      dataList: [],
      choice: [],
      choiceList: [],
      scoreName: '',
      totalScore: [],
      countScore: 0,
      content: [],
      subTable: [],
      // showSelect: 'balanced',
      differen: [],
      differenName: [],
      continuList: [],
      differenNameRight: [],
      showSelect: 'contribute'
    }
  },
  computed: {
    examname () {
      if (this.$store.state.exam.exam_name !== '') {
        // console.log(1111111111111111)
        return this.$store.state.exam.exam_name
      } else if (localStorage.SET_EXAM_NAME !== '') {
        return localStorage.SET_EXAM_NAME
      } else {
        return this.$route.params.exam_name
      }
    }
  },
  mounted () {
    // this.drawContinuous()
    // setTimeout(function () {
    //   this.getSubAnalyInfo()
    // }, 300)
    this.getSubAnalyInfo()
    this.getAllExam()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    onItemClick (item) {
      console.log(item)
      var _this = this
      if (item === 0) {
        _this.showSelect = 'contribute'
        setTimeout(function () {
          _this.getSubAnalyInfo()
        }, 300)
      } else if (item === 1) {
        _this.showSelect = 'balanced'
        setTimeout(function () {
          _this.drawContinuous()
        }, 300)
        // this.drawContinuous()
      }
    },
    getAllExam () {
      getAllExam().then(res => {
        this.choiceList = []
        let i = 0
        this.content = res.data.data
        // this.exam[0] = this.content[this.content.length - 1].examName
        // this.$store.commit('SET_EXAM_NAME', this.content[this.content.length - 1].examName)
        // localStorage.setItem('SET_EXAM_NAME', this.content[this.content.length - 1].examName)
        for (i = 0; i < this.content.length; i++) {
          const allExam = this.content[i].examName
          // console.log('~~~~~', this.allExam)
          const yearList = allExam.split('年')
          const monthList = yearList[1].split('月')
          if (monthList.length === 3) {
            monthList[1] = '月考'
          }
          // console.log('月：', monthList)
          const year = {
            name: yearList[0] + '年',
            value: yearList[0] + '年',
            parent: 0
          }
          // const year1 = {
          //   // name: yearList[0] + '年',
          //   value: this.content[i].id + ',' + yearList[0] + '年',
          //   // parent: 0
          // }
          // const year1 = {}
          const month = {
            name: monthList[0] + '月',
            value: monthList[0] + '月',
            parent: yearList[0] + '年'
          }
          const title = {
            name: monthList[1],
            value: monthList[1],
            parent: monthList[0] + '月'
          }
          if (JSON.stringify(this.choiceList).indexOf(JSON.stringify(year)) === -1) {
            // this.list31.push(year1)
            this.choiceList.push(year)
          }
          if (JSON.stringify(this.choiceList).indexOf(JSON.stringify(month)) === -1) {
            this.choiceList.push(month)
          }
          if (JSON.stringify(this.choiceList).indexOf(JSON.stringify(title)) === -1) {
            this.choiceList.push(title)
          }
        }
        // console.log('list:', this.choiceList)
      })
    },
    showExam () {
      console.log('qian:', this.choice)
    },
    hideExam () {
      console.log('hou:', this.choice)
      // console.log(this.$store.state.exam.exam_name)
    },
    showChange () {
      console.log(this.choice)
      this.continuList = []
      this.differenNameRight = []
      this.scoreName = ''
      for (const item in this.choice) {
        this.scoreName += this.choice[item]
      }
      // console.log('hahah', this.scoreName)
      getSubjectAnalysisInfo({
        stuNumber: '08047737',
        examType: this.scoreName
        // examType: '19年3月考试'
      }).then(res => {
        this.countScore = res.data.data[0].examCoversionTotal.coversionTotal
        this.totalScore = res.data.data[0]['contributionRate']
        this.differen = res.data.data[0]['equilibriumDifference']
        // console.log('differ;', Object.keys(this.differen))
        this.differenName = Object.keys(this.differen)
        for (const i in this.differenName) {
          this.differenNameRight.push(this.differenName[i].split('差值')[0])
        }
        // console.log(this.differenNameRight)
        for (const j in this.differen) {
          // this.continuList.push({name: j, value: this.differen[j]})
          this.continuList.push(this.differen[j])
        }
        this.subTable = res.data.data[0].map
        console.log('subTable:', this.subTable)
        this.titleList = Object.keys(this.totalScore)
        this.dataList = []
        for (const item in this.totalScore) {
          // this.dataList.push(Object.keys(this.totalScore)[item])
          this.dataList.push({name: item, value: parseInt(this.totalScore[item].split('%')[0] * 100)})
          // console.log(item)
          // console.log(Object.keys(this.totalScore)[0])
        }
        // console.log(this.dataList)
        this.drawPie()
        this.drawContinuous()
      })
      this.$store.commit('SET_SCORE_NAME', this.scoreName)
      localStorage.setItem('SET_SCORE_NAME', this.scoreName)
    },
    getSubAnalyInfo () {
      this.dataList = []
      this.continuList = []
      this.differenNameRight = []
      getSubjectAnalysisInfo({
        stuNumber: '08047737',
        examType: this.examname
        // examType: '19年3月考试'
      }).then(res => {
        this.content = res.data.data[0]
        console.log(this.content)
        this.countScore = res.data.data[0].examCoversionTotal.coversionTotal
        this.totalScore = res.data.data[0]['contributionRate']
        this.differen = res.data.data[0]['equilibriumDifference']
        // console.log('differ;', Object.keys(this.differen))
        this.differenName = Object.keys(this.differen)
        for (const i in this.differenName) {
          // console.log('i', i)
          this.differenNameRight.push(this.differenName[i].split('差值')[0])
        }
        // console.log(this.differenNameRight)
        for (const j in this.differen) {
          // this.continuList.push({name: j, value: this.differen[j]})
          this.continuList.push(this.differen[j])
        }
        this.subTable = res.data.data[0].map
        console.log('subTable:', this.subTable)
        this.titleList = Object.keys(this.totalScore)
        for (const item in this.totalScore) {
          // this.dataList.push(Object.keys(this.totalScore)[item])
          this.dataList.push({name: item, value: parseInt(this.totalScore[item].split('%')[0] * 100)})
          // console.log(item)
          // console.log(Object.keys(this.totalScore)[0])
        }
        // console.log(this.dataList)
        this.drawPie()
      })
    },
    drawPie () {
      this.pieChart = this.echarts.init(this.$refs.subAna_third_chart)
      this.pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}:({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   x: '75%',
        //   // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        //   data: this.titleList
        // },
        graphic: [{ // 环形图中间添加文字
          type: 'text', // 通过不同top值可以设置上下显示
          left: 'center',
          top: '40%',
          style: {
            text: '总分',
            textAlign: 'center',
            fill: '#AE8F00', // 文字的颜色
            width: 30,
            height: 30,
            fontSize: 16,
            fontFamily: 'Microsoft YaHei'
          }
        }, {
          type: 'text',
          left: 'center',
          top: '55%',
          style: {
            text: this.countScore,
            textAlign: 'center',
            // fill: '#7c7c7c',
            // fill: '#42b983',
            fill: '#AE8F00',
            width: 30,
            height: 30,
            fontSize: 20
          }
        }],
        color: ['#66B3FF', 'RGB(244,169,92)', '#6FB7B7', '#ff7575', '#73BF00', '#CA8EC2'],
        series: [
          {
            name: '贡献率',
            type: 'pie',
            // selectedMode: 'single',
            radius: ['50%', '75%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // },
            // label: {
            //   normal: {
            //     show: false,
            //     // data: 357,
            //     position: 'center'
            //   },
            //   emphasis: {
            //     show: true,
            //     textStyle: {
            //       fontSize: '14',
            //       fontWeight: 'bold'
            //     }
            //   }
            // },
            // selectedMode: 'single',
            selectedOffset: 10,
            // clockwise: true,
            label: {
              normal: {
                formatter: '{b}:\n{d}%',
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 2,
                // padding: 4,
                // borderRadius: 4,
                rich: {
                  b: {
                    fontSize: 13,
                    lineHeight: 33,
                    marginBottom: 10
                  },
                  d: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 3
                  }
                },
                // data: 357,
                // position: 'center',
                textStyle: {
                  fontSize: 13,
                  color: 'rgb(66,185,130)'
                }
              }
            },
            labelLine: {
              normal: {
                length: 7, // 指示线长度
                length2: 9,
                smooth: 0.1,
                lineStyle: {
                  color: 'rgba(66,185,130,0.4)',
                  fontWeight: 'bolder'
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     show: false
            //   }
            // },
            data: this.dataList
            // [
            // {value: 335, name: '直接访问'},
            // {value: 310, name: '邮件营销'},
            // {value: 234, name: '联盟广告'},
            // {value: 135, name: '视频广告'},
            // {value: 1548, name: '搜索引擎'}
            // ]
          }
        ]
      })
    },
    drawContinuous () {
      // const labelRight = {
      //   normal: {
      //     position: 'right'
      //   }
      // }
      // console.log('continuous')
      // this.contiChart = this.echarts.init(document.getElementById('balance_chart'))
      this.contiChart = this.echarts.init(this.$refs.balance_chart)
      this.contiChart.setOption({
        // title: {
        //   text: '交错正负轴标签',
        //   subtext: 'From ExcelHome',
        //   sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          bottom: 30,
          right: '3%'
        },
        yAxis: {
          type: 'value',
          position: 'top',
          splitLine: {lineStyle: {type: 'dashed'}}
        },
        xAxis: {
          type: 'category',
          axisLine: {show: false},
          axisLabel: {show: false},
          axisTick: {show: false},
          splitLine: {
            show: true
            // lineStyle: {
            //   color: '#00ff00',
            //   width: 2
            // }
          },
          data: this.differenNameRight
          // data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
        },
        series: [
          {
            name: '差值',
            type: 'bar',
            stack: '总量',
            barWidth: 15, // 柱图宽度
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                position: 'top',
                textStyle: {
                  fontWeight: 'bold',
                  fontSize: '12'
                  // color: '#234'
                }
              }
            },
            data: this.continuList,
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.data > 0) {
                    // return 'rgba(66,185,130,0.6)'
                    return 'rgb(67,183,131)'
                  } else {
                    return 'rgb(253,116,120)'
                  }
                }
              }
            },
            markLine: { // 辅助线
              symbol: 'none', // 去掉警戒线最后面的箭头
              label: {
                position: 'start' // 将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
              data: [{
                silent: false, // 鼠标悬停事件  true没有，false有
                lineStyle: { // 警戒线的样式  ，虚实  颜色
                  type: 'solid',
                  color: 'rgb(204, 204, 204)',
                  width: 3
                },
                yAxis: 0 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              }]
            }
            // data: [
            // {value: -0.07, label: labelRight},
            // {value: -0.09},
            // // 0.2, 0.44,
            // {value: 0.23},
            // // 0.08,
            // {value: 0.47},
            // // 0.47,
            // {value: -0.36, label: labelRight}
            // 0.18
            // ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .subAna_info {
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
  .icon_luluarrow- {
    font-weight: bold;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .subAna_second_choice {
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
  }
  .subAna_second_choice >>> .vux-cell-box .weui-cell_access {
    color: #999;
    /*width: 35%;*/
    /*color: #3c3c3c;*/
  }
  .subAna_second_choice >>> .vux-popup-picker-select .vux-cell-value{
    display: none;
  }
  .subAna_third {
    margin: 25px 10px;
    padding: 5px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 10px;
    /*border: 1px rgba(66,185,130,0.4) dashed;*/
  }
  .subAna_third_title {
    /*margin-top: 10px;*/
    margin-left: 20px;
  }
  .subAna_third_chart {
    margin-top: 8px;
    height: 190px;
  }
  .subAna_balance_chart {
    margin-top: 8px;
    height: 190px;
  }
  .subAna_four {
    margin: 0 1px 40px;
    padding: 10px;
    /*text-align: center;*/
    border-radius: 10px;
    background-color: #fff;
  }
  .subAna_four_title {
    margin: 5px 0 15px;
    text-align: center;
  }
  tbody tr:nth-child(2n + 1) {
    /*background-color: rgb(229,253,239);*/
    background-color: rgba(66,185,130,0.2);
  }
  tbody tr td {
    border: 1px solid rgba(66,185,130,0.2);
    font-size: 13px;
  }
  thead tr th {
    border: 1px solid rgba(66,185,130,0.2);
    font-weight: bold;
    font-size: 14px;
  }
  table.vux-table.subAna_four_table {
    line-height: 35px;
  }
  .subAna_balance_tip {
    border: 4px dashed rgba(66,185,130,0.4);
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    padding: 5px 5px 10px;
    margin: 0 15px 15px;
  }
  p {
    text-indent: 2em;
    font-size: 14px;
  }
  .subAna_four_tip {
    margin: 20px 2px;
    padding: 5px 3px;
    border: 3px rgba(66,185,130,0.4) dashed;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
  }
</style>
