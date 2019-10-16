<template>
  <div>
    <div class="second">
        <!--<div v-if="docState === 'current'">-->
<!--        <div class="score-overview">-->
<!--          <p class="second_screen_title">-->
<!--            <i class="iconfont iconriqi"></i>{{exam}}-->
<!--          </p>-->
<!--          <p class="second_screen_title">-->
<!--            <i class="iconfont iconjixiaodefenchaxun"></i>{{total}}-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
      <div class="second_title">{{project || '总分'}}</div>
      <div class="second_info">
<!--        <div class="second_content">-->
          <div class="second_screen" style="text-align: left">
            <!--        <div class="second_screen" :class="{'second_screen&#45;&#45;single': !list.showLink && !list.showZongHe && !list.showThree && !list.showPro}">-->
            <transition name="fade" mode="out-in">
              <div v-if="list.showLink" v-for="(item, index) in clickCTList" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">&lt;!&ndash;<i class="iconfont iconfangkuai"></i>&ndash;&gt;总分</p>-->
                <p class="second_screen_title"><!--<i class="iconfont iconfangkuai"></i>-->排名</p>
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{total}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.examCoversionTotal.classIndex}}</span></p>
                <p class="second_screen_content"><span class="content-label">校排：</span><span class="content-value">{{item.examCoversionTotal.schoolIndex}}</span></p>
                <!--              <p class="second_screen_content"><span class="content-label">班进:</span><span class="content-value">{{item.waveClass}}</span></p>-->
                <!--              <p class="second_screen_content"><span class="content-label">年进:</span><span class="content-value">{{item.waveGrade}}</span></p>-->
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showZongHe" v-for="(item, index) in zonghe" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>综合</p>-->
                <p class="second_screen_title">排名</p>
                <!--              <p class="second_screen_title">综合</p>-->
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{item.comprehensive}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.complexClassRank}}</span></p>
                <p class="second_screen_content"><span class="content-label">年排：</span><span class="content-value">{{item.complexGradeRank}}</span></p>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showThree" v-for="(item, index) in threeProject" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">三科</p>-->
                <p class="second_screen_title">排名</p>
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>三科</p>-->
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{item.threeSubject}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.classRank}}</span></p>
                <p class="second_screen_content"><span class="content-label">年排：</span><span class="content-value">{{item.gradeRank}}</span></p>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showPro" v-if="subList.length > 0" v-for="(item, index) in subList" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">{{project}}</p>-->
                <p class="second_screen_title">排名</p>
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>{{project}}</p>-->
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{item.score}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.classRank}}</span></p>
                <p class="second_screen_content"><span class="content-label">年排：</span><span class="content-value">{{item.gradeRank}}</span></p>
                <!--              <p class="second_screen_content"><span class="content-label">班进:</span><span class="content-value">{{item.waveClass}}</span></p>-->
                <!--              <p class="second_screen_content"><span class="content-label">年进:</span><span class="content-value">{{item.waveGrade}}</span></p>-->
              </div>
            </transition>
          </div>
          <div ref="sunChart" class="second_chart"></div>
          <div class="second_screen" style="text-align: right">
            <!--        <div class="second_screen" :class="{'second_screen&#45;&#45;single': !list.showLink && !list.showZongHe && !list.showThree && !list.showPro}">-->
            <transition name="fade" mode="out-in">
              <div v-if="list.showLink" v-for="(item, index) in clickCTList" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">&lt;!&ndash;<i class="iconfont iconfangkuai"></i>&ndash;&gt;总分</p>-->
                <p class="second_screen_title">名次变化</p>
                <!--              <p class="second_screen_content"><span class="content-label">班排:</span><span class="content-value">{{item.examCoversionTotal.classIndex}}</span></p>-->
                <!--              <p class="second_screen_content"><span class="content-label">校排:</span><span class="content-value">{{item.examCoversionTotal.schoolIndex}}</span></p>-->
                <p class="second_screen_content"><span class="content-label">班进：</span><span class="content-value">{{item.waveClass}}</span></p>
                <p class="second_screen_content"><span class="content-label">年进：</span><span class="content-value">{{item.waveGrade}}</span></p>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showZongHe" v-for="(item, index) in zonghe" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>综合</p>-->
                <!--              <p class="second_screen_title">综合</p>-->
                <p class="second_screen_title">名次变化</p>
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{item.comprehensive}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.complexClassRank}}</span></p>
                <p class="second_screen_content"><span class="content-label">年排：</span><span class="content-value">{{item.complexGradeRank}}</span></p>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showThree" v-for="(item, index) in threeProject" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">三科</p>-->
                <p class="second_screen_title">名次变化</p>
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>三科</p>-->
                <p class="second_screen_content"><span class="content-label">分数：</span><span class="content-value">{{item.threeSubject}}</span></p>
                <p class="second_screen_content"><span class="content-label">班排：</span><span class="content-value">{{item.classRank}}</span></p>
                <p class="second_screen_content"><span class="content-label">年排：</span><span class="content-value">{{item.gradeRank}}</span></p>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-show="list.showPro" v-if="subList.length > 0" v-for="(item, index) in subList" :key="index" class="second_screen_info">
                <!--              <p class="second_screen_title">{{project}}</p>-->
                <p class="second_screen_title">名次变化</p>
                <!--              <p class="second_screen_title"><i class="iconfont iconfangkuai"></i>{{project}}</p>-->
                <!--              <p class="second_screen_content"><span class="content-label">分数:</span><span class="content-value">{{item.score}}</span></p>-->
                <!--              <p class="second_screen_content"><span class="content-label">班排:</span><span class="content-value">{{item.classRank}}</span></p>-->
                <!--              <p class="second_screen_content"><span class="content-label">年排:</span><span class="content-value">{{item.gradeRank}}</span></p>-->
                <p class="second_screen_content"><span class="content-label">班进：</span><span class="content-value">{{item.waveClass}}</span></p>
                <p class="second_screen_content"><span class="content-label">年进：</span><span class="content-value">{{item.waveGrade}}</span></p>
              </div>
            </transition>
          </div>
<!--        </div>-->
      </div>
          </div>
  </div>
</template>
<script>
import { getScoreAnalysis, getThree, getSingle, getAllRate } from '@/api/index'
import _ from 'underscore'
// import { PopupPicker } from 'vux'
export default {
  // components: { PopupPicker },
  data () {
    return {
      docState: 'current',
      list: {
        // showDefault: true,
        showLink: true,
        showZongHe: false,
        showThree: false,
        showPro: false
      },
      title: '',
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
    this.getClickData()
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
          that.project = '总分'
          that.getClickData()
        } else if (param.name === '综合') {
          that.project = '综合'
          that.getClickThreeZ()
        } else if (param.name === '三科') {
          that.project = '三科'
          that.getClickThreeS()
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
        // this.docState = 'allScore'
        for (const a in this.list) {
          this.list[a] = false
          this.list.showLink = true
        }
        // that.showLink = true
        // this.$store.commit('SET_ShowLink', this.showLink)
        this.$store.commit('SET_ShowLink', true)
        console.log('store:', this.$store.state.sunchart.link)
      })
    }),
    getClickThreeZ: _.debounce(function () {
      getThree({
        stuNumber: '08047737',
        examType: '19年3月考试'
      }).then(res => {
        this.zonghe = res.data.data
        // this.docState = 'zong_he'
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
        // this.docState = 'san_ke'
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
        // this.docState = 'single_ke'
        for (const a in this.list) {
          this.list[a] = false
          this.list.showPro = true
        }
      })
    })
  }
}
</script>
<style scoped lang="scss">
  .second{
    padding: 10px 20px 10px;
    height: 200px;
    position: relative;
    /*font-size: 0;*/
    background: #fff;
    text-align: center;
  }
  .second_info{
    height: 200px;
    /*display: inline-block;*/
    font-size: 0;
    /*margin-top: -18px;*/
  }
  .second_screen{
    /*border: 1px rgba(66, 185, 130, 0.5) dashed;*/
    /*border-radius: 10px;*/
    margin-top: 30%;
    transform: translateY(-50%);
    /*position: absolute;*/
    padding: 5px 0;
    width: 25%;
    height: 170px;
    font-size: 13px;
    /*color: #828282;*/
    color: #787878;
    text-align: left;
    display: inline-block;
    vertical-align: top;
    /*&.second_screen--single {*/
    /*  display: none;*/
    /*}*/
  }
  .second_title {
    position: absolute;
    text-align: left;
    margin-top: 10px;
    color: #454545;
    font-weight: bold;
  }
  .second_chart{
    /*text-align: center;*/
    height: 200px;
    /*padding: 0 auto;*/
    width: 50%;
    display: inline-block;
  }
  .fade-enter-active{
    transition: opacity 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter{
    /*animation-fill-mode: none;*/
    opacity: 0;
  }
  /*.fade-leave-active {*/
  /*  opacity: 0;*/
  /*}*/
  /*.fade-leave-to{*/
  /*  animation: .3s linear infinite;*/
  /*}*/
  .second_screen_content{
    /*padding-left: 10px;*/
    margin-top: 6px;
    /*padding-bottom: 10px;*/
  }
  .content-label {
    /*background: rgba(66, 185, 130, 0.6);*/
    /*border-radius: 4px;*/
    /*margin-right: 10px;*/
    /*padding: 3px 6px;*/
    /*color: #fff;*/
  }
  .second_screen_info{
    margin-top: -4px;
    /*margin-left: 10px;*/
    /*padding: 5px 0;*/
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    .iconfont {
      color: #42b982;
    }
  }
  .score-overview {
    font-size: 0;
    box-shadow: 0px 1px 5px 0px rgba(66, 185, 130, 0.3);
    padding: 6px 0;
    margin-bottom: 10px;
  }
  .second_screen_title{
    /*margin-bottom: 5px;*/
    font-size: 15px;
    font-weight: bold;
    color: #454545;
    /*color: #676767;*/
    /*& > .iconfont {*/
    /*  margin-right: 10px;*/
    /*  font-weight: normal;*/
    /*}*/
    .score-overview & {
      display: inline-block;
      width: 33%;
      margin-bottom: 0;
      text-align: center;
    }
  }
  .second_screen_xiala {
    margin-top: -2px;
  }
  /*.second_deafult {*/
  /*  animation: twinkling 2s 1 ease-in-out;*/
  /*}*/
  /*.animated {*/
  /*  animation-duration: 2s;*/
  /*  animation-fill-mode: both;*/
  /*}*/
  /*@keyframes twinkling {*/
  /*  0% {*/
  /*    opacity: 0;*/
  /*  }*/
  /*  100% {*/
  /*    opacity: 1;*/
  /*  }*/
  /*}*/
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
