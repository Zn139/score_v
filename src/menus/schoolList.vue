<template>
  <div class="school-wrapper"
    ref="schoolWrapper"
    :style="{height: 'calc(100% - ' + height + 'px)'}">
    <div class="school-list" ref="schoolList">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="school-item" v-if="!loading && list.length !== 0" v-for="school in list" @click="gotoPage(school)">
        <div class="school-item__logo"><img :src="school.log"></div>
        <div class="school-item__devide"></div>
        <div class="school-item__info">
          <div class="school-item__name">{{school.schoolname}}</div>
          <div class="school-item__grade" >{{school.grade}}</div>
          <div class="school-item__ranking" >热度排名: {{school.ranking}}</div>
          <div class="school-item__prescore" >建议报考分: {{school.prescore === 0 ? '暂无' : school.prescore}}</div>
        </div>
      </div>
      <div class="school-item-end" v-if="!loading && list.length !== 0 && end">到底了</div>
    </div>
  </div>
</template>
<script>
import _ from 'underscore'
import BScroll from 'better-scroll'
// import userMessage from '../school/userMessage'
export default {
  // components: { userMessage },
  data () {
    return {
      value: '',
      schoolScroll: null,
      openid: '',
      show: false,
      code: '',
      scrollTop: ''
    }
  },
  props: {
    loading: Boolean,
    list: Array,
    end: Boolean,
    type: String,
    curTab: String
  },
  computed: {
    height () {
      if (this.type === undefined) {
        return 100
      } else if (this.type === 'one') {
        return 120
      } else if (this.type === 'two') {
        return 152
      } else if (this.type === 'search') {
        return 56
      } else {
        return 100
      }
    }
  },
  mounted () {
    this.openid = this.$store.state.exam.openid
    this.init()
  },
  activated () {
    this.init()
  },
  deactivated () {
    console.log(this.$refs.schoolList.style.transform)
    if (this.$refs.schoolList !== undefined && this.$refs.schoolList.style.transform !== '') {
      this.scrollTop = this.$refs.schoolList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
      console.log(this.scrollTop)
      this.schoolScroll = null
    }
  },
  watch: {
    curTab () {
      this.scrollTop = 0
    }
  },
  methods: {
    changShow (value) {
      this.show = value
    },
    init () {
      this.$nextTick(() => {
        const start = this.scrollTop || 0
        this.schoolScroll = new BScroll(this.$refs.schoolWrapper, {
          startY: start,
          click: true,
          pullDownRefresh: {
            threshold: 50,
            stop: 40
          },
          pullUpLoad: {
            threshold: 40,
            moreTxt: '加载中',
            noMoreTxt: '没有更多数据了'
          }
        })
        this.schoolScroll.on('pullingUp', (pos) => {
          if (!this.end && !this.loading) {
            this.nextPage()
            this.$nextTick(() => {
              this.schoolScroll && this.schoolScroll.finishPullUp()
            })
          }
        })
        this.schoolScroll.on('pullingDown', () => {
          this.reList()
          this.$nextTick(() => {
            this.schoolScroll && this.schoolScroll.finishPullDown()
          })
        })
      })
    },
    nextPage: _.debounce(function () {
      this.$emit('nextPage')
    }, 500, true),
    reList: _.debounce(function () {
      this.$emit('reList')
    }, 500, true),
    gotoPage: _.debounce(function (school) {
      this.$router.push({ path: '/schoolInfo/' + this.openid + '/' + school.schoolcode })
    }, 500, true)
  }
}
</script>
<style lang="scss" scoped="">
  .school-wrapper {
    position: relative;
  }
  .school-list {
    flex: auto;
    background: #fbf9fe;
    padding: 30px 0 12px 0;
    margin: 20px 0;
    position: relative;
  }
  .school-item {
    background: #fff;
    margin: 0 20px 16px;
    padding: 10px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 50px;
    overflow: hidden;
  }
  .school-item__logo {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 50%;
    right: -24px;
    margin-top: -8px;
    opacity: .2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .school-item__info {
    padding-left: 0;
    position: relative;
  }
  .school-item__devide {
    position: absolute;
    left: 75px;
    content: '';
    width: 1px;
    height: calc(100% - 20px);
    background: #4859ad12;
    display: block;
  }
  .school-item__name {
    font-size: 18px;
    color: #1e509e;
  }
  .school-item__grade,
  .school-item__ranking,
  .school-item__prescore {
    display: inline-block;
    background: #5f95dc;
    color: #fff;
    margin: 8px 4px 0 0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
  }

  .school-item__devide {
    display: none;
  }
  .school-item__info {
    padding: 10px 20px 4px 20px;
  }
  .school-item__name {
    font-size: 16px;
    /*color: #fff;*/
  }
  .school-item-end {
    text-align: center;
    color: #9a9fb7;
    position: relative;
    display: block;
    margin: 0 auto;
    width: 200px;
    &:before,
    &:after {
      content: '';
      background: #9a9fb7;
      width: 60px;
      height: 1px;
      display: block;
      top: 10px;
      left: 0;
      position: absolute;
    }
    &:after {
      left: auto;
      right: 0;
    }
  }
  .school-item__logo {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 50%;
    right: -24px;
    margin-top: -8px;
    opacity: .2;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
