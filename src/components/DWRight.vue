<template>
  <div>
    <cell is-link title="所属地区" class="require" @click.native="choseAdd()" value-align="left">
      <p style="margin-left: 20px">
        {{receptAddtess.receiptProvince === '' ? "请选择" : receptAddtess.receiptProvince}} {{receptAddtess.receiptCity}} {{receptAddtess.receiptArea}}
      </p>
    </cell>
    <!-- 省市区三级联动 -->
    <section class="myAddress">
      <!-- 居住地址三级联动选项 -->
      <section class="showChose" v-show="showChose">
        <section class="address">
          <section class="titleTop">
            <div class="titleTopLeft">
              <span>选择地址</span>
            </div>
            <div class="titleTopRight">
              <span @click="closeAdd()">×</span>
            </div>
          </section>
          <hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" >
          <section class="title">
            <div class="area" @click="provinceSelected()">
              <span>{{Province?Province:info[province-1].name}}</span>
            </div>
            <div class="area" @click="citySelected()" :class="City?'':'active'">
              {{City?City:'请选择'}}
            </div>
            <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
              {{District?District:'请选择'}}
            </div>
          </section>
          <hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" >
          <ul>
            <li class="addList" v-for="(v,k) in info" :key="(v,k).index"
                @click="getProvinceId(v.id, v.name, k)"
                v-show="showProvince"
                :class="v.selected === true ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showCityList" :key="(v,k).index"
                @click="getCityId(v.id, v.name, k)"
                v-show="showCity"
                :class="v.selected ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showDistrictList" :key="(v,k).index"
                @click="getDistrictId(v.id, v.name, k)"
                v-show="showDistrict"
                :class="v.selected ? 'active' : ''">{{v.name}}</li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    choseAdd () {
      this.showChose = true
    },
    closeAdd () {
      this.showChose = false
    },
    _filter (add, name, code) {
      let result = []
      for (let i = 0; i < add.length; i++) {
        if (code === add[i].id) {
          result = add[i][name]
        }
      }
      return result
    },
    getProvinceId: function (code, input, index) {
      this.province = code
      this.Province = input
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false
      this.showCityList = this._filter(this.info, 'city', this.province)
      // 点击选择当前
      this.info.map(a => { a.selected = false })
      this.info[index].selected = true
      this.receptAddtess.receiptProvince = input
    },
    provinceSelected: function () {
      // 清除市级和区级列表
      this.showCityList = false
      this.showDistrictList = false
      // 清除市级和区级选项
      this.City = false
      this.District = false
      // 选项页面的切换
      this.showProvince = true
      this.showCity = false
      this.showDistrict = false
    },
    getCityId: function (code, input, index) {
      this.city = code
      this.City = input
      this.showProvince = false
      this.showCity = false
      this.showDistrict = true
      this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
      // 选择当前添加active
      this.showCityList.map(a => { a.selected = false })
      this.showCityList[index].selected = true
      this.receptAddtess.receiptCity = input
    },
    citySelected: function () {
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false
    },
    getDistrictId: function (code, input, index) {
      this.district = code
      this.District = input
      // 选择当前添加active
      this.showDistrictList.map(a => { a.selected = false })
      this.showDistrictList[index].selected = true
      // 选取市区选项之后关闭弹层
      this.showChose = false
      this.receptAddtess.receiptArea = input
    },
    districtSelected: function () {
      this.showProvince = false
      this.showCity = false
      this.showDistrict = true
    }
  }
}
</script>
<style scoped lang="scss">
  // 省市区三级联动CSS
  .myAddress .cont{
    border-bottom: 1px solid rgba(245,245,245,0.8);
  }
  .myAddress .cont span{
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section{
    float:left;
  }
  .myAddress .cont p{
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
  }
  .myAddress .cont .pic2{
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .myAddress .cont p.text{
    margin-left: 0.72rem;
  }
  .showChose{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    background:rgba(77,82,113,0.8);
  }
  .address{
    .titleTop {
      display inline
      text-align center
      .titleTopLeft {
        padding-top 5px
        padding-bottom 5px
        span {
        font-size 18px
      }
      }
      .titleTopRight {
        span {
          position absolute
          right 10px
          top -5px
          font-size 30px
          color: #929292
        }
      }
    }
    position:absolute;
    bottom:0;
    left:0;
    z-index:121;
    background:#fff;
    width:100%;
    height: 430px
  }

  .title {
    padding-top: 4px;
    padding-bottom: 5px;
  }
  .title h4{
    display:inline-block;
    font-size:18px;
    font-weight:normal;
  }
  .area{
    display:inline-block;
    font-size:15px;
    margin-left:25px;
  }
  .addList{
    width:85%;
    padding-left:0.32rem;
    font-size:15px;
    line-height:32px;
  }
  /* 修改的格式 */
  .address ul{
    width:95%;
    height:78%;
    overflow:auto;
  }
  .address ul li{
    margin-left:20px;
  }
  .address .title .active{
    color:red;
    border-bottom:0.02rem solid red;
  }
  .address ul .active{
    color:red;
  }
</style>
