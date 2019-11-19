<template>
  <div class="bind_account_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">绑定账号</div>
    </div>
    <div class="bind_account_second">
      <x-input class="bind_school" title="学号" placeholder="请输入学号" text-align="right" placeholder-align="right" v-model="schoolNum" @on-change="changeSchoolNum"></x-input>
<!--      <x-button plain class="bind_school_button">确定</x-button>-->
    </div>
    <div v-if="schoolMember === 0">
      <popup-picker class="bind_school" title="选择学校" :data="[schoolList]" v-model="schoolValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="输入学校名称"></popup-picker>
      <popup-picker class="bind_school" title="选择阶段" :data="[levelList]" v-model="levelValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="选择学习阶段"></popup-picker>
      <calendar class="bind_school" v-model="startYear" title="入学年份"></calendar>
      <x-input class="bind_school" title="所在班级" placeholder="请输入班级名称" text-align="right" placeholder-align="right" v-model="className"></x-input>
      <div class="bind_school_tip">请设置密码，以便其他人登录</div>
      <x-input class="bind_school" type="password" title="设置密码" placeholder="请输入密码" text-align="right" placeholder-align="right" v-model="passwd"></x-input>
      <x-input class="bind_school" type="password" title="确认密码" placeholder="再次输入密码" text-align="right" placeholder-align="right" v-model="passwod" @on-blur="confirmPassword"></x-input>
      <x-button plain class="bind_school_button" @click.native="bindOutUser">完成</x-button>
    </div>
    <div class="bind_school_tip" v-if="schoolMember === 1">
<!--      <alert title="提示" @on-show="onShow" @on-hide="onHideAlert">您是学校用户，请提供初始密码验证~</alert>-->
      <alert v-model="schVerify" title="提示" @on-show="onShow" @on-hide="onHideAlert">您是学校用户，请提供初始密码验证~</alert>
<!--      若为学校购买服务器用户，提示验证初始密码-->
    </div>
    <div v-if="schoolMember === 2">
      <x-input class="bind_school" title="验证初始密码" placeholder="请输入初始密码" text-align="right" placeholder-align="right" v-model="schoolPasswod" ></x-input>
      <x-button plain class="bind_school_button" @click.native="bindUser">完成</x-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      passwd: '',
      passwod: '',
      // errorText: '',
      schoolPasswod: '', // 学校初始密码
      startYear: 'TODAY',
      schVerify: true,
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
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    changeSchoolNum (val) {
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/score_analysis/scoreTwo/verifyStudentId',
        params: {
          openid: this.openid,
          verifyStudentId: val
        }
      }).then(res => {
        if (res.data.code === 0) {
          // const a = res.data.data
          // this.schoolValue = [res.data.data.schoolName]
          // this.levelValue = [res.data.data.gradeName]
          // this.className = res.data.data.className
          this.schoolMember = 1
          // console.log('cunzai:', a, res.data)
        } else {
          this.schoolMember = 0
        }
      })
      console.log('学号变化：', val)
    },
    // checkPassword (val) {
    //   console.log('xixixiiixixiix', val)
    // },
    confirmPassword () {
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
    bindUser () {
      this.$store.commit('SET_SCHOOLNUM', this.schoolNum)
      localStorage.setItem('schoolNum', this.schoolNum)
      this.$axios({
        method: 'post',
        url: 'http://www.kgai.tech/rest/userRegister',
        params: {
          wechatId: this.openid,
          initialPassword: this.schoolPasswod,
          diyid: this.schoolNum
        }
      }).then(res => {
        const msg = res.data.errmsg
        // this.$vux.toast.text(msg)
        console.log('成功：', msg)
      })
    },
    bindOutUser () {
      this.$store.commit('SET_SCHOOLNUM', this.schoolNum)
      localStorage.setItem('SET_SCHOOLNUM', this.schoolNum)
      this.$axios({
        method: 'post',
        url: 'http://www.kgai.tech/rest/userRegister',
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
        console.log('成功：', msg)
      })
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
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .bind_account_second {
    /*width: 100%;*/
    margin-top: 15px;
    margin-bottom: 35px;
    /*padding: 10px 13px;*/
  }
  .bind_school {
    border-bottom: 1px solid #e9e9e9;
    margin: 0 14px;
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
    margin-top: 25px;
    width: 85%;
    border-radius: 99px;
    border-color: rgba(66,185,130, 0.9);
    /*background-color: #42b982;*/
    background-color: rgba(66,185,130, 0.9);
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
