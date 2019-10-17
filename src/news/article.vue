<template>
  <div class="article-block">
    <div class="art-header">
      <div class="title">{{title}}</div>
      <div class="author"><span>From: </span> {{author}}</div>
      <div class="time"><span>{{time}}</span></div>
    </div>
    <div class="art-body">
      <template v-for="item in content">
        <h4 v-if="item.type === 'title'">{{item.text}}</h4>
        <p v-else-if="item.type === 'text'">{{item.text}}</p>
        <img v-else="item.type === 'img'" :src="item.text" />
      </template>
      <div class="art-org">
        <a :href="orgUrl">原文出处</a>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../utils/request'

export default {
  data () {
    return {
      loading: false,
      title: '',
      author: '',
      img: '',
      time: '',
      content: [],
      orgUrl: ''
    }
  },
  mounted () {
    this.$store.commit('SET_RETURN_TEXT', '前沿技术')
    this.$store.commit('SET_RETURN_URL', '/tech')
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.loading = true
      request({
        url: 'http://www.zhiheyikaoqin.cn/article/getArticleContent',
        method: 'post',
        data: {
          artId: this.$route.params.id
        }
      }).then(res => {
        this.loading = false
        this.title = res.data.data.title
        this.author = res.data.data.articleSource
        this.img = res.data.data.articleImg
        this.time = res.data.data.articleDate
        this.orgUrl = res.data.data.articleUrl
        if (res.data.data.articleContent.indexOf('<p>') !== -1) {
          this.content = res.data.data.articleContent.replace(/<p>/g, '').split('</p>').map(item => {
            return {
              type: 'text',
              text: item
            }
          })
        } else {
          this.content = res.data.data.articleContent
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped="">
  .article-block {
    background: #fff;
    padding: 80px 20px 20px 20px;
  }
  .art-header {
    margin-bottom: 20px;
    .title {
      font-size: 15px;
      line-height: 1.4;
      margin-bottom: 4px;
      color: #333;
    }
    .author,
    .time {
      display: inline-block;
      margin-right: 10px;
      color: #576b95;
      span {
        color: rgba(0,0,0,0.3);
      }
    }
  }
  .art-body {
    color: #333;
    text-align: justify;
    h4 {
      font-size: 14px;
      color: #576b95;
    }
    p {
      line-height: 2;
      font-size: 14px;
    }
    img {
      width: 100%;
    }
  }
  .art-org {
    margin: 20px 0;
    a {
      color: #576b95;
    }
  }
</style>