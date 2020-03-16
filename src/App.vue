<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
<!--    <router-view  v-if="isRouterAlive"/>-->
<!--    <keep-alive>-->
<!--      <router-view v-if="keepAlive"></router-view>-->
<!--      &lt;!&ndash;这里是会被缓存的组件&ndash;&gt;-->
<!--    </keep-alive>-->
<!--    <router-view v-if="!keepAlive"></router-view>-->
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
    // console.log('空吗：', localStorage.openid)
    // console.log('空吗2：', localStorage.SET_OPENID)
    // document.documentElement.style.fontSize = 14 * document.documentElement.clientWidth / 320 + 'px'
    if (localStorage.openid !== '') {
      this.$store.commit('SET_OPENID', localStorage.openid)
      console.log('openid', localStorage.openid)
    }
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
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
        console.log(res.data)
        if (res.data.errno === 0) {
          // this.$store.commit('SET_USER_NAME', res.data.userLogin.userName)
          this.$store.commit('SET_USER_NAME', res.data.nickname)
          this.$store.commit('SET_USER_IMG', res.data.userLogin.headimgurl)
          if (res.data.userLogin.diyid !== '') {
            // this.$store.commit('SET_SCHOOLNUM', res.data.userLogin.diyid)
            localStorage.setItem('SET_SCHOOLNUM', res.data.userLogin.diyid)
            // localStorage.SET_SCHOOLNUM
            // this.$store.commit('SET_LEVEL_NAME', res.data.gradeLevel)
          } else {
            localStorage.setItem('SET_SCHOOLNUM', '')
          }
          // console.log('学号：', localStorage.SET_SCHOOLNUM)
          // if (res.data.gradeLevel !== '') {
            // this.$store.commit('SET_LEVEL_NAME', res.data.gradeLevel)
            // localStorage.setItem('SET_LEVEL_NAME', res.data.gradeLevel)
          // }
          // else {
          //   this.$store.commit('SET_SCHOOLNUM', '08047737')
          // }
          console.log('name :', res.data.nickname)
          console.log('img: :', res.data.userLogin.headimgurl)
          // console.log('schoolNumber: :', res.data.userLogin.diyid)
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
