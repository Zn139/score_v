<template>
  <div class="chapter_list_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">章节练习</div>
      <div class="subject">{{selectsub}}</div>
    </div>
    <div v-if="chapterList.length === 0" class="noData">
      暂未提供练习题
    </div>
    <div class="chapter_list_second" v-if="chapterList.length > 0">
      <div v-for="(item, index) in chapterList" :key="index" class="chapter_list_second_info">
        <div class="record_year_name">
          <div class="record_year_sty" @click="getAllSections(item)">
            <div class="record_year_sty_name">{{item.name}}</div>
            <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
            <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
          </div>
          <div class="year-sub" v-show="item.show">
            <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
              <div class="month-item-name">
                <div class="month-item_sty" @click="getExamInfo(sub)">
<!--                <div class="month-item_sty" @click="getExamInfo(item.name + '\\n' + sub)">-->
                  <!--                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">-->
                  <span>{{sub}}</span>
                </div>
              </div>
            </div>
          </div>
<!--        <div @click="getAllSections(item)">{{item.name}}</div>-->
        </div>
<!--      <div @click="gotoExercise">第1节 细胞膜的结构和功能</div>-->
      </div>
    </div>
  </div>
</template>
<script>
import {getChapter, getSection} from '@/api/index'
export default {
  data () {
    return {
      chapterList: [],
      sectionList: [],
      // subject: '生物'
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    },
    selectsub () {
      return localStorage.SET_SELECT_SUB
      // return this.$store.state.lineCourse.select_sub
    },
    levelName () { // 年级
      return localStorage.SET_LEVEL_NAME
    }
  },
  mounted () {
    // this.getUserInfo()
    this.getChapter()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
      // this.$router.go(-1)
    },
    // gotoExercise () {
    //   this.$router.push('/chapterExercise')
    // },
    getChapter () { // 获取所有章
      console.log('所有章', this.selectsub)
      getChapter({
        levelName: this.levelName,
        subject: this.selectsub
      }).then(res => {
        console.log('章节：', res.data)
        if (res.data.code === 0) {
          this.chapterList = res.data.data.map((item, index) => {
            return {
              show: false,
              index: index,
              name: item,
              children: []
            }
          })
          console.log('章')
        }
      })
    },
    getAllSections (item) { // 获取所有节
      if (!this.chapterList[item.index].show) {
        getSection({
          levelName: this.levelName,
          chapter: item.name,
          subject: this.selectsub
        }).then(res => {
          this.chapterList[item.index].children = []
          this.sectionList = res.data.data
          for (const j in this.sectionList) {
            this.chapterList[item.index].children.push(this.sectionList[j])
          }
          this.chapterList[item.index].show = true
        })
      } else {
        this.chapterList[item.index].show = false
      }
    },
    getExamInfo (val) { // 获取一节的题
      this.$router.push({
        path: '/chapterExercise',
        query: {
          paperName: val,
          sub: this.selectsub
          // subject: this.selectsub
        }
      })
      // getOneSectionQues({
      //   paperName: val,
      //   subject: this.subject
      // }).then(res => {
      //   console.log(res.data)
      // })
    }
    // getExamInfo (val) { // 获取一节的题
    //   this.$router.push({
    //     name: 'chapterExercise',
    //     params: {
    //       paperName: val,
    //       // subject: this.selectsub
    //     }
    //   })
    //   // getOneSectionQues({
    //   //   paperName: val,
    //   //   subject: this.subject
    //   // }).then(res => {
    //   //   console.log(res.data)
    //   // })
    // }
  }
}
</script>
<style scoped lang="scss">
  .chapter_list_info {
    height: 100%;
    width: 100%;
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
    /*text-align: center;*/
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .subject {
    position: absolute;
    top: 3px;
    right: 15px;
    color: #fff;
    font-size: 14px;
  }
  .chapter_list_second_info {
    text-align: left;
    /*height: 40px;*/
    width: 85%;
    position: relative;
    margin-top: 15px;
    margin-left: 50%;
    padding-left: 15px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border: 2px #ececec solid;
    /*border-radius: 10px;*/
  }
  .record_year_sty {
    width: 100%;
    padding-top: 8px;
    .iconfont {
      float: right;
      margin-right: 10px;
      /*text-align: right;*/
    }
  }
  .record_year_sty_name {
    /*float: left;*/
    /*width: 20%;*/
    display: inline-block;
  }
  .year-sub {
    transition: all .2s;
    padding: 8px 10px 0;
  }
  .month-item-name {
    /*background-color: pink;*/
    min-height: 40px;
    /*position: relative;*/
  }
  .month-item_sty {
    padding-left: 15px;
    padding-top: 10px;
    font-size: 14px;
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border-bottom: 1px solid #ececec;
    /*border-radius: 10px;*/
  }
  .name_item_info {
    padding-bottom: 10px;
  }
  .noData {
    margin-top: 15%;
    text-align: center;
    color: #9c9c9c;
  }
</style>
