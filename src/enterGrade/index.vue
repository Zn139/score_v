<template>
  <div class="enter_index_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">录入成绩</div>
      <div @click="gotoRecord()" class="add_record">
<!--        <i class="iconfont icon_lulushizhong"></i>-->
        <i class="iconfont icon_luludian"></i>
      </div>
    </div>
    <div class="enter_grade_second" ref="enter_grade_second">
      <div>
        <h4 class="enter_grade_title_info">中学2019级07班</h4>
        <div class="addScore_form">
          <div class="smallKuang"></div><strong>考试信息</strong>
<!--          <calendar class="enter_grade_time" v-model="examTime" placeholder="请在此输入考试名称，如：期中" placeholder-align="left"></calendar>-->
          <datetime
            v-model="examTime"
            placeholder="请选择考试时间"
            class="enter_grade_time"
            v-if="showTime"
          ></datetime>
<!--          <p class="enter_grade_title">考试名称</p>-->
          <x-input name="username" placeholder="请在此输入考试名称，如：期中" placeholder-align="left" v-model="examName" class="enter_grade_input"></x-input>
        </div>
        <div class="enter_grade_scoreForm">
          <div class="smallKuang"></div><strong>成绩信息</strong>
<!--          <p class="enter_grade_title">成绩信息</p>-->
          <x-table class="enter_grade_table">
            <thead>
            <tr>
              <th>科目</th>
              <th>分数</th>
              <th>班排</th>
              <th>年排</th>
              <th>试卷图片</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in submitListW" @click="gotoEdit(index, item)" :key = index>
              <td>{{item.subject_name}}</td>
              <td>{{item.score}}</td>
              <td>{{item.class_rank}}</td>
              <td>{{item.grade_rank}}</td>
              <td v-if="item.imgs.length === 0"><i class="iconfont icon_luluxiangji"></i></td>
              <td v-if="item.imgs.length > 0"><i class="iconfont icon_luluxiangji" style="color: #42b983"></i></td>
            </tr>
            <tr v-if="submitListW.length === 0">
              <td colspan="6" @click="addNew('first')">
                <div class="tabbar-add-btn1">
                  <i class="iconfont icon_luluzanwushuju21"></i>
                  <div class="tabbar-add-btn_info">还未添加信息呦！</div>
                </div>
                <div class="gotoAdd">去添加成绩<i class="iconfont icon_lulushuangyoujiantou-"></i></div>
              </td>
            </tr>
            <tr v-if="submitListW.length > 0">
              <td colspan="6" @click="addNew('more')">
<!--                <div class="tabbar-add-btn">-->
<!--                  <i class="iconfont icon_luluzanwushuju21"></i>-->
<!--                  <div class="tabbar-add-btn_info">还未添加信息呦！</div>-->
<!--                </div>-->
                <div class="jixuAdd">继续添加<i class="iconfont icon_lulushuangyoujiantou-"></i></div>
              </td>
            </tr>
<!--            <tr style="background-color:#fff;">-->
<!--              <td colspan="6" @click="addNew" style="height: 90px">-->
<!--                <div class="tabbar-add-btn">-->
<!--                  <i class="iconfont icon_lulutianjia"></i>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
            </tbody>
          </x-table>
        </div>
<!--        <div v-if="submitListW.length === 0" class="gotoAdd">-->
<!--          <div>去添加成绩<i class="iconfont icon_lulushuangyoujiantou-"></i></div>-->
<!--        </div>-->
        <x-button class="enter_submit" v-if="submitListW.length === 0" disabled>立即提交</x-button> <!--提交成绩单-->
        <x-button class="enter_submit" @click.native="submitTranscript" v-if="submitListW.length > 0">立即提交</x-button> <!--提交成绩单-->
<!--        <x-button class="enter_submit" @click.native="submitCamera" >测试相机</x-button> &lt;!&ndash;测试相机&ndash;&gt;-->
        <toast v-model="showToast" :time="1000">录入成功</toast>
      </div>
    </div>
  </div>
</template>
<script>
import { XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group } from 'vux'
import {enterGradeList} from '@/api/index'
import BScroll from 'better-scroll'
export default {
  components: {XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group},
  data () {
    return {
      showTime: true, // 考试时间的显示
      scoreScroll: null,
      showToast: false,
      examName: '',
      examTime: '',
      subkemu: '',
      content: [],
      submitList: [],
      submitListW: [],
      rightTimeList: [],
      rightT: ''
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  mounted () { // 或者created也可以
    this.init()
    if (this.$route.params.type === 0 || this.$route.params.type === 1) { // 首页添加成绩--保存--继续添加
      console.log('首页添加成绩--保存--继续添加')
      if (this.$store.state.exam.singleScoreList !== '') {
        this.submitListW = this.$store.state.exam.singleScoreListW
        this.submitList = this.$store.state.exam.singleScoreList
        this.$store.commit('enter_Score_List', this.$store.state.exam.singleScoreList) // 添加之前的已经添加过的成绩
        this.$store.commit('enter_Score_ListW', this.$store.state.exam.singleScoreListW) // 添加之前的已经添加过的成绩
      }
      // console.log('时间存在吗：', this.examTime)
      // console.log('格式：', this.submitListW)
      // console.log('格式2：', this.submitList)
      console.log('考试名称到底是啥0：', this.submitListW[0].exam_name)
      console.log(this.submitListW[0].exam_name.split('月'))
      if (this.submitListW[0].exam_name.indexOf('月') > -1) {
        if (this.examTime === '') {
          if (this.submitListW[0].exam_name.split('月').length > 2) {
            this.examName = this.submitListW[0].exam_name.split('月')[1] + '月' + this.submitListW[0].exam_name.split('月')[2]
          } else if (this.submitListW[0].exam_name.split('月').length === 2) {
            this.examName = this.submitListW[0].exam_name.split('月')[1]
          }
          this.examTime = this.submitListW[0].exam_name.split('月')[0] + '月'
          this.showTime = false
          this.$nextTick(() => {
            this.showTime = true
          })
        }
      } else {
        this.examName = this.submitListW[0].exam_name.split(',')[1]
        this.examTime = this.submitListW[0].exam_name.split(',')[0]
        this.showTime = false
        this.$nextTick(() => {
          this.showTime = true
        })
      }
    } else if (this.$route.params.type === 2) { // 首页--录入统计--继续添加
      console.log('首页--录入统计--继续添加')
      if (this.$store.state.exam.detail_to_add !== '') {
        this.submitListW = this.$store.state.exam.detail_to_addW
        this.submitList = this.$store.state.exam.detail_to_add
        this.$store.commit('enter_Score_List', this.submitList) // 添加之前的已经添加过的成绩
        this.$store.commit('enter_Score_ListW', this.submitListW) // 添加之前的已经添加过的成绩
        // this.$store.commit('single_Score_List', this.submitList)
        // this.$store.commit('single_Score_ListW', this.submitListW)
        console.log('考试名称', this.submitListW[0].exam_name)
        if (this.examTime === '') {
          if (this.submitListW[0].exam_name.split('月').length > 2) {
            this.examName = this.submitListW[0].exam_name.split('月')[1] + '月' + this.submitListW[0].exam_name.split('月')[2]
          } else if (this.submitListW[0].exam_name.split('月').length === 2) {
            this.examName = this.submitListW[0].exam_name.split('月')[1]
          }
          this.examTime = this.submitListW[0].exam_name.split('月')[0] + '月'
          this.showTime = false
          this.$nextTick(() => {
            this.showTime = true
          })
        }
        // this.examTime = this.submitListW[0].exam_name.split('月')[0] + '月'
        // this.showTime = false
        // this.$nextTick(() => {
        //   this.showTime = true
        // })
        // this.examName = this.submitListW[0].exam_name.split('月')[1]
        // console.log(this.submitListW)
        // console.log(this.submitList)
      }
    }
    // else if (this.$route.params.type === 1) { // 正在录入编辑
    //   if (this.$store.state.exam.singleScoreList !== '') {
    //     this.submitListW = this.$store.state.exam.singleScoreListW
    //     this.submitList = this.$store.state.exam.singleScoreList
    //     this.$store.commit('enter_Score_List', this.$store.state.exam.singleScoreList) // 添加之前的已经添加过的成绩
    //     this.$store.commit('enter_Score_ListW', this.$store.state.exam.singleScoreListW) // 添加之前的已经添加过的成绩
    //   }
    //   // console.log('时间存在吗：', this.examTime)
    //   // console.log('格式：', this.submitListW)
    //   // console.log('格式2：', this.submitList)
    //   if (this.examTime === '') {
    //     this.examTime = this.submitListW[0].exam_name.split('月')[0] + '月'
    //     this.showTime = false
    //     this.$nextTick(() => {
    //       this.showTime = true
    //     })
    //     this.examName = this.submitListW[0].exam_name.split('月')[1]
    //   }
    // }
    // console.log('111111111', this.$store.state.exam.detail_to_add)
    // if (this.$store.state.exam.detail_to_add !== '') {
    //   this.submitListW = this.$store.state.exam.detail_to_add
    //   console.log(this.submitListW)
    //   console.log('详情到添加。')
    // }
    // console.log('时间还有吗：', this.$store.state.exam.examination)
    // if (this.$store.state.exam.examination.length > 0) { // 录入成绩首页考试名称
    //   this.examTime = this.$store.state.exam.examination.split(',')[0]
    //   this.showTime = false
    //   this.$nextTick(() => {
    //     this.showTime = true
    //   })
    //   this.examName = this.$store.state.exam.examination.split(',')[1]
    // }
    // console.log('222222222', this.$store.state.exam.singleScoreListW)
    // if (this.$store.state.exam.singleScoreList !== '') {
    //   this.submitListW = this.$store.state.exam.singleScoreListW
    //   this.submitList = this.$store.state.exam.singleScoreList
    //   this.$store.commit('enter_Score_List', this.$store.state.exam.singleScoreList) // 添加之前的已经添加过的成绩
    //   this.$store.commit('enter_Score_ListW', this.$store.state.exam.singleScoreListW) // 添加之前的已经添加过的成绩
    // }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.scoreScroll = new BScroll(this.$refs.enter_grade_second, {
          click: true
        })
      })
    },
    submitCamera () {
      this.$router.push('/test')
    },
    returnBack () {
      // this.$router.go(-1)
      this.submitList = []
      this.submitListW = []
      this.$router.push('/home')
    },
    gotoEdit (index, item) {
      console.log('要编辑了：', this.$store.state.exam.subjects_list)
      if (this.$route.params.type === 2) {
        this.$vux.alert.show({
          title: '提示',
          content: '请到成绩详情页进行编辑哦！'
        })
      } else {
        this.$router.push({
          name: 'addSingleSubScore',
          params: {
            type: 1, // 指定是现在编辑类型
            id: index, // 当前数据的索引
            remainSub: this.$store.state.exam.subjects_list, // 加上当前学科
            currentSub: item.subject_name,
            allContent: this.submitListW
          }
        })
      }
      // const a = this.$store.state.exam.subjects_list
      // console.log(val.subject_name)
      // const b = a.push(val.subject_name)
      // console.log('要编辑了：', b)
    },
    gotoRecord () {
      this.$router.push({path: '/record'})
    },
    addNew (val) {
      console.log(this.submitList)
      console.log(this.submitListW)
      // this.submitListW = []
      // this.submitList = []
      if (this.examTime.length === 0 || this.examName.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请先填写考试时间和名称哦！'
        })
      } else {
        // const kName = this.examTime.split('-')[0] + '年' + this.examTime.split('-')[1] + '月' + this.examName
        // this.$store.commit('SET_examination', kName)
        console.log('还剩啥：', this.$store.state.exam.subjects_list)
        this.$store.commit('SET_examination', this.examTime + ',' + this.examName)
        // localStorage.setItem('SET_examination', this.examTime + ' ,' + this.examName)
        this.$router.push({
          name: 'addSingleSubScore',
          params: {
            type: 0, // 指定是当前添加数据
            remainSub: this.$store.state.exam.subjects_list, // 剩余的科目，未加当前学科
            times: val // 判断是继续添加还是首次添加
          }
        })
      }
    },
    submitTranscript () { // 提交时，将考试时间和考试名称放入每个单科列中
      console.log(this.examTime)
      if (this.examTime.indexOf('月') === -1) {
        const rightTimeList = this.examTime.split('-')
        const rightT = rightTimeList[0] + '年' + rightTimeList[1] + '月'
        console.log(this.examName, rightT)
        for (const item in this.submitList) {
          this.submitList[item].exam_name = rightT + this.examName
        }
      }
      console.log('提交了：', this.submitList)
      enterGradeList(this.submitList).then(res => {
        if (res.data.code === 0) {
          this.showToast = true
          this.examName = ''
          this.examTime = ''
          this.submitListW = []
          this.$store.state.exam.subjects_list = []
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.data.data
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .enter_index_info {
    height: 100%;
    /*width: 100%;*/
    /*display: flex;*/
    /*flex-direction: column;*/
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
    /*flex: none;*/
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
  .enter_grade_second {
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 76px);
  }
  .add_record {
    right: 10px;
    position: absolute;
    top: -5px;
    padding: 8px 6px;
    color: #fff;
    font-size:15px;
  }
  .iconfont {
    font-size: 18px;
  }
  .addScore_form >>> .vux-datetime .weui-cell__ft {
    text-align: left;
    font-size: 14px;
  }

  /*.vux-datetime.weui-cell.enter_grade_time.weui-cell_access {*/
  /*  color: #8c8c8c;*/
  /*  font-size: 15px;*/
  /*}*/
  .enter_grade_time {
    margin-top: 10px;
    border-bottom: 1px solid #e5e5e5;
    /*color: #8c8c8c;*/
    /*background-color: #fff;*/
  }
  .enter_grade_title_info {
    text-align: center;
    /*padding: 10px 25px 0;*/
    margin-top: 5px;
  }
  .smallKuang {
    margin-left: 15px;
    margin-top: 10px;
    height: 15px;
    width: 3px;
    background-color: #42b983;
    /*float: left;*/
    display: inline-block;
  }
  strong {
    display: inline-block;
    margin-left: 7px;
    /*margin-top: -3px;
    float: left;*/
  }
  .enter_grade_title {
    padding: 10px 15px 0;
    margin-top: 5px;
  }
  .enter_grade_input {
    border-bottom: 1px solid #e5e5e5;
  }
  .addScore_form >>> .weui-cell:before{
    border-top: 0;
  }
  .addScore_form >>> .vux-x-input .weui-input {
    font-size: 14px;
    color: #999;
  }
  .enter_grade_table {
    margin-top: 15px;
  }
  .addScore_form {
    margin-top: 5px;
    padding: 0 10px 10px;
    background-color: #fff;
  }
  .enter_grade_scoreForm {
    background-color: #fff;
    margin-top: 13px;
    padding: 10px 10px;
  }
  .enter_grade_split {
    margin-top: 15px;
    height: 15px;
    /*position: absolute;*/
    width: 100%;
    background-color: #dcdcdc;
  }
  .vux-selector.weui-cell_select-after {
    padding-left: 25px;
  }
  .enter_grade_dialog >>> .vux-selector .weui-label {
    text-align: left;
    width: unset;
  }
  .enter_grade_dialog >>> .vux-selector .weui-select {
    padding-left: 10px;
    padding-top: 2px;
    /*padding-left: 70%;*/
  }
  .enter_grade_dialog {
    margin-bottom: 20px;
  }
  .report-btns {
    width: 100%;
    left: 5%;
  }
  .report-btns_text {
    width: 45%;
    display: inline-block;
    margin-bottom: 15px;
  }
  /*.icon_luluadd {*/
  /*  font-size: 22px;*/
  /*  border: #333333 1px solid;*/
  /*}*/
  .tabbar-add-btn1 {
    margin-left: 50%;
    transform: translateX(-50%);
    /*width: 50px;*/
    /*height: 50px;*/
    /*background: #42b982;*/
    /*border-radius: 100px;*/
    margin-top: 45px;
    /*margin: -5px auto 0;*/
    /*box-shadow: 0 0 4px 4px rgba(66, 185, 130, 0.3);*/
    .iconfont {
      font-size: 50px;
      color: #42b982;
      /*border-color: #42b982;*/
      /*line-height: 50px;*/
      text-align: center;
    }
    .tabbar-add-btn_info {
      font-size: 10px;
      margin-top: -20px;
    }
  }
  .gotoAdd {
    margin-top: 30px;
    font-size: 16px;
    color: #42b982;
    font-weight: bold;
    .iconfont {
      margin-left: 5px;
      font-size: 15px;
    }
  }
  .jixuAdd {
    margin-top: 10px;
    font-size: 15px;
    color: #42b982;
    font-weight: bold;
    .iconfont {
      margin-left: 5px;
      font-size: 15px;
    }
  }
  /*.icon_lulutianjia {*/
  /*  font-size: 25px;*/
  /*  color: #c7c7c7;*/
  /*  !*color: #42b982;*!*/
  /*  !*border: 1px dashed #42b982;*!*/
  /*  border-radius: 100px;*/
  /*  box-shadow: 0 0 4px 4px rgba(66, 185, 130, 0.3);*/
  /*}*/
  .vux-table td:before, .vux-table th:before {
    border-bottom: 0;
  }
  .vux-table th:after {
    border-right: 0;
    border-bottom: 1px solid #e0e0e0;
  }
  /*tbody tr:nth-child(2n + 1) {*/
    /*background-color: rgb(229,253,239);*/
    /*background-color: rgba(66,185,130,0.2);*/
  /*}*/
  tbody tr td {
    /*border: 1px solid rgba(66,185,130,0.2);*/
    font-size: 13px;
  }
  thead tr th {
    /*border: 1px solid rgba(66,185,130,0.2);*/
    font-weight: bold;
    font-size: 14px;
  }
  table.vux-table.vux-table-bordered {
    line-height: 35px;
  }
  .vux-table td:after{
    border-right: 0;
  }
  .enter_action {
    font-size: 13px;
    color: #72b7e4;
  }
  .enter_submit {
    width: 95%;
    color: #fff;
    font-size: 16px;
    /*margin-left: 70%;*/
    margin-top: 45px;
    background-color: #42b982;
    /*opacity: 0.8;*/
    /*background-color: rgba(66, 185, 130, 0.3);*/
  }
  .weui-btn:after {
    border: 1px solid rgba(47, 204, 11, 0.8);
  }
</style>
