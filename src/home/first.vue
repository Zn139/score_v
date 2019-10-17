<template>
  <div>
    <div class="content">
<!--      <span class="title">2019年期中考试</span>-->
<!--      <i class="iconfont icon_luluadd" @click="add"></i>-->
<!--      <span class="title" v-if="exam[0]">{{exam[0]}}</span>-->
      <div class="second_screen_title" >
        <popup-picker class="second_screen_xiala" :data="[examList]" v-model="exam" @on-change="showChange" @on-show="showExam" :placeholder="exam[0]" @on-hide="hideExam"></popup-picker>
      </div>
      <div class="first_dialog">
        <span class="add_score" @click="addScore">
          <i class="iconfont iconluru"></i>录入
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
export default {
  components: { Popover, PopupPicker },
  data () {
    return {
      exam: [],
      examList: [],
      showlist: true
    }
  },
  mounted () {
    this.getAllExam()
  },
  // created () {
  //   this.exam = this.examList[0].examName
  // },
  methods: {
    getAllExam () {
      getAllExam().then(res => {
        const content = res.data.data
        this.exam[0] = content[content.length - 1].examName
        // console.log('1111111111111', this.exam[0])
        // this.$store.commit('SET_EXAM_NAME', content[content.length - 1].examName)
        this.$store.commit('SET_EXAM_NAME', this.exam[0])
        for (const item in content) {
          this.examList.push(content[item].examName)
        }
        console.log(this.examList)
      })
    },
    showExam () {
      console.log('qian:', this.exam[0])
    },
    hideExam () {
      console.log('hou:', this.exam[0])
      console.log(this.$store.state.exam.exam_name)
    },
    showChange () {
      console.log('改变', this.exam[0])
      this.$store.commit('SET_EXAM_NAME', this.exam[0])
      // console.log('改变', a)
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
    .vux-popup-picker-select {
      text-align: left !important;
    }
    .vux-cell-primary,
    .vux-popup-picker-select,
    .vux-popup-picker-value {
      max-width: 100%;
    }
    .vux-popup-picker-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:after {
        font-family: 'iconfont';
        content: '\e600';
        margin-left: 10px;
      }
    }
    .weui-cell__ft {
      display: none;
    }
  }
</style>
