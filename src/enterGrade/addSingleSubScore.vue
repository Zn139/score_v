<template>
  <div class="addSingleSubScoreInfo">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">成绩信息</div>
    </div>
    <div ref="aSSSI_second" class="aSSSI_second">
      <div>
        <div class="addSingleSubScoreInfo_second">
<!--          <datetime v-model="examTime" title="考试时间" class="enter_grade_time"  placeholder="请选择考试时间" v-if="showTime"></datetime>-->
<!--          <x-input title="考试名称" name="username" placeholder="请输入考试名称" text-align="right" placeholder-align="right" v-model="examName"></x-input>-->
          <selector placeholder="请选择考试科目" v-model="selectSub" title="科目" direction="rtl" :options="subList" @on-change="onChange"></selector>
          <x-input title="分数" required v-model="score" @on-blur="losePoint(score)" text-align="right" placeholder="请输入考试分数"></x-input>
          <x-input title="班排" required v-model="classPai" @on-blur="losePoint(classPai)" text-align="right" placeholder="请输入班级排名"></x-input>
          <x-input title="年排" required v-model="schoolPai" @on-blur="losePoint(schoolPai)" text-align="right" class="enter_grade_input" placeholder="请输入年级排名"></x-input>
        </div>
        <div class="addSingleSubScoreInfo_third">
          <p>试卷图片（最多可上传九张照片）</p>
          <div class="xie" v-for="(url, key) in imgs" :key="key"  @click="$preview($event, imgs, key)" :style="{'backgroundImage': 'url(' + url + ')'}">
            <div class="delete" @click.stop="deleteImg(index)">×</div>
          </div>
<!--          <div class="box" v-for="(url,key) in imgs" :key="key">-->
<!--            <div class="delete" @click="deleteImg(index)">×</div>-->
<!--            <img :src="url" alt="" class="user wc-preview-img" @click="$preview($event, imgs, key)">-->
<!--          </div>-->
          <!--照片区域-->
<!--          <div class="addSingleSubScoreInfo_third_camera" v-for="(urls, index) in imgs" :key="index">-->
<!--            <div class="delete" @click="deleteImg(index)">×</div>-->
<!--&lt;!&ndash;                    <div style="text-align: right; position: absolute;" v-on:click="deleteImg(index)">X</div>&ndash;&gt;-->
<!--            <img :src="urls" @click="$preview($event, imgs, index)"/>-->
<!--          </div>-->
<!--          <viewer :images="imgs" class="xie">-->
<!--&lt;!&ndash;            <div class="delete" @click="deleteImg(index)">×</div>&ndash;&gt;-->
<!--            <img v-for="src in imgs" :src="src" :key="src" width="100">-->
<!--          </viewer>-->
          <label v-if="iphoneTypeIOS">
            <div class="aSSSI_third_camera_add" v-on:click="imgClick()">
              <i class="iconfont icon_luluxiangji5"></i>
              <div class="uploadImg">点击上传图片</div>
            </div>
            <input type="file" class="uploadFile" accept="image/*" v-on:change="readLocalFile()">
          </label>
          <label v-else>
            <div class="aSSSI_third_camera_add">
              <i class="iconfont icon_luluxiangji5"></i>
              <div class="uploadImg">点击上传图片</div>
            </div>
            <input type="file" class="uploadFile" accept="image/*" v-on:change="readLocalFile()">
          </label>
          <x-button class="enter_submit" @click.native="submitSingleSubScore">保存</x-button> <!--保存一门学科成绩-->
          <!--      <label> &lt;!&ndash; label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。&ndash;&gt;-->
          <!--        <i class="iconfont icon_luluxiangji3"></i>-->
          <!--        <input type="file" id="uploadFile" accept="image/*" v-on:change="readLocalFile()">-->
          <!--      </label>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { getEditEnter } from '@/api/index'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
  data () {
    return {
      iphoneTypeIOS: false,
      showTime: true, // 考试时间的显示
      // showSubject: true, // 考试科目的显示
      examTime: '',
      examName: '',
      subList: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      selectSub: '',
      score: '',
      classPai: '',
      schoolPai: '',
      imgs: [], // 所有图片base64码，展示在页面的
      // imgsList: [], // 所有图片链接-传给梦良的
      imgsList: '', // 所有图片链接-传给梦良的
      imgsListW: [], // 所有图片链接-传给我自己的
      files: '',
      aSSSIScroll: null,
      submitList: [],
      submitListW: [], // 给我自己前端传的
      editContent: [], // 现在编辑传过来的所有的值
      id: 0
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    },
    examination () {
      return this.$store.state.exam.examination
    }
    // examname () {
    //   if (this.$store.state.exam.exam_name !== '') {
    //     // console.log(1111111111111111)
    //     return this.$store.state.exam.exam_name
    //   } else if (localStorage.SET_EXAM_NAME !== '') {
    //     return localStorage.SET_EXAM_NAME
    //   } else {
    //     return this.$route.params.exam_name
    //   }
    // }
  },
  mounted () {
    this.init()
    this.getIOS()
    this.getInfos()
  },
  methods: {
    fn (e, list, key) {
      // console.log(this, this.$event)
      this.$refs.view.open(e, list, key)
    },
    returnBack () {
      if (this.$route.params.type === 2) {
        this.$router.push({
          name: 'examInfo',
          params: {
            fullName: this.editConten.examName
          }
        })
      } else {
        // this.$router.go(-1)
        this.$router.push('/addScore')
      }
    },
    init () {
      this.$nextTick(() => {
        this.aSSSIScroll = new BScroll(this.$refs.aSSSI_second, {
          click: true
        })
      })
    },
    getIOS () {
      // const ua = navigator.userAgent.toLowerCase()
      // console.log('机型：', ua)
      // if (ua.match(/iPhone\sOS/i) === 'iphone os') {
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        this.iphoneTypeIOS = true
      } else {
        this.iphoneTypeIOS = false
      }
      console.log(this.iphoneTypeIOS)
    },
    getInfos () {
      if (this.$route.params.type === 0) { // 添加成绩
        if (this.$route.params.times === 'first') {
          console.log('难道不是首次')
          this.subList = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
        } else if (this.$route.params.times === 'more') {
          if (this.$route.params.remainSub.length > 0) { // 剩余的科目
            this.subList = this.$route.params.remainSub
          }
        }
      } else if (this.$route.params.type === 1) { // 正在录入成绩编辑
        console.log('正在录入编辑：', this.$route.params)
        if (this.$route.params.remainSub.length > 0) { // 剩余的科目
          this.subList = this.$route.params.remainSub
          this.subList.push(this.$route.params.currentSub)
        }
        this.editContent = this.$route.params.allContent
        // console.log(this.editContent[0])
        this.id = this.$route.params.id
        // console.log(typeof this.id, this.editContent)
        this.imgs = this.editContent[this.id].imgs
        this.imgsListW = this.imgs
        // console.log(this.imgs, this.imgsListW)
        for (const item in this.imgs) {
          this.imgsList += this.imgs[item] + ','
        }
        this.selectSub = this.editContent[this.id].subject_name
        this.score = this.editContent[this.id].score
        this.classPai = this.editContent[this.id].class_rank
        this.schoolPai = this.editContent[this.id].grade_rank
      } else if (this.$route.params.type === 2) { // 之前成绩详情编辑
        // 要拿刀openID和考试名称，传给原来的界面
        console.log('所有信息：', this.$route.params.editContent, this.id)
        console.log('所有信息图片：', this.$route.params.editContent[this.id])
        this.id = this.$route.params.id
        this.editConten = this.$route.params.editContent[this.id].manuallyEnterGrades
        this.imgs = this.$route.params.editContent[this.id].imgurllist
        for (const item in this.imgs) {
          this.imgsList += this.imgs[item] + ','
        }
        this.selectSub = this.editConten.subjectName
        this.score = this.editConten.score
        this.classPai = this.editConten.classRank
        this.schoolPai = this.editConten.gradeRank
        if (this.$route.params.remainSub.length > 0) { // 剩余的科目
          this.subList = this.$route.params.remainSub
          this.subList.push(this.$route.params.currentSub)
        }
      }
    },
    onChange (item) {
      console.log('当前值：', item)
      console.log(this.subkemu)
    },
    // 删除图片
    deleteImg: function (index) {
      this.imgs.splice(index, 1)
    },
    // 图片click
    imgClick: function () {
      // document.getElementById('uploadFile').click()
      document.getElementsByClassName('uploadFile')[0].click()
    },
    // 点击选中图片
    readLocalFile: function () {
      // var localFile = document.getElementById('uploadFile').files[0]
      var localFile = document.getElementsByClassName('uploadFile')[0].files[0]
      console.log('localfile', localFile)
      var reader = new FileReader()
      var content
      var current = this
      reader.onload = function (event) {
        content = event.target.result
        current.imgs.push(content) // 获取图片base64代码
      }
      // reader.onerror = function (event) {
      //   alert('error')
      // }
      content = reader.readAsDataURL(localFile, 'UTF-8')
      // console.log('img', this.imgs)
      const params = new window.FormData()
      params.append('file1000', localFile)
      params.append('uploader', 'cll')
      this.$axios({
        method: 'post',
        url: 'http://47.93.225.12:8081/uploadfile',
        data: params
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          // alert(res.data.filemap[0])
          alert('成功')
          console.log('heheheh', res.data)
          const a = 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + res.data.filemap[0].fastdfspath
          // console.log(a)
          // console.log('wwwwww', this.imgsList)
          // console.log('asdsadsdfdsfsdfsdfgfhfjkjkjl', this.imgsListW)
          this.imgsList += a + ','
          this.imgsListW.push(a)
          // this.imgsList.push(a)
        } else {
          alert('失败')
        }
      })
      const sss = document.getElementsByClassName('uploadFile')[0].value
      // const sss = document.getElementById('uploadFile').value
      console.log(sss)
    },
    losePoint (val) {
      if (val === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '这是必填项！'
        })
      }
    },
    submitSingleSubScore () {
      if (this.$route.params.type === 2) { // 之前录入编辑
        console.log('图片：', this.imgsList)
        getEditEnter({
          stuNumber: this.editConten.studentNumber,
          openid: this.editConten.wechatOpenid,
          oldexamName: this.editConten.examName,
          subject: this.editConten.subjectName,
          subjectName: this.selectSub,
          score: this.score,
          classRank: this.classPai,
          gradeRank: this.schoolPai,
          examName: this.editConten.examName,
          imgs: this.imgsList
        }).then(res => {
          // this.subList.splice(this.subList.indexOf(this.selectSub), 1)
          // console.log('还剩科目：', this.subList)
          // console.log(res.data)
          this.$router.push({
            name: 'examInfo',
            params: {
              fullName: this.editConten.examName
            }
          })
        })
        // this.$router.push('/examInfo')
      } else if (this.$route.params.type === 1) { // 现在录入编辑
        console.log('kemu', this.subList)
        if (this.$store.state.exam.enterScoreList.length > 0) { // 添加当前科目之前添加的科目
          for (const item in this.$store.state.exam.enterScoreList) {
            this.submitList.push(this.$store.state.exam.enterScoreList[item])
          }
        }
        if (this.$store.state.exam.enterScoreListW.length > 0) { // 添加当前科目之前添加的科目
          for (const item in this.$store.state.exam.enterScoreListW) {
            this.submitListW.push(this.$store.state.exam.enterScoreListW[item])
          }
        }
        const gradem = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examination, 'imgs': this.imgsList}
        const gradew = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examination, 'imgs': this.imgsListW}
        // const grade_w = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examName, 'exam_time': this.examTime, 'imgs': this.imgsList}
        this.submitList.splice(this.id, 1, gradem) // splice函数参数介绍：第一个参数： 对于数数组的操作起始位置。第二个参数： 从第一个参数开始，删除数组中的个数。从第三个参数之后所有参数（如果有）：执行完第二步之后，都插入到第一个参数的起始位置处。
        this.submitListW.splice(this.id, 1, gradew) // splice函数参数介绍：第一个参数： 对于数数组的操作起始位置。第二个参数： 从第一个参数开始，删除数组中的个数。从第三个参数之后所有参数（如果有）：执行完第二步之后，都插入到第一个参数的起始位置处。
        this.subList.splice(this.subList.indexOf(this.selectSub), 1)
        console.log('还剩什么科目：', this.subList)
        this.$store.commit('SET_SUBJECTS_LIST', this.subList)
        console.log('添加单科成绩成功', this.submitList)
        this.$store.commit('single_Score_List', this.submitList) // 所有的给孟良
        this.$store.commit('single_Score_ListW', this.submitListW) // 所有的给我
        // this.$store.dispatch('single_Score_List', this.submitList)
        // this.$router.push('/addScore')
        this.$router.push({
          name: 'addScore',
          params: {
            type: 1
          }
        })
        this.submitList = []
        this.submitListW = []
      } else if (this.$route.params.type === 0) { // 添加
        // console.log('难道不是首次添加')
        // if (this.$route.params.times === 'first') {
        //   console.log('难道不是首次添加2')
        //   this.submitListW = []
        //   this.submitList = []
        //   this.subList = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
        // }
        if (this.score === '' || this.classPai === '' || this.schoolPai === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '分数或班排或年排必填！'
          })
        } else {
          if (this.$route.params.times === 'more') {
            if (this.$store.state.exam.enterScoreList.length > 0) { // 添加当前科目之前添加的科目
              for (const item in this.$store.state.exam.enterScoreList) {
                this.submitList.push(this.$store.state.exam.enterScoreList[item])
              }
            }
            if (this.$store.state.exam.enterScoreListW.length > 0) { // 添加当前科目之前添加的科目
              for (const item in this.$store.state.exam.enterScoreListW) {
                this.submitListW.push(this.$store.state.exam.enterScoreListW[item])
              }
            }
          }
          const grade = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examination, 'imgs': this.imgsList}
          const gradew = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examination, 'imgs': this.imgsListW}
          console.log('当前添加的：', grade)
          console.log('当前添加的w：', gradew)
          this.submitList.push(grade)
          this.submitListW.push(gradew)
          this.subList.splice(this.subList.indexOf(this.selectSub), 1)
          // console.log('存进去的值：', grade)
          console.log('剩余科目：', this.subList)
          this.$store.commit('SET_SUBJECTS_LIST', this.subList) // 剩余的科目
          this.$store.commit('single_Score_List', this.submitList)
          this.$store.commit('single_Score_ListW', this.submitListW)
          // this.$store.dispatch('single_Score_List', this.submitList)
          this.$router.push({
            name: 'addScore',
            params: {
              type: 0
            }
          })
          // this.$router.push('/addScore')
          this.submitList = []
          this.submitListW = []
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .addSingleSubScoreInfo {
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
  .aSSSI_second {
    margin-top: 5px;
    position: relative;
    background: #fbf9fe;
    overflow: hidden;
    padding: 10px 0;
    height: calc(100% - 50px);
  }
  .addSingleSubScoreInfo_second {
    /*margin-top: 5%;*/
    padding: 0 10px 15px;
    background-color: #fff;
  }
  .enter_grade_input {
    border-bottom: 1px solid #f4f4f4;
  }
  .addSingleSubScoreInfo_third {
    margin-top: 15px;
    padding: 10px 10px 15px 20px;
    background-color: #fff;
  }
  .addSingleSubScoreInfo_third_camera{
    float: left;
    margin: 15px 5px 0;
    /*border: 1px solid #ccc;*/
    img {
      position: relative;
      width: 100px;
      height: 100px;
    }
  }
  .aSSSI_third_camera_add {
    width: 100px;
    height: 100px;
    border: 2px dashed #bcbcbc;
    border-radius: 5px;
    /*background-color: #ececec;*/
    /*border:1px solid #ccc;*/
    position: relative;
    float: left;
    margin: 15px 5px 35px;
    .uploadImg {
      color: #bcbcbc;
      /*color: #c9c9c9;*/
      font-weight: bold;
      position: absolute;
      margin-top: 55%;
      text-align: center;
      margin-left: 14px;
      /*transform: translateX(-50%);*/
      font-size: 10px;
    }
    .icon_luluxiangji5 {
      color: #bcbcbc;
      /*font-weight: bold;*/
      /*color: #c9c9c9;*/
      font-size: 30px;
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin-top: 40%;
    }
  }
  .delete{
    /*width: 15px;*/
    /*height: 15px;*/
    /*background-color: unset;*/
    /*font-size: 10px;*/
    /*color: red;*/
    /*border: 1px solid red;*/
    /*border-radius: 50%;*/
    /*text-align: center;*/
    /*cursor: pointer;*/
    /*position: absolute;*/
    /*z-index: 1000;*/
    /*!*left: 20px;*!*/
    margin-left: 86px;
    text-align: center;
    position: absolute;
    font-size: 12px;
    /*right: 5px;*/
    /*top: 1px;*/
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1000;

    /*&:hover .delete {*/
    /*  display: inline;*/
    /*}*/
  }
  /*.icon_luluxiangji3 {
    color: #42b983;
    font-size: 40px;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin-top: 50%;
    background: #ececec;
    padding: 40px;
  }*/
  input {
    display: none;
  }
  .enter_submit {
    width: 95%;
    color: #fff;
    font-size: 16px;
    /*margin-left: 70%;*/
    margin-top: 45px;
    background-color: #42b982;
    /*opacity: 0.8;*/
    /*background-color: rgba(66, 185, 130, 0.3);*/
  }
  .xie {
    float: left;
    margin: 15px 5px 0;
    height: 100px;
    width: 100px;
    background-position: center center;

    background-size:cover;
    display: inline-block;
    img {
      float: left;
      margin: 15px 5px 0;
      position: relative;
    }
    /*float: left;*/
  }
  .user {
    height: 100px;
    width: 100px;
  }
  /*.wc-preview-img {*/
  /*  transform-origin: left top;*/
  /*  transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);*/
  /*}*/
  .box {
    /*position: fixed;*/
    /*overflow-y: scroll;*/
    /*touch-action: pan-y;*/
    /*-webkit-overflow-scrolling: touch;*/
    float: left;
    margin: 15px 5px 0;
    position: relative;
  }
</style>
