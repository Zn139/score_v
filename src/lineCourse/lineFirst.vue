<template>
  <div class="line_first_info">
    <div class="line-first-tab">
      <tab :line-width=2>
        <tab-item :selected="subject_online === item" v-for="(item, index) in sub_lists" @on-item-click="selectSub(item)" :key="index">{{item}}</tab-item>
<!--        <tab-item :selected="select_sub === index" v-for="(item, index) in sub_lists" @on-item-click="dianji(item)" @click="select_sub = index" :key="index">{{item}}</tab-item>-->
      </tab>
<!--        <swiper v-model="index" height="100px" :show-dots="false">-->
<!--          <swiper-item v-for="(item, index) in list2" :key="index">-->
<!--            <div class="tab-swiper vux-center">{{item}} Container</div>-->
<!--          </swiper-item>-->
<!--        </swiper>-->
    </div>
    <div class="line_first_content">
      <img src="../assets/img/18.png"/>
    </div>
  </div>
</template>
<script>
import bus from '@/utils/vueBus'
export default {
  data () {
    return {
      sub_lists: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      // select_sub: '生物'
    }
  },
  computed: {
    subject_online () {
      console.log('科目：', localStorage.SET_SELECT_SUB)
      if (this.$store.state.lineCourse.select_sub === '' || this.$store.state.lineCourse.select_sub === undefined) {
        this.$store.commit('SET_SELECT_SUB', '生物')
        localStorage.setItem('SET_SELECT_SUB', '生物')
        return '生物'
      } else {
        return this.$store.state.lineCourse.select_sub
      }
      // if (localStorage.SET_SELECT_SUB === '' || localStorage.SET_SELECT_SUB === undefined) {
      //   this.$store.commit('SET_SELECT_SUB', '生物')
      //   localStorage.setItem('SET_SELECT_SUB', '生物')
      //   // bus.$emit('subject', '生物')
      //   return '生物'
      // } else {
      //   return localStorage.SET_SELECT_SUB
      // }
    },
  },
  // beforeDestroy () {
  //   console.log('A before destroy')
  //   bus.$emit('subject', this.subject_online)
  // },
  mounted () {
    // this.busall()
    // bus.$emit('subject', this.subject_online)
    // this.$store.commit('SET_SELECT_SUB', this.select_sub)
    // // localStorage.setItem('')
    // localStorage.setItem('SET_SELECT_SUB', this.select_sub)
    // // localStorage.SET_SELECT_SUB
  },
  methods: {
    // busall () {
    //   bus.$emit('subject', this.subject_online)
    // },
    selectSub (item) {
      console.log('点击了么：', item)
      // this.$store.state.lineCourse
      this.$store.commit('SET_SELECT_SUB', item)
      localStorage.setItem('SET_SELECT_SUB', item)
      // bus.$emit('subject', item)
      // this.sendMsg()
    },
    // sendMsg () {
    // bus.$emit("fromSecond",this.res)
    // }
  }
}
</script>
<style scoped lang="scss">
  .line_first_content {
    /*height: 96px;*/
    /*width: 375px;*/
    width: 100%;
    height: 96px;
    /*background-image: url("../assets/img/18.png");*/
    /*background-size:100% 100%;*/
    img {
      height: 100%;
      width: 100%;
    }
  }
  .scrollable .vux-tab-item {
    flex: 0 0 15%;
  }
  .vux-tab-wrap {
    padding-top: 40px;
  }
  .line_first_info >>> .vux-tab-container,
  .line_first_info >>> .vux-tab {
    height: 40px;
  }
  .vux-tab .vux-tab-item {
    line-height: 40px;
  }
  .line-first-tab {
    -webkit-overflow-scrolling:touch;
  }
</style>
