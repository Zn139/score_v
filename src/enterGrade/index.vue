<template>
  <div style="height: 100%">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">录入成绩</div>
      <div @click="gotoRecord()" class="add_record">
        <i class="iconfont icon_lulushizhong"></i>
        <i class="iconfont icon_luludian"></i>
      </div>
    </div>
    <div class="addScore_form">
<!--      <group title="set is-type=china-name">-->
      <datetime
        v-model="examTime"
        title="考试时间"
      ></datetime>
      <x-input title="考试名称" name="username" placeholder="请输入考试名称" text-align="right" placeholder-align="right" v-model="examname"></x-input>
<!--      </group>-->
      <load-more tip="成绩信息" :show-loading="false" background-color="#fbf9fe"></load-more>
<!--      <div class="addnew" v-if="addscore1">-->
<!--        <group title="with placeholder">-->
<!--          <selector placeholder="请选择科目" v-model="demo01" title="科目" name="district" :options="list" @on-change="onChange"></selector>-->

<!--          <x-input title="分数"></x-input>-->
<!--          <x-input title="班排"></x-input>-->
<!--          <x-input title="年排"></x-input>-->
<!--        </group>-->
<!--        &lt;!&ndash;              <div @click="show=false">&ndash;&gt;-->
<!--        &lt;!&ndash;                <span class="vux-close"></span>&ndash;&gt;-->
<!--        &lt;!&ndash;              </div>&ndash;&gt;-->
<!--        <div class="report-btns">-->
<!--          <x-button type="default" text="提交" @click.native="sendRep"></x-button>-->
<!--          <x-button type="default" text="取消" @click.native="addscore = false"></x-button>-->
<!--        </div>-->
<!--      </div>-->
      <x-table style="background-color:#fff;" full-bordered>
        <thead>
        <tr>
          <th>科目</th>
          <th>分数</th>
          <th>班排</th>
          <th>年排</th>
          <th colspan="2">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in submitList" :key = index>
          <td>{{item.subject}}</td>
          <td>{{item.score}}</td>
          <td>{{item.class_rank}}</td>
          <td>{{item.grade_rank}}</td>
          <td><span class="enter_action" @click="delData(item)">删除</span></td>
          <td><span class="enter_action" @click="editData(item)">编辑</span></td>
        </tr>
        <tr style="background-color:#fff;">
          <td colspan="6" @click="addNew"><i class="iconfont icon_lulutianjia"></i></td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <x-button class="enter_submit" @click.native="submitTranscript">提交</x-button> <!--提交成绩单-->
    <x-dialog :show.sync="addscore" :hide-on-blur="true" class="enter_grade_dialog">
      <group title="科目信息">
        <selector placeholder="请选择科目" v-model="subkemu" title="科目" name="district" :options="list1" @on-change="onChange"></selector>
      </group>
      <x-input title="分数" required v-model="score"></x-input>
      <x-input title="班排" v-model="classPai"></x-input>
      <x-input title="年排" v-model="schoolPai"></x-input>
      <div class="report-btns">
        <x-button text="提交" @click.native="sendSubmit" class="report-btns_text"></x-button>
        <x-button text="取消" @click.native="addscore = false" class="report-btns_text"></x-button>
      </div>
    </x-dialog>
    <x-dialog v-model="showEdit" :hide-on-blur="true" class="enter_grade_dialog">
      <x-input title="科目" v-model="edit.subject" disabled></x-input>
      <x-input title="分数" v-model="edit.score"></x-input>
      <x-input title="班排" v-model="edit.banpai"></x-input>
      <x-input title="年排" v-model="edit.nianpai"></x-input>
      <div class="report-btns">
        <x-button text="提交" @click.native="sendEdit(edit.subject, edit.score, edit.banpai, edit.nianpai)" class="report-btns_text"></x-button>
        <x-button text="取消" @click.native="showEdit = false" class="report-btns_text"></x-button>
      </div>
    </x-dialog> <!--点击编辑按钮弹出-->
    <toast v-model="showToast" :time="1000">录入成功</toast>
    <confirm v-model="showDel"
             title="删除提示"
             @on-cancel="onCancel"
             @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除吗？</p>
    </confirm>
  </div>
</template>
<script>
import { XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group } from 'vux'
import {enterGradeList} from '@/api/index'
export default {
  // directives: {TransferDom},
  components: {XInput, Datetime, XTable, LoadMore, XDialog, Confirm, XButton, Selector, Group},
  data () {
    return {
      showEdit: false,
      showToast: false,
      showDel: false,
      delItem: '', // 删除项
      editItem: [],
      examname: '',
      examTime: '',
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
      submitList: [],
      submitList1: []
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    onCancel () { // 点击取消触发
      this.showDel = false
    },
    onConfirm () {
      this.submitList.splice(this.submitList.indexOf(this.delItem), 1)
      console.log('剩余的科目：', this.list1)
      this.list1.push(this.delItem.subject)
      console.log('剩余的科目2：', this.list1)
    },
    delData (item) { // 删除操作
      this.showDel = true
      this.delItem = item
      // console.log(item)
      // console.log('indexof:', this.submitList.indexOf(item))
      // this.submitList.splice(this.submitList.indexOf(item), 1)
    },
    editData (item) { // 编辑操作
      this.edit.subject = item.subject
      this.edit.score = item.score
      this.edit.banpai = item.class_rank
      this.edit.nianpai = item.grade_rank
      console.log(this.edit)
      // setTimeout(function () {
      this.showEdit = true
      // }, 200)
      // console.log('编辑', item)
    },
    sendEdit (kemu, score, classPai, schoolPai) { // 确认编辑
      this.showEdit = false
      console.log('编辑：', kemu, score, classPai, schoolPai)
      // console.log('编辑：', this.editItem.subject, this.editItem.score, this.editItem.class_rank, this.editItem.grade_rank)
      const a = {'wechat_openid': '121', 'student_number': '111', 'subject': kemu, 'score': score, 'class_rank': classPai, 'grade_rank': schoolPai, 'exam_name': this.examTime + this.examname}
      console.log(a)
      for (const item in this.submitList) {
        if (this.submitList[item].subject === kemu) {
          console.log('shiji', item)
          this.submitList.splice(item, 1, a)
        }
      }
      console.log(this.submitList)
    },
    gotoRecord () {
      this.$router.push({path: '/record'})
    },
    addNew () {
      this.addscore = true
    },
    onChange (item) {
      console.log('当前值：', item)
      console.log(this.subkemu)
    },
    sendSubmit () {
      // this.submitList = []
      this.addscore = false
      console.log(this.examname, this.examTime, this.subkemu, this.score, this.classPai, this.schoolPai)
      const grade = {'wechat_openid': '121', 'student_number': '111', 'subject': this.subkemu, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examTime + this.examname}
      this.submitList.push(grade)
      // this.submitList.push(grade)
      // this.submitList1.push(JSON.stringify(grade))
      // enterGrade({
      //   wechat_openid: '111',
      //   student_number: '111',
      //   subject: this.subkemu,
      //   score: this.score,
      //   class_rank: this.classPai,
      //   grade_rank: this.schoolPai,
      //   exam_name: this.examTime + this.examname
      // }).then(res => {
      //   this.content.push(res.data.data)
      console.log('indexof:', this.list1.indexOf(this.subkemu))
      this.list1.splice(this.list1.indexOf(this.subkemu), 1)
      // for (const a in this.list) {
      //   if (a === this.subkemu) {
      //
      //   }
      //   console.log('a', a)
      // }
      // this.list.pop(this.subkemu)
      // console.log(this.list1)
      // console.log(this.content)
      // })
    },
    submitTranscript () {
      console.log('提交了：', this.submitList)
      enterGradeList(this.submitList).then(res => {
        if (res.data.code === 0) {
          this.showToast = true
        }
        const a = res.data.data
        console.log('aaaaaaaaa', a)
      })
    }
  }
}
</script>
<style scoped lang="scss">
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
  .add_record {
    right: 5px;
    position: absolute;
    top: -5px;
    padding: 8px 6px;
    color: #fff;
    font-size:15px;
  }
  .iconfont {
    font-size: 18px;
  }
  .addScore_form {
    margin: 15px 10px;
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
  .icon_lulutianjia {
    font-size: 25px;
    color: #c7c7c7;
    /*color: #42b982;*/
    /*border: 1px dashed #42b982;*/
    border-radius: 100px;
    box-shadow: 0 0 4px 4px rgba(66, 185, 130, 0.3);
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
  table.vux-table.vux-table-bordered {
    line-height: 35px;
  }
  .enter_action {
    font-size: 13px;
    color: #72b7e4;
  }
  .enter_submit {
    width: 25%;
    font-size: 16px;
    margin-left: 50%;
    margin-top: 45px;
    background-color: rgba(66, 185, 130, 0.3);
  }
</style>
