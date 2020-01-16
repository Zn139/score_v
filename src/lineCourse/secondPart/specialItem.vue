<template>
  <div class="specialItem_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">专项练习</div>
    </div>
    <div class="specialItem_second">
      <div class="specialItem_seconde_title">
        年级： 高一
        <x-button class="special_second_title_button">{{subject_online}}</x-button>
      </div>
      <div class="specialItem_second_summary">
        <div class="menu-icon_1" @click="gotoPage('hisAnalysis')">
          <div class="icon-bac left">
            <i class="iconfont icon_luluyicuoti"></i>
          </div>
          <div class="icon-text">易错题</div>
        </div>
        <div class="menu-icon_1" @click="gotoPage('hisAnalysis')">
          <div class="icon-bac right">
            <i class="iconfont icon_lulunanti"></i>
          </div>
          <div class="icon-text">难题</div>
        </div>
      </div>
      <div class="specialItem_second_third">
        <div class="line-second-first_title">
          <i class="iconfont icon_lulufengefu"></i><strong>知识点</strong>
          <span><i class="iconfont icon_lulushixinyuan"></i>为易错知识点</span>
        </div>
        <div class="specialItem_second_third_content" v-for="(item,index) in chapterList" :key="index">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllSections(item)">
              <div class="record_year_sty_name">{{item.name}}<span v-if="item.num !== 0">{{item.num}}</span></div>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="getKnowledgeInfo(item.name, sub.key)">
                    <div class="serialNum"><span>{{inde + 1}}</span></div>
                    <div class="knowledge_title">
                      <span>{{sub.key}}</span>
                      <span>{{sub.value}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getKnowledgeNumByChapter, getKnowledgeNum} from '@/api/index'
export default {
  data () {
    return {
      chapterInfo: [], // 章节返回的信息
      chapterList: [],
      knowledegInfo: [],
      knowledgeList: []
    }
  },
  computed: {
    subject_online () {
      return this.$store.state.lineCourse.select_sub
    },
    openid () {
      return this.$store.state.exam.openid
    },
    schoolNumber () {
      return this.$store.state.exam.schoolNum
    },
    levelName () { // 年级
      return this.$store.state.lineCourse.levelName
    }
  },
  mounted () {
    this.getKnowledgenumByChapter()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'lineCourse'})
    },
    getKnowledgenumByChapter () { // 获取所有的章节
      getKnowledgeNumByChapter({
        subject: this.subject_online,
        levelName: this.levelName
      }).then(res => {
        this.chapterInfo = []
        if (res.data.code === 0) {
          if (Object.keys(res.data.data).length > 0) {
            for (const item in Object.keys(res.data.data)) {
              const val = {'key': Object.keys(res.data.data)[item], 'value': res.data.data[Object.keys(res.data.data)[item]]}
              this.chapterInfo.push(val)
            }
          }
        }
        this.chapterList = this.chapterInfo.map((item, index) => {
          return {
            show: false,
            index: index,
            name: item.key,
            num: item.value,
            children: []
          }
        })
        console.log(this.chapterList)
      })
    },
    getAllSections (chapter) { // 获取章节下面的知识点
      if (!this.chapterList[chapter.index].show) {
        getKnowledgeNum({
          subject: this.subject_online,
          levelName: this.levelName,
          chapter: chapter.name
        }).then(res => {
          this.knowledegInfo = []
          if (res.data.code === 0) {
            for (const item in Object.keys(res.data.data)) {
              const val = {'key': Object.keys(res.data.data)[item], 'value': res.data.data[Object.keys(res.data.data)[item]]}
              this.knowledegInfo.push(val)
            }
            this.chapterList[chapter.index].children = []
            for (const i in this.knowledegInfo) {
              const b = {'key': this.knowledegInfo[i].key, 'value': this.knowledegInfo[i].value}
              this.chapterList[chapter.index].children.push(b)
            }
            this.chapterList[chapter.index].show = true
          }
          console.log('知识点', res.data.data)
        })
      } else {
        this.chapterList[chapter.index].show = false
      }
    },
    getKnowledgeInfo (chapter, knowledge) { // 点击知识点，跳转
      this.$router.push({
        name: 'specialKnowledgeInfo',
        params: {
          chapter: chapter,
          knowledge: knowledge
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .specialItem_info {
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
  .specialItem_second {
    /*padding: 0 15px;*/
  }
  .specialItem_seconde_title {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
  }
  .special_second_title_button {
    display: inline-block;
    width: 30%;
    /*text-align: center;*/
    margin-left: 10%;
    color: #fff;
    font-size: 16px;
    background-color: #42b982;
  }
  .specialItem_second_summary {
    height: 90px;
    background-color: #fff;
    padding: 0 5%;
    .menu-icon_1 {
      margin: 13px 0 30px;
      width: 49%;
      display: inline-block;
      text-align: center;
      border-radius: 50%;
    }
    .icon-text{
      font-size: 12px;
      color: #454545;
      padding-top: 6px;
    }
    .icon_luluyicuoti {
      font-size: 20px;
    }
    .icon_lulunanti {
      font-size: 23px;
    }
    .icon-bac {
      margin: 0 auto;
      width: 42px;
      height: 42px;
      color: #fff;
      border-radius: 40px;
      /*background-color: rgb(128, 128, 255);*/
      line-height: 42px;
    }
    .left {
      background-color: rgba(128, 128, 255, 0.8);
    }
    .right {
      background-color: rgba(236, 128, 141, 0.8);
    }
  }
  .specialItem_second_third {
    margin-top: 10px;
    background-color: #fff;
  }
  .line-second-first_title {
    padding: 5px 15px 3px;
    border-bottom: 1px solid #ccc;
    line-height: 25px;
    height: 25px;
    .icon_lulufengefu {
      font-weight: bold;
    }
    span {
      float: right;
      font-size: 14px;
      /*height: 23px;*/
      /*line-height: 23px;*/
      .icon_lulushixinyuan {
        margin-right: 5px;
        color: #f43530;
        font-size: 15px;
        padding-top: 3px;
      }
    }
  }
  .specialItem_second_third_content {
    margin: 5px 0 5px 25px;
    /*padding: 5px 0 5px 25px;*/
    padding-bottom: 5px;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
  }
  .record_year_sty {
    width: 100%;
    padding-top: 8px;
    .iconfont {
      float: right;
      margin-right: 15px;
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
  .serialNum {
    /*margin: 0 auto;*/ /*整个圈区中*/
    text-align: center; /*文字居于圈的中间*/
    height: 18px;
    width: 18px;
    line-height: 18px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(66, 185, 130, 0.7);
    font-size: 11px;
    display: inline-block;
    /*position: relative;*/
  }
  .knowledge_title {
    display: inline-block;
    span:nth-child(2) {
      /*float: right;*/
    }
  }
</style>
