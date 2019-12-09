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
      <h4>{{content[0].examName}}</h4>
      <x-table class="third_table">
        <thead>
        <tr class="third_table_thead">
          <th>学科</th>
          <th>分数</th>
          <th>班排</th>
          <th>校排</th>
          <th colspan="2">操作</th>
<!--          <th>插入时间</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in content" :key="index">
          <td>{{item.subjectName}}</td>
          <td>{{item.score}}</td>
          <td>{{item.classRank}}</td>
          <td>{{item.gradeRank}}</td>
          <td><span class="enter_action" @click="delData(item)">删除</span></td>
          <td><span class="enter_action" @click="editData(item)">编辑</span></td>
<!--          <td>{{item.inserttime}}</td>-->
        </tr>
        </tbody>
      </x-table>
      <confirm v-model="showDel"
               title="删除提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">确定删除吗？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import {getExamInfo} from '@/api/index'
export default {
  data () {
    return {
      content: [],
      showDel: false,
      delItem: '', // 删除项
      edit: {
        subject: '',
        score: '',
        banpai: '',
        nianpai: ''
      },
      showEdit: false,
    }
  },
  // computed: {
  //   fullName () {
  //     console.log(this.$route.params.examName)
  //     return this.$route.params.examName
  //   }
  // },
  created () {
    this.selectExamInfo()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    selectExamInfo () {
      getExamInfo({
        openid: '111',
        // examName: this.fullName
        examName: this.$route.params.examName
      }).then(res => {
        this.content = res.data.data
        console.log(this.content)
      })
      // console.log('全称：', fullName)
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
      this.content.splice(this.content.indexOf(this.delItem), 1)
    },
    editData (item) { // 编辑操作
      this.edit.subject = item.subjectName
      this.edit.score = item.score
      this.edit.banpai = item.classRank
      this.edit.nianpai = item.gradeRank
      console.log(this.edit)
      // setTimeout(function () {
      this.showEdit = true
      // }, 200)
      // console.log('编辑', item)
    },
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
</style>
