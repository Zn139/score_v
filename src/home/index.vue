<template>
  <div class="home-page" ref="homeWrapper">
    <div class="home_content">
      <div class="content">2019年期中考试</div>
      <div class="second">
        <div ref="sunChart" class="second_chart"></div>
      </div>
      <div class="third">中心联动屏幕</div>
      <menus></menus>
      <hot-recommend></hot-recommend>
      <!--    <div class="seven_echarts" ref="chart"></div>-->
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import menus from './menus'
import hotRecommend from './hotRecommend'
export default {
  components: { menus, hotRecommend },
  name: 'home',
  data () {
    return {
      sunCharts: '',
      homeScroll: null,
      key: '',
      sunData: [{
        name: '分值',
        textStyle: {
          fontSize: '6px'
        },
        itemStyle: {
          color: '#da0d68'
        },
        children: [{
          name: '语文',
          // value: 1,
          itemStyle: {
            color: '#975e6d'
          },
          children: [{
            name: '高分率',
            value: 1,
            itemStyle: {
              color: '#e3111f'
            }
          },
          {
            name: '优秀率',
            value: 1,
            itemStyle: {
              color: '#e469df'
            }
          },
          {
            name: '良好率',
            value: 1,
            itemStyle: {
              color: '#ee451f'
            }
          },
          {
            name: '及格率',
            value: 1,
            itemStyle: {
              color: '#e31123'
            }
          },
          {
            name: '低分率',
            value: 1,
            itemStyle: {
              color: '#23411f'
            }
          },
          {
            name: '超均率',
            value: 1,
            itemStyle: {
              color: '#12311f'
            }
          }]
        }, {
          name: '数学',
          // value: 1,
          itemStyle: {
            color: '#975e6f'
          },
          children: [{
            name: '高分率',
            value: 1,
            itemStyle: {
              color: '#e3111f'
            }
          },
          {
            name: '优秀率',
            value: 1,
            itemStyle: {
              color: '#e469df'
            }
          },
          {
            name: '良好率',
            value: 1,
            itemStyle: {
              color: '#ee451f'
            }
          },
          {
            name: '及格率',
            value: 1,
            itemStyle: {
              color: '#e31123'
            }
          },
          {
            name: '低分率',
            value: 1,
            itemStyle: {
              color: '#23411f'
            }
          },
          {
            name: '超均率',
            value: 1,
            itemStyle: {
              color: '#12311f'
            }
          }]
        }, {
          name: '英语',
          value: 1,
          itemStyle: {
            color: '#975e63'
          }
        }, {
          name: '综合',
          itemStyle: {
            color: '#e0719c'
          },
          children: [{
            name: '政治',
            value: 1,
            itemStyle: {
              color: '#f99e1c'
            }
          }, {
            name: '历史',
            value: 1,
            itemStyle: {
              color: '#ef5a78'
            }
          }, {
            name: '地理',
            value: 1,
            itemStyle: {
              color: '#f7f4bd'
            }
          }, {
            name: '生物',
            value: 1,
            itemStyle: {
              color: '#f9df1c'
            }
          }, {
            name: '化学',
            value: 1,
            itemStyle: {
              color: '#e34a78'
            }
          }, {
            name: '物理',
            value: 1,
            itemStyle: {
              color: '#f7f1bd'
            }
          }
          ]
        }]
      }]
    }
  },
  mounted () {
    this.drawSunburst()
    this.$nextTick(() => {
      this.homeScroll = new BScroll(this.$refs.homeWrapper, {
        click: true
      })
    })
  },
  methods: {
    drawSunburst () {
      this.sunCharts = this.echarts.init(this.$refs.sunChart)
      this.sunCharts.setOption({
        title: {
          // text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
          // subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
          textStyle: {
            fontSize: 14,
            align: 'center'
          },
          subtextStyle: {
            align: 'center'
          },
          sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
        },
        series: {
          type: 'sunburst',
          highlightPolicy: 'ancestor',
          data: this.sunData,
          radius: [0, '95%'],
          sort: null,
          levels: [{}, {
            r0: '15%',
            r: '35%',
            itemStyle: {
              borderWidth: 2
            },
            label: {
              rotate: 'tangential'
            }
          }, {
            r0: '35%',
            r: '70%',
            label: {
              align: 'right'
            }
          }, {
            r0: '70%',
            r: '72%',
            label: {
              position: 'outside',
              padding: 3,
              silent: false
            },
            itemStyle: {
              borderWidth: 3
            }
          }]
        }
      })
    }
    // gotoSearch () {
    //   this.$router.push({ path: '/search' })
    // }
  }
}
</script>
<style scoped="">
  .home-page {
       height: calc(100% - 50px);
       overflow: hidden;
       flex: 1;
       background: #fff;
     }
  .content {
    /*padding: 0;*/
    font-size: 16px;
    text-align: center;
    width: 100%;
    background-color: #42b983;
    height: 30px;
    padding-top: 5px;
    margin-bottom: 5px;
    /*background: url("../assets/img/home-bac.png") no-repeat;*/
    /*background-size: 100% 100%;*/
  }
  .second{
    height: 200px;
    background-color: antiquewhite;
    margin-bottom: 5px;
  }
  .second_chart{
    height: 150px;
  }
  .third{
    height: 60px;
    background-color: cornflowerblue;
    color: #fff;
    text-align: center;
    padding-top: 7px;
    /*transform: translate(-50%);*/
  }
</style>
