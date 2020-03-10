<template>
  <div class="score_info">
<!--  <div class="score_info" style="height: 100%;width: 100%;display:flex;flex-direction: column;">-->
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">成绩单</div>
    </div>
    <div class="second_choice">
<!--      <popup-picker :data="choiceList" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name :placeholder="examname"></popup-picker>-->
      <popup-picker :data="choiceList" :title="examname" :columns="3" v-model="choice" ref="picker3" @on-change="showChange()" show-name ></popup-picker>

<!--      <popup-picker :title="examname" :data="choiceList" :columns="3" v-model="choice" ref="picker3"></popup-picker>-->
    </div>
    <div class="third">
<!--      <load-more tip="content-bordered=false" :show-loading="false" background-color="#fbf9fe"></load-more>-->
      <x-table class="third_table">
        <thead>
        <tr class="third_table_thead">
          <th>学科</th>
          <th>分数</th>
          <th>平均分</th>
          <th>班级排名</th>
          <th>学校排名</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>全部学科</td>
          <td>{{totalInfo.totalScore}}</td>
          <td>{{totalInfo.totalAverage}}</td>
          <td>{{totalInfo.totalScoreClassRank}}</td>
          <td>{{totalInfo.totalScoreGradeRank}}</td>
        </tr>
        <tr v-for="(item, value, index) in three" :key="index">
          <td>{{item.title}}</td>
          <td>{{item.score}}</td>
          <td>{{item.subjectAvg}}</td>
          <td>{{item.classRank}}</td>
          <td>{{item.gradeRank}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <div class="four">
      <h3>分享</h3>
      <div id="meQrcode" :title="qrUrl">
        <div class="qrcode_box">
          <img
            class="qrcode_canvas"
            id="qrcode_canvas"
            ref="qrcode_canvas"
            alt="二维码本图"
          />
          <img
            v-if="qrLogo"
            class="qrcode_logo"
            ref="qrcode_logo"
            :src="qrLogo"
            alt="logo"
          />
          <canvas
            :width="qrSize"
            :height="qrSize"
            class="canvas"
            ref="canvas"
          ></canvas>
        </div>
      </div>
<!--      <div id="qrCode">-->
<!--&lt;!&ndash;        <div id='code'></div>&ndash;&gt;-->
<!--        <canvas id="canvas"></canvas>-->
<!--      </div>-->
<!--      <EWeiM :exname="scoreName"></EWeiM>-->
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, PopupPicker, XTable, LoadMore } from 'vux'
import { getScoreReport, getAllExam } from '@/api/index'
// import QRCode from '@/components/QRCode'
import QRCode from 'qrcode'
// import EWeiM from '../components/EWeiM'
import logo from '@/assets/img/18.jpg'

export default {
  components: {Tab, TabItem, PopupPicker, XTable, LoadMore, QRCode},
  props: {
    exname: 'exname',
    // bQrUrl: {
    //   type: String,
    //   default: 'http://www.baidu.com/'
    // },
    qrSize: {
      type: Number,
      default: 150
    },
    // qrText: {
    //   default: '分享一下~~~'
    // },
    qrLogo: {
      type: String,
      default: logo
    },
    qrLogoSize: {
      type: Number,
      default: 35
    },
    qrTextSize: {
      type: Number,
      default: 13
    }
  },
  data () {
    return {
      choiceList: [],
      choice: [],
      three: [],
      totalInfo: [],
      scoreName: '',
      qrUrl: 'http://zhongkeruitong.top/score_analysis/index.html#/share?examname='
    }
  },
  computed: {
    examname () {
      if (this.$store.state.exam.exam_name !== '') {
        return this.$store.state.exam.exam_name
      } else if (localStorage.SET_EXAM_NAME !== '') {
        return localStorage.SET_EXAM_NAME
      } else {
        return this.$route.params.exam_name
      }
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    }
  },
  mounted () {
    this.getAllScore()
    this.getAllExam()
  },
  updated () {
    this.handleQrcodeToDataUrl()
  },
  methods: {
    handleQrcodeToDataUrl () {
      let qrcode_canvas = this.$refs.qrcode_canvas
      let qrcode_logo = this.$refs.qrcode_logo
      let canvas = this.$refs.canvas
      const that = this
      QRCode.toDataURL(
        that.qrUrl + that.scoreName,
        { errorCorrectionLevel: 'H' },
        (err, url) => {
          qrcode_canvas.src = url
          let ctx = canvas.getContext('2d')

          setTimeout(() => {
            ctx.drawImage(qrcode_canvas, 0, 0, that.qrSize, that.qrSize)
            if (that.qrLogo) {
              // 设置logo大小
              // 设置获取的logo将其变为圆角以及添加白色背景
              ctx.fillStyle = '#fff'
              // ctx.fillStyle = 'red'
              ctx.beginPath()
              let logoPosition = (that.qrSize - that.qrLogoSize) / 2 // logo相对于canvas居中定位
              let h = that.qrLogoSize + 6 // 圆角高 10为基数(logo四周白色背景为10/2)
              let w = that.qrLogoSize + 6 // 圆角宽
              let x = logoPosition - 3
              let y = logoPosition - 3
              let r = 5 // 圆角半径
              ctx.moveTo(x + r, y)
              ctx.arcTo(x + w, y, x + w, y + h, r)
              ctx.arcTo(x + w, y + h, x, y + h, r)
              ctx.arcTo(x, y + h, x, y, r)
              ctx.arcTo(x, y, x + w, y, r)
              ctx.closePath()
              ctx.fill()
              ctx.drawImage(
                qrcode_logo,
                logoPosition,
                logoPosition,
                that.qrLogoSize,
                that.qrLogoSize
              )
            }
            if (that.qrText) {
              // 设置字体
              let fpadd = 13 // 规定内间距
              ctx.font = 'bold ' + that.qrTextSize + 'px Arial'
              let tw = ctx.measureText(that.qrText).width // 文字真实宽度
              let ftop = that.qrSize - that.qrTextSize // 根据字体大小计算文字top
              let fleft = (that.qrSize - tw) / 2 // 根据字体大小计算文字left
              let tp = that.qrTextSize / 2 // 字体边距为字体大小的一半可以自己设置
              ctx.fillStyle = '#fff'
              ctx.fillRect(
                fleft - tp / 2,
                ftop - tp / 2,
                tw + tp,
                that.qrTextSize + tp
              )
              ctx.textBaseline = 'top' // 设置绘制文本时的文本基线。
              ctx.fillStyle = '#333'
              ctx.fillText(that.qrText, fleft, ftop)
            }
            canvas.style.display = 'none'
            qrcode_canvas.src = canvas.toDataURL()
            qrcode_canvas.style.display = 'inline-block'
          }, 0)
        }
      )
    },
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
    getAllScore () {
      console.log('choice:', this.choice)
      this.scoreName = this.examname
      this.$store.commit('SET_SCORE_NAME', this.examname)
      localStorage.setItem('SET_SCORE_NAME', this.examname)
      console.log('choice1:', this.scoreName)
      getScoreReport({
        stuNumber: this.schoolNumber,
        // stuNumber: '08047737',
        examType: this.examname
        // examType: '19年3月考试'
      }).then(res => {
        this.three = res.data.data[0].map
        this.totalInfo = res.data.data[0]
      })
      this.useqrcode()
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
      getScoreReport({
        stuNumber: this.schoolNumber,
        // stuNumber: '08047737',
        examType: this.scoreName
        // examType: '19年3月考试'
      }).then(res => {
        this.three = res.data.data[0].map
        this.totalInfo = res.data.data[0]
      })
      // this.useqrcode()
      this.handleQrcodeToDataUrl()
      this.$store.commit('SET_SCORE_NAME', this.scoreName)
      localStorage.setItem('SET_SCORE_NAME', this.scoreName)
    },
    useqrcode () {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas,
        'http://zhongkeruitong.top/score_analysis/index.html#/share?examname=' + this.scoreName, {colorDark: '#999', colorLight: 'red'}
        // {url: 'http://zhongkeruitong.top/score_analysis/index.html#/share?examname=' + this.scoreName,
        // colorDark: '#666', // 二维码颜色
        // colorLight: '#000'} // 二维码背景色
        , function (error) {
          if (error) console.error(error)
          console.log('QRCode success!')
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .score_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    /*height: calc(100% - 50px);*/
    /*flex: 1;*/
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

  .third_second {
    /*text-align: center;*/
    /*margin-left: 25%;*/
    margin-top: 10px;
    /*transform: translate(-50%);*/
    display: inline-block;
  }
  /*.third_second_p{*/
  /*  color: #8e8e8e;*/
  /*  !*margin-left: 45%;*!*/
  /*  !*transform: translate(-50%);*!*/
  /*  margin-bottom: 15px;*/
  /*  margin-right: 20px;*/
  /*  margin-left: 17px;*/
  /*  display: inline-block;*/
  /*}*/
  .third {
    margin: 35px 4px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
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
  .third_project {
    padding: 1px 5px 1px 0;
    margin-right: 5px;
  }
  .itald {
    margin: 0 5px;
  }
  .four{
    background-color: #fff;
    margin: 0 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border: 5px rgba(66,185,130,0.4) dashed;
    /*border: 5px rgba(66,185,130,0.4) dotted;*/
    border-radius: 10px;
  }
  h3 {
    margin-left: 15px;
  }
  #qrCode {
    text-align: center;
    #canvas {
      /*overflow: hidden!important;*/
      /*background-color: #c9c9c9!important;*/
      width: 150px!important;
      height: 150px!important;
    }
  }
  .qrcode_box,
  #meQrcode {
    /*width: 150px;*/
    /*height: 150px;*/
    /*display: inline-block;*/
    text-align: center;
  }
  .qrcode_box img {
    display: none;
  }
</style>
