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
              <strong>{{item.name}}</strong>
              <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.show"></i>
              <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
            </div>
            <div class="year-sub" v-show="item.show">
              <div class="month-item" v-for="(sub, inde) in item.children" :key="inde" v-if="item.children.length> 0">
                <div class="month-item-name">
                  <div class="month-item_sty" @click="getAllName(sub, inde, item)">
                    <span>{{sub.month_name}}</span>
                    <i class="iconfont icon_lulujiantou-copy-copy" v-if="item.children[sub.month_index].month_show"></i>
                    <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-" v-else></i>
                  </div>
                  <div class="name_item_info" v-for="(sun, ind) in item.children[sub.month_index].month_children" :key="ind" v-show="item.children[sub.month_index].month_show">
                    <div class="name_item_sty" @click="selectExamInfo(item.name + sub.month_name + sun)">
                      <span>{{sun}}</span>
                    </div>
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
      exName: []
      // monthShow: false
    }
  },
  mounted () {
    this.getAllYear()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    getAllYear () {
      getYears({openid: '111'}).then(res => {
        this.yearsList = res.data.data.map((item, index) => {
          return {
            show: false,
            index: index,
            name: item,
            children: []
          }
        })
        console.log('y', this.yearsList)
      })
      console.log('years:', this.yearsList)
    },
    // getAllMonth (item) {
    //   console.log(this.yearsList[item.index].show)
    //   if (!this.yearsList[item.index].show) {
    //     getMonths({openid: '111', year: this.yearsList[item.index].name}).then(res => {
    //       console.log('hahha', res.data.data)
    //       if (res.data.code === 0) {
    //         this.yearsList[item.index].children = res.data.data
    //         this.yearsList[item.index].show = true
    //         console.log('children', this.yearsList[item.index].children)
    //         this.monthsList = res.data.data.map((item, index) => {
    //           return {
    //             show: false,
    //             index: index,
    //             name: item,
    //             children: []
    //           }
    //         })
    //         console.log('months:', this.monthsList)
    //       }
    //     })
    //   }
    //   this.yearsList[item.index].show = false
    // },
    getAllMonth (item) {
      const _this = this
      // _this.yearsList[item.index].children = []
      console.log('333333333333', item, _this.yearsList[item.index].name)
      if (!_this.yearsList[item.index].show) {
        getMonths({openid: '111', year: _this.yearsList[item.index].name}).then(res => {
          if (res.data.code === 0) {
            _this.yearsList[item.index].children = res.data.data.map((item, index) => {
              return {
                month_show: false,
                month_index: index,
                month_name: item,
                month_children: []
              }
            })
            _this.yearsList[item.index].show = true
            console.log('this.yearsList[item.index].children:', _this.yearsList[item.index].children)
            // _this.monthsList = res.data.data.map((items, index) => {
            //   console.log('monthindex:', index)
            //   return {
            //     year_index: item.index,
            //     month_show: false,
            //     month_index: item.index.toString() + index.toString(),
            //     month_name: item.name + items,
            //     month_children: []
            //   }
            // })
            // console.log('months:', _this.monthsList)
          }
        })
      } else {
        _this.yearsList[item.index].show = false
      }
      // _this.yearsList[item.index].show = false
    },
    getAllName (name, ind, nindex) {
      console.log(name, ind, nindex)
      console.log(name.month_show)
      // console.log(that.yearsList[nindex.index][ind].month_show)
      if (!name.month_show) {
      // if (!that.yearsList[nindex.index][ind].month_show) {
        getExamName({
          openid: '111',
          yearMonth: nindex.name + name.month_name
          // yearMonth: nindex.name + that.yearsList[nindex.index][ind].month_name
        }).then(res => {
          name.month_children = res.data.data
          name.month_show = true
          // that.yearsList[nindex.index][ind].month_children = res.data.data
          // that.yearsList[nindex.index][ind].month_show = true
          // console.log('final: ', that.monthsList[ind].month_children)
        })
      } else {
        name.month_show = false
      }
      // console.log('索引类：', name, nindex.index, ind)
      // console.log('索引类2：', name.month_show)
      // console.log('索引类mingzi：', that.monthsList[ind].month_name)
      // console.log('riqi:', that.yearsList[nindex.index].children[ind].month_show)
      // console.log('yuefen:', that.monthsList[ind])
      // if (!that.monthsList[ind].month_show && that.monthsList[ind].year_index === nindex.index) {
      //   getExamName({
      //     openid: '111',
      //     yearMonth: that.monthsList[ind].month_name
      //   }).then(res => {
      //     that.monthsList[ind].month_children = res.data.data
      //     that.monthsList[ind].month_show = true
      //     console.log('final: ', that.monthsList[ind].month_children)
      //   })
      //   console.log('hahhahahhahah')
      // }
      // that.monthsList[ind].month_show = false
      console.log('name', name)
    },
    selectExamInfo (fullName) {
      this.$router.push({
        path: '/examInfo' + fullName
        // params: {
        //   fullName: fullName
        // }
      })
      // getExamInfo({
      //   openid: '111',
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
    margin-top: 15px;
    margin-left: 67%;
    transform: translateX(-10%);
    font-size: 20px;
  }
  .record_year_sty {
    padding-top: 3px;
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
    box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);
    /*border: 2px rgba(66,185,130,0.4) dashed;*/
    border-radius: 10px;
  }
  .recond_second_info {
    text-align: left;
    /*height: 40px;*/
    width: 80%;
    position: relative;
    margin-top: 15px;
    margin-left: 50%;
    padding-left: 10px;
    min-height: 40px;
    transform: translateX(-50%);
    background-color: #fff;
    box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);
    /*border: 2px rgba(66,185,130,0.4) dashed;*/
    border-radius: 10px;
    /*&.year--open {*/
    /*  .record_year_name {*/
    /*    background: linear-gradient(to right, #417dda 0%, #77a5ec 25%, #afd1fb 100%);*/
    /*    color: green;*/
    /*  }*/
    /*}*/
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
    padding-top: 5px;
    font-size: 14px;
    background-color: #fff;
    /*box-shadow: 1px 1px 3px 2px rgba(66,185,130,0.4);*/
    border-bottom: 1px solid #ececec;
    /*border-radius: 10px;*/
    .iconfont {
      margin-left: 77%;
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
