<template>
  <div class="schoolInquireInfo">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">高校查询</div>
    </div>
    <school-list
      ref="list"
      :list="list"
      :type="listType"
      :end="end"
      :loading="loading"
      :curTab="curTab"
      @nextPage="nextPage"></school-list>
  </div>
</template>
<script>
import schoolList from './schoolList'
export default {
  components: { schoolList },
  data () {
    return {
      curTab: '',
      end: false,
      loading: false,
      key: '',
      placeholder: '搜索',
      list: [],
      req: {
        page: 0
      },
      page: 0
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    },
    listType () {
      if (this.curTab === 'prov' || this.curTab === 'type') {
        return 'one'
      } else if (this.curTab === 'com') {
        return 'two'
      }
    }
  },
  created () {
    console.log('the hook of created is done!')
  },
  mounted () {
    console.log('sdfsdfsf', this.$route.params.type)
    this.curTab = this.$route.params.type
    this.clearQuery()
    this.loading = true
    this.getSchool()
    this.$nextTick(() => {
      this.$refs.list.init()
    })
  },
  activated () {
    if (this.list.length === 0) {
      this.loading = true
      this.getSchool()
    }
  },
  watch: {
    curTab () {
      this.clearQuery()
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    clearQuery () {
      this.page = 0
      this.list = []
      this.end = false
      this.req = {
        page: 0
      }
      this.loading = true
    },
    // 去页面
    gotoPage (name) {
      this.clearQuery()
      this.curTab = 'all'
      this.$nextTick(() => {
        this.$router.push({ name: name })
      })
    },
    // 加载下一页
    nextPage () {
      this.page++
      this.getSchool()
    },
    // 获取列表，tab控制调哪个接口
    getSchool () {
      if (this.curTab === 'all') {
        // 全部
        this.getAllList()
      } else {
        // 带筛选
        this.getList()
      }
    },
    getAllList () {
      if (this.page === 0) {
        this.end = false
        this.list = []
      }
      this.$axios({
        method: 'get',
        url: 'http://zhongkeruitong.top/show/cee/school/findAllSchool',
        params: {
          openid: this.openid,
          page: this.page,
          size: 20
        }
      }).then(res => {
        this.loading = false
        if (res.data && res.data.data && res.data.data.length < 20) {
          this.end = true
        }
        const schoolCode = this.list.map(item => item.schoolcode)
        res.data.data.map(item => {
          if (schoolCode.indexOf(item.schoolcode) === -1) {
            this.list.push(item)
          }
        })
        this.list = this.list.sort((a, b) => {
          return Number(a.ranking) - Number(b.ranking)
        })
        this.$nextTick(() => {
          this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
        })
      })
    },
    getList () {
      this.req.openid = this.openid
      this.req.page = this.page
      this.req.size = 20
      if (this.page === 0) {
        this.end = false
      }
      this.$axios({
        url: 'http://zhongkeruitong.top/show/cee/school/findByOptionsCause',
        mathod: 'get',
        params: this.req
      }).then(res => {
        this.loading = false
        if (res.data && res.data.data && res.data.data.length < 20) {
          this.end = true
        }
        const schoolCode = this.list.map(item => item.schoolcode)
        res.data.data.map(item => {
          if (schoolCode.indexOf(item.schoolcode) === -1) {
            this.list.push(item)
          }
        })
        this.list = this.list.sort((a, b) => {
          return Number(a.ranking) - Number(b.ranking)
        })
        this.$nextTick(() => {
          this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
        })
      })
    },
    // 切tab
    changeTab (tab) {
      this.curTab = tab
      this.clearQuery()
      this.$router.push({ name: 'school_o625', params: { type: tab } })
    },
    // ？
    comSearch (obj) {
      this.req = obj
      obj.size = 20
      this.list = []
      this.req.openid = this.openid
      this.req.page = 0
      this.page = 0
      this.loading = true
      this.$axios({
        url: 'http://zhongkeruitong.top/show/cee/school/findByOptionsCause',
        mathod: 'get',
        params: obj
      }).then(res => {
        this.loading = false
        const schoolCode = this.list.map(item => item.schoolcode)
        res.data.data.map(item => {
          if (schoolCode.indexOf(item.schoolcode) === -1) {
            this.list.push(item)
          }
        })
        this.$nextTick(() => {
          this.$refs.list.schoolScroll && this.$refs.list.schoolScroll.refresh()
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .schoolInquireInfo {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;
  }
  .score_header {
    /*padding: 0;*/
    font-size: 16px;
    /*text-align: center;*/
    width: 100%;
    background-color: #42b983;
    color: #fff;
    height: 40px;
    line-height: 40px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    margin-left: 20px;
    width: 20px;
    height: 20px;
    /*margin-top: 10px;*/
    /*color: #fff;*/
    display: inline-block;
  }
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 35%;
    transform: translateX(-45%);
  }
</style>
