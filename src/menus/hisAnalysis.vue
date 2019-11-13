<template>
  <div class="history_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">历史分析</div>
    </div>
    <div>
      <tab v-model="index01" :line-width="1" bar-active-color="#668599">
        <tab-item selected @on-item-click="onItemClick">总分</tab-item>
        <tab-item @on-item-click="onItemClick" v-for="(item, index) in sub_name_list" :key="index">{{item.value}}</tab-item>
<!--          <tab-item @on-item-click="clickLanguage">语文</tab-item>-->
<!--        <tab-item @on-item-click="onItemClick" v-for="(item, index) in compreList" :key="index">{{item}}</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">英语</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">物理</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">化学</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">生物</tab-item>-->
      </tab>
    </div>
    <div class="second_choice">
      <popup-picker :data="choiceList" :title="examname" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name ></popup-picker>
    </div>
    <div class="history_third">
      <div ref="history_chart" class="history_chart"></div>
      <div class="history_four_tip">
<!--        <h4>说明：</h4>-->
        <li>X轴表示各次考试名称；</li>
        <li>Y轴表示考试的排名所占百分比；</li>
        <li>排名是折线图越低越好，分数折线图是越高越好。</li>
      </div>
    </div>
    <div class="his_third_table">
      <h4 class="subAna_four_title">{{subName}}分数详情</h4>
      <x-table class="third_table">
        <thead>
        <tr class="third_table_thead">
          <th>考试</th>
          <th>分数</th>
          <th>平均分</th>
          <th>班排</th>
          <th>校排</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in hisCountcontent" :key="index">
          <td>{{item.title}}</td>
          <td>{{item.total}}</td>
          <td>{{item.classAverage}}</td>
          <td>{{item.classRank}}</td>
          <td>{{item.gradeRank}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
<!--    <div class="history_four_tip">-->
<!--      <h4>说明：</h4>-->
<!--      <p>X轴表示各次考试名称；</p>-->
<!--      <p>Y轴表示考试的排名所占百分比；</p>-->
<!--      <p>排名是折线图越低越好，分数折线图是越高越好。</p>-->
<!--    </div>-->
  </div>
</template>
<script>
import {XTable} from 'vux'
import {getAllExam, hisCountAnal, hisSingleAnal, getThree} from '../api/index'

export default {
  components: {XTable},
  data () {
    return {
      index01: 0,
      lineChart: '',
      choiceList: [],
      choice: [],
      subName: '总分', // 成绩单的标题
      classPaiList: [], // 班排
      schoolPaiList: [], // 年排
      countList: [], // 总分百分率
      classAveList: [], // 班级平均分
      schoolAveList: [], // 学校平均分
      titleList: [], // x轴坐标
      hisCountcontent: [], // 总分分析信息
      hisSingleContent: [], // 单科分析信息
      compreList: [], // 自选三科
      scoreName: '',
      minLine: [],
      minShu: '',
      scoreList: [],
      sub_name_list: [{'key': 'yuwen_score', 'value': '语文'},
        {'key': 'shuxue_score', 'value': '数学'},
        {'key': 'yingyu_score', 'value': '英语'}]
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
    this.getAllExam()
    this.getHisCountAna()
    this.getComprehensive()
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
          const yearList = allExam.split('年')
          const monthList = yearList[1].split('月')
          if (monthList.length === 3) {
            monthList[1] = '月考'
          }
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
    onItemClick (item) {
      console.log(this.index01)
      if (item === 0) {
        this.subName = '总分'
        this.getHisCountAna()
      } else {
        this.getSingleAna()
        this.subName = this.sub_name_list[item - 1].value
        // this.getSingleAna(this.sub_name_list[item - 1].key)
      }
      console.log(item)
    },
    getSingleAna () {
      this.classPaiList = []
      this.schoolPaiList = []
      this.countList = []
      this.classAveList = []
      this.schoolAveList = []
      this.titleList = []
      this.minLine = []
      hisSingleAnal({
        stuNumber: '08047737',
        examType: this.examname,
        openid: '123456',
        subject: this.sub_name_list[this.index01 - 1].key
      }).then(res => {
        // this.hisSingleContent = res.data.data[0]['map']
        this.hisCountcontent = res.data.data[0]['mapTotal']
        // for (const item in this.hisSingleContent) {
        //   this.countList.push(parseInt(this.hisSingleContent[item]['singleScorePercentage'] * 100) / 100)
        //   this.classPaiList.push(parseInt(this.hisSingleContent[item]['classPercentage'] * 100) / 100)
        //   this.schoolPaiList.push(parseInt(this.hisSingleContent[item]['gradePercentage'] * 100) / 100)
        //   this.classAveList.push(parseInt(this.hisSingleContent[item]['classAveragePercentage'] * 100) / 100)
        //   this.schoolAveList.push(parseInt(this.hisSingleContent[item]['gradeAveragePercentage'] * 100) / 100)
        //   this.titleList.push(this.hisSingleContent[item]['title'])
        // }
        for (const item in this.hisCountcontent) {
          this.countList.push(parseInt(this.hisCountcontent[item]['singleScorePercentage'] * 100) / 100)
          this.classPaiList.push(parseInt(this.hisCountcontent[item]['classPercentage'] * 100) / 100)
          this.schoolPaiList.push(parseInt(this.hisCountcontent[item]['gradePercentage'] * 100) / 100)
          this.classAveList.push(parseInt(this.hisCountcontent[item]['classAveragePercentage'] * 100) / 100)
          this.schoolAveList.push(parseInt(this.hisCountcontent[item]['gradeAveragePercentage'] * 100) / 100)
          this.titleList.push(this.hisCountcontent[item]['title'])
          this.minLine.push(this.countList)
          this.minLine.push(this.classPaiList)
          this.minLine.push(this.schoolPaiList)
          this.minLine.push(this.classAveList)
          this.minLine.push(this.schoolAveList)
        }
        const a = this.minLine.join(',').split(',')
        // console.log('最小：', Math.min.apply(null, a))
        this.minShu = parseInt((Math.min.apply(null, a) - 0.05) * 100) / 100
        // console.log('kedu:', this.minShu)
        this.drawLine()
        // console.log('单科：', this.hisCountcontent)
      })
    },
    getHisCountAna () {
      this.classPaiList = []
      this.schoolPaiList = []
      this.countList = []
      this.classAveList = []
      this.schoolAveList = []
      this.titleList = []
      this.minLine = []
      hisCountAnal({
        stuNumber: '08047737',
        examType: this.examname,
        openid: '123456'
      }).then(res => {
        this.hisCountcontent = res.data.data[0]['mapTotal']
        for (const item in this.hisCountcontent) {
          // console.log(this.hisCountcontent[item])
          this.classPaiList.push(parseInt(this.hisCountcontent[item]['classPercentage'] * 100) / 100)
          this.schoolPaiList.push(parseInt(this.hisCountcontent[item]['gradePercentage'] * 100) / 100)
          this.countList.push(parseInt(this.hisCountcontent[item]['totalScorePercentage'] * 100) / 100)
          this.classAveList.push(parseInt(this.hisCountcontent[item]['classAveragePercentage'] * 100) / 100)
          this.schoolAveList.push(parseInt(this.hisCountcontent[item]['gradeAveragePercentage'] * 100) / 100)
          this.titleList.push(this.hisCountcontent[item]['title'])
          this.minLine.push(this.countList)
          this.minLine.push(this.classPaiList)
          this.minLine.push(this.schoolPaiList)
          this.minLine.push(this.classAveList)
          this.minLine.push(this.schoolAveList)
        }
        const a = this.minLine.join(',').split(',')
        // console.log('最小：', Math.min.apply(null, a))
        this.minShu = parseInt((Math.min.apply(null, a) - 0.1) * 100) / 100
        // console.log('半片：', this.classPaiList)
        // console.log('hisCountcontent:', this.hisCountcontent)
        this.drawLine()
      })
    },
    showChange () {
      // console.log(this.choice)
      this.classPaiList = []
      this.schoolPaiList = []
      this.countList = []
      this.classAveList = []
      this.schoolAveList = []
      this.titleList = []
      this.minLine = []
      this.scoreName = ''
      for (const item in this.choice) {
        this.scoreName += this.choice[item]
      }
      this.$store.commit('SET_EXAM_NAME', this.scoreName) // 每科是否根据选项来改变
      // console.log('scoreName: ', this.scoreName)
      if (this.index01 === 0) {
        hisCountAnal({
          stuNumber: '08047737',
          examType: this.scoreName,
          openid: '123456'
        }).then(res => {
          this.hisCountcontent = res.data.data[0]['mapTotal']
          for (const item in this.hisCountcontent) {
            console.log(this.hisCountcontent[item])
            this.classPaiList.push(parseInt(this.hisCountcontent[item]['classPercentage'] * 100) / 100)
            this.schoolPaiList.push(parseInt(this.hisCountcontent[item]['gradePercentage'] * 100) / 100)
            this.countList.push(parseInt(this.hisCountcontent[item]['totalScorePercentage'] * 100) / 100)
            this.classAveList.push(parseInt(this.hisCountcontent[item]['classAveragePercentage'] * 100) / 100)
            this.schoolAveList.push(parseInt(this.hisCountcontent[item]['gradeAveragePercentage'] * 100) / 100)
            this.titleList.push(this.hisCountcontent[item]['title'])
            this.minLine.push(this.countList)
            this.minLine.push(this.classPaiList)
            this.minLine.push(this.schoolPaiList)
            this.minLine.push(this.classAveList)
            this.minLine.push(this.schoolAveList)
          }
          const a = this.minLine.join(',').split(',')
          // console.log('最小：', Math.min.apply(null, a))
          this.minShu = parseInt((Math.min.apply(null, a) - 0.1) * 100) / 100
          this.drawLine()
        })
      } else {
        hisSingleAnal({
          stuNumber: '08047737',
          examType: this.scoreName,
          openid: '123456',
          subject: this.sub_name_list[this.index01 - 1].key
        }).then(res => {
          // this.hisSingleContent = res.data.data[0]['map']
          this.hisCountcontent = res.data.data[0]['mapTotal']
          // for (const item in this.hisSingleContent) {
          //   this.countList.push(parseInt(this.hisSingleContent[item]['singleScorePercentage'] * 100) / 100)
          //   this.classPaiList.push(parseInt(this.hisSingleContent[item]['classPercentage'] * 100) / 100)
          //   this.schoolPaiList.push(parseInt(this.hisSingleContent[item]['gradePercentage'] * 100) / 100)
          //   this.classAveList.push(parseInt(this.hisSingleContent[item]['classAveragePercentage'] * 100) / 100)
          //   this.schoolAveList.push(parseInt(this.hisSingleContent[item]['gradeAveragePercentage'] * 100) / 100)
          //   this.titleList.push(this.hisSingleContent[item]['title'])
          // }
          for (const item in this.hisCountcontent) {
            this.countList.push(parseInt(this.hisCountcontent[item]['singleScorePercentage'] * 100) / 100)
            this.classPaiList.push(parseInt(this.hisCountcontent[item]['classPercentage'] * 100) / 100)
            this.schoolPaiList.push(parseInt(this.hisCountcontent[item]['gradePercentage'] * 100) / 100)
            this.classAveList.push(parseInt(this.hisCountcontent[item]['classAveragePercentage'] * 100) / 100)
            this.schoolAveList.push(parseInt(this.hisCountcontent[item]['gradeAveragePercentage'] * 100) / 100)
            this.titleList.push(this.hisCountcontent[item]['title'])
            this.minLine.push(this.countList)
            this.minLine.push(this.classPaiList)
            this.minLine.push(this.schoolPaiList)
            this.minLine.push(this.classAveList)
            this.minLine.push(this.schoolAveList)
          }
          const a = this.minLine.join(',').split(',')
          // console.log('最小：', Math.min.apply(null, a))
          this.minShu = parseInt((Math.min.apply(null, a) - 0.1) * 100) / 100 // 获取最小刻度
          this.drawLine()
          // console.log('单科：', this.hisCountcontent)
        })
      }
    },
    getComprehensive () {
      getThree({
        stuNumber: '08047737',
        examType: this.examname
      }).then(res => {
        const compreList = res.data.data[0].list
        for (const sub in compreList) {
          if (compreList[sub] === '物理') {
            this.sub_name_list.push({'key': 'wuli_coversion', 'value': compreList[sub]})
          } else if (compreList[sub] === '化学') {
            this.sub_name_list.push({'key': 'huaxue_coversion', 'value': compreList[sub]})
          } else if (compreList[sub] === '生物') {
            this.sub_name_list.push({'key': 'shengwu_coversion', 'value': compreList[sub]})
          } else if (compreList[sub] === '历史') {
            this.sub_name_list.push({'key': 'lishi_coversion', 'value': compreList[sub]})
          } else if (compreList[sub] === '地理') {
            this.sub_name_list.push({'key': 'dili_coversion', 'value': compreList[sub]})
          } else if (compreList[sub] === '政治') {
            this.sub_name_list.push({'key': 'zhengzhi_coversion', 'value': compreList[sub]})
          }
        }
        // console.log('全部：', this.sub_name_list)
      })
    },
    drawLine () {
      this.lineChart = this.echarts.init(this.$refs.history_chart)
      this.lineChart.setOption({
        title: {
          text: '历史分析',
          itemGap: 15
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // x: 'right',
          y: '5%', // 图里的位置
          icon: 'diamond', // 形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          itemGap: 20, // 设置间距
          padding: [35, 0, 0, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['班排', '年排', '总分', '班平均分', '年平均分']
        },
        grid: {
          top: '38%',
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          // axisLabel: { // x轴数据倾斜30度
          //   rotate: 30
          // },
          boundaryGap: false,
          data: this.titleList
          // data: ['2019年3月', '2019年4月']
        },
        yAxis: {
          type: 'value',
          min: this.minShu
        },
        series: [
          {
            name: '班排',
            type: 'line',
            // stack: '总量',
            // data:[20,19,17]
            data: this.classPaiList
          },
          {
            name: '年排',
            type: 'line',
            // stack: '总量',
            // data: [220, 182, 240]
            data: this.schoolPaiList
          },
          {
            name: '总分',
            type: 'line',
            // stack: '总量',
            // data: [410, 395, 350]
            data: this.countList
          },
          {
            name: '年平均分',
            type: 'line',
            // stack: '总量',
            // data: [410, 395, 350]
            data: this.schoolAveList
          },
          {
            name: '班平均分',
            type: 'line',
            // stack: '总量',
            data: this.classAveList
            // data: [430, 400, 345]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
  .history_info {
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
  .second_choice {
    /*height: 55px;*/
    background-color: #fff;
    /*line-height: 55px;*/
    border-bottom: 1px solid #c8c8cd;
  }
  .second_choice >>>  .vux-cell-box .weui-cell_access {
    color: #999;
    /*color: #3c3c3c;*/
  }
  .second_choice >>> .vux-popup-picker-select .vux-cell-value{
    display: none;
  }
  .history_third {
    margin: 25px 10px 15px;
    padding: 5px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 10px;
    background-color: #fff;
  }
  .history_chart {
    height: 200px;
    padding: 10px 0;
  }
  .his_third_table {
    margin: 10px 1px 40px;
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
  table.vux-table.third_table {
    line-height: 33px;
  }
  .history_four_tip {
    /*border: 4px dashed rgba(66,185,130,0.4);*/
    border-radius: 10px;
    /*box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);*/
    padding: 0 5px 10px;
    margin: 3px 15px 15px;
  }
  li {
    /*text-indent: 2em;*/
    font-size: 12px;
    line-height: 26px;
  }
</style>
