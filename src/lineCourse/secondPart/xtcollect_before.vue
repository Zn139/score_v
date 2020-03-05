<template>
  <div class="xtCollect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">我的收藏</div>
    </div>
    <div class="xtCollect_first">
      <div class="barChart" ref="wrongBarChart"></div>
<!--      <div class="barChartButton">-->
    </div>
    <div class="wrongQues_second">
      <tab>
        <tab-item selected :badge-label="collectChapterNum" class="wrongQues_tab" @on-item-click="getCollectChapNum('练习题收藏')">练习题收藏</tab-item>
        <tab-item badge-color="#fff" :badge-label="collectExamNum" class="wrongQues_tab" @on-item-click="getCollectExamNum('考试题收藏')">考试题收藏</tab-item>
      </tab>
      <div class="chapter_list_second" v-show="flag === 1">
        <div v-for="(item, index) in collectChapInfoList" :key="index" class="chapter_list_second_info">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllSections(item)">
              <div class="record_year_sty_name">{{item.name}}<span>{{item.num}}</span></div>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="getExerInfo(item.name, sub.key)">
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
          <!--      <div @click="gotoExercise">第1节 细胞膜的结构和功能</div>-->
        </div>
      </div>
      <!-- 1是练习 0是考试-->
      <div class="chapter_list_second" v-show="flag === 0">
        <div v-for="(item, index) in collectChapInfo" :key="index" class="chapter_list_second_info1">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getExamInfo(item.key)">
              <div>{{item.key}}<span>{{item.value}}</span></div>
<!--              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>-->
<!--              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>-->
            </div>
<!--            <div class="year-sub" v-show="item.show">-->
<!--              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">-->
<!--                <div class="month-item-name">-->
<!--                  <div class="month-item_sty" @click="getExamInfo(item.name, sub.key)">-->
<!--                    &lt;!&ndash;                <div class="month-item_sty" @click="getExamInfo(item.name + '\\n' + sub)">&ndash;&gt;-->
<!--                    &lt;!&ndash;                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">&ndash;&gt;-->
<!--                    <span>{{sub.key}}</span>-->
<!--                    <span>{{sub.value}}</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
            <!--        <div @click="getAllSections(item)">{{item.name}}</div>-->
          </div>
          <!--      <div @click="gotoExercise">第1节 细胞膜的结构和功能</div>-->
        </div>
      </div>
    </div>
    <confirm
      v-model="showConfirm"
      :show-cancel-button="false"
      @on-confirm="onConfirm">
      <p style="text-align:center;">{{showTitle}}</p>
    </confirm>
  </div>
</template>
<script>
import {getMyCollectChapExecNum, getMyCollectSectionNum, getMyCollectNum} from '@/api/index'
export default {
  data () {
    return {
      flag: -1, // 判断是考试还是练习 1是练习 0是考试
      showConfirm: false, // 当用户进来时，未携带学号等信息，变没有收藏的信息，提示框出现
      showTitle: '', // 提示框内容
      collectChapInfo: [], // 返回收藏章信息
      collectChapInfoList: [], // 存入List中所有信息
      collectSectionInfo: [], // 返回收藏节信息
      collectProblemNum: '', // 收藏的总题数
      collectExamNum: '', // 收藏的考试题数
      collectChapterNum: '', // 收藏的练习题数
      barChart: '', // 练习和考试饼图
    }
  },
  computed: {
    paperName () {
      return this.$route.params.paperName
    },
    subject_online () {
      // console.log(this.$store.state.lineCourse.select_sub)
      // return this.$store.state.lineCourse.select_sub
      return localStorage.SET_SELECT_SUB
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    }
  },
  mounted () {
    this.getMyCollectNum()
    this.getCollectChapNum('练习题收藏')
    this.drawPie()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    onConfirm () {
      this.$router.push({name: 'lineCourse'})
    },
    getMyCollectNum () { // 进入页面时，获取该页面的收藏题数
      getMyCollectNum({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online
      }).then(res => {
        if (res.data.code === 0) {
          this.collectProblemNum = res.data.data.myCollectProblemsNum.toString() // 收藏的总题数
          this.collectChapterNum = res.data.data.chapterCollectProblemsNum.toString() // 收藏的练习题数
          this.collectExamNum = res.data.data.examCollectProblemsNum.toString() // 收藏的考试题数
          this.drawPie()
        } else {
          this.showConfirm = true
          this.showTitle = res.data.data
          // this.$vux.alert.show({
          //   title: '提示',
          //   content: res.data.data
          // })
          // const _this = this
          // setTimeout(function () {
          //   _this.$router.push({name: 'lineCourse'})
          // }, 1000)
        }
      })
    },
    getCollectChapNum (val) { // 根据给点的值，得到所有的章节或者考试
      this.flag = 1 // 练习
      getMyCollectChapExecNum({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        category: val
      }).then(res => {
        // console.log('sdfsdfsdfds', res.data.data)
        if (res.data.code === 0) {
          console.log(Object.keys(res.data.data))
          this.collectChapInfo = []
          for (const item in Object.keys(res.data.data)) {
            const val = {'key': Object.keys(res.data.data)[item], 'value': res.data.data[Object.keys(res.data.data)[item]]}
            this.collectChapInfo.push(val)
            // console.log(this.allChapterInfo[Object.keys(this.allChapterInfo)[item]])
          }
          this.collectChapInfoList = this.collectChapInfo.map((item, index) => {
            return {
              show: false,
              index: index,
              name: item.key,
              num: item.value,
              children: []
            }
          })
          // console.log(this.collectChapInfoList)
        } else {
          this.showConfirm = true
          this.showTitle = res.data.data
          // this.$vux.alert.show({
          //   title: '提示',
          //   content: res.data.data,
          //   onHide () {
          //     this.$router.push({name: 'lineCourse'})
          //   }
          // })
          // const _this = this
          // setTimeout(function () {
          //   _this.$router.push({name: 'lineCourse'})
          // }, 1000)
        }
      })
    },
    getAllSections (chapter) { // 根据章的值，得到所有的练习节的名称
      if (!this.collectChapInfoList[chapter.index].show) {
        getMyCollectSectionNum({
          studentNumber: this.schoolNumber,
          openid: this.openid,
          subject: this.subject_online,
          chapter: chapter.name
        }).then(res => {
          this.collectSectionInfo = []
          for (const item in Object.keys(res.data.data)) {
            const val = {'key': Object.keys(res.data.data)[item], 'value': res.data.data[Object.keys(res.data.data)[item]]}
            this.collectSectionInfo.push(val)
          }
          this.collectChapInfoList[chapter.index].children = []
          for (const j in this.collectSectionInfo) {
            const b = {'key': this.collectSectionInfo[j].key, 'value': this.collectSectionInfo[j].value}
            this.collectChapInfoList[chapter.index].children.push(b)
          }
          this.collectChapInfoList[chapter.index].show = true
          console.log(res.data.data)
        })
      } else {
        this.collectChapInfoList[chapter.index].show = false
        // console.log(chapterName)
      }
    },
    getExerInfo (chapter, section) { // 根据章节给出的值，跳到另一个页面获取所有的收藏详情
      this.$router.push({
        name: 'sectionCollectDetail',
        params: {
          chapter: chapter,
          section: section
          // sign: 1 // 练习详情
        }
      })
    },
    getCollectExamNum (val) { // 获取考试收藏的列表
      this.flag = 0 // 考试
      getMyCollectChapExecNum({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        category: val
      }).then(res => {
        if (res.data.code === 0) {
          console.log(Object.keys(res.data.data))
          this.collectChapInfo = []
          for (const item in Object.keys(res.data.data)) {
            const val = {
              'key': Object.keys(res.data.data)[item],
              'value': res.data.data[Object.keys(res.data.data)[item]]
            }
            this.collectChapInfo.push(val)
            console.log(this.collectChapInfo)
          }
        }
        console.log(res.data.data)
      })
    },
    getExamInfo (examName) {
      this.$router.push({
        name: 'examCollectDetail',
        params: {
          exname: examName
          // sign: 0 // 考试详情
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
            text: '收藏总量',
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
            text: this.collectProblemNum,
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
            name: '收藏来源',
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
                {value: this.collectChapterNum, name: '练习题'},
                {value: this.collectExamNum, name: '考试题'},
                // {value: 234, name: '联盟广告'},
                // {value: 135, name: '视频广告'},
                // {value: 1548, name: '搜索引擎'}
              ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .xtCollect_info {
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
  .icon_lulufanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .xtCollect_first {
    background-color: rgb(239, 255, 255);
  }
  .barChart{
    height: 160px;
    width: 100%;
  }
  .chapter_list_second {
    background-color: #fff;
    padding-bottom: 20px;
  }
  .chapter_list_second_info {
    text-align: left;
    /*height: 40px;*/
    width: 85%;
    position: relative;
    margin-top: 15px;
    margin-left: 50%;
    padding: 0 15px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border: 2px #ececec solid;
    /*border-radius: 10px;*/
  }
  .chapter_list_second_info1 {
    margin: 15px 0 5px 25px;
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
      /*margin-right: 10px;*/
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
