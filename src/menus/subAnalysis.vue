<template>
  <div class="subAna_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">学科分析</div>
    </div>
    <div class="subAna_second_choice">
      <popup-picker :data="choiceList" :title="examname" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name ></popup-picker>

    </div>
    <div class="subAna_third">
      <h3 class="subAna_third_title">学科贡献率</h3>
      <div ref="subAna_third_chart" class="subAna_third_chart"></div>
    </div>
  </div>
</template>
<script>
import {getSubjectAnalysisInfo, getAllExam} from '@/api/index'
export default {
  data () {
    return {
      pieChart: '',
      titleList: [],
      dataList: [],
      choice: [],
      choiceList: [],
      scoreName: '',
      totalScore: [],
      countScore: 0
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
    this.getSubAnalyInfo()
    this.getAllExam()
    // this.drawPie()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
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
      this.scoreName = ''
      for (const item in this.choice) {
        this.scoreName += this.choice[item]
      }
      console.log('hahah', this.scoreName)
      getSubjectAnalysisInfo({
        stuNumber: '08047737',
        examType: this.scoreName
        // examType: '19年3月考试'
      }).then(res => {
        this.countScore = res.data.data[0].examCoversionTotal.coversionTotal
        this.totalScore = res.data.data[0]['contributionRate']
        this.titleList = Object.keys(this.totalScore)
        this.dataList = []
        for (const item in this.totalScore) {
          // this.dataList.push(Object.keys(this.totalScore)[item])
          this.dataList.push({name: item, value: parseInt(this.totalScore[item].split('%')[0] * 100)})
          // console.log(item)
          // console.log(Object.keys(this.totalScore)[0])
        }
        console.log(this.dataList)
        this.drawPie()
      })
      this.$store.commit('SET_SCORE_NAME', this.scoreName)
      localStorage.setItem('SET_SCORE_NAME', this.scoreName)
    },
    getSubAnalyInfo () {
      getSubjectAnalysisInfo({
        stuNumber: '08047737',
        examType: this.examname
        // examType: '19年3月考试'
      }).then(res => {
        this.countScore = res.data.data[0].examCoversionTotal.coversionTotal
        this.totalScore = res.data.data[0]['contributionRate']
        this.titleList = Object.keys(this.totalScore)
        for (const item in this.totalScore) {
          // this.dataList.push(Object.keys(this.totalScore)[item])
          this.dataList.push({name: item, value: parseInt(this.totalScore[item].split('%')[0] * 100)})
          // console.log(item)
          // console.log(Object.keys(this.totalScore)[0])
        }
        console.log(this.dataList)
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
            fill: '#42b983', // 文字的颜色
            width: 30,
            height: 30,
            fontSize: 17,
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
                backgroundColor: '#eee',
                // borderColor: '#aaa',
                borderWidth: 1,
                padding: 4,
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
                length: 5, // 指示线长度
                lineStyle: {
                  color: 'rgba(66,185,130,0.4)'
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
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .subAna_second_choice {
    background-color: #fff;
    border-bottom: 1px solid #c8c8cd;
  }
  .subAna_second_choice >>> .vux-popup-picker-select .vux-cell-value{
    display: none;
  }
  .subAna_third {
    margin: 25px 10px;
    padding: 5px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border: 1px rgba(66,185,130,0.4) dashed;
  }
  .subAna_third_title {
    /*margin-top: 10px;*/
    margin-left: 20px;
  }
  .subAna_third_chart {
    margin-top: 8px;
    height: 190px;
  }
</style>
