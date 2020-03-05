<template>
  <div class="navbar weui-tabbar">
    <div v-for="item in menu" v-tap="[changeMenu, item.link]" :key="item.value" :class="[{'active': item.value === curMenu}, 'weui-tabbar__item', 'tabbar-item--' + item.value]">
      <template v-if="item.value !== 'add'">
        <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
        <p class="weui-tabbar__label">{{item.name}}</p>
      </template>
      <template v-else>
        <div class="tabbar-add-btn">
          <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
        </div>
      </template>
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
        link: 'bbs/hot',
        // link: 'study',
        value: 'study',
        name: '讨论',
        icon: 'icon_luluziyuan'
      },
      {
        // link: 'add',
        link: 'addScore',
        value: 'add',
        // name: '加号',
        icon: 'icon_lulutianjia'
      },
      {
        link: 'lineCourse',
        value: 'lineCourse',
        name: '题库',
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
      // this.$router.push({ path: '/bbs/hot' })
    }
  }
}

</script>
<style lang="scss">
  .weui-tabbar {
    background-color: #fff;
    box-shadow: 0px -1px 3px 1px rgba(0, 0, 0, 0.1);
    &:before {
      display: none;
    }
  }

  .weui-tabbar__icon>i, i.weui-tabbar__icon {
    font-size: 22px;
    color: RGB(51,51,51);
    /*color: #000;*/
    /*opacity: 0.6;*/
    /*font-max-size: large;*/
    /*border-radius: 50%;*/
  }
  .active {
    .weui-tabbar__icon {
      /*color: #42b983;*/
      color: RGB(67,183,131);
      /*border-radius: 10px;*/
      /*opacity: 1;*/
    }
  }
  .weui-tabbar__item {
    padding-top: 0;
  }
  .weui-tabbar__label {
    margin-top: 2px;
    line-height: 1.8;
    font-size: 12px;
    color: #6b6b6b;
    /*color: silver;*/
  }
  .tabbar-add-btn {
    width: 50px;
    height: 50px;
    background: #42b982;
    border-radius: 100px;
    margin: -10px auto 0;
    box-shadow: 0 0 4px 4px rgba(66, 185, 130, 0.3);
    .iconfont {
      font-size: 28px;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
  }
  /*.d-icon_lulujiahao-tianchong:before {
    color: #42b982;
    font-size: 42px;
    margin-left: -10px;
    padding-bottom: 3px;
    line-height: 50px;
    border-radius: 50%;
    border: 0 #fff dashed;
    background-color: #fff;
    background-image: url('../assets/img/icon.png');
    background-size: 35px;
    box-shadow: 0px 0px 3px 0px #42b982;
    box-shadow: 0 0px 0px 5px rgba(0, 0, 0, 0.8);
  }*/
</style>
