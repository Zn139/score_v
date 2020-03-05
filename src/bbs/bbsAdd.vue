<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="bbs-box bbs-add-box">
      <div class="bbs__add">
        <div class="bbs-return return-box">
          <div class="return__icon" @click="gotoPage('/bbs/time')">
            <i class="iconfont icon_lulufanhui"></i> 发布圈子
          </div>
        </div>
      </div>
    </div>
    <div class="bbs-add__content">
      <div class="bbs-add-textarea">
        <textarea v-model="ask" placeholder="请发布你的圈子" class="bbs-add-size"></textarea>
        <div class="bbs-add-btn" @click="addBbsFn">发布</div>
      </div>
    </div>
  </div>
</template>
<script>
// import { addBbs } from '@/api/index'
import { errorMsg } from '@/utils/common'
export default {
  data () {
    return {
      ask: ''
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  methods: {
    // 去页面
    gotoPage (path) {
      this.$router.push({ path: path })
    },
    addBbsFn () {
      if (this.ask.trim() === '') {
        errorMsg(this, '不能为空')
        return
      }
      if (this.ask.trim().length < 10) {
        errorMsg(this, '圈子字数不能小于10个字')
        return
      }
      this.$axios({
        method: 'post',
        url: 'http://zhongkeruitong.top/show/cee/user/createTake',
        params: {
          openid: this.openid,
          ask: this.ask,
          // openid: 'oMXOb1fL8RtRe67m4Uf_3EPsdimE'
        }
      }).then(res => {
        this.gotoPage('/bbs/my')
      })
    }
  }
}
</script>
<style lang="scss">
  .bbs-box {
    background: #42b983;
    /*background: #647cfb;*/
    /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
    flex: none;
    z-index: 1;
  }
  .bbs-add-box .bbs__add {
    height: 50px;
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  .return-box {
    position: relative;
  }
  .bbs-return.return-box .return__icon.return__icon {
    color: #fff;
    font-size: 16px;
  }
   body .return-box .return__icon {
     position: absolute;
     left: 10px;
     top: 6px;
     z-index: 9;
     padding: 8px 6px;
     color: #fff;
   }
  body .return-box .return__icon .iconfont {
    font-size: 18px;
    color: #fff;
  }
  .bbs-return {
    background: #42b983;
    /*background: #647cfb;*/
    /*background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;*/
    flex: none;
    z-index: 1;
    height: 50px;
    body &.return-box .return__icon.return__icon {
      color: #fff;
      font-size: 16px;
    }
    .bbs__add-btn .iconfont {
      position: absolute;
      right: 14px;
      top: 10px;
      height: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
  textarea {
    /*border: 1px solid #eaeaea;*/
    color: #5a4f4f;
  }
  .bbs-add__content {
    flex: 1;
    height: calc(100% - 50px);
    padding: 20px;
  }
  .bbs-add-textarea {
    padding: 20px 10px 60px 10px;
    box-shadow: 0 6px 7px #ddd;
    background: #fff;
    position: relative;
    textarea {
      border: 0;
      width: 100%;
      height: 300px;
      max-height: 100%;
    }
  }
  .bbs-add-btn {
    position: absolute;
    bottom: 20px;
    right: 30px;
    background: #99CC99;
    /*background: #76BF9E;*/
    /*background: #9ba3c5;*/
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .bbs-add-size{
    font-size: large;
  }
</style>
