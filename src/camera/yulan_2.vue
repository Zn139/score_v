<template>
  <div>
<!--    <div style="height: 1000px; background-color: pink;"></div>-->
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
  </div>
</template>

<script>
import VuePreview from 'vue2-preview'
import Vue from 'vue'
Vue.use(VuePreview)
export default {
  data () {
    return {
      list: [
        {
          src: 'https://placekitten.com/600/400', // 图片路径
          w: 600, // 图片预览时的宽
          h: 600 // 图片预览时的高
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    // 即将关闭的时候，调用这个处理函数
    closeHandler () {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler () {
      console.log('destroyHandler')
    }
  }
}
</script>
