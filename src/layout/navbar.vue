<template>
  <div class="navbar weui-tabbar">
    <div v-for="item in menu" v-tap="[changeMenu, item.link]" :key="item.value" :class="[{'active': item.value === curMenu}, 'weui-tabbar__item']">
      <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
      <p class="weui-tabbar__label">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [{
        link: 'home',
        value: 'home',
        name: '首页',
        icon: 'icon_lulushouye'
      }, {
        link: 'study',
        value: 'study',
        name: '学习集',
        icon: 'icon_luluziyuan'
      },
      {
        link: 'add',
        value: 'add',
        // name: '加号',
        icon: 'icon_lulujiahao-tianchong'
      },
      {
        link: 'lineCourse',
        value: 'lineCourse',
        name: '在线课堂',
        icon: 'icon_luluzaixianketang'
      }, {
        link: 'my',
        value: 'my',
        name: '我的',
        icon: 'icon_luluwo'
      }
      ]
    }
  },
  computed: {
    // 当前tab
    curMenu () {
      return this.$route.name
    }
  },
  methods: {
    changeMenu (link) {
      this.$router.push({ path: './' + link })
    }
  }
}

</script>
<style lang="scss">
  .weui-tabbar {
    background-color: RGB(52,127,245);
    color: #fff;
    height: 50px;
  }

  .weui-tabbar__icon>i, i.weui-tabbar__icon {
    color: #fff;
    opacity: 0.6;
  }
  .active {
    .weui-tabbar__icon {
      color: #fff;
      opacity: 1;
    }
  }
  .weui-tabbar__item {
    padding-top: 0;
  }
  .weui-tabbar__label {
    margin-top: 2px;
    line-height: 1.8;
    font-size: 12px;
    color: #fff;
    /*display: inline-block;*/
  }
  /*.iconfont icon_lulujiahao-tianchong{*/
  /*  font-size: 20px;*/
  /*}*/
</style>
