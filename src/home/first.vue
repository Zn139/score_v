<template>
  <div>
    <div class="content">
<!--      <span class="title">2019年期中考试</span>-->
<!--      <i class="iconfont icon_luluadd" @click="add"></i>-->
<!--      <span class="title" v-if="exam[0]">{{exam[0]}}</span>-->
      <div class="second_screen_title" >
        <popup-picker class="second_screen_xiala" :data="[examList]" v-model="exam" @on-show="showExam" placeholder="2019年期中考试" @on-hide="hideExam"></popup-picker>
      </div>
      <div>
        <popover placement="bottom" @on-show="onShow" @on-hide="onHide" class="first_dialog">
          <div slot="content" class="popover-demo-content">
            <div @click="addScore" class="add_score">录入成绩</div>
            <!--            <div @click="deteScore" class="delete_score">删除成绩</div>-->
          </div>
          <!--        <button class="btn btn-default">Popover on top</button>-->
          <i class="iconfont icon_luluadd" @click="add"></i>
        </popover>
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
  methods: {
    getAllExam () {
      getAllExam().then(res => {
        const content = res.data.data
        for (const item in content) {
          this.examList.push(content[item].examName)
        }
      })
    },
    showExam () {
      console.log('qian:', this.exam[0])
    },
    hideExam () {
      console.log('hou:', this.exam[0])
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
<style scoped>
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
    position: absolute;
    margin-left: 23%;
    font-size: 16px;
    color: #fff;
    z-index: 100;
    font-weight: bold;
  }
  .first_dialog{
    position: absolute;
    top: 1px;
    left: 90%;
  }
  .second_screen_title {
    width: 89%;
    position: absolute;
    font-size: 15px;
    z-index: 100;
  }
  .add_score{
    font-size: 14px;
    text-align: center;
    /*font-weight: bold;*/
  }
  /*.open-len {*/
  /*  width: 100px;*/
  /*}*/
  /*.close-len {*/
  /*  width: 50px;*/
  /*}*/
</style>
