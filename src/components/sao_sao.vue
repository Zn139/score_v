<template>
  <div class="qr-code">
    <div style="background: black;position: fixed;top: 50px;left: 0;right: 0;bottom: 0;">
      <div id="bcid"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null;

export default {
  data() {
    return {
      codeUrl: '',
    }
  },
  created () {
    this.startRecognize();
  },
  activated() {
  },
  mounted () {
    setTimeout(() => {
      this.startRecognize()
    }, 500)
  },
  methods: {
    startRecognize() {
      let _this = this;
      if (!window.plus) return;
      // 创建扫描控件
      scan = new plus.barcode.Barcode('bcid',
        [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
        { frameColor: '#00FF00', scanbarColor: '#00FF00' });
      // 开始扫描
      scan.start();
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        let codes = result.split(":");
        let key = codes[0];
        let value = codes[1];
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            _this.$layer.open({time:3,skin:'msg',content:'未能识别二维码'});
            scan.start();
            break;
        }
        result = result.replace(/\n/g, '');
        _this.codeUrl = result;
        if(_this.$route.params.type === 'homeIndex'){
          _this.$router.push('/home')
        }else if(_this.$route.params.type === 'transferAccounts'){
          _this.codeResult.$emit('result',result);
          _this.$router.push('/transferAccounts')
        }
      }
    }
  },
  beforeDestroy() {
    if(scan){
      //关闭扫描控件
      scan.close();
    }
  },
  computed:{

  }
}
</script>

<style lang="css">
  .qr-code{
    background-color: #FAF8F5;
  }
  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom:3rem;
    text-align: center;
    color: #fff;
    background: pink;
  }
</style>
