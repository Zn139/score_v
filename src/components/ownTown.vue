<template>
  <div>
    <li >
      <div class="left">
        <span>所在地区</span>
      </div>
      <div class="right r">
        <div class="city" @click="toAddress">{{city}}</div>
        <i class="arrow-r"> </i>
      </div>
    </li>
    <v-distpicker type="mobile" @selected='selected' v-show="addInp" class="area1">
    </v-distpicker>
    <div class="mask" v-show="mask"></div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  components: { VDistpicker },
  name: 'area1',
  data () {
    return {
      city: '请选择',
      addInp: false,
      mask: false
    }
  },
  methods: {
    toAddress () {
      this.mask = true
      this.addInp = true
    },
    // 省市区三级联动
    selected (data) {
      this.mask = false
      this.addInp = false
      this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value
    }
  }
}
</script>

<style scoped>
  li{
    list-style: none;
  }
  .area1{
    width: 100%;
    height: 45%;
    position:fixed;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .distpicker-address-wrapper .address-header ul{
    position:fixed  !important;
    left: 0 !important;
    top: 0 !important;
  }
</style>
