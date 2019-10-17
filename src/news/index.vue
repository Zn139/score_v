<template>
  <div class="news-list">
    <div class="news-item" :class="{'news-img': item.img && item.img !== ''}"
      v-if="!loading"
      v-for="item in newsList"
      @click.stop="jumpToDetail(item.artId)">
      <div class="title">{{item.title}}</div>
      <div class="author">{{item.articleSource}}</div>
      <div class="time">{{item.articleDate}}</div>
      <div class="img" v-if="item.img && item.img !== ''">
        <img :src="item.img">
      </div>
    </div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <div class="no-course" v-if="!loading && noNews">
      <no-data :text="'当前没有技术资讯'"></no-data>
    </div>
  </div>
</template>
<script>
import request from '../utils/request'

import noData from '../components/noData'
import loading from '../components/loading'
export default {
  name: 'news',
  components: { noData, loading },
  data () {
    return {
      loading: false,
      newsList: []
    }
  },
  computed: {
    noNews () {
      return this.newsList.length === 0
    },
    teaOpenid () {
      return this.$store.state.user.infoObj.teaOpenid || ''
    },
    stuOpenid () {
      return this.$store.state.user.infoObj.stuOpenid || ''
    },
    openid () {
      return this.teaOpenid || this.stuOpenid
    }
  },
  mounted () {
    this.getList(0)
  },
  methods: {
    getList (page) {
      this.loading = true
      request({
        url: 'http://www.zhiheyikaoqin.cn/article/getArticleList',
        method: 'post',
        data: {
          openid: this.openid,
          page: page,
          pageSize: 100
        }
      }).then(res => {
        this.newsList = res.data.data.map(item => {
          return item
        })
        this.loading = false
      })
    },
    jumpToDetail (id) {
      this.$router.push({ path: '/news/' + id })
    }
  }
}
</script>
<style lang="scss" scoped="">
.news-list {
  .no-data {
    padding-top: 200px;
  }
}
.news-item {
  background: #fff;
  margin-bottom: 5px;
  padding: 20px 16px;
  position: relative;
  min-height: 60px;
  padding-right: 20px;
  &.news-img {
    min-height: 80px;
    padding-right: 120px;
    .img {
      position: absolute; 
      width: 80px;
      height: 80px;
      right: 20px;
      top: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title {
    font-size: 14px;
    color: #373d41;
  }
  .author,
  .time {
    color: #aaa;
  }
}  
</style>
