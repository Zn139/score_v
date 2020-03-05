<template>
  <div class="line-third-info">
    <div class="line-second-first">
      <div class="line-second-first_title">
        <i class="iconfont icon_lulufengefu"></i><strong>最近练习</strong>
      </div>
      <div class="line-second-first_content">
        <div class="line-third-title">{{chapterName}}</div>
        <div class="line-third-con">
          <div>{{sectionName}}</div>
<!--          <div>1、生命体结构和功能的基本单位是？</div>-->
          <x-button @click.native="gotoChapterExer">继续学习</x-button>
        </div>
      </div>
    </div>
<!--    <div class="line-third_second">-->
<!--      <div class="line-third_second_item" @click="gotoPage('doQuesRecord')"><i class="iconfont icon_lulujiludanzilishijilu"></i><span>做题记录</span><i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>-->
<!--      <div class="line-third_second_item" @click="gotoPage('studyReport')"><i class="iconfont icon_luluxuexibaogao"></i><span>学习报告</span><i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>-->
<!--      <div class="line-third_second_item" @click="gotoPage('myMedal')"><i class="iconfont icon_lulumedal"></i><span>我的勋章</span><i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>-->
<!--    </div>-->
  </div>
</template>
<script>
import {recentExer} from '@/api/index'
export default {
  data () {
    return {
      sectionName: '',
      chapterName: ''
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
      return this.$store.state.exam.schoolNum
    }
  },
  mounted () {
    this.recentExer()
  },
  methods: {
    gotoPage (name) {
      this.$router.push({name: name})
    },
    recentExer () { // 最近练习
      recentExer({
        studentNumber: this.schoolNumber,
        openid: this.openid,
        subject: this.subject_online
      }).then(res => {
        this.sectionName = res.data.data.sectionName
        this.chapterName = res.data.data.examPaperName
        console.log('最近练习：', res.data.data)
      })
    },
    gotoChapterExer () {
      this.$router.push({
        name: 'chapterExercise',
        params: {
          paperName: this.sectionName
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .line-second-first {
    margin-bottom: 6px;
    background-color: #fff;
  }
  strong {
    font-size: 15px;
  }
  .line-second-first_title {
    margin: 0 10px;
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #ececec;
    .icon_lulufengefu {
      color: #42b982;
      /*font-weight: ;*/
    }
  }
  .line-second-first_content {
    /*padding: 5px 0;*/
    margin: 10px 30px 0;
    padding-bottom: 30px;
  }
  .line-third-title {
    font-size: 15px;
    font-weight: bold;
  }
  .line-third-con {
    margin-top: 15px;
    text-align: center;
    div:nth-child(2) {
      margin-top: 5px;
      font-size: 14px;
    }
    button {
      color: #42b982;
      margin-top: 15px;
      width: 47%;
      font-size: 16px;
      /*border: 1px red solid;*/
    }
    .weui-btn:after {
      border: 1px solid #42b982;
    }
    .weui-btn_default {
      background-color: #fff;
    }
  }
  .line-third_second {
    margin-top: 15px;
    padding: 0 15px 15px;
    /*padding-bottom: 40px;*/
    background-color: #fff;
  }
  .line-third_second_item {
    /*padding-left: 20px;*/
    font-size: 15px;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ececec;
    .iconfont:first-child {
      /*font-size: 17px;*/
      /*margin-top: 3px;*/
    }
    span {
      margin-left: 10px;
    }
  }
  .icon_lulujiludanzilishijilu {
    color: rgb(113, 167, 239);
  }
  .icon_luluxuexibaogao {
    color: rgb(151, 204, 174);
  }
  .icon_lulumedal {
    color: rgb(2239, 202, 0);
  }
  .icon_luluchangyongtubiao-xianxingdaochu-zhuanqu- {
    float: right;
  }
</style>
