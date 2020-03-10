<template>
  <div class="wrongQues_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <search
        v-show="showWrongSearch"
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="key"
        :placeholder="placeholder"
        @on-submit="onSubmit"
        @on-cancel="cancelSearch"
        ref="search"></search>
      <div class="title" v-show="!showWrongSearch">错题记录</div>
      <i v-show="!showWrongSearch" class="iconfont icon_luluicon-search" @click="searchWrong"></i>
    </div>
    <div class="wrongQues_first">
      <div class="barChart" ref="wrongBarChart"></div>
      <div class="barChartButton">
<!--        <x-button mini class="barChartButtonInfo">练习错题</x-button>-->
<!--        <x-button mini type="primary" class="barChartButtonInfo">考试错题</x-button>-->
      </div>
<!--      <x-button mini type="warn">Delete</x-button>-->
<!--      <flexbox>-->
<!--        <flexbox-item>-->
<!--          <x-button type="primary">primary</x-button>-->
<!--        </flexbox-item>-->
<!--        <flexbox-item>-->
<!--          <x-button>Delete</x-button>-->
<!--        </flexbox-item>-->
<!--      </flexbox>-->
    </div>
    <div class="wrongQues_second">
      <tab class="wrongQues_Second_tab">
        <tab-item selected :badge-label="exerNum" class="wrongQues_tab" @on-item-click="getExerNumber('1')">练习错题</tab-item>
        <tab-item badge-color="#fff" :badge-label="examNum" class="wrongQues_tab" @on-item-click="getExerNumber('2')">考试错题</tab-item>
<!--        <tab-item badge-color="#fff" badge-label="2" class="wrongQues_tab">遗留问题</tab-item>-->
<!--        <tab-item badge-color="#fff" badge-label="2" class="wrongQues_tab">已会的题</tab-item>-->
<!--        <tab-item badge-background="#38C972" badge-color="#fff" badge-label="2">考试错题</tab-item>-->
      </tab>
      <div class="chapter_list_second">
        <div class="line-second-first_title">
          <i class="iconfont icon_lulufengefu"></i><strong>未掌握</strong>
        </div>
        <!--标志是练习还是考试 1是练习，2是考试-->
        <div v-for="(item, index) in allChapterInfoListNoMaster" :key="index" class="chapter_list_second_info" v-if="flag === 1">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllSections(item, '未掌握')">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="getExerInfo(sub.key, item.name, '未掌握')">
                    <!--                <div class="month-item_sty" @click="getExamInfo(item.name + '\\n' + sub)">-->
                    <!--                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">-->
                    <span>{{sub.key}}</span>
                    <span>{{sub.value}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--        <div @click="getAllSections(item)">{{item.name}}</div>-->
          </div>
        </div>
        <div v-for="(item, inde) in allChapterInfoListNoMaster" :key="'second_info1' + inde" class="chapter_list_second_info1" v-if="flag === 2">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getExamDetail(item.name, '未掌握')">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
            </div>
          </div>
        </div>
        <div class="line-second-first_title">
          <i class="iconfont icon_lulufengefu"></i><strong>已掌握</strong>
        </div>
        <div v-for="(item, index) in allChapterInfoListMaster" :key="'second_info' +index" class="chapter_list_second_info" v-if="flag === 1 && item.num !== 0">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllSections(item, '已掌握')">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="getExerInfo(sub.key, item.name, '已掌握')">
                    <!--                <div class="month-item_sty" @click="getExamInfo(item.name + '\\n' + sub)">-->
                    <!--                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">-->
                    <span>{{sub.key}}</span>
                    <span>{{sub.value}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--        <div @click="getAllSections(item)">{{item.name}}</div>-->
          </div>
        </div>
        <div v-for="(item, index) in allChapterInfoListMaster" :key="'second_info' +index" class="chapter_list_second_info2" v-if="flag === 1 && item.num === 0">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllSections(item, '已掌握')">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
            </div>
          </div>
        </div>
        <div v-for="(item, inde) in allChapterInfoListMaster" :key="'info1' + inde" class="chapter_list_second_info1" v-if="flag === 2">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getExamDetail(item.name, '已掌握')">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {Flexbox, FlexboxItem} from 'vux'
import {getExecNum, getSectionExecNum, getErrorNumDetail} from '@/api/index'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      flag: 0, // 标志是练习还是考试 1是练习，2是考试
      results: [],
      key: '',
      placeholder: '搜索',
      showWrongSearch: false,
      allChapterInfoNoMaster: [], // 返回的章节未掌握所有信息
      allChapterInfoListNoMaster: [], // 放入list中的已掌握所有章以及个数
      allChapterInfoMaster: [], // 返回的章节未掌握所有信息
      allChapterInfoListMaster: [], // 放入list中的已掌握所有章以及个数
      allSectionInfo: [], // 返回的所有节信息
      allSectionInfoList: [], // 放入list中的所有节以及个数
      barChart: '', // 未掌握和已掌握饼图
      exerNum: '', // 练习错题个数
      examNum: '', // 考试错题个数
      masteredNum: 0, // 掌握错题个数--echart图上的数
      noMasteredNum: 0, // 未掌握错题个数--echarts图上的数
      errorAllNum: 0 // 错题总数
    }
  },
  computed: {
    paperName () {
      return this.$route.params.paperName
    },
    subject_online () {
      console.log(this.$store.state.lineCourse.select_sub)
      return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    }
  },
  mounted () {
    this.getNumInfo() // 得到界面的已掌握未掌握数字信息
    this.getExerNumber('1')
    // this.drawPie()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    searchWrong () {
      // console.log(this.$refs.search)
      this.$refs.search.onFocus() // 获取搜索框的焦点
      this.showWrongSearch = true
    },
    getExerInfo (section, chapter, ifMaster) { // 获取练习错题
      this.$router.push({
        name: 'sectionErrorDetail',
        params: {
          section: section,
          chapter: chapter,
          ifMastered: ifMaster
        }
      })
    },
    getNumInfo () { // 得到界面的已掌握未掌握数字信息
      getErrorNumDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online
      }).then(res => {
        this.examNum = res.data.data.examErrorNum.toString()
        this.exerNum = res.data.data.practiceErrorNum.toString()
        this.masteredNum = res.data.data.masteredErrorProblemsNum
        this.noMasteredNum = res.data.data.notMasteredErrorProblemsNum
        this.errorAllNum = res.data.data.myErrorProblemsNum
        this.drawPie()
        console.log('所有数字信息：', res.data.data)
      })
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      // this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    cancelSearch () {
      this.showWrongSearch = false
    },
    getExerNumber (val) { // 获取练习的题数
      getExecNum({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        examCategory: val
      }).then(res => {
        if (val === '1') { // 练习
          this.flag = 1
        } else { // 考试
          this.flag = 2
        }
        console.log('werwer', res.data.data.mastered)
        console.log('werwer', Object.keys(res.data.data.mastered).length)
        for (const item in res.data.data.notMastered) {
          console.log(item)
        }
        this.allChapterInfoNoMaster = []
        // this.allChapterInfoMaster = []
        if (Object.keys(res.data.data.notMastered).length === 0) {
          this.allChapterInfoNoMaster.push({'key': '暂无未掌握的题', 'value': 0})
        } else {
          for (const item in Object.keys(res.data.data.notMastered)) {
            const val = {'key': Object.keys(res.data.data.notMastered)[item], 'value': res.data.data.notMastered[Object.keys(res.data.data.notMastered)[item]]}
            this.allChapterInfoNoMaster.push(val)
          }
        }
        this.allChapterInfoListNoMaster = this.allChapterInfoNoMaster.map((item, index) => {
          return {
            show: false,
            index: index,
            name: item.key,
            num: item.value,
            children: []
          }
        })
        this.allChapterInfoMaster = []
        if (Object.keys(res.data.data.mastered).length === 0) {
          this.allChapterInfoMaster.push({'key': '暂无已掌握的题', 'value': 0})
        } else {
          for (const item in Object.keys(res.data.data.mastered)) {
            const val = {
              'key': Object.keys(res.data.data.mastered)[item],
              'value': res.data.data.mastered[Object.keys(res.data.data.mastered)[item]]
            }
            this.allChapterInfoMaster.push(val)
          }
        }
        this.allChapterInfoListMaster = this.allChapterInfoMaster.map((item, index) => {
          return {
            show: false,
            index: index,
            name: item.key,
            num: item.value,
            children: []
          }
        })
        // console.log('99999999999999', this.allChapterInfoListMaster)
        // console.log('99999999999999', this.allChapterInfoListNoMaster)
      })
    },
    getAllSections (chapterName, master) { // 得到所有的节
      if (master === '未掌握') {
        if (!this.allChapterInfoListNoMaster[chapterName.index].show) {
          getSectionExecNum({
            studentNumber: this.schoolNumber,
            openid: this.openid,
            subject: this.subject_online,
            chapterName: chapterName.name,
            ifMastered: master
          }).then(res => {
            console.log(res.data.data)
            this.allSectionInfo = []
            for (const item in Object.keys(res.data.data.sectionNumber)) {
              const val = {'key': Object.keys(res.data.data.sectionNumber)[item], 'value': res.data.data.sectionNumber[Object.keys(res.data.data.sectionNumber)[item]]}
              this.allSectionInfo.push(val)
            }
            this.allChapterInfoListNoMaster[chapterName.index].children = []
            for (const j in this.allSectionInfo) {
              const b = {'key': this.allSectionInfo[j].key, 'value': this.allSectionInfo[j].value}
              this.allChapterInfoListNoMaster[chapterName.index].children.push(b)
            }
            this.allChapterInfoListNoMaster[chapterName.index].show = true
          })
        } else {
          this.allChapterInfoListNoMaster[chapterName.index].show = false
          // console.log(chapterName)
        }
      } else if (master === '已掌握') {
        if (!this.allChapterInfoListMaster[chapterName.index].show) {
          getSectionExecNum({
            studentNumber: this.schoolNumber,
            openid: this.openid,
            subject: this.subject_online,
            chapterName: chapterName.name,
            ifMastered: master
          }).then(res => {
            console.log('掌握', res.data.data)
            this.allSectionInfo = []
            for (const item in Object.keys(res.data.data.sectionNumber)) {
              const val = {'key': Object.keys(res.data.data.sectionNumber)[item], 'value': res.data.data.sectionNumber[Object.keys(res.data.data.sectionNumber)[item]]}
              this.allSectionInfo.push(val)
            }
            this.allChapterInfoListMaster[chapterName.index].children = []
            for (const j in this.allSectionInfo) {
              const b = {'key': this.allSectionInfo[j].key, 'value': this.allSectionInfo[j].value}
              this.allChapterInfoListMaster[chapterName.index].children.push(b)
            }
            this.allChapterInfoListMaster[chapterName.index].show = true
          })
        } else {
          this.allChapterInfoListMaster[chapterName.index].show = false
        }
      }
    },
    getExamDetail (examName, ifMaster) {
      this.$router.push({
        name: 'examErrorDetail',
        params: {
          exname: examName,
          ifMastered: ifMaster
        }
      })
    },
    drawPie () {
      this.barChart = this.echarts.init(this.$refs.wrongBarChart)
      this.barChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}:({d}%)'
        },
        graphic: [{ // 环形图中间添加文字
          type: 'text', // 通过不同top值可以设置上下显示
          left: 'center',
          top: '40%',
          style: {
            text: '错题总量',
            textAlign: 'center',
            fill: '#AE8F00', // 文字的颜色
            width: 20,
            height: 20,
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }, {
          type: 'text',
          left: 'center',
          top: '55%',
          style: {
            text: this.errorAllNum,
            // text: this.countScore,
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
            name: '错题本',
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
            // data: this.dataList
            data:
            [
            {value: this.masteredNum, name: '已掌握'},
            {value: this.noMasteredNum, name: '未掌握'},
            // {value: 234, name: '联盟广告'},
            // {value: 135, name: '视频广告'},
            // {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      })
    },
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>
<style scoped lang="scss">
  .wrongQues_info {
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
    /*line-height: 40px;*/
    flex: none;
    z-index: 1;
  }
  .return__icon{
    /*margin-left: 20px;*/
    /*width: 20px;*/
    /*height: 20px;*/
    /*!*margin-top: 10px;*!*/
    /*!*color: #fff;*!*/
    /*display: inline-block;*/
    position: absolute;
    left: 10px;
    /*top: 6px;*/
    z-index: 9;
    padding: 6px;
    color: #fff;
  }
  .icon_lulufanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  /*.second_screen_a {*/
  /*  margin-top: 20px;*/
  /*  display: inline-block;*/
  /*  width: 50%;*/
  /*  box-shadow: 0 0 4px 5px rgba(66, 185, 130, 0.3);*/
  /*  border-radius: 50%;*/
  /*}*/
  .wrongQues_first {
    background-color: rgb(239, 255, 255);
  }
  .barChart{
    /*background-color: #c4dfb8;*/
    height: 160px;
    width: 100%;
    /*display: inline-block;*/
    /*border-radius: 150px;*/
    /*box-shadow: 0 10px 9px rgba(66, 185, 130, 0.3);*/
  }
  .barChartButton {
    text-align: center;
    margin-bottom: 20px;
    margin-top: -10px;
    /*width: 40%;*/
  }
  .barChartButtonInfo {
    width: 35%;
    margin: 0 15px;
  }
  .wrongQues_Second_tab {
    background-color: #43b783;
  }
  .wrongQues_info >>>.vux-search-box  .weui-search-bar__label {
    border-radius: 20px;
    top: 4px;
  }
  .wrongQues_info >>> .weui-search-bar {
    padding: 10px 20px;
    height: 28px;
  }
  .wrongQues_info >>> .weui-search-bar:before,
  .wrongQues_info >>> .weui-search-bar:after {
    border-top: 0;
    border-bottom: 0;
  }
  .wrongQues_info >>> .weui-search-bar,
  .wrongQues_info >>> .weui-search-bar__form {
    background: transparent;
  }
  .wrongQues_info >>> .weui-search-bar__box .weui-icon-search {
    top: 15px;
    left: 8px;
  }
  .wrongQues_info >>> .weui-search-bar__box .weui-icon-clear {
    top: 50%;
  }
  .wrongQues_info >>> .weui-search-bar__cancel-btn {
    color: #fff;
  }
  .wrongQues_info >>> .vux-search-box {
    padding-left: 30px;
    padding-top: 6px;
    padding-bottom: 10px;
    width: calc(100% - 30px);
    background: transparent;
  }
  .icon_luluicon-search {
    float: right;
    margin-right: 15px;
    line-height: 40px;
    /*margin-top: 6px;*/
  }
  .title {
    display: inline-block;
    margin-top: 6px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  /*.wrongQues_tab {*/
  /*  width: 30%;*/
  /*}*/
  .chapter_list_second {
    background-color: #fff;
    padding-bottom: 20px;
  }
  strong {
    font-size: 15px;
  }
  .line-second-first_title {
    margin: 10px 10px 0;
    padding: 10px 0 0;
    font-size: 16px;
    /*border-bottom: 1px solid #ececec;*/
    .icon_lulufengefu {
      color: #42b982;
      /*font-weight: ;*/
    }
  }
  .chapter_list_second_info {
    text-align: left;
    /*height: 40px;*/
    width: 85%;
    position: relative;
    margin-top: 10px;
    margin-left: 50%;
    padding-left: 15px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border: 2px #ececec solid;
    /*border-radius: 10px;*/
  }
  .chapter_list_second_info2 {
    text-align: left;
    /*height: 40px;*/
    width: 85%;
    position: relative;
    margin-top: 10px;
    margin-left: 50%;
    padding-left: 15px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
  }
  .chapter_list_second_info1 {
    margin: 5px 0 5px 25px;
    /*padding: 5px 0 5px 25px;*/
    padding-bottom: 5px;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
  }
  .record_year_sty {
    width: 100%;
    padding-top: 8px;
    .iconfont {
      float: right;
      margin-right: 10px;
      /*text-align: right;*/
    }
  }
  .record_year_sty_name {
    /*float: left;*/
    /*width: 20%;*/
    display: inline-block;
  }
  .year-sub {
     transition: all .2s;
     padding: 8px 10px 0;
   }
  .month-item-name {
    /*background-color: pink;*/
    min-height: 40px;
    /*position: relative;*/
  }
  .month-item_sty {
    padding-left: 15px;
    padding-top: 10px;
    font-size: 14px;
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border-bottom: 1px solid #ececec;
    /*border-radius: 10px;*/
  }
  .name_item_info {
    padding-bottom: 10px;
  }
</style>
