<template>
  <div>
    <div class="content">
<!--      <span class="title">2019年期中考试</span>-->
<!--      <i class="iconfont icon_luluadd" @click="add"></i>-->
<!--      <span class="title" v-if="exam[0]">{{exam[0]}}</span>-->
      <div class="second_screen_title">
<!--      <div class="second_screen_title" v-if="list3.length > 0">-->
<!--        <popup-picker class="second_screen_xiala" :data="list3" :columns="3" v-model="exam" ref="picker3" @on-change="showChange()" show-name :placeholder="'20'+ allExam"></popup-picker>-->
        <popup-picker class="second_screen_xiala" :data="[examList]" v-model="exam" @on-change="showChange" @on-show="showExam" :placeholder="exam[0]" @on-hide="hideExam"></popup-picker>
      </div>
      <div class="first_dialog">
        <span class="add_score" @click="addScore">
          <i class="iconfont icon_lulujurassic_edit-form"></i>录入
        </span>

       <!--  <popover placement="bottom" @on-show="onShow" @on-hide="onHide" class="first_dialog">
          <div slot="content" class="popover-demo-content">
            <div @click="addScore" class="add_score">录入成绩</div>
            <div @click="deteScore" class="delete_score">删除成绩</div>
          </div>
          <i class="iconfont icon_luluadd" @click="add"></i>
        </popover> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Popover, PopupPicker } from 'vux'
import { getAllExam } from '@/api/index'
// import {formatDate} from '../utils/date.js'
export default {
  components: { Popover, PopupPicker },
  data () {
    return {
      exam: [],
      examList: [],
      yearLength: '',
      // showlist: true,
      list3: [],
      list31: [],
      content: [],
      allExam: [],
      changeYear: '',
      changeName: '',
      idlist: [],
      yearNew: ''
    }
  },
  mounted () {
    this.getAllExam()
  },
  methods: {
    getAllExam () {
      getAllExam().then(res => {
        const content = res.data.data
        this.exam[0] = content[content.length - 1].examName
        console.log('1111111111111', this.exam[0])
        // this.$store.commit('SET_EXAM_NAME', content[content.length - 1].examName)
        this.$store.commit('SET_EXAM_NAME', this.exam[0])
        for (const item in content) {
          this.examList.push(content[item].examName)
        }
        console.log(this.examList)
      })
    },
    // getAllExam () {
    //   getAllExam().then(res => {
    //     this.list3 = []
    //     let i = 0
    //     this.content = res.data.data
    //     // this.exam[0] = this.content[this.content.length - 1].examName
    //     this.$store.commit('SET_EXAM_NAME', this.content[this.content.length - 1].examName)
    //     for (i = 0; i < this.content.length; i++) {
    //       this.allExam = this.content[i].examName
    //       // console.log('~~~~~', this.allExam)
    //       const yearList = this.allExam.split('年')
    //       const monthList = yearList[1].split('月')
    //       if (yearList[0].length === 2) {
    //         this.idlist.push(this.content[i].id)
    //         this.yearNew = '20' + yearList[0]
    //       } else {
    //         this.yearNew = yearList[0]
    //       }
    //       if (monthList.length === 3) {
    //         monthList[1] = '月考'
    //       }
    //       // console.log('月：', monthList)
    //       const year = {
    //         name: this.yearNew + '年',
    //         value: yearList[0] + '年',
    //         parent: 0
    //       }
    //       // const year1 = {
    //       //   // name: yearList[0] + '年',
    //       //   value: this.content[i].id + ',' + yearList[0] + '年',
    //       //   // parent: 0
    //       // }
    //       // const year1 = {}
    //       const month = {
    //         name: monthList[0] + '月',
    //         value: monthList[0] + '月',
    //         parent: yearList[0] + '年'
    //       }
    //       const title = {
    //         name: monthList[1],
    //         value: monthList[1],
    //         parent: monthList[0] + '月'
    //       }
    //       if (JSON.stringify(this.list3).indexOf(JSON.stringify(year)) === -1) {
    //         // this.list31.push(year1)
    //         this.list3.push(year)
    //       }
    //       if (JSON.stringify(this.list3).indexOf(JSON.stringify(month)) === -1) {
    //         this.list3.push(month)
    //       }
    //       if (JSON.stringify(this.list3).indexOf(JSON.stringify(title)) === -1) {
    //         this.list3.push(title)
    //       }
    //     }
    //     console.log('list:', this.list3)
    //   })
    // },
    showExam () {
      console.log('qian:', this.exam)
    },
    hideExam () {
      console.log('hou:', this.exam)
      console.log(this.$store.state.exam.exam_name)
    },
    // showChange () {
    //   console.log(this.exam)
    //   // const id = parseInt(this.exam[0].split(',')[0])
    //   // if (this.idlist.indexOf(id) > -1) {
    //   //   this.changeName = '19年' + this.exam[1] + this.exam[2]
    //   // } else {
    //   //   this.changeName = this.exam[0].split(',')[1] + this.exam[1] + this.exam[2]
    //   // }
    //   this.$store.commit('SET_EXAM_NAME', this.changeName)
    // },
    showChange () {
      // console.log('改变', this.allExam)
      this.$store.commit('SET_EXAM_NAME', this.exam[0])
    },
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    },
    addScore () {
      this.$router.push('/addScore')
    },
    add () {
      console.log('点击')
    }
    // deteScore () {
    //   this.$router.push('/add')
    // }
  }
}
</script>
<style lang="scss" scoped>
  .popover-demo-content {
    padding: 5px;
    width: 65px;
  }
  .content {
    /*padding: 0;*/
    font-size: 15px;
    /*text-align: center;*/
    padding-left: 10px;
    width: 100%;
    background-color: #42b983;
    color: #fff;
    height: 40px;
    line-height: 40px;
    /*display: inline-block;*/
  }
  .iconfont{
    color: #fff;
    margin-right: 6px;
  }
  .first_dialog{
    position: absolute;
    top: 0;
    right: 4px;
    padding: 0 10px;
    color: #f3f3f3;
  }
  .second_screen_title {
    font-size: 15px;
    z-index: 100;
    padding-right: 90px;
  }
  .add_score{
    font-size: 14px;
    text-align: center;
    /*font-weight: bold;*/
  }
  .second_screen_title >>> .vux-popup-picker-select {
    position: relative;
  }
  /*.open-len {*/
  /*  width: 100px;*/
  /*}*/
  /*.close-len {*/
  /*  width: 50px;*/
  /*}*/
  .second_screen_title >>> .vux-popup-picker-placeholder {
    color: #fff;
    &:after {
      font-family: 'iconfont';
      content: '\e695';
      margin-left: 5px;
      font-weight: bold;
    }
  }
  .second_screen_title >>> .weui-cell {
    padding: 0 15px;
    display: flex;
  }
  .second_screen_title >>> .vux-popup-picker-value {
    display: inline-block;
    color: #fff;
  }
</style>
<style lang="scss">
  .second_screen_xiala {
    /*.vux-popup-picker-select {*/
    /*  !*text-align: left !important;*!*/
    /*}*/
    .vux-cell-primary,
    .vux-popup-picker-select,
    .vux-popup-picker-value {
      /*max-width: 100%;*/
    }
    .vux-popup-picker-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:after {
        font-family: 'iconfont';
        font-weight: bold;
        content: '\e695';
        margin-left: 5px;
      }
    }
    .weui-cell__ft {
      display: none;
    }
  }
</style>
