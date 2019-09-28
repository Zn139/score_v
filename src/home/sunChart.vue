<template>
  <div>
    <div class="second">
      <div ref="sunChart" class="second_chart"></div>
      <div class="second_screen">
        <div v-if="list.showDefault">
          <p class="second_screen_content">当前是19年3月考试</p>
          <p class="second_screen_content">分数为{{total}}</p>
        </div>
        <div v-if="list.showLink" v-for="item in clickCTList">
          <p class="second_screen_content">班级名次：{{item.examCoversionTotal.classIndex}}</p>
          <p class="second_screen_content">学校名次：{{item.examCoversionTotal.schoolIndex}}</p>
          <p class="second_screen_content">班级进退名次；{{item.waveClass}}</p>
          <p class="second_screen_content">年级进退名次：{{item.waveGrade}}</p>
        </div>
        <div v-show="list.showZongHe" v-for="item in zonghe">
          <p class="second_screen_content">综合分数：{{item.comprehensive}}</p>
          <p class="second_screen_content">综合班排：{{item.complexClassRank}}</p>
          <p class="second_screen_content">综合年排：{{item.complexGradeRank}}</p>
        </div>
        <div v-show="list.showThree" v-for="item in threeProject">
          <p class="second_screen_content">三科分数：{{item.threeSubject}}</p>
          <p class="second_screen_content">三科班排：{{item.classRank}}</p>
          <p class="second_screen_content">三科年排：{{item.gradeRank}}</p>
        </div>
        <div v-show="list.showPro" v-if="subList.length > 0" v-for="item in subList">
          <p class="second_screen_content">{{project}}分数：{{item.score}}</p>
          <p class="second_screen_content">{{project}}班排：{{item.classRank}}</p>
          <p class="second_screen_content">{{project}}年排：{{item.gradeRank}}</p>
          <p class="second_screen_content">{{project}}班进：{{item.waveClass}}</p>
          <p class="second_screen_content">{{project}}年进：{{item.waveGrade}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getScoreAnalysis, getThree, getSingle, getAllRate } from '@/api/index'
import _ from 'underscore'
export default {
  data () {
    return {
      list: {
        showDefault: true,
        showLink: false,
        showZongHe: false,
        showThree: false,
        showPro: false
      },
      // score: '',
      total: '',
      zhList: [],
      zhEngList: [],
      sixRate: {},
      project: '',
      threeProject: [],
      subList: [],
      Linkage: '',
      coversionTotalList: [],
      clickCTList: [],
      zonghe: [],
      three: [],
      sunCharts: '',
      homeScroll: null,
      key: '',
      id: 0,
      sunData: [
        {
          name: '',
          value: 44,
          itemStyle: {
            color: 'RGB(76,131,101)'
          },
          children: [{
            name: '三科',
            value: 22,
            itemStyle: {
              color: '#FFAAD5'
            },
            children: [{
              name: '语文',
              value: 0.5,
              itemStyle: {
                color: '#567983'
              }
              // children: [{
              //   name: '高分率',
              //   value: 2
              // }, {
              //   name: '优秀率',
              //   value: 3
              // }]
            },
            {
              name: '数学',
              value: 10,
              itemStyle: {
                color: '#F1E1FF'
              }
              // children: [{
              //   name: '高分率',
              //   value: 1
              // },
              // {
              //   name: '优秀率',
              //   value: 2
              // },
              // {
              //   name: '良好率',
              //   value: 3
              // },
              // {
              //   name: '及格率',
              //   value: 1
              // },
              // {
              //   name: '低分率',
              //   value: 1
              // },
              // {
              //   name: '超均率',
              //   value: 2
              // }
              // ]
            },
            {
              name: '英语',
              value: 7,
              itemStyle: {
                color: '#A6A6D2'
              }
              // children: [{
              //   name: '高分率',
              //   value: 2
              // },
              // {
              //   name: '优秀率',
              //   value: 1
              // },
              // {
              //   name: '良好率',
              //   value: 1
              // },
              // {
              //   name: '及格率',
              //   value: 1
              // },
              // {
              //   name: '低分率',
              //   value: 1
              // },
              // {
              //   name: '超均率',
              //   value: 1
              // }
              // ]
            }
            ]
          },
          {
            name: '综合',
            value: 0,
            itemStyle: {
              color: 'RGB(244,169,92)'
            },
            children: [{
              name: '',
              value: 0.1,
              itemStyle: {
                color: '#66B3FF'
              }
            },
            {
              name: '',
              value: 0,
              itemStyle: {
                color: '#6FB7B7'
              }
            },
            {
              name: '',
              value: 0,
              itemStyle: {
                color: '#01B468'
              }
            }
            ]
          }
          ]
        }
      ]
    }
  },
  mounted () {
    // this.$store.commit('SET_ShowLink', true)
    // console.log(this.$store.state.sunchart.link)
    this.getData()
    this.getThree()
    // this.getSix()
    // this.$nextTick(() => {
    //   this.homeScroll = new BScroll(this.$refs.homeWrapper, {
    //     click: true
    //   })
    // })
  },
  updated () {
    this.getChartUpdate()
  },
  methods: {
    getSix (three) {
      // this.getThree()
      // console.log(this.three)
      console.log('six')
      getAllRate({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        console.log(res.data.data)
        this.sixRate = res.data.data[0]
        // console.log(this.sixRate.allSubjectRateMap.keys())
        var subj = three
        for (const item in subj) {
          console.log('safd', subj[item])
          if (subj[item] === '物理') {
            // this.zhList.push({'physical': '物理'})
            this.zhEngList.push('physical')
            this.zhList.push('物理')
          } else if (subj[item] === '化学') {
            // this.zhList.push({'chemistry': '化学'})
            this.zhEngList.push('chemistry')
            this.zhList.push('化学')
          } else if (subj[item] === '生物') {
            // this.zhList.push({'biological': '生物'})
            this.zhEngList.push('biological')
            this.zhList.push('生物')
          } else if (subj[item] === '历史') {
            // this.zhList.push({'history': '历史'})
            this.zhEngList.push('history')
            this.zhList.push('历史')
          } else if (subj[item] === '地理') {
            // this.zhList.push({'geography': '地理'})
            this.zhEngList.push('geography')
            this.zhList.push('地理')
          } else if (subj[item] === '政治') {
            // this.zhList.push({'biological': '政治'})
            this.zhEngList.push('biological')
            this.zhList.push('政治')
          }
        }
        // console.log(this.zhList[0])
        // console.log(this.zhEngList[0])
        // console.log(typeof this.sixRate.allSubjectRateMap[this.zhEngList[0]])
        console.log('sdafds', parseInt(this.sixRate.allSubjectRateMap.english))
        this.sunData[0].children[1].value = parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[0]] * 100) + parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[1]] * 100) + parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[2]] * 100)
        this.sunData[0].children[0].value = parseInt(this.sixRate.allSubjectRateMap.language * 100) + parseInt(this.sixRate.allSubjectRateMap.math * 100) + parseInt(this.sixRate.allSubjectRateMap.english * 100)
        this.sunData[0].value = this.sunData[0].children[1].value + this.sunData[0].children[0].value
        this.sunData[0].children[0].children[0].value = parseInt(this.sixRate.allSubjectRateMap.language * 100)
        this.sunData[0].children[0].children[1].value = parseInt(this.sixRate.allSubjectRateMap.math * 100)
        this.sunData[0].children[0].children[2].value = parseInt(this.sixRate.allSubjectRateMap.english * 100)
        this.sunData[0].children[1].children[0].name = this.zhList[0]
        this.sunData[0].children[1].children[1].name = this.zhList[1]
        this.sunData[0].children[1].children[2].name = this.zhList[2]
        this.sunData[0].children[1].children[0].value = parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[0]] * 100)
        this.sunData[0].children[1].children[1].value = parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[1]] * 100)
        this.sunData[0].children[1].children[2].value = parseInt(this.sixRate.allSubjectRateMap[this.zhEngList[2]] * 100)
        console.log('data:', this.sunData)
        this.drawSunburst()
      })
    },
    getThree () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.three = res.data.data[0].list
        console.log(this.three)
        this.getSix(this.three)
        // for (let item in this.three) {
        //   console.log('three:', this.three)
        // this.sunData[0].children[1].children[0].name = this.three[item].list[0]
        // this.sunData[0].children[1].children[1].name = this.three[item].list[1]
        // this.sunData[0].children[1].children[2].name = this.three[item].list[2]
        // this.drawSunburst()
        // }
      })
    },
    drawSunburst () {
      this.sunCharts = this.echarts.init(this.$refs.sunChart)
      this.sunCharts.setOption({
        title: {
          textStyle: {
            fontSize: 12,
            align: 'right'
          },
          subtextStyle: {
            align: 'right',
            fontSize: 5
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '分数为: {b}'
        // },
        grid: {
          left: '10%', // 相当于距离左边效果:padding-left
          y: '30%', // 相当于距离上边效果:padding-top
          bottom: '3%',
          containLabel: true
        },
        visualMap: {
          show: false,
          // type: 'continuous',
          min: 0,
          max: 10,
          inRange: {
            color: ['#2D5F73', '#538EA6', '#F28C8C']
          }
        },
        series: {
          type: 'sunburst',
          highlightPolicy: 'ancestor',
          data: this.sunData,
          radius: [0, '90%']
          // textStyle: {
          //   fontSize: 5
          // }
          // label: {
          //   rotate: 'radial'
          // }
        }
      })
      this.getChartUpdate()
    },
    getChartUpdate: _.debounce(function () {
      const that = this
      this.sunCharts.on('click', function (param) {
        console.log('param.value:', param.value)
        console.log('param.name:', param.name)
        if (param.value === 44) {
          that.getClickData()
          // getScoreAnalysis({
          //   stuNumber: '08047737',
          //   examType: '2019年1月期末'
          // }).then(res => {
          //   that.clickCTList = res.data.data
          //   for (const a in that.list) {
          //     that.list[a] = false
          //     that.list.showLink = true
          //   }
          //   // that.showLink = true
          //   // this.$store.commit('SET_ShowLink', this.showLink)
          //   that.$store.commit('SET_ShowLink', true)
          //   console.log('store:', that.$store.state.sunchart.link)
          //   // console.log('1111111111', that.showLink)
          // })
        } else if (param.name === '综合') {
          that.getClickThreeZ()
          // getThree({
          //   stuNumber: '08047737',
          //   examType: '19年3月考试'
          // }).then(res => {
          //   that.zonghe = res.data.data
          //   for (const a in that.list) {
          //     that.list[a] = false
          //     that.list.showZongHe = true
          //   }
          // })
        } else if (param.name === '三科') {
          that.getClickThreeS()
          // getThree({
          //   stuNumber: '08047737',
          //   examType: '19年3月考试'
          // }).then(res => {
          //   that.threeProject = res.data.data
          //   for (const a in that.list) {
          //     that.list[a] = false
          //     that.list.showThree = true
          //   }
          // })
        } else if (param.name === '化学') {
          that.project = '化学'
          that.getClickChemistry('huaxue_coversion')
        } else if (param.name === '物理') {
          that.project = '物理'
          that.getClickChemistry('wuli_coversion')
        } else if (param.name === '生物') {
          that.project = '生物'
          that.getClickChemistry('shengwu_coversion')
        } else if (param.name === '历史') {
          that.project = '历史'
          that.getClickChemistry('lishi_coversion')
        } else if (param.name === '地理') {
          that.project = '地理'
          that.getClickChemistry('dili_coversion')
        } else if (param.name === '政治') {
          that.project = '政治'
          that.getClickChemistry('zhengzhi_coversion')
        } else if (param.name === '语文') {
          that.project = '语文'
          that.getClickChemistry('yuwen_score')
        } else if (param.name === '数学') {
          that.project = '数学'
          that.getClickChemistry('shuxue_score')
        } else if (param.name === '英语') {
          that.project = '英语'
          that.getClickChemistry('yingyu_score')
        }
      })
    }),
    getData () {
      this.$store.commit('SET_ShowLink', false)
      getScoreAnalysis({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.coversionTotalList = res.data.data
        for (let item in this.coversionTotalList) {
          this.sunData[0].name = this.coversionTotalList[item].examCoversionTotal.coversionTotal
          console.log('成绩：', this.coversionTotalList[item].examCoversionTotal)
          this.total = this.coversionTotalList[item].examCoversionTotal.coversionTotal
        }
        this.drawSunburst()
      })
    },
    getClickData: _.debounce(function () {
      getScoreAnalysis({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.clickCTList = res.data.data
        for (const a in this.list) {
          this.list[a] = false
          this.list.showLink = true
        }
        // that.showLink = true
        // this.$store.commit('SET_ShowLink', this.showLink)
        this.$store.commit('SET_ShowLink', true)
        console.log('store:', this.$store.state.sunchart.link)
        // console.log('1111111111', that.showLink)
      })
    }),
    getClickThreeZ: _.debounce(function () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.zonghe = res.data.data
        for (const a in this.list) {
          this.list[a] = false
          this.list.showZongHe = true
        }
      })
    }),
    getClickThreeS: _.debounce(function () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.threeProject = res.data.data
        for (const a in this.list) {
          this.list[a] = false
          this.list.showThree = true
        }
      })
    }),
    getClickChemistry: _.debounce(function (project) {
      this.subList = []
      getSingle({
        stuNumber: '08047737',
        examType: '19年3月考试',
        subject: project
      }).then(res => {
        this.subList = res.data.data
        // this.score = res.data.data[0].score
        // console.log('score:', this.score)
        // console.log('score:', res.data.data[0].examCoversionTotal)
        for (const a in this.list) {
          this.list[a] = false
          this.list.showPro = true
        }
      })
    })
  }
}
</script>
<style scoped>
  .second{
    height: 210px;
    /*background-color: antiquewhite;*/
    background-color: #f0f0f0;
    /*margin-bottom: 5px;*/
    /*display: inline-block;*/
  }
  .second_screen{
    font-size: 15px;
    width: 35%;
    height: 200px;
    padding-top: 30px;
    /*margin-left: 80%;*/
    /*margin-top: -10px;*/
    position: absolute;
    display: inline-block;
  }
  .second_chart{
    height: 200px;
    width: 65%;
    display: inline-block;
  }
  .third{
    height: 60px;
    background-color: cornflowerblue;
    color: #fff;
    text-align: center;
    line-height: 60px;
    /*padding-top: 15px;*/
    /*transform: translate(-50%);*/
  }
  .second_screen_content{
    margin-top: 5px;
    margin-bottom: 3px;
    /*padding-bottom: 10px;*/
  }
</style>
