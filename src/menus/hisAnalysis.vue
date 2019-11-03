<template>
  <div class="history_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">历史分析</div>
    </div>
    <div>
<!--      <span></span>-->
      <tab v-model="index01" :line-width="1" bar-active-color="#668599">
        <tab-item selected @on-item-click="onItemClick">总分</tab-item>
        <tab-item @on-item-click="onItemClick"  v-for="(item, index) in sub_name_list" :key="index">{{item}}</tab-item>
<!--          <tab-item @on-item-click="clickLanguage">语文</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">数学</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">英语</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">物理</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">化学</tab-item>-->
<!--          <tab-item @on-item-click="onItemClick">生物</tab-item>-->
      </tab>
    </div>
    <div class="history_third">
      <div ref="history_chart" class="history_chart"></div>
      <x-table class="subAna_four_table">
        <thead>
        <tr class="subAna_four_table_thead">
          <th>学科</th>
          <th>本次</th>
          <th>上次</th>
          <th>前三次平均</th>
          <th>贡献率提升</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, value, index) in subTable" :key="index" v-if="item.length = 5">
          <td>{{item.title || '未公开'}}</td>
          <td>{{item.currentRate || '未公开'}}</td>
          <td>{{item.lastRate || '未公开'}}</td>
          <td>{{item.averageRate || '未公开'}}</td>
          <td v-if="item.rateDifference > 0" style="color: green;"><i class="iconfont icon_lulu-xiangshangjiantou "></i>{{item.rateDifference || '未公开'}}</td>
          <td v-else style="color: red"><i class="iconfont icon_luluarrow-"></i>{{item.rateDifference || '未公开'}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <div class="history_four_tip">
      <h4>说明：</h4>
      <p>X轴表示各次考试名称；</p>
      <p>Y轴表示考试的排名及分数刻度；</p>
      <p>排名是折线图越低越好，分数折线图是越高越好。</p>
    </div>
  </div>
</template>
<script>
import {XTable} from 'vux'
export default {
  components: {XTable},
  data () {
    return {
      lineChart: '',
      scoreList: [],
      sub_name_list: [ '语文', '数学', '英语', '物理', '生物', '历史']
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    drawLine () {
      this.lineChart = this.echarts.init(this.$refs.history_chart)
      this.lineChart.setOption(
        {
          title: {
            text: '历史分析'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            // x: 'right',
            icon: 'diamond', // 形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            itemGap: 20, // 设置间距
            padding: [35,0,0,0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: ['班排','年排','总分','平均分']
          },
          grid: {
            left: '3%',
            right: '9%',
            bottom: '3%',
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: 'category',
            // axisLabel: { // x轴数据倾斜30度
            //   rotate: 30
            // },
            boundaryGap: false,
            data: ['2019年3月','2019年4月','2019年5月']
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name:'班排',
              type:'line',
              // stack: '总量',
              data:[20,19,17]
            },
            {
              name:'年排',
              type:'line',
              // stack: '总量',
              data:[220, 182, 240]
            },
            {
              name:'总分',
              type:'line',
              stack: '总量',
              data:[410,395,350]
            },
            {
              name:'平均分',
              type:'line',
              // stack: '总量',
              data:[430, 400, 345]
            }
          ]
        }
      )
    }
  }
}
</script>
<style scoped>
  .history_info {
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
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
  .history_third {
    margin: 25px 10px;
    padding: 5px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 10px;
  }
  .history_chart {
    height: 200px;
  }
  .history_four_tip {
    border: 4px dashed rgba(66,185,130,0.4);
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    padding: 5px 5px 10px;
    margin: 0 15px 15px;
  }
  p {
    text-indent: 2em;
    font-size: 14px;
    line-height: 26px;
  }
</style>
