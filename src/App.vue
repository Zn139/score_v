<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view  v-if="isRouterAlive"/>
    <router-view name="nav"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  watch: {
    '$route': function () {
      this.checkRedict()
    }
  },
  mounted () {
    console.log('空吗：', localStorage.openid)
    // console.log('空吗2：', localStorage.SET_OPENID)
    document.documentElement.style.fontSize = 14 * document.documentElement.clientWidth / 320 + 'px'
    if (localStorage.openid !== '') {
      this.$store.commit('SET_OPENID', localStorage.openid)
      console.log('openid', localStorage.openid)
    }
    // this.setWxjs()
  },
  methods: {
    checkRedict () {
      this.$axios.get('http://www.kgai.tech//getAllInfoByWechatId?wechatId=' + this.openid
        // this.$axios(
        //   {
        // method: 'get',
        // url: 'http://www.kgai.tech//getAllInfoByWechatId',
        // wechatId: this.openid
        // }
      ).then(res => {
        console.log('成功：', res.data.errno)
        console.log('成功码类型：', typeof res.data.errno)
        if (res.data.errno === 0) {
          this.$store.commit('SET_USER_NAME', res.data.userLogin.userName)
          this.$store.commit('SET_USER_IMG', res.data.userLogin.headimg)
          console.log('name :', res.data.userLogin.userName)
          console.log('img: :', res.data.userLogin.headimg)
          // if (this.$route.name !== 'my') {
          //   setTimeout(() => {
          //     this.$router.push({ path: '/my' })
          //   }, 3000)
          // }
        }
        // else {
        //   if (this.$route.name !== 'my') {
        //     setTimeout(() => {
        //       this.$router.push({ path: '/my' })
        //     }, 3000)
        //   }
        // }
      })
      //   .catch(res => {
      //   if (this.$route.name !== 'my') {
      //     setTimeout(() => {
      //       this.$router.push({ path: '/my' })
      //     }, 3000)
      //   }
      // })
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  html, body,
  #app{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  /*#app {*/
  /*  display: flex;*/
  /*  overflow: hidden;*/
  /*}*/
  /*#app {*/
  /*  display: flex;*/
  /*  overflow: hidden;*/
  /*}*/
/*#app {*/
  /*width: 100%;*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
