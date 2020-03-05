<template>
  <div class="bbs-wrapper"
    ref="bbsWrapper"
    :style="{height: 'calc(100% - 50px)'}">
    <div class="bbs-list" ref="bbsList">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="list-no-data" v-if="!loading && list.length === 0">
        暂无结果
      </div>
      <div class="bbs-item" v-if="!loading && list.length !== 0" v-for="(bbs, index) in list" :key="index">
        <div class="bbs-click-area"  @click="goDetail(bbs.takeid,index)"></div>
        <div class="bbs-item__info" @click="goDetail(bbs.takeid,index)">
          <div class="bbs-item__content" >{{bbs.ask}}</div>
        </div>
        <div>
          <span class="bbs-item__name">{{bbs.username}}</span>
          <div class="bbs-item__time">{{bbs.time}}</div>
          <div href="javascript:;" class="bbs-item__good" @click="dzan(bbs, index)" >{{bbs.hot}}
            <i v-if="!bbs.istrue" class="iconfont icon_lulushoucang4" ></i>
            <i v-else class="iconfont icon_lulufavor-active" ></i>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import _ from 'underscore'
import BScroll from 'better-scroll'
// import { zan } from '@/api/index'
export default {
  data () {
    return {
      show1: false,
      bbsScroll: null,
      istrue: false,
      scrollTop: '',
      index: 0
    }
  },
  props: {
    end: Boolean,
    loading: Boolean,
    list: Array,
    type: String
  },
  mounted () {
    this.init()
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  activated () {
    this.init()
  },
  deactivated () {
    if (this.$refs.bbsList !== undefined && this.$refs.bbsList.style.transform !== '') {
      this.scrollTop = this.$refs.bbsList.style.transform.split('0px, ')[1].split('px) scale(1)')[0]
      this.bbsScroll = null
    }
  },
  watch: {
    curTab () {
      this.scrollTop = 0
    }
  },
  methods: {
    click (key) {
      console.log(key)
    },
    init () {
      this.$nextTick(() => {
        const start = this.scrollTop || 0
        this.bbsScroll = new BScroll(this.$refs.bbsWrapper, {
          startY: start,
          click: true,
          pullDownRefresh: {
            threshold: 50,
            stop: 40
          },
          pullUpLoad: {
            threshold: 0,
            moreTxt: '加载中',
            noMoreTxt: '没有更多数据了'
          }
        })
        this.bbsScroll.on('pullingUp', (pos) => {
          this.nextPage()
          this.$nextTick(() => {
            this.bbsScroll && this.bbsScroll.finishPullUp()
          })
        })
        this.bbsScroll.on('pullingDown', () => {
          this.reList()
          this.$nextTick(() => {
            this.bbsScroll && this.bbsScroll.finishPullDown()
          })
        })
      })
    },
    nextPage: _.debounce(function () {
      this.$emit('nextPage')
    }, 50, true),
    reList: _.debounce(function () {
      this.$emit('reList')
    }, 50, true),
    dzan: _.debounce(function (item, index) {
      // console.log(index) user/addOnclick
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/show/cee/user/addOnclick',
        params: {
          takeid: item.takeid,
          openid: this.openid
          // openid: 'oMXOb1fL8RtRe67m4Uf_3EPsdimE'
        }
      }).then(res => {
        this.$set(this.list[index], 'istrue', res.data.data.istrue)
        this.$set(this.list[index], 'hot', res.data.data.count)
      })
      return false
    }, 500, false),
    goDetail (id, index) {
      this.index = index
      this.$emit('change', this.index)
      this.$router.push({
        name: 'bbsDetail',
        params: {id: id}
      })
    }
  }
}
</script>
<style lang="scss" scoped="">
  .bbs-wrapper {
    position: relative;
  }
  .bbs-list {
    flex: auto;
    background: #fbf9fe;
    padding: 12px 0;
    margin: 10px 0;
    position: relative;
  }
  /*.bbs-item {*/
  /*  margin: 0 20px 16px;*/
  /*  padding: 16px 20px;*/
  /*}*/
  .bbs-item {
    background: #fff;
    margin: 0 20px 16px;
    padding: 16px 20px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    min-height: 50px;
  }
  .bbs-item__info {
    position: relative;
  }
  .bbs-item__content {
    text-align: justify;
    word-break: break-all;
    background: #fbf9fe;
     color: #003300;
    line-height: 1.5;
  }
  .bbs-item__name {
    margin-left: 0;
  }
   .bbs-item__name, .bbs-info__time {
     display: inline-block;
     font-size: 13px;
     color: #555;
     margin-bottom: 10px;
     margin-left: 10px;
   }
  .bbs-item__time {
    display: inline-block;
    margin: 8px 4px 8px 0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #aaa;
  }
  .bbs-item__time:before {
    content: '';
    border-left: 1px solid #efefef;
    padding-right: 10px;
  }
  .bbs-item__good {
    background: none;
    position: absolute;
    z-index: 3;
    color: inherit;
    right: 10px;
  }
   .bbs-item__hot, .bbs-item__good {
     display: inline-block;
     /*background: #9ba3c5;*/
     /*color: #fff;*/
     margin: 8px 4px 8px 0;
     padding: 2px 8px;
     border-radius: 4px;
     font-size: 12px;
   }
  .bbs-item__good .icon_lulushoucang4 {
    color: #ddd;
  }
  .bbs-item__good .icon_lulufavor-active {
    color: #ff6c6c;
  }
   .bbs-item__good .iconfont {
     width: 23px;
     margin-left: 6px;
     font-size: 14px;
   }
  .bbs-click-area {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
