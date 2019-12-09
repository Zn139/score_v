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
        <h4 class="enter_grade_title_info">中关村中学2019级07班</h4>
        <div class="addScore_form">
<!--          <p>学校：</p>-->
<!--          <p>班级：</p>-->
          <!--      <group title="set is-type=china-name">-->
          <datetime
            v-model="examTime"
            title="考试时间"
            class="enter_grade_time"
          ></datetime>
          <!--      <h4 class="enter_grade_title">考试名称</h4>-->
          <p class="enter_grade_title">考试名称</p>
          <!--      <x-input title="考试名称" name="username" placeholder="请输入考试名称" text-align="right" placeholder-align="right" v-model="examname"></x-input>-->
          <x-input name="username"  text-align="left" placeholder="请在此输入考试名称，如：期中" placeholder-align="left" v-model="examname" class="enter_grade_input"></x-input>
          <!--      </group>-->
        </div>
        <div class="enter_grade_scoreForm">
          <p class="enter_grade_title">成绩信息</p>
          <x-table style="background-color:#fff;" full-bordered class="enter_grade_table">
            <thead>
            <tr>
              <th>科目</th>
              <th>分数</th>
              <th>班排</th>
              <th>年排</th>
              <th>试卷图片</th>
<!--              <th colspan="2">操作</th>-->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in submitList" :key = index @click="gotoEdit(item)">
              <td>{{item.subject_name}}</td>
              <td>{{item.score}}</td>
              <td>{{item.class_rank}}</td>
              <td>{{item.grade_rank}}</td>
              <td v-if="item.imgs.length === 0"><i class="iconfont icon_luluxiangji"></i></td>
              <td v-if="item.imgs.length > 0"><i class="iconfont icon_luluxiangji" style="color: #42b983"></i></td>
<!--              <td><span class="enter_action" @click="delData(item)">删除</span></td>-->
<!--              <td><span class="enter_action" @click="editData(item)">编辑</span></td>-->
            </tr>
            <tr style="background-color:#fff;">
              <td colspan="6" @click="addNew" style="height: 90px">
                <div class="tabbar-add-btn">
                  <i class="iconfont icon_lulutianjia"></i>
                </div>
              </td>
              <!--          <td colspan="6" @click="addNew"><i class="iconfont icon_lulutianjia"></i></td>-->
            </tr>
            </tbody>
          </x-table>
        </div>
        <x-button class="enter_submit" v-if="submitList.length === 0" disabled>提交</x-button> <!--提交成绩单-->
        <x-button class="enter_submit" @click.native="submitTranscript" v-if="submitList.length > 0">提交</x-button> <!--提交成绩单-->
<!--        <x-button class="enter_submit" @click.native="submitCamera" >测试相机</x-button> &lt;!&ndash;测试相机&ndash;&gt;-->
<!--        <x-dialog :show.sync="addscore" :hide-on-blur="true" class="enter_grade_dialog">-->
<!--          <group title="科目信息">-->
<!--            <selector placeholder="请选择科目" v-model="subkemu" title="科目" name="district" :options="list1" @on-change="onChange"></selector>-->
<!--          </group>-->
<!--          <x-input title="分数" required v-model="score" @on-blur="losePoint(score)"></x-input>-->
<!--          <x-input title="班排" required v-model="classPai" @on-blur="losePoint(classPai)"></x-input>-->
<!--          <x-input title="年排" required v-model="schoolPai" @on-blur="losePoint(schoolPai)"></x-input>-->
<!--          <div class="report-btns">-->
<!--            <x-button text="提交" @click.native="sendSubmit" class="report-btns_text"></x-button>-->
<!--            <x-button text="取消" @click.native="addscore = false" class="report-btns_text"></x-button>-->
<!--          </div>-->
<!--        </x-dialog>-->
<!--        <x-dialog v-model="showEdit" :hide-on-blur="true" class="enter_grade_dialog">-->
<!--          <x-input title="科目" v-model="edit.subject" disabled></x-input>-->
<!--          <x-input title="分数" v-model="edit.score"></x-input>-->
<!--          <x-input title="班排" v-model="edit.banpai"></x-input>-->
<!--          <x-input title="年排" v-model="edit.nianpai"></x-input>-->
<!--          <div class="report-btns">-->
<!--            <x-button text="提交" @click.native="sendEdit(edit.subject, edit.score, edit.banpai, edit.nianpai)" class="report-btns_text"></x-button>-->
<!--            <x-button text="取消" @click.native="showEdit = false" class="report-btns_text"></x-button>-->
<!--          </div>-->
<!--        </x-dialog> &lt;!&ndash;点击编辑按钮弹出&ndash;&gt;-->
        <toast v-model="showToast" :time="1000">录入成功</toast>
<!--        <confirm v-model="showDel"-->
<!--                 title="删除提示"-->
<!--                 @on-cancel="onCancel"-->
<!--                 @on-confirm="onConfirm">-->
<!--          <p style="text-align:center;">确定删除吗？</p>-->
<!--        </confirm>-->
      </div>
    </div>
  </div>
</template>
<script>
import { XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group } from 'vux'
import {enterGradeList} from '@/api/index'
import BScroll from 'better-scroll'
export default {
  // directives: {TransferDom},
  components: {XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group},
  data () {
    return {
      scoreScroll: null,
      showEdit: false,
      showToast: false,
      showDel: false,
      delItem: '', // 删除项
      editItem: [],
      examname: this.$store.state.exam.singleScoreList[0].exam_name || '',
      examTime: this.$store.state.exam.singleScoreList[0].examTime || '',
      addscore: false,
      addscore1: false,
      list: [{key: '语文', value: '语文'}, {key: '数学', value: '数学'}, {key: '英语', value: '英语'}, {key: '物理', value: '物理'},
        {key: '化学', value: '化学'}, {key: '生物', value: '生物'}, {key: '历史', value: '历史'}, {key: '地理', value: '地理'}, {key: '政治', value: '政治'}],
      list1: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      subkemu: '',
      score: '',
      classPai: '',
      schoolPai: '',
      edit: {
        subject: '',
        score: '',
        banpai: '',
        nianpai: ''
      },
      content: [],
      submitList: this.$store.state.exam.singleScoreList,
      // submitList: [],
      // submitList1: this.$store.state.exam.singleScoreList,
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
    console.log('传过来了么：', this.$store.state.exam.singleScoreList)
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.scoreScroll = new BScroll(this.$refs.enter_grade_second, {
          click: true
        })
      })
    },
    returnBack () {
      this.$router.go(-1)
    },
    gotoEdit (val) {
      this.$router.push({
        path: '/addSingleSubScore',
        params: {
          editContent: val
        }
      })
    },
    submitCamera () {
      this.$router.push('/camera')
    },
    onCancel () { // 点击取消触发
      this.showDel = false
    },
    losePoint (val) {
      if (val === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '这是必填项！'
        })
      }
    },
    // onConfirm () {
    //   this.submitList.splice(this.submitList.indexOf(this.delItem), 1)
    //   console.log('剩余的科目：', this.list1)
    //   this.list1.push(this.delItem.subject)
    //   console.log('剩余的科目2：', this.list1)
    // },
    delData (item) { // 删除操作
      this.showDel = true
      this.delItem = item
      // console.log(item)
      // console.log('indexof:', this.submitList.indexOf(item))
      // this.submitList.splice(this.submitList.indexOf(item), 1)
    },
    // editData (item) { // 编辑操作
    //   this.edit.subject = item.subject
    //   this.edit.score = item.score
    //   this.edit.banpai = item.class_rank
    //   this.edit.nianpai = item.grade_rank
    //   console.log(this.edit)
    //   // setTimeout(function () {
    //   this.showEdit = true
    //   // }, 200)
    //   // console.log('编辑', item)
    // },
    // sendEdit (kemu, score, classPai, schoolPai) { // 确认编辑
    //   this.showEdit = false
    //   console.log('编辑：', kemu, score, classPai, schoolPai)
    //   // console.log('编辑：', this.editItem.subject, this.editItem.score, this.editItem.class_rank, this.editItem.grade_rank)
    //   const a = {'wechat_openid': this.openid, 'student_number': '111', 'subject_name': kemu, 'score': score, 'class_rank': classPai, 'grade_rank': schoolPai, 'exam_name': this.rightT + this.examname}
    //   console.log(a)
    //   for (const item in this.submitList) {
    //     if (this.submitList[item].subject === kemu) {
    //       console.log('shiji', item)
    //       this.submitList.splice(item, 1, a)
    //     }
    //   }
    //   console.log(this.submitList)
    // },
    gotoRecord () {
      this.$router.push({path: '/record'})
    },
    addNew () {
      this.$router.push({path: '/addSingleSubScore'})
    },
    onChange (item) {
      console.log('当前值：', item)
      console.log(this.subkemu)
    },
    // sendSubmit () {
    //   if (this.score === '' || this.classPai === '' || this.schoolPai === '') {
    //     this.$vux.alert.show({
    //       title: '提示',
    //       content: '分数或班排或年排必填！'
    //     })
    //   } else {
    //     this.rightTimeList = this.examTime.split('-')
    //     this.rightT = this.rightTimeList[0] + '年' + this.rightTimeList[1] + '月'
    //     // this.submitList = []
    //     this.addscore = false
    //     console.log(this.examname, this.rightT, this.subkemu, this.score, this.classPai, this.schoolPai)
    //     const grade = {'wechat_openid': this.openid, 'student_number': '111', 'subject_name': this.subkemu, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.rightT + this.examname}
    //     this.submitList.push(grade)
    //     // this.submitList.push(grade)
    //     // this.submitList1.push(JSON.stringify(grade))
    //     // enterGrade({
    //     //   wechat_openid: '111',
    //     //   student_number: '111',
    //     //   subject: this.subkemu,
    //     //   score: this.score,
    //     //   class_rank: this.classPai,
    //     //   grade_rank: this.schoolPai,
    //     //   exam_name: this.examTime + this.examname
    //     // }).then(res => {
    //     //   this.content.push(res.data.data)
    //     console.log('indexof:', this.list1.indexOf(this.subkemu))
    //     this.list1.splice(this.list1.indexOf(this.subkemu), 1)
    //     // for (const a in this.list) {
    //     //   if (a === this.subkemu) {
    //     //
    //     //   }
    //     //   console.log('a', a)
    //     // }
    //     // this.list.pop(this.subkemu)
    //     // console.log(this.list1)
    //     // console.log(this.content)
    //     // })
    //   }
    // },
    submitTranscript () {
      console.log('提交了：', this.submitList)
      enterGradeList(this.submitList).then(res => {
        if (res.data.code === 0) {
          this.showToast = true
        }
        // const a = res.data.data
        // console.log('aaaaaaaaa', a)
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
  .enter_grade_time {
    border-bottom:  1px solid #e5e5e5;
    /*background-color: #fff;*/
  }
  .enter_grade_title_info {
    padding: 10px 25px 0;
    margin-top: 5px;
  }
  .enter_grade_title {
    padding: 10px 15px 0;
    margin-top: 5px;
  }
  .enter_grade_input {
    border-bottom: 1px solid #42b983;
  }
  .addScore_form >>> .weui-cell:before{
    border-top: 0;
  }
  .addScore_form >>> .vux-x-input .weui-input {
    font-size: 13px;
  }
  .enter_grade_table {
    margin-top: 15px;
  }
  .addScore_form {
    margin-top: 5%;
    padding: 0 10px 15px;
    background-color: #fff;
  }
  .enter_grade_scoreForm {
    background-color: #fff;
    margin-top: 13px;
    padding: 0 10px;
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
  .tabbar-add-btn {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: #42b982;
    border-radius: 100px;
    margin-top: 5px;
    /*margin: -5px auto 0;*/
    box-shadow: 0 0 4px 4px rgba(66, 185, 130, 0.3);
    .iconfont {
      font-size: 28px;
      color: #fff;
      line-height: 50px;
      text-align: center;
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
  table.vux-table.vux-table-bordered {
    line-height: 35px;
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
</style>
