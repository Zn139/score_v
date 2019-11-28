<template>
  <div class="comAnaInfo">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">定位对比</div>
      <div class="iconfont_header" @click="setTarget"><i class="iconfont icon_lulushezhi3"></i></div>
    </div>
    <div class="subAna_second_choice">
      <popup-picker :data="choiceList" :title="examname" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name ></popup-picker>
    </div>
    <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">定位展示</tab-item>
      <tab-item @on-item-click="onItemClick">目标设定</tab-item>
    </tab>
  </div>
    <div>
      <div v-show="showSelect === 'dingwei'">
        <div class="com_four">
          <div class="subAna_four_tip">
            <p>同学您好，本次考试班级最高分<span>{{FS.classHighScore}}分</span>,年级最高分<span>{{FS.gradeHighScore}}分</span>，班级平均分<span>{{FS.classAvgScore}}分</span>，年级平均分<span>{{FS.gradeAvgScore}}分</span>。请戒骄戒躁，继续努力，争取更大的突破。</p>
<!--            <p>未公开：是表示当前系统中录入成绩不够四次，不能进行贡献率的计算，及提升。</p>-->
          </div>
        </div>
        <div class="subAna_third">
          <h4 class="subAna_third_title">自我定位</h4>
          <div ref="comAna_third_chart" class="subAna_third_chart"></div>
          <!--        <div class="comInfo_tip">-->
          <!--        <h4>说明：</h4>-->
          <p class="comInfo_p">说明：上图为班级学生成绩分布，黄色为你所处区域段，所处分数段越多，说明你提升一定分数，可超越的人数越多，进步空间越大。</p>
          <!--        </div>-->
        </div>
      </div>
      <div v-show="showSelect === 'chaju'">
        <div class="subAna_four">
          <h4 class="subAna_four_title">差距及目标设定</h4>
          <x-table class="subAna_four_table">
            <thead>
            <tr class="subAna_four_table_thead">
              <th>年排</th>
              <th>我</th>
              <th>第150</th>
              <th>第100</th>
              <th>第50</th>
              <th>第1</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, value, index) in CJList" :key="index">
              <td>得分</td>
              <td>{{item.I || '未公开'}}</td>
              <td>{{item['150'] || '未公开'}}</td>
              <td>{{item['100'] || '未公开'}}</td>
              <td>{{item['50'] || '未公开'}}</td>
              <td>{{item['1'] || '未公开'}}</td>
              <!--              <td v-if="item.rateDifference > 0" style="color: green;"><i class="iconfont icon_lulu-xiangshangjiantou "></i>{{item.rateDifference || '未公开'}}</td>-->
              <!--              <td v-else style="color: red"><i class="iconfont icon_luluarrow-"></i>{{item.rateDifference || '未公开'}}</td>-->
            </tr>
            </tbody>
          </x-table>
          <p class="comAnaInfo_p">说明：此表格展示了不同排名所对应的分数，看到差距的同时，可据此设定进步目标。</p>
        </div>

        <!--      </div>-->
        <!--      <div class="subAna_balance_tip">-->
        <!--        <h4>说明：</h4>-->
        <!--        <p>绿色代表该科目年级排名高于学生总分年级排名;</p>-->
        <!--        <p>红色代表科目年级排名名低于学生总分年级排名;</p>-->
        <!--        <p>柱形偏高总分排名越远，说明学生学科间发展越不均衡。</p>-->
        <!--      </div>-->
      </div>
    </div>

  </div>
</template>
<script>
import {getAllExam, positionCompare, getChaju, getEachScore} from '@/api/index'
export default {
  data () {
    return {
      showSetAim: false,
      choice: [],
      choiceList: [],
      content: [],
      showSelect: 'dingwei',
      // showSelect: 'chaju',
      firstChart: [],
      barChart: '',
      barList: [],
      barDataList: [],
      ownDW: '',
      xData: ['高分', '优秀', '良好', '及格', '低分'],
      x_index: 0,
      x_content: 0,
      CJList: [],
      FS: [] // 定位处的上面一部分分数
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    },
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
    this.getComAnalyInfo()
    this.getChajuInfo()
    this.getAllExam()
    this.getEachFS()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    setTarget () {

    },
    getEachFS () {
      getEachScore({
        openid: this.openid,
        stuNumber: '08047737',
        examName: this.examname
      }).then(res => {
        this.FS = res.data.data[0]
      })
    },
    getComAnalyInfo () {
      this.barDataList = []
      positionCompare({
        stuNumber: '08047737',
        examType: this.examname
      }).then(res => {
        this.firstChart = res.data.data[0]
        // console.log('sdfsdfsfsfsfs', this.firstChart)
        this.ownDW = this.firstChart.locationRate.split('区域')[0] // 获取所在区域
        this.x_index = this.xData.indexOf(this.ownDW) // 获取所在区域在x轴的索引
        console.log('索引：', this.xData.indexOf(this.ownDW))
        console.log(this.ownDW)
        for (const j in this.firstChart) {
          // this.continuList.push({name: j, value: this.differen[j]})
          this.barDataList.push(this.firstChart[j])
        }
        this.x_content = this.barDataList[this.x_index] // 根据索引获取的y值
        console.log('值：', this.barDataList[this.x_index])
        console.log(this.barDataList)
        this.drawBar(this.ownDW, this.x_content)
      })
    },
    getChajuInfo () {
      getChaju({
        openid: this.openid,
        stuNumber: '08047737',
        examName: this.examname
      }).then(res => {
        this.CJList = res.data.data[0].stringMap
        console.log('差距：', this.CJList)
      })
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
            this.choiceList.push(year)
          }
          if (JSON.stringify(this.choiceList).indexOf(JSON.stringify(month)) === -1) {
            this.choiceList.push(month)
          }
          if (JSON.stringify(this.choiceList).indexOf(JSON.stringify(title)) === -1) {
            this.choiceList.push(title)
          }
        }
      })
    },
    showChange () {
      console.log(this.choice)
      this.barDataList = []
      // this.continuList = []
      // this.differenNameRight = []
      this.scoreName = ''
      for (const item in this.choice) {
        this.scoreName += this.choice[item]
      }
      // console.log('hahah', this.scoreName)
      if (this.showSelect === 'dingwei') {
        getEachScore({
          openid: this.openid,
          stuNumber: '08047737',
          examName: this.scoreName
        }).then(resp => {
          this.FS = resp.data.data[0]
        })
        positionCompare({
          stuNumber: '08047737',
          examType: this.scoreName
          // examType: '19年3月考试'
        }).then(res => {
          this.firstChart = res.data.data[0]
          // console.log('sdfsdfsfsfsfs', this.firstChart)
          this.ownDW = this.firstChart.locationRate.split('区域')[0] // 获取所在区域
          this.x_index = this.xData.indexOf(this.ownDW) // 获取所在区域在x轴的索引
          console.log('索引：', this.xData.indexOf(this.ownDW))
          console.log(this.ownDW)
          for (const j in this.firstChart) {
            // this.continuList.push({name: j, value: this.differen[j]})
            this.barDataList.push(this.firstChart[j])
          }
          this.x_content = this.barDataList[this.x_index] // 根据索引获取的y值
          console.log('值：', this.barDataList[this.x_index])
          console.log(this.barDataList)
          this.drawBar(this.ownDW, this.x_content)
        })
      } else {
        getChaju({
          openid: this.openid,
          stuNumber: '08047737',
          examName: this.scoreName
        }).then(res => {
          this.CJList = res.data.data[0].stringMap
          console.log('差距：', this.CJList)
        })
      }
      this.$store.commit('SET_SCORE_NAME', this.scoreName)
      localStorage.setItem('SET_SCORE_NAME', this.scoreName)
    },
    onItemClick (item) {
      console.log(item)
      const _this = this
      if (item === 0) {
        _this.showSelect = 'dingwei'
        setTimeout(function () {
          _this.getComAnalyInfo()
        }, 300)
      } else if (item === 1) {
        _this.showSelect = 'chaju'
        setTimeout(function () {
          _this.getChajuInfo()
          // _this.drawContinuous()
        }, 300)
      }
    },
    drawBar (val, con) {
      console.log(val)
      this.barChart = this.echarts.init(this.$refs.comAna_third_chart)
      this.barChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // toolbox: { // 区域缩放
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
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
          axisLabel: {show: true},
          axisTick: {show: true},
          splitLine: {
            show: true
            // lineStyle: {
            //   color: '#00ff00',
            //   width: 2
            // }
          },
          data: this.xData
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            stack: '总量',
            barWidth: 15, // 柱图宽度
            label: {
              normal: {
                // show: true,
                formatter: '{b}',
                // position: 'top',
                textStyle: {
                  fontWeight: 'bold',
                  fontSize: '12'
                  // color: '#234'
                }
              }
            },
            data: this.barDataList,
            // markPoint: {
            //   data:
            // },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name === val) {
                    console.log('shime ', params)
                    return '#FFD306'
                    // return '#4587E7'
                  } else {
                    return 'rgb(67,183,131)'
                  }
                }
              }
            },
            markPoint: {
              // symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
              symbol: 'pin', // 标记(气泡)的图形
              symbolSize: 50, // 标记(气泡)的大小
              // symbolKeepAspect: true, // 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
              symbolOffset: [0, 0],

              itemStyle: {
                // color: '#4587E7',
                color: '#FFD306',
                // borderColor: '#000',
                borderWidth: 0,
                borderType: 'solid'
              },
              data: [{
                // 参数：
                // value 为标注值
                // xAxis 标注位置X轴 可以是x轴对应的值，也可以是xAxis数据的下标(下标从0开始)
                // yAxis 标注位置Y轴 可以比值大点(标注在数据点上方)，也可以小点(标注在数据点下方)
                // name: '对应区域', type: val,
                name: '对应区域', value: val, xAxis: val, yAxis: con + 0.5
              }]
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
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .comAnaInfo {
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
  .iconfont_header {
    float: right;
    margin-right: 13px;
    margin-top: 2px;
    .iconfont {
      font-size: 16px;
    }
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
    margin: 10px 10px;
    padding: 5px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 10px;
    p {
      margin: 15px 5px 10px;
      color: #999;
      font-size: 12px;
    }
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
  /*.subAna_balance_chart {*/
  /*  margin-top: 8px;*/
  /*  height: 190px;*/
  /*}*/
  .subAna_four {
    margin: 0 1px 35px;
    padding: 10px;
    /*text-align: center;*/
    border-radius: 10px;
    background-color: #fff;
  }
  .com_four {
    margin: 0 1px 15px;
    padding: 10px;
    /*text-align: center;*/
    border-radius: 10px;
    background-color: #fff;
  }
  .com_four_title {
    margin: 5px 0 15px ;
    text-align: center;
  }
  .subAna_four_title {
    margin: 35px 0 15px ;
    text-align: center;
  }
  .comAnaInfo_p {
    margin: 40px 10px 0;
    font-size: 13px;
    text-indent: 2em;
    color: #999;
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
    font-size: 13px;
    margin: 3px;
    line-height: 24px;
  }
  .subAna_four_tip {
    margin: 20px 2px 0;
    padding: 5px 3px;
    border: 3px rgba(66,185,130,0.4) dashed;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    p span {
      color: #42b983;
    }
  }
</style>
