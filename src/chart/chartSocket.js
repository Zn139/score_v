import { mapState } from 'vuex'
import request from '../utils/request'
export default {
  name: 'chartMixin',
  data () {
    return {
      ws: null,
      otherImg: ''
    }
  },
  computed: {
    ...mapState({
      openid: state => state.user.openid,
      selfImg: state => state.user.infoObj.teaHeadimgurl || state.user.infoObj.stuHeadimgurl
      // courseId: state => state.course.courseId
    })
  },
  mounted () {
    this.initWebsocket()
  },
  watch: {
    courseId () {
      this.initWebsocket()
    }
  },
  methods: {
    initWebsocket () {
      if (this.ws === null && this.courseId !== '') {
        const url = 'ws://47.93.225.12:8082/socketServer/' + this.openid
        this.ws = new WebSocket(url)

        this.ws.onopen = this.websocketonopen
        this.ws.onmessage = this.websocketonmessage
        this.ws.onerror = this.websocketonerror
        this.ws.onclose = this.websocketclose
      }
    },
    websocketonopen () {
      this.addGroup()
      // this.websocketsend(JSON.stringify(req))
    },
    websocketonmessage (res) {
      const resData = JSON.parse(res.data)
      if (resData.opttype === 'SendToChatGroup') {
        this.recSocketMsg(resData)
      }
      console.log(resData)
    },
    websocketonerror () {
      this.initWebSocket()
    },
    websocketsend (req) {
      this.ws.send(JSON.stringify(req))
    },
    websocketclose (e) {
      console.log('断开连接', e)
    },
    // 创建群组，并加入
    addGroup () {
      const req = {
        addusername: this.openid, // "stuopenid"
        groupname: this.courseId, // "courseid"
        opttype: 'CreateChatGroup',
        username: this.openid // "stuopenid"
      }
      this.websocketsend(req)
    },
    // socket发送消息
    sendSocketMsg (msg) {
      const req = {
        content: msg,
        groupname: this.courseId, // "courseid"
        opttype: 'SendToChatGroup',
        username: this.openid
      }
      this.websocketsend(req)
    },
    // socket接收消息
    recSocketMsg (data) {
      console.log(data)
      const type = (data.username === this.openid) ? 'self' : 'other'
      console.log(type)
      new Promise((resolve) => {
        this.getInfo(data.username, type, resolve)
      }).then(() => {
        this.sendMsgFn(type, data.content)
      })
    },
    getInfo (openid, type, resolve) {
      if (type === 'self' && this['selfImg'] === '') {
        this._getImg(openid, 'self', resolve)
      }
      if (type === 'other' && this['otherImg'] === '') {
        this._getImg(openid, 'other', resolve)
      }
    },
    _getImg (openid, type, resolve) {
      request({
        url: 'http://www.zhiheyikaoqin.cn/user/queryUserInfo?openid=' + openid,
        method: 'get'
      }).then(res => {
        resolve()
        if (Number(res.data.code) === 0) {
          const obj = res.data.data
          console.log('obj', obj, type)
          this[type + 'Img'] = obj.stuHeadimgurl || obj.teaHeadimgurl
        }
      }, 20)
    }
  }
}
