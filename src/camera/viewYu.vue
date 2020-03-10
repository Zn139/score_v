<template>
  <div>
<!--    <div style="height: 1000px; background-color: pink;"></div>-->
    <div>
      <img v-for="(item, index) in lists" :src="item" alt="" :key="index" class="imgsInfo">
    </div>
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"></vue-preview>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 600
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ],
      lists: ['https://placekitten.com/600/400', 'https://placekitten.com/1200/900']
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
<style scoped lang="scss">
  .imgsInfo {
    width: 80px;
    height: 80px;
  }
</style>
