<template>
  <div id="qrCode">
    <div id='code'></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<style></style>
<script>
import QRCode from 'qrcodejs2'
export default{
  data () {
    return {
      msg: 'hello vue',
      codes: ''
    }
  },
  components: {
    QRCode: QRCode
  },

  methods: {
    useqrcode () {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, 'https://blog.csdn.net/weixin_42890953/article/details/82776760', function (error) {
        if (error) console.error(error)
        console.log('QRCode success!')
      })
    }
  },

  mounted () {
    this.useqrcode()
  }
}
</script>
