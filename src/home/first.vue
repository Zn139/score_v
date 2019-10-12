<template>
  <div>
    <div class="content">
<!--      <span class="title">2019年期中考试</span>-->
<!--      <i class="iconfont icon_luluadd" @click="add"></i>-->
      <span class="title">2019年期中考试</span>
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
import { Popover } from 'vux'

export default {
  components: { Popover },
  methods: {
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
    font-size: 16px;
    text-align: center;
    width: 100%;
    background-color: #42b983;
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .iconfont{
    position: absolute;
    margin-left: 23%;
    font-size: 17px;
    color: #fff;
    z-index: 100;
    font-weight: bold;
  }
  .first_dialog{
    position: absolute;
    top: 1px;
    left: 88%;
  }
  .add_score{
    font-size: 14px;
    text-align: center;
    /*font-weight: bold;*/
  }
</style>
