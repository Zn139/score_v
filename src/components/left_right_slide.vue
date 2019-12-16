<template>
  <div>
    <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
      <div class="menu-container" ref="menuContainer">
        <!-- 这个是内容 -->
        内容么
      </div>
    </v-touch>
  </div>
</template>
<script>
export default {
  name: 'Queue',
  data () {
    return {

    }
  },
  methods: {
    swiperleft: function () {
      console.log('左划')
      this.$router.push({'path': '/home'})
    },
    swiperright: function () {
      this.$router.push({'path': '/my'})
      console.log('右滑')
    }
  }

}
</script>
