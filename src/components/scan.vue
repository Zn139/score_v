<!--<template>-->
<!--  <div class="content">-->
<!--    <header>-->
<!--      <section class="head_goback"  @click="goback">-->
<!--        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">-->
<!--          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>-->
<!--        </svg>-->
<!--      </section>-->
<!--      <section class="title_head ellipsis">-->
<!--        <span class="title_text">扫描设备</span>-->
<!--      </section>-->
<!--    </header>-->
<!--    <div class="Detail">-->
<!--      <div id="code">-->
<!--        <div class="detail_info"></div>-->
<!--&lt;!&ndash;        <div style="width:200px;height:200px; background-color: pink; margin: 15% auto 5%; text-align: center"></div>&ndash;&gt;-->
<!--      </div>-->
<!--      <p style="text-align: center">将二维码放入框内，即可自动扫描</p>-->
<!--      <div style="text-align: center" class="sweep" @click="sweep">开始扫码</div>-->
<!--      <div style="text-align: center" class="start" @click="next">识别失败，手动录入</div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  created () {-->
<!--    const self = this-->
<!--    if (window.plus) {-->
<!--      self.plusReady()-->
<!--    } else {-->
<!--      // plus.globalEvent.addEventListener('plusready', self.plusReady, false)-->
<!--      document.addEventListener('plusready', self.plusReady, false)-->
<!--    }-->

<!--    // plus.globalEvent.addEventListener('DOMContentLoaded', function () {-->
<!--    document.addEventListener('DOMContentLoaded', function () {-->
<!--      // alert('DOMLoaded')-->
<!--      self.domready = true-->
<!--      self.plusReady()-->
<!--    }, false)-->

<!--    setTimeout(function () {-->
<!--      self.sweep() // 扫码函数-->
<!--    }, 1000)-->
<!--  },-->
<!--  methods: { // 创建-->
<!--    goback () {-->
<!--      this.$router.go(-1)-->
<!--    },-->
<!--    plusReady () {-->
<!--      const self = this-->
<!--      // 获取窗口-->
<!--      self.scan = new plus.barcode.Barcode('code')-->
<!--      self.scan.onmarked = self.onmarked-->
<!--    },-->
<!--    // 开始扫码-->
<!--    sweep () {-->
<!--      const self = this-->
<!--      self.scan.start()-->
<!--    },-->
<!--    onmarked (type, result) {-->
<!--      let t = this-->
<!--      var text = '未知: '-->

<!--      switch (type) {-->
<!--        case plus.barcode.QR:-->
<!--          type = 'QR'-->
<!--          break-->
<!--        case plus.barcode.EAN13:-->
<!--          type = 'EAN13'-->
<!--          break-->
<!--        case plus.barcode.EAN8:-->
<!--          type = 'EAN8'-->
<!--          break-->
<!--        default:-->
<!--          type = '其他' + type-->
<!--          break-->
<!--      }-->
<!--      result = result.replace(/\n/g, '')-->
<!--      if (result.indexOf('http://') === 0 || result.indexOf('https://') === 0) {-->
<!--        plus.nativeUI.confirm(result, function (i) {-->
<!--          if (i.index === 0) {-->
<!--            // self.back() // 返回上个页面-->

<!--            plus.runtime.openURL(result)-->
<!--            console.log(result) // 扫出来的值-->
<!--            t.scan.close() // 扫码成功后关闭扫码-->
<!--            t.$router.push({path: 'Info', query: {id: result}}) // 跳转到对应的页面-->
<!--          } else {-->
<!--            // self.back() // 返回上个页面-->
<!--            console.log(result)-->
<!--            t.scan.close()-->
<!--            window.localStorage.scan = result-->
<!--            t.$router.push({path: 'Info', query: {id: result}})-->
<!--          }-->
<!--        }, '', ['打开', '取消'])-->
<!--      } else {-->
<!--        // self.back() // 返回上个页面-->
<!--        console.log(result)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped lang="less">-->
<!--  .content{-->
<!--    background-color: #000;-->
<!--    color: white;-->
<!--    height: 100vh;-->
<!--    overflow: hidden;-->
<!--    header{-->
<!--      background-color: #000;-->
<!--      height: 2.00533rem;-->
<!--      width: 100%;-->
<!--      text-align: center;-->
<!--      line-height: 2.00533rem;-->
<!--      display: flex;-->
<!--      /*position: fixed;*/-->
<!--      top:0;-->
<!--      z-index: 99999;-->
<!--      /deep/ .head_goback{-->
<!--        padding-top: 0.1rem;-->
<!--        width: 0.6rem;-->
<!--        height: 0.8533rem;-->
<!--        padding-left: 0.2rem;-->
<!--      }-->
<!--      /deep/ .title_head{-->
<!--        width: 92%;-->
<!--        text-align: center;-->
<!--        color: white;-->
<!--        font-size: 0.8533rem;-->
<!--        letter-spacing: 2px;-->
<!--      }-->
<!--    }-->
<!--    .Detail{-->
<!--      width: 96%;-->
<!--      margin: 0 auto;-->
<!--      .session{-->
<!--        .name{-->
<!--          margin: 0.4rem 0;-->
<!--          font-size: 0.4rem;-->
<!--          color: #333333;-->
<!--          font-weight: bold;-->
<!--        }-->
<!--        .useTutorials{-->
<!--          background-color: #3998F7;-->
<!--          border-radius: 5px;-->
<!--        }-->
<!--        .desc{-->
<!--          margin: 0.4rem 0;-->
<!--          font-size: 0.4rem;-->
<!--          color: #333333;-->
<!--          .title{-->
<!--            font-weight: bold;-->
<!--          }-->
<!--          .intro{-->
<!--            margin-top: 0.1rem;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--      p{-->
<!--        font-size: 0.72rem;-->
<!--      }-->
<!--      .sweep{-->
<!--        text-align: center;-->
<!--        margin: 0.1rem auto;-->
<!--        width:13.8667rem;-->
<!--        height:1.7067rem;-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--        border-radius:1.024rem;-->
<!--        font-size: 0.768rem;-->
<!--        position: relative;-->
<!--        z-index: 9999;-->
<!--        color: white;-->
<!--        background:#FF8C99;-->
<!--        box-shadow:0px 6px 9px 0px rgba(255, 140, 153, 0.57);-->
<!--        margin-top: 2rem;-->
<!--      }-->
<!--    }-->
<!--    .detail_info {-->
<!--      width:200px;-->
<!--      height:200px;-->
<!--      background-color: pink;-->
<!--      margin: 15% auto 5%;-->
<!--      text-align: center-->
<!--    }-->
<!--    .start{-->
<!--      text-align: center;-->
<!--      margin: 0 auto;-->
<!--      width:13.8667rem;-->
<!--      height:1.7067rem;-->
<!--      display: flex;-->
<!--      justify-content: center;-->
<!--      align-items: center;-->
<!--      border-radius:1.024rem;-->
<!--      font-size: 0.768rem;-->
<!--      background:white;-->
<!--      border: 2px solid rgba(255, 169, 163, 1);-->
<!--      color: rgba(255, 169, 163, 1);-->
<!--      margin-top: 0.64rem;-->
<!--    }-->
<!--  }-->
<!--</style>-->
<template>
  <div>
    <button @click="sao">扫一扫{{ticketNum}}</button>
<!--    <div @click="sao">扫一扫{{ticketNum}}</div>-->
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      ticketNum: '1',
      configContent: []
    }
  },
  mounted () {
    this.getSign()
  },
  methods: {
    // scan () {
    //   let _this = this
    //   let url = location.href.split('#')[0]
    //   this.$axios.get('http://zhongkeruitong.top/wechat_login/wechat/getSign?url=' + url).then(res => {
    //     this.jsonData = res.data.data
    //     wx.config({
    //       // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       debug: false,
    //       // 必填，公众号的唯一标识
    //       appId: this.jsonData.appId,
    //       // 必填，生成签名的时间戳
    //       timestamp: '' + this.jsonData.timestamp,
    //       // 必填，生成签名的随机串
    //       nonceStr: this.jsonData.nonceStr,
    //       // 必填，签名
    //       signature: this.jsonData.signature,
    //       // 必填，需要使用的JS接口列表，所有JS接口列表
    //       jsApiList: ['checkJsApi', 'scanQRCode']
    //     })
    //   })
    //   wx.error(function (res) {
    //     alert('出错了：' + res.errMsg) // 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    //   })
    //
    //   wx.ready(function () {
    //     wx.scanQRCode({
    //       needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //       scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
    //       success: function (res) {
    //         _this.number = res.resultStr.substring(res.resultStr.indexOf('=') + 1)
    //         // _this.searchResults()
    //       }
    //     })
    //   })
    // }
    getSign () {
      // let url = ''
      // let ua = navigator.userAgent.toLowerCase()
      // // let url = location.href.split('#')[0]
      // if (/iphone|ipad|ipod/.test(ua)) {
      //   // url = location.href.split('#')[0]
      //   // IOS的url（IOS比较坑需要去掉锚点）
      //   url = location.href.replace(location.hash, '')
      // } else if (/android/.test(ua)) {
      //   // url = location.href.split('#')[0]
      //   // Android的url
      //   url = location.href
      // }
      let url = encodeURIComponent(window.location.href.split('#')[0])
      // console.log(url)
      // alert('url是啥：' + url)
      this.$axios.get('http://zhongkeruitong.top/score_analysis/wechat/getSign?url=' + url).then(res => {
      // this.$axios.get('http://zhongkeruitong.top/wechat_loginwechat/getSign?url=' + url).then(res => {
      // this.$axios.get('http://zhongkeruitong.top/wechat_loginwechat/getSign?url=http://zhongkeruitong.top/score_analysis/index.html').then(res => {
      //   alert('url是啥：', url)
      //   console.log(res.data)
      //   this.configContent = res.data
      //   this.signWX()
        if (res.data.code === 0) {
          // console.log('cehnggongleme', res.data.data)
          this.configContent = res.data.data
          this.signWX()
        }
      })
      // console.log('res', res)
    },
    signWX () {
      // alert('appid'+this.configContent.appId+'signature'+this.configContent.signature+'nonceStr'+this.configContent.nonceStr+'jsapi_ticket'+this.configContent.jsapi_ticket+'url'+this.configContent.url)
      // this.configContent = JSON.stringify(this.configContent)
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.configContent.appId, // 必填，公众号的唯一标识
        timestamp: this.configContent.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.configContent.nonceStr, // 必填，生成签名的随机串
        signature: this.configContent.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        // alert('成功')
        wx.checkJsApi({
          jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            console.log('成功：', res)
            alert('成功' + res)
          }
        })
      })
      wx.error(function (res) {
        console.log('微信js-sdk 配置失败000' + res.errMsg)
        alert('微信js-sdk 配置失败000' + res.errMsg)
      })
    },
    sao () {
      console.log('开始扫了')
      let _this = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          _this.ticketNum = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        }
      })
    }
  }
}
</script>
