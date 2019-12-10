<template>
  <div id="app">
    <!-- directive -->
<!--    <div class="images" v-viewer>-->
<!--      <img src="1.jpg" style="width: 100px;height: 100px">-->
<!--      <img src="2.jpg" style="width: 100px;height: 100px">-->
<!--      ...-->
<!--    </div>-->
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
  data () {
    return {
      images: ['http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/00/rBEFwF3uEieALO4xAAEoyQmRb7Q3887915', 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/00/rBEFwF3uLuaAV8NRAAMtXv_cM7I1079761']
    }
  }
}
</script>
