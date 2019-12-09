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
          <selector placeholder="请选择科目" v-model="selectSub" title="科目" direction="rtl" :options="subList" @on-change="onChange"></selector>
          <x-input title="分数" required v-model="score" @on-blur="losePoint(score)" text-align="right" placeholder="请输入分数"></x-input>
          <x-input title="班排" required v-model="classPai" @on-blur="losePoint(classPai)" text-align="right" placeholder="请输入班排"></x-input>
          <x-input title="年排" required v-model="schoolPai" @on-blur="losePoint(schoolPai)" text-align="right" class="enter_grade_input" placeholder="请输入年排"></x-input>
        </div>
        <div class="addSingleSubScoreInfo_third">
          <p>试卷图片（最多可上传九张照片）</p>
          <!--照片区域-->
          <div class="addSingleSubScoreInfo_third_camera" v-for="(urls, index) in imgs" :key="index">
            <!--        <div style="text-align: right; position: relative;" v-on:click="deleteImg(index)">X</div>-->
            <img :src="urls"/>
          </div>
          <label>
            <div class="aSSSI_third_camera_add"  v-on:click="imgClick()">
              <i class="iconfont icon_luluxiangji3"></i>
            </div>
            <input type="file" id="uploadFile" accept="image/*" v-on:change="readLocalFile()">
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
export default {
  data () {
    return {
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
      imgsList: [], // 所有图片链接-传给梦良的
      files: '',
      aSSSIScroll: null,
      submitList: []
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
    console.log('考试名称：', this.$store.state.exam.examination)
    // this.subList = localStorage.SET_SUBJECTS_LIST
    // localStorage.setItem('single_Score_List', this.submitList)
    console.log('localStorage.SET_SUBJECTS_LIST', this.$store.state.exam.enterScoreList)
    if (this.$route.params.remainSub.length > 0) {
      this.subList = this.$route.params.remainSub
    }
    console.log(this.$route.params.editContent)
    if (this.$route.params.editContent.class_rank.length > 0) {
      this.imgs = this.$route.params.editContent.imgs
      console.log('time', typeof this.$route.params.editContent.exam_time)
      // this.examTime = this.$route.params.editContent.exam_time
      // this.showTime = false
      // this.$nextTick(() => {
      //   this.showTime = true
      // })
      // this.examTime = this.$route.params.editContent.exam_time
      // this.examName = this.$route.params.editContent.exam_name
      this.selectSub = this.$route.params.editContent.subject_name
      this.score = this.$route.params.editContent.score
      this.classPai = this.$route.params.editContent.class_rank
      this.schoolPai = this.$route.params.editContent.grade_rank
    } else {
      this.imgs = []
      // this.examTime = ''
      // this.examName = ''
      this.selectSub = ''
      this.score = ''
      this.classPai = ''
      this.schoolPai = ''
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      this.$nextTick(() => {
        this.aSSSIScroll = new BScroll(this.$refs.aSSSI_second, {
          click: true
        })
      })
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
      document.getElementById('uploadFile').click()
    },
    // 点击选中图片
    readLocalFile: function () {
      var localFile = document.getElementById('uploadFile').files[0]
      console.log('localfile', localFile)
      var reader = new FileReader()
      var content
      var current = this
      reader.onload = function (event) {
        content = event.target.result
        current.imgs.push(content) // 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
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
          console.log(a)
          this.imgsList.push(a)
        } else {
          alert('失败')
        }
      })
      const sss = document.getElementById('uploadFile').value
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
      if (this.score === '' || this.classPai === '' || this.schoolPai === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '分数或班排或年排必填！'
        })
      } else {
        if (this.$store.state.exam.enterScoreList.length > 0) {
          for (const item in this.$store.state.exam.enterScoreList) {
            this.submitList.push(this.$store.state.exam.enterScoreList[item])
          }
        }
        console.log(this.examTime)
        console.log(typeof this.examTime)
        // const rightTimeList = this.examTime.split('-')
        // const rightT = rightTimeList[0] + '年' + rightTimeList[1] + '月'
        // console.log(this.examName, rightT, this.selectSub, this.score, this.classPai, this.schoolPai)
        const grade = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examination, 'imgs': this.imgsList}
        // const grade = {'wechat_openid': this.openid, 'student_number': this.schoolNumber, 'subject_name': this.selectSub, 'score': this.score, 'class_rank': this.classPai, 'grade_rank': this.schoolPai, 'exam_name': this.examName, 'exam_time': this.examTime, 'imgs': this.imgsList}
        for (const single in this.submitList) {
          if (this.submitList[single].subject_name === grade.subject_name) {
            console.log(single)
            this.submitList.splice(single, 1) // splice函数参数介绍：第一个参数： 对于数数组的操作起始位置。第二个参数： 从第一个参数开始，删除数组中的个数。从第三个参数之后所有参数（如果有）：执行完第二步之后，都插入到第一个参数的起始位置处。
          }
        }
        this.submitList.push(grade)
        console.log('indexof:', this.subList.indexOf(this.selectSub))
        this.subList.splice(this.subList.indexOf(this.selectSub), 1)
        console.log('还剩什么科目：', this.subList)
        this.$store.commit('SET_SUBJECTS_LIST', this.subList)
        // localStorage.setItem('SET_SUBJECTS_LIST', this.subList)
      }
      // if (this.$store.state.exam.enterScoreList.length > 0) {
      //   for (const item in this.$store.state.exam.enterScoreList) {
      //     this.submitList.push(this.$store.state.exam.enterScoreList[item])
      //   }
      // }
      console.log('添加单科成绩成功', this.submitList)
      this.$store.commit('single_Score_List', this.submitList)
      // this.$store.dispatch('single_Score_List', this.submitList)
      this.$router.push('/addScore')
      this.submitList = []
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
      width: 100px;
      height: 100px;
    }
  }
  .aSSSI_third_camera_add {
    width: 100px;
    height: 100px;
    background-color: #ececec;
    /*border:1px solid #ccc;*/
    position: relative;
    float: left;
    margin: 15px 5px 35px;
  }
  .icon_luluxiangji3 {
    color: #42b983;
    font-size: 40px;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin-top: 50%;
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
</style>
