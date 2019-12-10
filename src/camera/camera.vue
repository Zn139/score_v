<template>
  <div>
    <div>hahahah</div>
    <!--
   在各个机型都可以点击 file 调用相册 和 摄像头拍照
       1. 在老版本的安卓中，必须加上capture，否则只能调用相册
       2. 在新版本的部分安卓中 以及IOS中 加了capture，就只能调用摄像头不能调用相册

       解决办法:
           判断ios，如果是ios就去掉capture属性
   -->
    <label>上传图片
      <input type="file" id="file" accept="image/*" @click="readLocalFile">
    </label>
<!--    <uploader-->
<!--      url="http://47.93.225.12:8081/upload.html"-->
<!--    ></uploader>-->
<!--    <x-button class="enter_submit" @click.native="submitCamera" >测试另一个相机</x-button> &lt;!&ndash;测试另一个相机&ndash;&gt;-->
  </div>
</template>
<script>
export default {
  mounted () {
    this.getInfo()
  },
  methods: {
    submitCamera () {
      this.$router.push('/ceshiCamera')
    },
    getInfo () {
      var file = document.querySelector('#file')
      if (getIos()) {
        file.removeAttribute('capture')
      }
      function getIos () {
        var ua = navigator.userAgent.toLowerCase()
        if (ua.match(/iPhone\sOS/i) === 'iphone os') {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
<style scoped>
  label {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -21px 0 0 -101px;
    width: 200px;
    height: 40px;
    border: 1px solid #000;
    text-align: center;
    font: 16px/40px "宋体";
  }

  input {
    display: none;
  }
</style>
<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash;照片区域&ndash;&gt;-->
<!--    <div  v-for="(urls, index) in imgs " style="float: left; margin: 10px ; border: 1px solid #ccc;" :key="index">-->
<!--      <div style="text-align: right; position: relative;" v-on:click="deleteImg(index)">X</div>-->
<!--      <img :src="urls" width="100px" height="100px"  />-->
<!--    </div>-->
<!--    <div style=" width: 100px; height: 100px; background-color: #ccc; border:1px solid #ccc; float: left;  margin: 10px ;" v-on:click="imgClick()"></div>-->
<!--    <label>上传图片-->
<!--      <input type="file" id="uploadFile"   accept="image/*" v-on:change="readLocalFile()">-->
<!--    </label>-->
<!--&lt;!&ndash;    <input style="float: left;  display: none;" type="file" id='uploadFile'  accept="image/*"  v-on:change="readLocalFile()">&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default{-->
<!--  data () {-->
<!--    return {-->
<!--      imgs: [],-->
<!--      files: ''-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 删除图片-->
<!--    deleteImg: function (index) {-->
<!--      this.imgs.splice(index, 1)-->
<!--    },-->
<!--    // 图片click-->
<!--    imgClick: function () {-->
<!--      document.getElementById('uploadFile').click()-->
<!--    },-->
<!--    // 点击选中图片-->
<!--    readLocalFile: function () {-->
<!--      var localFile = document.getElementById('uploadFile').files[0]-->
<!--      console.log('localfile', localFile)-->
<!--      var reader = new FileReader()-->
<!--      var content-->
<!--      var current = this-->
<!--      reader.onload = function (event) {-->
<!--        content = event.target.result-->
<!--        current.imgs.push(content) // 获取图片base64代码-->
<!--      }-->
<!--      reader.onerror = function (event) {-->
<!--        alert('error')-->
<!--      }-->
<!--      content = reader.readAsDataURL(localFile, 'UTF-8')-->
<!--      // console.log('img', this.imgs)-->
<!--      // eslint-disable-next-line no-unused-vars-->
<!--      const params = new window.FormData()-->
<!--      params.append('file1000', localFile)-->
<!--      params.append('uploader', 'cll')-->
<!--      this.$axios({-->
<!--        method: 'post',-->
<!--        url: 'http://47.93.225.12:8081/uploadfile',-->
<!--        data: params-->
<!--      }).then(res => {-->
<!--        console.log(res.data)-->
<!--        if (res.data.errno === 0) {-->
<!--          // alert(res.data.filemap[0])-->
<!--          alert('成功')-->
<!--          console.log('heheheh', res.data.filemap[0].fastdfspath)-->
<!--          this.$axios({-->
<!--            method: 'post',-->
<!--            url: 'http://47.93.225.12:8081/downloadbyfastdfspath',-->
<!--            params: {-->
<!--              fastdfspath: res.data.filemap[0].fastdfspath-->
<!--            }-->
<!--          }).then(resp => {-->
<!--            console.log('下载：', resp.data.errmsg)-->
<!--          })-->
<!--        } else {-->
<!--          alert('失败')-->
<!--        }-->
<!--      })-->
<!--      const sss = document.getElementById('uploadFile').value-->
<!--      console.log(sss)-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--  },-->
<!--  created () {-->
<!--  },-->
<!--  components: {-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--  label {-->
<!--    position: absolute;-->
<!--    left: 50%;-->
<!--    top: 50%;-->
<!--    margin: -21px 0 0 -101px;-->
<!--    width: 200px;-->
<!--    height: 40px;-->
<!--    border: 1px solid #000;-->
<!--    text-align: center;-->
<!--    font: 16px/40px "宋体";-->
<!--  }-->

<!--  input {-->
<!--    display: none;-->
<!--  }-->
<!--</style>-->
