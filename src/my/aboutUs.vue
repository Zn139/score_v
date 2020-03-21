<template>
  <div class="feedBack_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">关于我们</div>
    </div>
    <div class="feedBack_second" ref="aboutUs">
      <div class="statement_content">
        <p>乐学书僮公众号是在国家教育部推进教育创新的背景下，整合了中科院、教育行业及产业企业的科技和教育资源，共同打造的数字化校园管理的智慧教育平台。</p>
        <p>“乐学习”与“乐题库”是研发团队与知名学校联合推出的一款基于微信公众号开发的可以记录学习成绩与平时练习、随堂考试的综合提高学习成绩、学习轨迹记录的平台。</p>
        <p>“乐题库”集中几十名优秀学校知名教师的教学实践中总结的习题资源，帮助同学们更好的把握知识，针对易考知识点针对性习题练习，掌握所学知识，进一步提高学习成绩的高质量平台。</p>
        <p>本应用平台通过综合运用互联网、移动化、大数据、人工智能等前沿技术，通过高度融合或深度服务的模式，为教育管理部门推进区域教育发展、为学校数字化校园和智慧化教育推进、为家校协同各相关方提供精准服务和助力，深入推进校园的数字化、可视化和智能化，共同打造新一轮教育改革创新的标杆。</p>
        <div>
          <p>战略</p>
          <p>整合多方资源 创建共赢平台</p>
          <p>定位</p>
          <p>数据悦动创新 教育智享未来</p>
          <p>远景</p>
          <p>成为大数据及AI技术与教育深度融合的领军型服务者</p>
          <p>实施</p>
          <p>打造出“1+N”数据融合与智能化系统与云服务平台</p>
        </div>
        <p>其他优秀数字化校园管理的智慧教育平台</p>
        <p>（1）构建了统一的大数据融合平台</p>
        <p>破除校园数据孤岛，形成具有整合数据资源优势的智能化服务平台，实现多源数据的有效融合。</p>
        <p>（2）在智能化教育教学领域，形成了“学校、学生、教师、家长、社会”多元互动系统和平台。</p>
        <p>开发出了“支持选课走班的智能排选课系统、以实时考勤为出发的学生安全与学习监控平台、基于多源学习数据的智慧成绩提升系统、基于学生发展与认知数据的智能学涯规划平台、推动教师绩效精准评估与教师职业成长的发展评价系统”。</p>
        <p>（3）数字化校园管理与智能决策</p>
        <p>形成了基于融合数据的校园餐饮评价与智能健康分析系统、实现资产管理归一化管理的物财业务管理发展平台。</p>
        <p>（4）高考预测服务与考生志愿推荐</p>
        <p>通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，为高考考生提供全方位的信息查询与报考志愿预测与推荐平台。</p>
        <p>（5）科技实践课</p>
        <p>打造出了一套适应与学校学科结合的科技实践课—Python人工智能实践与计算思维、新媒体与互联网技术应用、互联网大数据采集与个性化资讯定制等课程。一方面增强学生实践能力和对未来职业的认知，同时提升思考问题能力促进学科成绩提升。</p>
        <p>关注我们</p>
        <p>如需联系客服，请发邮件至zkzh_edu@163.com</p>

        <!--        {{usText}}-->
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      title: '',
      content: '',
      aboutScroll: null,
    }
  },
  computed: {
    openid () {
      return this.$store.state.exam.openid
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    init () {
      // console.log('初始化：', this.$refs.section_exec_second)
      this.$nextTick(() => {
        this.aboutScroll = new BScroll(this.$refs.aboutUs, {
          click: true
        })
      })
    },
  }
}
</script>
<style scoped>
  .feedBack_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    /*background: #fff;*/
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
  .feedBack_second {
    /*margin-top: 20px;*/
    background-color: #fff;
    padding: 20px 18px;
    height: calc(100% - 50px);
    overflow: hidden;
    /*border: 1px solid red;*/
  }
  .statement_content {
    text-indent: 2em;
    font-size: 14px;
    line-height: 27px;
    color: #3c3c3c;
    padding-bottom: 20px;
  }
</style>
