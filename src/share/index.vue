<template>
  <div class="score_info">
    <div class="score_header">
      <div class="title">{{examname}}</div>
    </div>
    <div class="third">
      <!--      <load-more tip="content-bordered=false" :show-loading="false" background-color="#fbf9fe"></load-more>-->
<!--      <h3></h3>-->
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
  </div>
</template>
<script>
import { Tab, TabItem, PopupPicker, XTable, LoadMore } from 'vux'
import { getScoreReport } from '@/api/index'
// import QRCode from '@/components/QRCode'
import QRCode from 'qrcode'

export default {
  components: {Tab, TabItem, PopupPicker, XTable, LoadMore, QRCode},
  data () {
    return {
      choice: [],
      three: [],
      totalInfo: []
    }
  },
  computed: {
    examname () {
      // else if (localStorage.SET_SCORE_NAME !== '') {
      //   return localStorage.SET_SCORE_NAME // 我扫描有数据，明奇没有
      // }
      return decodeURIComponent(this.$route.fullPath.split('?')[1].split('=')[1])
      // return this.$route.params.exam_name
    }
  },
  mounted () {
    this.getAllScore()
  },
  methods: {
    getAllScore () {
      console.log(this.examname)
      getScoreReport({
        stuNumber: '08047737',
        examType: this.examname
        // examType: '19年3月考试'
      }).then(res => {
        this.three = res.data.data[0].map
        this.totalInfo = res.data.data[0]
        this.useqrcode()
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
  .title {
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .third_second {
    /*text-align: center;*/
    /*margin-left: 25%;*/
    margin-top: 10px;
    /*transform: translate(-50%);*/
    display: inline-block;
  }
  .third_second_p{
    color: #8e8e8e;
    /*margin-left: 45%;*/
    /*transform: translate(-50%);*/
    margin-bottom: 15px;
    margin-right: 20px;
    margin-left: 17px;
    display: inline-block;
  }
  .third {
    margin: 40px 4px;
    text-align: center;
    border-radius: 10px;
    /*padding-left: 15px;*/
    background-color: #fff;
    /*box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);*/
    /*border: 1px rgba(66,185,130,0.4) dashed;*/
    /*margin: 5px 20px;*/
  }
  /*.third_table {*/
  /*  border: 1px solid red;*/
  /*}*/
  .third_table_thead {
    /*background-color: #f7f7f7;*/
    /*font-size: 14px;*/
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
</style>
