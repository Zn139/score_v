<template>
  <div class="bind_account_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">绑定账号</div>
    </div>
    <div ref="bindAccount" class="bindAccount">
      <div v-if="flag === 0">
        <div class="bind_account_second">
          <x-input class="bind_school" title="学号" placeholder="请输入学号" text-align="right" placeholder-align="right" v-model="schoolNum" @on-change="changeSchoolNum"></x-input>
          <!--      <x-button plain class="bind_school_button">确定</x-button>-->
        </div>
        <div v-if="schoolMember === 0" class="noStudent"> <!-- 不是学校合作学生 -->
          <popup-picker class="bind_school" title="选择学校" :data="[schoolList]" v-model="schoolValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="输入学校名称"></popup-picker>
          <popup-picker class="bind_school" title="选择阶段" :data="[levelList]" v-model="levelValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="选择学习阶段"></popup-picker>
          <calendar class="bind_school" v-model="startYear" title="入学年份"></calendar>
          <x-input class="bind_school" title="所在班级" placeholder="请输入班级名称" text-align="right" placeholder-align="right" v-model="className"></x-input>
          <div class="bind_school_tip">请设置密码，以便其他人登录</div>
          <x-input class="bind_school" type="password" title="设置密码" placeholder="请输入密码" text-align="right" placeholder-align="right" v-model="passwd"></x-input>
          <x-input class="bind_school" type="password" title="确认密码" placeholder="再次输入密码" text-align="right" placeholder-align="right" v-model="passwod" @on-blur="confirmPassword"></x-input>
          <div class="agreeStatement">
            <i class="iconfont icon_lulukuang-" @click="agreeState"></i>
            <span @click="gotoStatement">我已阅读免责条款</span>
          </div>
          <x-button plain class="bind_school_button" @click.native="bindOutUser" v-if="showAgree">完成</x-button>
          <x-button plain class="bind_school_button_disAgree" @click.native="bindOutUser" v-else disabled>完成</x-button>
        </div>
        <div class="bind_school_tip" v-if="schoolMember === 1"> <!-- 是学校合作学生，所以需要验证下 -->
          <!--      <alert title="提示" @on-show="onShow" @on-hide="onHideAlert">您是学校用户，请提供初始密码验证~</alert>-->
          <alert v-model="schVerify" title="提示" @on-show="onShow" @on-hide="onHideAlert">您是学校用户，请提供初始密码验证~</alert>
          <!--      若为学校购买服务器用户，提示验证初始密码-->
        </div>
        <div v-if="schoolMember === 2"> <!-- 是学校合作学生，所以需要验证下 -->
          <x-input class="bind_school" title="验证初始密码" placeholder="请输入初始密码" text-align="right" placeholder-align="right" v-model="schoolPasswod" ></x-input>
          <div class="agreeStatement">
            <i class="iconfont icon_lulukuang-" @click="agreeState"></i>
            <span @click="gotoStatement">我已阅读免责条款</span>
          </div>
          <x-button plain class="bind_school_button" @click.native="bindUser" v-if="showAgree">完成</x-button>
          <x-button plain class="bind_school_button_disAgree" @click.native="bindUser" v-else disabled>完成</x-button>
        </div>
      </div>
    </div>
    <div v-if="flag === 1">
      <div class="bind_account_second">
        <div class="bind_account_second">
          <x-input class="bind_school" title="学号" placeholder="请输入学号" text-align="right" placeholder-align="right" v-model="stuInfoContent.diyid" disabled></x-input>
        </div>
        <div class="bind_school_tip">以下是绑定信息</div>
        <popup-picker class="bind_school" title="学校" disabled v-model="myInfo.schoolValue" placeholder="输入学校名称"></popup-picker>
        <popup-picker class="bind_school" title="阶段" disabled v-model="myInfo.levelValue"  placeholder="选择学习阶段"></popup-picker>
        <div class="my_info_first_item" >年级<div class="city">{{myInfo.grade}}<i v-if="myInfo.grade === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
        <div class="my_info_first_item" >班级<div class="city">{{myInfo.class}}<i v-if="myInfo.class === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
<!--        <div class="my_info_first_item" >学号<div class="city">{{myInfo.schoolNum}}<i v-if="myInfo.schoolNum === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>-->
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'underscore'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      showAgree: false, // 是否点击免责条款
      bindAccountScroll: null,
      flag: 2, // 是否绑定学号
      stuInfoContent: [],
      myInfo: {
        schoolValue: [],
        levelValue: [],
        grade: '',
        class: ''
        // schoolNum: ''
      },
      passwd: '',
      passwod: '',
      // errorText: '',
      schoolPasswod: '', // 学校初始密码
      startYear: 'TODAY',
      schVerify: false, // 是否展示学校用户的信息
      schoolMember: 3, // 是否为学校购买用户
      schoolList: ['中关村中学', '知春分校', '人大附中'],
      schoolValue: [],
      levelList: ['小学', '初中', '高中'],
      levelValue: [],
      className: '',
      schoolNum: ''
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  mounted () {
    // this.init()
    // console.log('youmeyou schoolnum', this.$store.state.lineCourse.school_number_temp)
    this.schoolNum = this.$store.state.lineCourse.school_number_temp
    this.getUserInfo()
  },
  methods: {
    returnBack () {
      this.$store.commit('SET_school_number_temp', '')
      this.$router.go(-1)
    },
    init () {
      // console.log('初始化：', this.$refs.section_exec_second)
      this.$nextTick(() => {
        this.bindAccountScroll = new BScroll(this.$refs.bindAccount, {
          click: true
        })
      })
    },
    gotoStatement () { // 跳转免责声明
      this.$store.commit('SET_school_number_temp', this.schoolNum)
      this.$router.push({name: 'statement'})
    },
    agreeState: _.debounce(function () { // 同意免责条款
      var agree = document.querySelector('.agreeStatement')
      // console.log(agree.children[0].className)
      if (agree.children[0].className === 'iconfont icon_lulukuang-') {
        agree.children[0].className = 'iconfont icon_luluduigoukuang1'
        this.showAgree = true
        console.log(1111111111)
        console.log(agree.children[0].className)
      } else {
        agree.children[0].className = 'iconfont icon_lulukuang-'
        this.showAgree = false
        console.log(22222222222)
        console.log(agree.children[0].className)
      }
      // console.log(agree.childNodes)
      // console.log(agree.children[0].className)
    }, 50, true),
    getUserInfo () {
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/wechat_login/getAllInfoByWechatId',
        params: {
          wechatId: this.openid
        }
      }).then(res => {
        console.log('学号：', res.data.userLogin.diyid)
        if (res.data.userLogin.diyid !== '') {
          this.$vux.alert.show({
            title: '提示',
            content: '您已经绑定过学号啦！'
          })
          // this.$store.commit('SET_SCHOOLNUM', res.data.userLogin.diyid)
          // localStorage.setItem('SET_SCHOOLNUM', res.data.userLogin.diyid)
          this.stuInfoContent = res.data.userLogin
          this.flag = 1
          this.$axios.get('http://zhongkeruitong.top/wechat_login/getAllInfoByDiyid?diyid=' + this.stuInfoContent.diyid).then(resp => {
            this.myInfo.schoolValue.push(resp.data.userLogin.schoolName)
            this.myInfo.levelValue.push(resp.data.userLogin.level)
            this.myInfo.grade = resp.data.userLogin.gradeLevel
            this.myInfo.class = resp.data.userLogin.className
            console.log('信息：', resp.data)
          })
          console.log(res.data)
          console.log('已经绑定~')
        } else {
          this.flag = 0
          console.log('未绑定~')
        }
      })
    },
    changeSchoolNum (val) { // 根据输入的学号，查看是否存在（是否是合作学校学生）
      this.schVerify = true
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/wechat_login/getAllInfoByDiyid',
        params: {
          // openid: this.openid,
          diyid: val
        }
      }).then(res => {
        console.log('===0?', res.data.errno === 0)
        console.log('===0?', this.schVerify)
        if (res.data.errno === 0) {
          // const a = res.data.data
          // this.schoolValue = [res.data.data.schoolName]
          // this.levelValue = [res.data.data.gradeName]
          // this.className = res.data.data.className
          if (this.$store.state.lineCourse.school_number_temp !== '') {
            this.schVerify = false
            this.schoolMember = 2
          } else {
            this.schoolMember = 1
          }
          // console.log('cunzai:', a, res.data)
        } else {
          this.schoolMember = 0
        }
        this.init()
      })
      console.log('学号变化：', val)

      // this.$axios({
      //   method: 'get',
      //   url: 'http://zhongkeruitong.top/score_analysis/scoreTwo/verifyStudentId',
      //   params: {
      //     openid: this.openid,
      //     verifyStudentId: val
      //   }
      // }).then(res => {
      //   if (res.data.code === 0) {
      //     // const a = res.data.data
      //     // this.schoolValue = [res.data.data.schoolName]
      //     // this.levelValue = [res.data.data.gradeName]
      //     // this.className = res.data.data.className
      //     this.schoolMember = 1
      //     // console.log('cunzai:', a, res.data)
      //   } else {
      //     this.schoolMember = 0
      //   }
      // })
      // console.log('学号变化：', val)
    },
    // checkPassword (val) {
    //   console.log('xixixiiixixiix', val)
    // },
    confirmPassword () { // 验证密码
      window.scroll(0, 0)
      if (this.passwod !== this.passwd) {
        // console.log('bupipei')
        this.$vux.alert.show({
          title: '警告',
          content: '两次密码不一致'
        })
      }
    },
    onShow () {
      console.log('showschool:', this.schoolValue)
      console.log('showlevel:', this.levelValue)
    },
    onHide () {
      console.log('hide:', this.schoolValue)
      console.log('hidelevel:', this.levelValue)
    },
    onChange (val) {
      console.log('change:', val)
    },
    onHideAlert () {
      this.schoolMember = 2
    },
    bindUser () { // 绑定合作学校用户
      var agree = document.querySelector('.agreeStatement') // 点击完已经阅读免责条款才可绑定成功
      if (agree.children[0].className === 'iconfont icon_luluduigoukuang1') {
        // this.$store.commit('SET_SCHOOLNUM', this.schoolNum)
        localStorage.setItem('SET_SCHOOLNUM', this.schoolNum)
        this.$axios({
          method: 'post',
          url: 'http://zhongkeruitong.top/wechat_login/rest/userRegister',
          params: {
            wechatId: this.openid,
            initialPassword: this.schoolPasswod,
            diyid: this.schoolNum
          }
        }).then(res => {
          if (res.data.errno === 0) {
            this.$vux.toast.text(res.data.errmsg)
            // 绑定完账号以后，flag=1，展示已经绑定完的信息
            this.flag = 1
            this.stuInfoContent.diyid = this.schoolNum
            this.$axios.get('http://zhongkeruitong.top/wechat_login/getAllInfoByDiyid?diyid=' + this.schoolNum).then(resp => {
              this.myInfo.schoolValue.push(resp.data.userLogin.schoolName)
              this.myInfo.levelValue.push(resp.data.userLogin.level)
              this.myInfo.grade = resp.data.userLogin.gradeLevel
              this.myInfo.class = resp.data.userLogin.className
              localStorage.setItem('SET_LEVEL_NAME', resp.data.userLogin.gradeLevel)
            })
          } else {
            const msg = res.data.errmsg
            this.$vux.toast.text(msg)
            console.log('成功：', msg)
          }
        })
      }
    },
    bindOutUser () { // 绑定非合作学校用户
      var agree = document.querySelector('.agreeStatement') // 点击完已经阅读免责条款才可绑定成功
      if (agree.children[0].className === 'iconfont icon_luluduigoukuang1') {
        // this.$store.commit('SET_SCHOOLNUM', this.schoolNum)
        localStorage.setItem('SET_SCHOOLNUM', this.schoolNum)
        this.$axios({
          method: 'post',
          url: 'http://zhongkeruitong.top/wechat_login/rest/userRegister',
          params: {
            wechatId: this.openid,
            initialPassword: this.passwod,
            diyid: this.schoolNum,
            schoolName: this.schoolValue[0],
            grade: this.startYear,
            className: this.className,
            levle: this.levelValue[0]
          }
        }).then(res => {
          const msg = res.data.errmsg
          this.$vux.toast.text(msg)
          // 绑定完账号以后，flag=1，展示已经绑定完的信息
          this.flag = 1
          this.stuInfoContent.diyid = this.schoolNum
          this.$axios.get('http://zhongkeruitong.top/wechat_login/getAllInfoByDiyid?diyid=' + this.schoolNum).then(resp => {
            this.myInfo.schoolValue.push(resp.data.userLogin.schoolName)
            this.myInfo.levelValue.push(resp.data.userLogin.level)
            this.myInfo.grade = resp.data.userLogin.gradeLevel
            this.myInfo.class = resp.data.userLogin.className
            localStorage.setItem('SET_LEVEL_NAME', resp.data.userLogin.gradeLevel)
            console.log('信息：', resp.data)
          })
          console.log('成功：', msg)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .bind_account_info {
    /*width: 100%;*/
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
  .bindAccount {
    /*height: calc(100% - 50px);*/
    /*overflow: hidden;*/
  }
  .bind_account_second {
    /*width: 100%;*/
    margin-top: 15px;
    margin-bottom: 20px;
    /*padding: 10px 13px;*/
  }
  .bind_school {
    border-bottom: 1px solid #e9e9e9;
    margin: 0 14px;
  }
  .agreeStatement {
    margin-top: 15px;
    margin-left: 28px;
    position: relative;
    span {
      color: #3c3c3c;
      font-size: 14px;
      margin-left: 22px;
      /*position: absolute;*/
    }
    .icon_lulukuang- {
      font-size: 18px;
      position: absolute;
      top: 0;
      margin-right: 15px;
    }
    .icon_luluduigoukuang1 {
      color: #f43530;
      position: absolute;
    }
  }
  /*.icon_lulukuang- {*/
  /*  margin-top: 20px;*/
  /*  margin-left: 28px;*/
  /*}*/
  .my_info_first_item {
    /*padding-left: 15px;*/
    margin-left: 15px;
    margin-top: 10px;
    padding: 10px 15px;
    /*background-color: #fff;*/
    /*height: 56px;*/
    /*line-height: 50px;*/
    border-bottom: 1px solid #e9e9e9;
    .city {
      color: #7c7c7c;
      float: right;
      margin-right: 13px;
    }
    .iconfont {
      margin-left: 3px;
      font-size: 13px;
      color: #c8c8cd;
      font-weight: bolder;
    }
  }
  .vux-cell-box:not(:first-child):before {
    border-top: 0;
  }
  .vux-calendar:before {
    border-top: 0;
  }
  .weui-cell:before{
    border-top: 0;
    /*border-bottom: 1px solid #D9D9D9;*/
  }

  .bind_school_button {
    margin-top: 10px;
    width: 85%;
    border-radius: 99px;
    border-color: rgba(66,185,130, 0.9);
    /*background-color: #42b982;*/
    background-color: rgba(66,185,130, 0.9);
    color: #fff;
  }
  .bind_school_button_disAgree {
    margin-top: 10px;
    width: 85%;
    border-radius: 99px;
    border-color: #ececec;
    /*background-color: #42b982;*/
    background-color: #ececec;
    color: #fff;
  }
  .bind_school_tip {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 13px;
    color: #999;
  }
</style>
