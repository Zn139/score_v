<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-detail__return">
      <div class="bbs-return return-box">
        <div class="return__icon" @click="gotoPage()">
          <i class="iconfont icon_lulufanhui"></i>
          圈子
        </div>
      </div>
    </div>
    <div class="bbs-detail__content" ref="bbsWrapper">
<!--      <div style="transform: unset !important" >-->
      <div style="transform: none !important">
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <div class="list-no-data" v-if="!loading && noData">
          圈子是空的，请返回
        </div>
        <template v-if="!loading && !noData">
<!--          <div class="bbs-item" style="transform: none !important">-->
          <div class="bbs-item" style="transform: none !important">
            <div class="bbs-base-box">
              <div class="bbs-item__info">
                <jubao
                  type="bbs"
                  :reportList="reportList"
                  :isMy="isMyBbs"
                  :isZan="istrue"
                  @refresh="getBbsInfo"
                  @zan="zan"
                ></jubao>
                <div class="bbs-item__logo">{{username.substring(0, 1)}}</div>
                <div class="bbs-item__name">{{username}}</div>
              </div>
              <div class="bbs-item__content">{{ask}}</div>
              <div class="bbs-item__time">{{time}}</div>
              <div class="bbs-item__good" @click="zan">
                {{hot}}
                <i v-if="!istrue" class="iconfont icon_lulushoucang4"></i>
                <i v-else class="iconfont icon_lulufavor-active"></i>
              </div>
            </div>
            <div class="bbs-info-box">
              <div class="bbs-info-box-title">评论</div>
              <template v-if="infos.length === 0">
                <div class="list-no-data">暂无评论</div>
              </template>
              <div class="bbs-info__item" v-for="item in infos">
                <div class="bbs-info__header">
                  <jubao
                    type="comment"
                    :reportList="reportList"
                    :isMy="isMyBbs"
                    :isZan="istrue"
                    :comid="item.id"
                    :comopenid="item.openid"
                    @refresh="getBbsInfo"
                    @zan="zan"
                  ></jubao>
                  <div class="bbs-item__logo">{{item.username.substring(0, 1)}}</div>
                  <div class="bbs-item__name">{{item.username}}</div>
                  <div class="bbs-info__time">{{item.createTime | formatDate }}</div>
                </div>
                <div class="bbs-item__content">{{item.ask}}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="bbs-info-my" :class="{'bbs-info-my--edit': edit}">
      <template v-if="!edit">
        <div class="bbs-edit-inline" @click="toggleEdit(true)">
          <span>请发表看法</span>
        </div>
      </template>
      <template v-else>
        <div class="bbs-edit-inline bbs-edit-box">
          <textarea ref="text" v-model="myInfo" @keyup.enter="feeback"></textarea>
        </div>
      </template>
      <div class="bbs-info-my-feeback" @click="feeback">{{fabu}}</div>
    </div>
  </div>
</template>
<script>
import _ from 'underscore'
import BScroll from 'better-scroll'
import jubao from './jubao'
// import { getBbsDetail, zan, feedbackBbs } from '@/api/index.js'
// import { lookSensitive } from '@/api/bbs.js'
import { msg, errorMsg } from '@/utils/common'
import {formatDate} from '../utils/date.js'
export default {
  components: { jubao },
  data () {
    return {
      reportList: [],
      plain: true,
      value: [],
      options: [],
      fabu: '发布',
      showQA: false,
      showPA: false,
      showPT: false,
      showQT: false,
      menus1: {},
      menus2: {},
      flag: 0,
      hideOn: true,
      noData: false,
      loading: false,
      hasGood: false,
      ask: '',
      username: '',
      time: '',
      hot: '',
      infos: [],
      edit: false,
      myInfo: '',
      istrue: false,
      faId: '',
      pingId: '',
      take_openid: '',
      takeinfoid: '',
      index: '',
      textareaEvt: null,
      bbsScroll: null
    }
  },
  mounted () {
    this.getSensitive()
    this.getBbsInfo()
    this.loading = true
    this.textareaEvt = this.$refs.bbsWrapper.addEventListener('click', this.textClickEvt)
    this.init()
  },
  beforeDestroy () {
    this.$refs.bbsWrapper.removeEventListener('click', this.textClickEvt)
    this.textareaEvt = null
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    },
    bbsId () {
      return this.$route.params.id
    },
    isMyBbs () {
      return this.openid === this.take_openid
    }
    // isMyP (pId) {
    //   return this.openid === pId
    // }
  },
  methods: {
    getSensitive () {
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/show/cee/user/lookAllSensitive'
      }).then(res => {
        this.reportList = res.data.data
      })
    },
    init () {
      this.$nextTick(() => {
        this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
          click: true
        })
      })
    },
    textClickEvt: _.debounce(function (e) {
      if (e.target.tagName !== 'TEXTAREA' && e.target.className !== 'bbs-info-my-feeback') {
        this.toggleEdit(false)
      }
    }, 200),
    // 去页面
    gotoPage () {
      this.$router.go(-1)
    },
    // 获取圈子详情
    getBbsInfo () {
      this.loading = true
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/show/cee/user/findTakebyTakeid',
        params: {
          openid: this.openid,
          // openid: 'oMXOb1fL8RtRe67m4Uf_3EPsdimE',
          takeid: this.bbsId
        }
      }).then(res => {
        this.loading = false
        this.edit = false
        if (res.data.code === 0) {
          this.ask = res.data.data.takeDTO.ask
          this.take_openid = res.data.data.takeDTO.openid
          this.username = res.data.data.takeDTO.username
          this.time = res.data.data.takeDTO.time
          this.hot = res.data.data.takeDTO.hot
          this.istrue = res.data.data.takeDTO.istrue
          this.infos = res.data.data.takeInfos || []
          // if (this.infos.length !== 0) {
          //   this.infos.map(item => {
          //     // console.log('item2:', item)
          //     if (item.createTime.toString().length === 13) {
          //       item.time = (new Date(item.createTime)).toJSON().split('.')[0].replace('T', ' ')
          //     } else {
          //       item.time = ''
          //     }
          //   })
          // }
          this.hasGood = false
          this.$nextTick(() => {
            this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
              click: true
            })
            // this.bbsScroll.refresh()
          })
        } else {
          msg(this, '圈子获取错误，请返回')
          this.noData = true
        }
      })
    },
    zan: _.debounce(function () {
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/show/cee/user/addOnclick',
        params: {
          takeid: this.bbsId,
          openid: this.openid
          // openid: 'oMXOb1fL8RtRe67m4Uf_3EPsdimE'
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.istrue = res.data.data.istrue
          this.hot = res.data.data.count
        }
        return false
      })
    }, 500, true),
    toggleEdit (flag) {
      this.edit = flag
      if (flag) {
        this.myInfo = ''
        this.$nextTick(() => {
          this.$refs.text.focus()
        })
      }
    },
    feeback () {
      this.fabu = '发布中'
      const tmp = this.myInfo
      if (this.myInfo.length < 10) {
        errorMsg(this, '评论字数不能小于10个字')
        this.$nextTick(() => {
          this.toggleEdit(true)
          this.myInfo = tmp
          this.$nextTick(() => {
            this.$refs.text.focus()
          })
        })
        return
      }
      this.$axios({
        method: 'post',
        url: 'http://zhongkeruitong.top/show/cee/user/addTakeInfo',
        params: {
          openid: this.openid,
          ask: this.myInfo,
          takeid: this.bbsId,
          // openid: 'oMXOb1fL8RtRe67m4Uf_3EPsdimE'
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.fabu = '发布'
          this.getBbsInfo()
        } else {
          errorMsg(this, res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  /*.bbs-item{*/
  /*  transform: unset !important;*/
  /*}*/
  .bbs-return {
    background: #42b983;
    /*background: #647cfb;*/
    /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
    flex: none;
    z-index: 1;
    height: 50px;
    body &.return-box .return__icon.return__icon {
      color: #fff;
      font-size: 16px;
    }
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .return-box .return__icon {
    position: absolute;
    left: 10px;
    top: 6px;
    z-index: 9;
    padding: 8px 6px;
    color: #fff;
  }
  body .return-box .return__icon .iconfont {
    font-size: 18px;
    color: #fff;
  }
  .bbs-detail__content {
    flex: auto;
    height: calc(100% - 76px);
    background: #fff;
    word-break: break-word;
    overflow: hidden;
  }
  .bbs-item {
    margin: 0 0 10px 0;
    padding: 0;
    box-shadow: none;
  }
  /*.bbs-item {*/
  /*  background: #fff;*/
  /*  margin: 0 20px 16px;*/
  /*  padding: 16px 20px;*/
  /*  box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);*/
  /*  border-radius: 4px;*/
  /*  position: relative;*/
  /*  min-height: 50px;*/
  /*}*/
  .bbs-item__info {
    position: relative;
  }
  .bbs-item__logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #99CC99;
    /*background: #657cfb;*/
    color: #fff;
    border-radius: 100px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .bbs-item__name {
    margin-left: 0;
  }
  .bbs-item__content {
    text-align: justify;
    word-break: break-all;
    font-size: 14px;
    margin: 0;
    background: #fbf9fe;
    color: #003300;
    line-height: 1.5;
  }
  .bbs-detail__content .bbs-item__time {
    padding-left: 0;
  }
  .bbs-item__good {
    background: none;
    position: absolute;
    z-index: 3;
    color: inherit;
    right: 10px;
  }
   .bbs-item__hot, .bbs-item__good {
     display: inline-block;
     /*background: #9ba3c5;*/
     /*color: #fff;*/
     margin: 8px 4px 8px 0;
     padding: 2px 8px;
     border-radius: 4px;
     font-size: 12px;
   }
   .bbs-item__time {
     display: inline-block;
     margin: 8px 4px 8px 0;
     padding: 2px 8px;
     border-radius: 4px;
     font-size: 12px;
     color: #aaa;
   }
   .bbs-item__name, .bbs-info__time {
     display: inline-block;
     font-size: 13px;
     color: #555;
     margin-bottom: 10px;
     margin-left: 10px;
   }
  .bbs-item__good .icon_lulushoucang4 {
    color: #ddd;
  }
  .bbs-item__good .icon_lulufavor-active {
    color: #ff6c6c;
  }
   .bbs-item__good .iconfont {
     width: 25px;
     margin-left: 6px;
     margin-top: 2px;
     font-size: 14px;
   }
  .bbs-base-box,
  .bbs-info-box {
    padding: 16px 20px;
    position: relative;
  }
  .bbs-ope {
    position: absolute;
    right: 20px;
  }
  .bbs-info-box {
    border-top: 10px solid #ddd;
  }
  .bbs-info-box-title {
    font-weight: bold;
    color: #4f5b63;
    margin-bottom: 14px;
  }
  .bbs-info__item {
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    margin-right: -20px;
    padding-right: 20px;
    padding-bottom:6px;
    .bbs-item__logo,
    .bbs-item__name {
      margin-bottom: 0;
    }
  }
  .bbs-info__header {
    position: relative;
  }
  .bbs-info-my {
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    width: 100%;
    left: 0;
    height: 40px;
    background: #fff;
    &.bbs-info-my--edit {
      height: 100px;
    }
    .bbs-edit-inline {
      padding: 10px 50px 10px 10px;
      textarea {
        border: 0;
        resize: none;
        width: 100%;
        height: 80px;
      }
      input {
        border: 0
      }
    }
    .bbs-info-my-feeback {
      position: absolute;
      right: 4px;
      bottom: 4px;
      color: #9aa3c5;
      padding: 4px 8px;
      z-index: 9;
    }
  }
  .actionStyle{
    position: absolute;
    z-index: 1000;
    height: 100px;
  }
</style>
