<template>
  <div class="feedback">
    <div class="feedback__body">
      <div class="feedback__item" v-for="item in feedbackList" :key="item.name">
        <div class="feedback__course">{{item.teaCourse.courseName}}</div>
        <div class="courseinfo">
          <div class="feedback__teacher">{{item.teaName || ''}}</div>
          <div class="feedback__date">{{item.teaCourse.courseDate.split(' ')[0]}}</div>
          <div class="feedback__time">{{item.teaCourse.time}}</div>
        </div>
        <div class="feedback__box">
          <div class="feedback_item student">
            <div class="feedback__label">学生反馈：</div>
            <div class="feedback__text open-feed green"
              v-if="userType === 'student' && (item.feedBack === null || item.feedBack.stuFeedback === null)"
              @click="openFeed(item)">点我反馈</div>
            <div class="feedback__text open-feed"
              v-if="userType !== 'student' && (item.feedBack === null || item.feedBack.stuScore === null)">暂无反馈</div>
            <div class="feedback__star" v-if="item.feedBack !== null &&  item.feedBack.stuScore !== null">
              <div class="feedback__text">{{item.feedBack.stuFeedback}}</div>
              <star :length=" 5" :value="item.feedBack.stuScore" :isreadonly="true"></star>
            </div>
          </div>
          <div class="feedback_item teacher">
            <div class="feedback__label">老师反馈：</div>
            <div class="feedback__text open-feed green"
              v-if="userType === 'teacher' && (item.feedBack === null || item.feedBack.teaScore === null)"
              @click="openFeed(item)"
            >点我反馈</div>
            <div class="feedback__text open-feed" v-if="userType !== 'teacher' && (item.feedBack === null || item.feedBack.teaScore === null)">暂无反馈</div>
            <div class="feedback__star" v-if="item.feedBack !== null && item.feedBack.teaScore !== null">
              <div class="feedback__text">{{item.feedBack.teaFeedback}}</div>
              <star :length=" 5" :value="item.feedBack.teaScore" :isreadonly="true"></star>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="course-end" v-if="!loading && feedbackList.length !== 0">我是有底线的</div>
    <div class="" v-if="!loading && feedbackList.length === 0">
      <no-data></no-data>
    </div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <div class="feedback__diag">
      <feed-diag
        :show="feedDiag"
        :item="feedItem"
        :userType="userType"
        @updateFeed="updateFeed"
        @closeFeed="closeFeed"></feed-diag>
    </div>
  </div>
</template>
<script>
// import { errorMsg } from '../utils/common'
import request from '../utils/request'

import star from '../components/star'
import userInfo from './info'
import feedDiag from './feedDiag'
import noData from '../components/noData'
import loading from '../components/loading'
export default {
  name: 'feedback',
  components: { star, userInfo, feedDiag, noData, loading },
  data () {
    return {
      loading: false,
      feedbackList: [],
      menu: [],
      feedDiag: false,
      feedItem: {}
    }
  },
  computed: {
    teaOpenid () {
      return this.$store.state.user.infoObj.teaOpenid || ''
    },
    stuOpenid () {
      return this.$store.state.user.infoObj.stuOpenid || ''
    },
    userType () {
      return this.$store.state.user.userType
    }
  },
  mounted () {
    this.loading = true
    this.getFeedList()
    if (this.userType === 'student') {
      this.menu = this.stuMenu
    } else {
      this.menu = this.teaMenu
    }
  },
  methods: {
    updateScore (score, item) {
      // console.log(score, item)
      item.score = score
    },
    getFeedList () {
      let url = ''
      if (this.userType === 'teacher') {
        url = 'http://www.zhiheyikaoqin.cn/tea/findTeaHistoryCourse'
        url += '?teaOpenid=' + this.teaOpenid + '&page=1&pageSize=1000'
      } else if (this.userType === 'student') {
        url = 'http://www.zhiheyikaoqin.cn/stu/lookHistory'
        url += '?stuOpenid=' + this.stuOpenid + '&page=1&pageSize=1000'
      }
      request({
        url: url,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res.data.code === 0 && res.data.data !== undefined) {
          if (this.userType === 'teacher') {
            this.feedbackList = res.data.data.filter(item => {
              return item.teaCourse.courseStatus === 303
            }).map(item => {
              item.teaCourse.time = this.getTime(item.teaCourse.courseStartTime) + ' - ' + this.getTime(item.teaCourse.courseEndTime)
              return item
            })
          } else {
            this.feedbackList = res.data.data.filter(item => {
              return item.subStatus === 401 && item.teaCourse.courseStatus === 303
            }).map(item => {
              item.teaCourse.time = this.getTime(item.teaCourse.courseStartTime) + ' - ' + this.getTime(item.teaCourse.courseEndTime)
              return item
            })
          }
        }
      })
    },
    getTime (str) {
      const hour = str.split(' ')[1].split(':')[0]
      const min = str.split(' ')[1].split(':')[1]
      return hour + ':' + min
    },
    updateFeed (item, score, feedText) {
      if (this.userType === 'student') {
        if (item.feedBack === undefined || item.feedBack === null) {
          item.feedBack = {
            stuScore: score,
            stuFeedback: feedText,
            teaFeedback: null,
            teaScore: null
          }
        }
        item.feedBack.stuScore = score
        item.feedBack.stuFeedback = feedText
      } else {
        item.feedBack.teaScore = score
        item.feedBack.teaFeedback = feedText
      }
      this.closeFeed()
      console.log('updateFeed', item, score, feedText)
    },
    openFeed (item) {
      this.feedItem = item
      this.feedDiag = true
    },
    closeFeed () {
      this.feedItem = {}
      this.feedDiag = false
    }
  }
}
</script>
<style lang="scss">
  @import '../styles/color.scss';
  .feedback {
    margin-bottom: 10px;
  }
  .feedback__item {
    background: #fff;
    margin-bottom: 5px;
    position: relative;
    overflow: hidden;
  }
  .feedback__course {
    padding: 10px 20px;
    border-bottom: 1px solid $border;
  }
  .courseinfo {
    height: 120px;
    padding: 20px 0 10px 20px;
    position: absolute;
    left: 0;
    width: 100px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    & > div {
      margin-bottom: 6px;
    }
    .feedback__teacher,
    .feedback__date,
    .feedback__time {
      height: 13px;
      line-height: 1;
    }
  }
  .feedback_item {
    padding: 10px 20px 0 5px;
  }
  .feedback__box {
    padding-left: 130px;
    padding-bottom: 10px;
    .text {
      height: 50px;
      padding: 3px 45px 3px 0;
    }
    textarea {
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
    }
    .btn {
      position: absolute;
      right: 5px;
      top: 33px;
      height: 100%;
      width: 40px;
      .send-btn {
        float: right;
        margin: 20px 0;
        height: 40px;
        width: 36px;
        background: $gray;
        color: #fff;
        border-radius: 5px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        &.active {
          background: $green;
        }
      }
    }
  }
  .rank {

  }
</style>
