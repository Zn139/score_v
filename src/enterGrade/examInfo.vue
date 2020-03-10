<template>
  <div class="record_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">成绩详情</div>
    </div>
    <div class="exam_info_second" v-if="content.length > 0">
<!--      {{content}}-->
      <h4>{{content[0].manuallyEnterGrades.examName}}</h4>
      <x-table class="third_table">
        <thead>
        <tr class="third_table_thead">
          <th>学科</th>
          <th>分数</th>
          <th>班排</th>
          <th>校排</th>
          <th>图片</th>
          <th colspan="2">操作</th>
<!--          <th>插入时间</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in content" :key="index">
          <td>{{item.manuallyEnterGrades.subjectName}}</td>
          <td>{{item.manuallyEnterGrades.score}}</td>
          <td>{{item.manuallyEnterGrades.classRank}}</td>
          <td>{{item.manuallyEnterGrades.gradeRank}}</td>
          <td v-if="item.imgurllist.length === 0"><i class="iconfont icon_luluxiangji"></i></td>
          <td v-if="item.imgurllist.length > 0"><i class="iconfont icon_luluxiangji" style="color: #42b983"></i></td>
          <td><span class="enter_action" @click="delData(item)">删除</span></td>
          <td><span class="enter_action" @click="editData(index, item)">编辑</span></td>
<!--          <td>{{item.inserttime}}</td>-->
        </tr>
        </tbody>
      </x-table>
      <div class="jixuAdd" v-if="content.length < 9" @click="gotoAdd">继续添加<i class="iconfont icon_lulushuangyoujiantou-"></i></div>
      <confirm v-model="showDel"
               title="删除提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">确定删除吗？</p>
      </confirm>
      <toast v-model="showToast" :time="1000">删除成功</toast>
    </div>
  </div>
</template>
<script>
import {getExamInfo, getDelEnter} from '@/api/index'
export default {
  data () {
    return {
      content: [],
      showDel: false,
      delItem: '', // 删除项
      showToast: false,
      submitListW: [],
      submitList: [],
      subList: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
      // edit: {
      //   subject: '',
      //   score: '',
      //   banpai: '',
      //   nianpai: ''
      // },
      // showEdit: false,
    }
  },
  computed: {
    fullName () {
      console.log(this.$route.params.fullName)
      return this.$route.params.fullName
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    }
  },
  created () {
    console.log('全称', this.fullName)
    this.selectExamInfo()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    selectExamInfo () {
      getExamInfo({
        openid: this.openid,
        // examName: this.fullName
        examName: this.fullName
        // examName: this.$route.params.examName
      }).then(res => {
        this.content = res.data.data
        console.log('222222222222', this.content)
      })
      // console.log('全称：', fullName)
    },
    gotoAdd () {
      for (const item in this.content) {
        // console.log('每节课：', this.content[item])
        const gradew = {'wechat_openid': this.content[item].manuallyEnterGrades.wechatOpenid, 'student_number': this.content[item].manuallyEnterGrades.studentNumber, 'subject_name': this.content[item].manuallyEnterGrades.subjectName, 'score': this.content[item].manuallyEnterGrades.score, 'class_rank': this.content[item].manuallyEnterGrades.classRank, 'grade_rank': this.content[item].manuallyEnterGrades.gradeRank, 'exam_name': this.content[item].manuallyEnterGrades.examName, 'imgs': this.content[item].imgurllist}
        const grade = {'wechat_openid': this.content[item].manuallyEnterGrades.wechatOpenid, 'student_number': this.content[item].manuallyEnterGrades.studentNumber, 'subject_name': this.content[item].manuallyEnterGrades.subjectName, 'score': this.content[item].manuallyEnterGrades.score, 'class_rank': this.content[item].manuallyEnterGrades.classRank, 'grade_rank': this.content[item].manuallyEnterGrades.gradeRank, 'exam_name': this.content[item].manuallyEnterGrades.examName, 'imgs': this.content[item].manuallyEnterGrades.imgs}
        this.submitList.push(grade)
        this.submitListW.push(gradew)
        this.subList.splice(this.subList.indexOf(this.content[item].manuallyEnterGrades.subjectName), 1)
      }
      // console.log('存进去的值：', grade)
      // console.log('剩余科目：', this.subList)
      console.log(this.submitListW)
      console.log(this.submitList)
      // const gradew = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examName, 'imgs': this.imgsListW}
      // this.submitList.push(grade)
      // this.submitListW.push(gradew)

      // localStorage.setItem('detail_to_add', this.content)
      this.$store.commit('DETAIL_TO_ADDW', this.submitListW)
      this.$store.commit('DETAIL_TO_ADD', this.submitList)
      this.$store.commit('SET_SUBJECTS_LIST', this.subList) // 剩余的科目
      // console.log('存进来了么：', localStorage.getItem('detail_to_add'))
      // this.$router.push('/addScore')
      this.$router.push({
        name: 'addScore',
        params: {
          type: 2
        }
      })
    },
    delData (item) { // 删除操作
      this.showDel = true
      this.delItem = item
      // console.log(item)
      // console.log('indexof:', this.submitList.indexOf(item))
      // this.submitList.splice(this.submitList.indexOf(item), 1)
    },
    onCancel () { // 点击取消触发
      this.showDel = false
    },
    onConfirm () {
      getDelEnter({
        stuNumber: this.schoolNumber,
        openid: this.openid,
        examName: this.fullName,
        subject: this.delItem.manuallyEnterGrades.subjectName
      }).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.showToast = true
          if (this.fullName.length > 0) {
            console.log('hahah')
          }
          console.log(this.fullName)
        }
        getExamInfo({
          openid: this.openid,
          // examName: this.fullName
          examName: this.fullName
          // examName: this.$route.params.examName
        }).then(resp => {
          if (resp.data.code !== 0) {
            this.$router.push({path: '/record'})
          } else {
            this.content = resp.data.data
            console.log(this.content)
          }
        })
      })
      // this.content.splice(this.content.indexOf(this.delItem), 1)
    },
    editData (index, item) { // 编辑操作
      const subList = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
      for (const a in this.content) {
        const i = subList.indexOf(this.content[a].manuallyEnterGrades.subjectName)
        subList.splice(i, 1)
      }
      // subList.push()
      console.log(item)
      this.$router.push({
        name: 'addSingleSubScore',
        params: {
          type: 2, // 指定是现在编辑类型
          // editContent: item,
          id: index, // 当前数据的索引
          remainSub: subList, // 加上当前学科
          currentSub: item.manuallyEnterGrades.subjectName,
          editContent: this.content
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .record_info {
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
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  h4 {
    text-align: center;
    margin-bottom: 15px;
  }
  .exam_info_second {
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
  .enter_action {
    font-size: 13px;
    color: #72b7e4;
  }
  .jixuAdd {
    margin-top: 20px;
    font-size: 15px;
    color: #42b982;
    font-weight: bold;
    padding-bottom: 15px;
    .iconfont {
      margin-left: 5px;
      font-size: 15px;
    }
  }
</style>
