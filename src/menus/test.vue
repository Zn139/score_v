<template>
  <div>
    <div ref="balance_chart" class="subAna_balance_chart"></div>
  </div>
</template>
<script>
export default {
  mounted () {
    this.drawContinuous()
  },
  methods: {
    drawContinuous () {
      const labelRight = {
        normal: {
          position: 'right'
        }
      }
      console.log('continuous')
      this.contiChart = this.echarts.init(this.$refs.balance_chart)
      this.contiChart.setOption({
        title: {
          text: '交错正负轴标签',
          subtext: 'From ExcelHome',
          sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {lineStyle: {type: 'dashed'}}
        },
        yAxis: {
          type: 'category',
          axisLine: {show: false},
          axisLabel: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},
          data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
        },
        series: [
          {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                formatter: '{b}'
              }
            },
            data: [
              {value: -0.07, label: labelRight},
              {value: -0.09, label: labelRight},
              0.2, 0.44,
              {value: -0.23, label: labelRight},
              0.08,
              {value: -0.17, label: labelRight},
              0.47,
              {value: -0.36, label: labelRight},
              0.18
            ]
          }
        ]
      })
    }
  }
}
</script>
<style>
  .subAna_balance_chart {
    height: 180px;
  }
</style>
