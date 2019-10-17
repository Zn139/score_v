<template>
  <div>
    <div class="second">
      <div ref="sunChart" class="second_chart"></div>
      <div class="second_screen">
        <div class="second_deafult">
          <div v-if="docState === 'current'">
            <p class="second_screen_title">当前是</p>
            <p class="second_screen_content">19年3月考试</p>
            <p class="second_screen_content">分数:{{total}}</p>
          </div>
        </div>
        <transition
          name="fade" mode="out-in">
<!--          <div v-if="docState === 'current'">-->
<!--            <p class="second_screen_title">当前是</p>-->
<!--            <p class="second_screen_content">19年3月考试</p>-->
<!--            <p class="second_screen_content">分数:{{total}}</p>-->
<!--          </div>-->
          <div v-if="docState === 'allScore'" v-for="(item,index) in clickCTList" :key="index">
            <p class="second_screen_title">总分</p>
            <p class="second_screen_content">班排：{{item.examCoversionTotal.classIndex}}</p>
            <p class="second_screen_content">校排：{{item.examCoversionTotal.schoolIndex}}</p>
            <p class="second_screen_content">班进；{{item.waveClass}}</p>
            <p class="second_screen_content">年进：{{item.waveGrade}}</p>
          </div>
          <div v-if="docState === 'zong_he'" v-for="(item,index) in zonghe" :key="index">
            <p class="second_screen_title">综合</p>
            <p class="second_screen_content">分数：{{item.comprehensive}}</p>
            <p class="second_screen_content">班排：{{item.complexClassRank}}</p>
            <p class="second_screen_content">年排：{{item.complexGradeRank}}</p>
          </div>
          <div v-if="docState === 'san_ke'" v-for="(item,index) in threeProject" :key="index">
            <p class="second_screen_title">三科</p>
            <p class="second_screen_content">分数：{{item.threeSubject}}</p>
            <p class="second_screen_content">班排：{{item.classRank}}</p>
            <p class="second_screen_content">年排：{{item.gradeRank}}</p>
          </div>
          <div v-if="docState === 'single_ke'"  v-for="(item,index) in subList" :key="index">
            <p class="second_screen_title">{{project}}</p>
            <p class="second_screen_content">分数：{{item.score}}</p>
            <p class="second_screen_content">班排：{{item.classRank}}</p>
            <p class="second_screen_content">年排：{{item.gradeRank}}</p>
            <p class="second_screen_content">班进：{{item.waveClass}}</p>
            <p class="second_screen_content">年进：{{item.waveGrade}}</p>
          </div>
        </transition>
<!--        <transition name="fade" mode="out-in">-->
<!--          <div v-if="list.showLink" v-for="item in clickCTList" :key="item">-->
<!--            <p class="second_screen_title">总分</p>-->
<!--            <p class="second_screen_content">班排：{{item.examCoversionTotal.classIndex}}</p>-->
<!--            <p class="second_screen_content">校排：{{item.examCoversionTotal.schoolIndex}}</p>-->
<!--            <p class="second_screen_content">班进；{{item.waveClass}}</p>-->
<!--            <p class="second_screen_content">年进：{{item.waveGrade}}</p>-->
<!--          </div>-->
<!--        </transition>-->
<!--        <transition name="fade" mode="in-out">-->
<!--          <div v-show="list.showZongHe" v-for="item in zonghe" :key="item">-->
<!--            <p class="second_screen_title">综合</p>-->
<!--            <p class="second_screen_content">分数：{{item.comprehensive}}</p>-->
<!--            <p class="second_screen_content">班排：{{item.complexClassRank}}</p>-->
<!--            <p class="second_screen_content">年排：{{item.complexGradeRank}}</p>-->
<!--          </div>-->
<!--        </transition>-->
<!--        <transition name="fade" mode="in-out">-->
<!--          <div v-show="list.showThree" v-for="item in threeProject" :key="item">-->
<!--            <p class="second_screen_title">三科</p>-->
<!--            <p class="second_screen_content">分数：{{item.threeSubject}}</p>-->
<!--            <p class="second_screen_content">班排：{{item.classRank}}</p>-->
<!--            <p class="second_screen_content">年排：{{item.gradeRank}}</p>-->
<!--          </div>-->
<!--        </transition>-->
<!--        <transition name="fade" mode="in-out">-->
<!--          <div v-show="list.showPro" v-if="subList.length > 0" v-for="item in subList" :key="item">-->
<!--            <p class="second_screen_title">{{project}}</p>-->
<!--            <p class="second_screen_content">分数：{{item.score}}</p>-->
<!--            <p class="second_screen_content">班排：{{item.classRank}}</p>-->
<!--            <p class="second_screen_content">年排：{{item.gradeRank}}</p>-->
<!--            <p class="second_screen_content">班进：{{item.waveClass}}</p>-->
<!--            <p class="second_screen_content">年进：{{item.waveGrade}}</p>-->
<!--          </div>-->
<!--        </transition>-->
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
      docState: 'current',
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
    // console.log(this.$store.state.exam.link)
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
        //   // show: true,
        //   trigger: 'item',
        //   // formatter: '分数为: {a}'
        // },
        // tooltip: {
        //   enterable: true,
        //   trigger: 'axis',
        //   axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        //   },
        //   formatter: function (params) {
        //     var relVal = params[0].name + '<br/>'
        //     relVal += params[0].seriesName + ' : ' + params[0].value + '<br/>'
        //     relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>'
        //     relVal += params[2].seriesName + ' : ' + params[2].value + '%'
        //     return relVal
        //   }
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
        if (param.value === 356) {
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
          //   console.log('store:', that.$store.state.exam.link)
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
        // console.log('123', this.clickCTList)
        this.docState = 'allScore'
        // for (const a in this.list) {
        //   this.list[a] = false
        //   this.list.showLink = true
        // }
        // that.showLink = true
        // this.$store.commit('SET_ShowLink', this.showLink)
        this.$store.commit('SET_EXAM_NAME', true)
        console.log('store:', this.$store.state.exam.exam_name)
        // console.log('1111111111', that.showLink)
      })
    }),
    getClickThreeZ: _.debounce(function () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.zonghe = res.data.data
        this.docState = 'zong_he'
        // for (const a in this.list) {
        //   this.list[a] = false
        //   this.list.showZongHe = true
        // }
      })
    }),
    getClickThreeS: _.debounce(function () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.threeProject = res.data.data
        this.docState = 'san_ke'
        // for (const a in this.list) {
        //   this.list[a] = false
        //   this.list.showThree = true
        // }
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
        this.docState = 'single_ke'
        // this.score = res.data.data[0].score
        // console.log('score:', this.score)
        // console.log('score:', res.data.data[0].examCoversionTotal)
        // for (const a in this.list) {
        //   this.list[a] = false
        //   this.list.showPro = true
        // }
      })
    })
  }
}
</script>
<style scoped>
  .second{
    margin: 10px 14px 20px;
    box-shadow: 4px 4px 4px 0px rgba(71, 89, 172, 0.12);
    border-radius: 10px;
    height: 210px;
    /*background-color: antiquewhite;*/
    background-color: #f0f0f0;
    position: relative;
    /*margin-bottom: 5px;*/
    /*display: inline-block;*/
  }
  .second_screen{
    border: 1px #72b7e4 dashed;
    border-radius: 10px;
    /*margin: 20px -8px 10px 5px;*/
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    padding: 5px 10px;
    background-color: #e1e9ff;
    color: #828282;
    text-align: left;
    position: absolute;
    display: inline-block;
    box-shadow: 2px 1px 3px 1px #10184852;
    }
  .second_chart{
    padding-left: -15px;
    padding-top: 5px;
    height: 200px;
    width: 65%;
    display: inline-block;
  }
  .fade-enter-active, .fade-leave-active {
    /*transition: opacity .3s ease;*/
    transition: opacity 2.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /*transition: opacity 2s;*/
  }
  .fade-enter, .fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
  /*.third{*/
  /*  height: 60px;*/
  /*  background-color: cornflowerblue;*/
  /*  color: #fff;*/
  /*  text-align: center;*/
  /*  line-height: 60px;*/
  /*  !*padding-top: 15px;*!*/
  /*  !*transform: translate(-50%);*!*/
  /*}*/
  .second_screen_content{
    margin-top: 5px;
    margin-bottom: 3px;
    /*padding-bottom: 10px;*/
  }
  .second_screen_title{
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }
  .second_deafult {
    animation: twinkling 2s 1 ease-in-out;
  }
  .animated {
    animation-duration: 2s;
    animation-fill-mode: both;
  }
  @keyframes twinkling {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  /*.second_deafult{   !* 从下往上渐现 *!*/
  /*  animation: animate 5s ease infinite;*/
  /*  overflow: hidden;*/
  /*}*/
  /*@keyframes animate{*/
  /*  from {*/
  /*    height: 0px;*/
  /*    top : 100px;*/
  /*  }*/
  /*  to {*/
  /*    height: 100px;*/
  /*    top : 0px;*/
  /*  }*/
  /*}*/
</style>
