<template>
  <div class="my_info_detail">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">我的资料</div>
    </div>
    <div class="my_info_detail_second" ref="my_info_detail_second">
      <div>
        <div class="my_info_detail_second_normal">
          <h4>基本资料</h4>
          <x-input class="bind_school" title="真实姓名" placeholder="请输入姓名" text-align="right" placeholder-align="right" v-model="reallName"></x-input>
          <x-input class="bind_school" title="昵称" placeholder="请输入昵称" text-align="right" placeholder-align="right" v-model="nicheng"></x-input>
          <popup-radio class="bind_school" title="性别" :options="sexList" v-model="sex"></popup-radio>
          <calendar class="bind_school" v-model="startYear" title="生日"></calendar>
          <div class="my_info_first_item"  @click="toAddress">所在地区<div class="city">{{city}}<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
          <!--        <li>-->
          <!--          <div class="left">-->
          <!--            <span>所在地区</span>-->
          <!--          </div>-->
          <!--          <div class="right r">-->
          <!--            <div class="city" @click="toAddress">{{city}}</div>-->
          <!--            <i class="arrow-r"> </i>-->
          <!--          </div>-->
          <!--        </li>-->
          <v-distpicker type="mobile" @selected='selected' v-show="addInp" class="area1"></v-distpicker>
          <!--        <div class="mask" v-show="mask"></div>-->
        </div>
        <div class="my_info_detail_second_normal">
          <h4>学籍资料</h4>
          <popup-picker class="bind_school" title="学校" disabled v-model="myInfo.schoolValue" placeholder="输入学校名称"></popup-picker>
          <popup-picker class="bind_school" title="阶段" disabled v-model="myInfo.levelValue"  placeholder="选择学习阶段"></popup-picker>
          <div class="my_info_first_item" >年级<div class="city">{{myInfo.grade}}<i v-if="myInfo.grade === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
          <div class="my_info_first_item" >班级<div class="city">{{myInfo.class}}<i v-if="myInfo.class === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
          <div class="my_info_first_item" >学号<div class="city">{{myInfo.schoolNum}}<i v-if="myInfo.schoolNum === ''" class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>
        </div>
        <div class="my_info_detail_second_normal" >
          <h4>个性资料</h4>
          <p class="enter_grade_title">个性签名</p>
<!--          <div class="my_info_first_item" >个性签名<div class="city">{{city}}<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>-->
          <x-input text-align="left" placeholder="请在此输入个性签名" placeholder-align="left" v-model="signature" class="enter_grade_input"></x-input>

          <!--          <div class="my_info_first_item" >个性签名<div class="city">{{city}}<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>-->
<!--          <div class="my_info_first_item" >个性签名<div class="city">{{city}}<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>-->
<!--          <div class="my_info_first_item" >个性签名<div class="city">{{city}}<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div></div>-->
        </div>
        <div class="my_info_detail_last">
          <x-button plain class="bind_school_button" @click.native="submitMyInfo">完成</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PopupRadio } from 'vux'
import BScroll from 'better-scroll'
export default {
  components: {PopupRadio},
  data () {
    return {
      myInfo: {
        schoolValue: [],
        levelValue: [],
        grade: '',
        class: '',
        schoolNum: ''
      },
      sexList: ['男', '女'],
      sex: '',
      startYear: 'TODAY',
      reallName: '',
      nicheng: '',
      city: '请选择',
      addInp: false,
      mask: false,
      myInfoScroll: null,
      signature: '' // 个性签名
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  mounted () {
    this.init()
    this.getUserInfo()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      this.$nextTick(() => {
        this.myInfoScroll = new BScroll(this.$refs.my_info_detail_second, {
          click: true
        })
      })
    },
    submitMyInfo () {
      console.log('提交完成')
    },
    getUserInfo () {
      this.$axios.get('http://www.kgai.tech//getAllInfoByWechatId?wechatId=' + this.openid).then(res => {
        // this.myInfo.userName = res.data.userLogin.userName
        // console.log('信息：', res.data)
        this.myInfo.schoolNum = res.data.userLogin.diyid
        this.$axios.get('http://www.kgai.tech/getAllInfoByDiyid?diyid=' + this.myInfo.schoolNum).then(resp => {
          this.myInfo.schoolValue.push(resp.data.userLogin.schoolName)
          this.myInfo.levelValue.push(resp.data.userLogin.level)
          this.myInfo.grade = resp.data.userLogin.gradeLevel
          this.myInfo.class = resp.data.userLogin.className
          console.log('信息：', resp.data)
        })
        // this.myInfo.userImg = res.data.userLogin.headimgurl
      })
    },
    toAddress () {
      this.mask = true
      this.addInp = true
    },
    // 省市区三级联动
    selected (data) {
      this.mask = false
      this.addInp = false
      this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value
    }
  }
}
</script>
<style scoped lang="scss">
  .my_info_detail {
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    background: #f8f8f8;
  }
  .score_header {
    font-size: 16px;
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
  .my_info_detail_second {
    margin-top: 15px;
    position: relative;
    overflow: hidden;
    height: calc(100% - 70px);
    /*padding-bottom: 40px;*/
    /*margin-top: 10px;*/
  }
  .my_info_detail_second_normal {
    margin-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    padding-top: 8px;
    background-color: #fff;
    h4 {
      margin-left: 15px;
    }
  }
  .bind_school {
    /*margin-top: 10px;*/
    border-bottom: 1px solid #e9e9e9;
    margin: 10px 14px 0;
  }
  .weui-cell:before{
    border-top: 0;
  }
  .vux-calendar:before {
    border-top: 0;
  }
  .vux-cell-box:not(:first-child):before {
    border-top: 0;
  }
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
  /*li{*/
  /*  list-style: none;*/
  /*}*/
  .area1{
    width: 100%;
    height: 35%;
    position:fixed;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .distpicker-address-wrapper .address-header ul {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
  }
  .enter_grade_input {
    border-bottom: 1px solid #e9e9e9;
    padding-left: 20px;
    /*margin-bottom: 40px;*/
  }
  .enter_grade_title {
    padding: 10px 15px 0 25px;
    margin-top: 5px;
  }
  .bind_school_button {
    margin-top: 25px;
    /*margin-bottom: 25px;*/
    width: 85%;
    border-radius: 99px;
    border-color: rgba(66,185,130, 0.9);
    /*background-color: #42b982;*/
    background-color: rgba(66,185,130, 0.9);
    color: #fff;
  }
  .my_info_detail_last {
    height: 80px;
  }
</style>
