<template>
  <div class="staticDetail_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">做题详情</div>
    </div>
    <div class="staticDetail_second">
      <div class="staticDetail_second_title">{{exname}}</div>
      <div v-for="(item, index) in detailList" :key="index" class="staticDetail_second_content">
        <table style="width: 100%">
          <tr>
            <td>
              <div class="staticDetail_td_one">
                {{item.questionId}}
              </div>
            </td>
            <td><i class="iconfont icon_lulunaozhong"></i>{{item.doTime}}</td>
            <td>
              <div class="staticDetail_td_two yi" v-if="item.questionDifficult === '易'">
                {{item.questionDifficult}}
              </div>
              <div class="staticDetail_td_two zhong" v-if="item.questionDifficult === '中'">
                {{item.questionDifficult}}
              </div>
              <div class="staticDetail_td_two nan" v-if="item.questionDifficult === '难'">
                {{item.questionDifficult}}
              </div>
            </td>
            <td>
              <span class="staticDetail_td_four">
                {{item.questionAttribute}}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <confirm
        v-model="showNoData"
        :show-cancel-button="false"
        @on-confirm="onConfirm">
        <p style="text-align:center;">暂无做题详情！</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import {getXTStaticDetail} from '@/api/index'
export default {
  data () {
    return {
      detailList: [],
      showNoData: false // 是否有做题详情
    }
  },
  computed: {
    subject_online () {
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return localStorage.SET_SCHOOLNUM
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    },
    exname () {
      return this.$route.params.exname
    },
    source () {
      return this.$route.params.source
    }
  },
  mounted () {
    this.getDoQuesDetail()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'xitiStatistics'})
    },
    onConfirm () {
      this.$router.push({name: 'xitiStatistics'})
    },
    getDoQuesDetail () { // 获取做题详情
      getXTStaticDetail({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online,
        levelName: this.levelName,
        examName: this.exname,
        source: this.source
      }).then(res => {
        if (res.data.code === 0) {
          this.detailList = res.data.data
        } else {
          this.showNoData = true
        }
        console.log(res.data)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .staticDetail_info {
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
  .staticDetail_second {
    margin-top: 10px;
    .staticDetail_second_title {
      padding: 5px 15px;
      background-color: #fff;
      /*text-align: center;*/
    }
    .staticDetail_second_content {
      margin-top: 10px;
      padding: 5px 15px;
      background-color: #fff;
      font-size: 14px;
      tr {
        width: 100%;
        text-align: center;
          /*border: 1px solid #cad9ea;*/
      }
      .staticDetail_td_one {
        width: 20px;
        height: 20px;
        border: 1px solid #ececec;
        border-radius: 50%;
        color: red;
        font-size: 13px;
        /*background-color: #c4dfb8;*/
        background-color: #CCFF99;
      }
      tr td:first-child {
        width: 8%;
      }
      tr td:nth-child(2) {
        width: 30%;
        .icon_lulunaozhong {
          /*color: #FFCC99;*/
          margin-right: 5px;
        }
      }
      tr td:nth-child(3) {
        width: 10%;
        .staticDetail_td_two {
          height: 20px;
          width: 20px;
          color: #fff;
          /*background-color: #c9c9c9;*/
          margin-left: 5px;
          border-radius: 5px;
        }
        .yi {
           background-color: #FFCCCC;
         }
        .zhong {
          background-color: #FF6666;
        }
        .nan {
          background-color: #FF9966;
        }
      }
      tr td:nth-child(4) {
        width: 51%;
        .staticDetail_td_four {
          color: #fff;
          background-color: #99CCFF;
          padding: 1px 5px;
          border-radius: 5px;
          font-size: 13px;
        }
      }
    }
  }
</style>
