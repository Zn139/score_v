<template>
  <div class="record_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">录入统计</div>
    </div>
    <div class="record_second">
      <div class="recond_second_info" v-for="(item, index) in yearsList" :key="index">
          <div class="record_year_name">
            <div class="record_year_sty" @click="getAllMonth(item)">
              <div class="record_year_sty_name">{{item.name}}</div>
              <div class="record_year_count">共<span>{{item.sum}}</span>次考试</div>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="selectExamInfo(item.name + sub)">
<!--                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">-->
                    <span>{{sub}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getYears, getMonths, getExamName} from '@/api/index'
export default {
  data () {
    return {
      yearsList: [],
      monthsList: [],
      exName: [],
      months: []
      // monthShow: false
    }
  },
  mounted () {
    this.getAllYear()
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    getAllYear () {
      getYears({openid: this.openid}).then(res => {
        this.yearsList = res.data.data.map((item, index) => {
          return {
            show: false,
            index: index,
            name: item,
            children: [],
            sum: 0
          }
        })
        console.log('y', this.yearsList)
        for (const a in this.yearsList) {
          console.log(this.yearsList[a].name)
          getMonths({openid: this.openid, year: this.yearsList[a].name}).then(res => {
            this.yearsList[a].sum = res.data.data[0].countTimes
          })
          // this.getAllMonth(this.yearsList[a])
        }
      })
      console.log('years:', this.yearsList)
    },
    getAllMonth (item) {
      const _this = this
      // _this.yearsList[item.index].children = []
      console.log('333333333333', item, _this.yearsList[item.index].name)
      if (!_this.yearsList[item.index].show) {
        getMonths({openid: this.openid, year: _this.yearsList[item.index].name}).then(res => {
          _this.months = res.data.data[0].list
          // _this.yearsList[item.index].sum = 0
          _this.yearsList[item.index].children = []
          if (res.data.code === 0) {
            for (const i in _this.months) {
              getExamName({
                openid: this.openid,
                yearMonth: _this.yearsList[item.index].name + _this.months[i]
              }).then(res => {
                // console.log('ssssssssss', res.data.data)
                for (const j in res.data.data) {
                  // _this.yearsList[item.index].sum += 1
                  _this.yearsList[item.index].children.push(_this.months[i] + res.data.data[j])
                }
              })
            }
            _this.yearsList[item.index].show = true
            console.log('this.yearsList[item.index].children:', _this.yearsList[item.index].children)
          }
        })
      } else {
        _this.yearsList[item.index].show = false
      }
      // _this.yearsList[item.index].show = false
    },
    selectExamInfo (fullName) {
      console.log(fullName)
      this.$router.push({
        name: 'examInfo',
        // path: '/examInfo' + fullName
        params: {
          fullName: fullName
        }
      })
      // getExamInfo({
      //   openid: this.openid,
      //   examName: fullName
      // }).then(res => {
      //   const content = res.data.data[0]
      // })
      // console.log('全称：', fullName)
    }
  }
}
</script>
<style scoped lang="scss">
  .record_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;
  }
  .score_header {
    /*padding: 0;*/
    font-size: 16px;
    /*text-align: center;*/
    width: 100%;
    background-color: #42b983;
    color: #fff;
    height: 40px;
    line-height: 40px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    margin-left: 20px;
    width: 20px;
    height: 20px;
    /*margin-top: 10px;*/
    /*color: #fff;*/
    display: inline-block;
  }
  .record_year_sty .iconfont {
    /*margin-top: 15px;*/
    /*margin-left: 70%;*/
    /*transform: translateX(-10%);*/
    /*font-size: 15px;*/
    text-align: right;
  }
  .record_year_sty {
    width: 100%;
    padding-top: 8px;
  }
  .record_year_sty_name {
    width: 20%;
    display: inline-block;
  }
  .record_year_count {
    width: 67%;
    display: inline-block;
    text-align: right;
    /*margin-left: 51%;*/
    font-size: 13px;
    span {
      color: red;
      margin: 0 3px;
    }
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .record_second {
    margin-top: 10px;
  }
  .record_year {
    text-align: left;
    height: 40px;
    width: 80%;
    margin-top: 15px;
    /*margin-left: 50%;*/
    padding-left: 10px;
    line-height: 40px;
   /* transform: translateX(-50%);*/
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    /*border: 2px rgba(66,185,130,0.4) dashed;*/
    /*border-radius: 10px;*/
  }
  .recond_second_info {
    text-align: left;
    /*height: 40px;*/
    width: 85%;
    position: relative;
    margin-top: 15px;
    margin-left: 50%;
    padding-left: 15px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border: 2px #ececec solid;
    /*border-radius: 10px;*/
  }
  .year-sub {
    transition: all .2s;
    padding: 0 10px;
  }
  .month-item {
    /*padding: 6px 0;*/
    /*position: relative;*/
    /*& + .month-item {*/
    /*  border-top: 1px solid #f5f5f5;*/
    /*}*/
  }
  .month-item-name {
    /*background-color: pink;*/
    min-height: 40px;
    /*position: relative;*/
  }
  .month-item_sty {
    padding-left: 15px;
    padding-top: 10px;
    font-size: 14px;
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border-bottom: 1px solid #ececec;
    /*border-radius: 10px;*/
    .iconfont {
      /*margin-top: -10px;*/
      /*margin-left: 77%;*/
    }
  }
  .name_item_info {
    padding-bottom: 10px;
  }
  .name_item_sty {
    width: 50%;
    margin-left: 33px;
    font-size: 13px;
    border-bottom: 1px solid #ececec;
    margin-top: 12px;
  }
</style>
