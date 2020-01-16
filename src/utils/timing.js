let time = 0
let h = 0
let m = 0
let ms = 0
let s = 0
let str = '00:00:00:000'
let hour = '00'
let min = '00'
let sen = '00'
let msen = '00'
export function start () {
  clearInterval(time)
  time = setInterval(timer, 50)
  console.log('开始时间：', time)
  return time
}
export function stop () {
  clearInterval(time)
  console.log('结束时间：', time)
  return time
}
export function reset () {
  clearInterval(time)
  h = 0
  m = 0
  ms = 0
  s = 0
  str = '00:00:00:000'
  hour = '00'
  min = '00'
  sen = '00'
  msen = '00'
  console.log('重置时间：', time)
  return time
}
// {
//   // data () {
//   //   return {
//   //     h: 0, // 定义时，分，秒，毫秒并初始化为0；
//   //     m: 0,
//   //     ms: 0,
//   //     s: 0,
//   //     time: 0,
//   //     str: '00:00:00:000',
//   //     mytime: '',
//   //     hour: '00',
//   //     min: '00',
//   //     sen: '00',
//   //     msen: '00'
//   //   }
//   // },
//   // methods: {
//   start () { // 开始
//     // let time = 0
//     clearInterval(time)
//     time = setInterval(timer, 50)
//     console.log('开始时间：', time)
//     return time
//   },
//   reset () { // 重置
//     clearInterval(time)
//     h = 0
//     m = 0
//     ms = 0
//     s = 0
//     str = '00:00:00:000'
//     hour = '00'
//     min = '00'
//     sen = '00'
//     msen = '00'
//     console.log('重置时间：', time)
//     return time
//   },
//   stop () { // 暂停
//     clearInterval(time)
//     console.log('结束时间：', time)
//     return time
//   }
// }
// // }

function timer () { // 定义计时函数
  ms = ms + 50 // 毫秒
  if (ms >= 1000) {
    ms = 0
    s = s + 1 // 秒
  }
  if (s >= 60) {
    s = 0
    m = m + 1 // 分钟
  }
  if (m >= 60) {
    m = 0
    h = h + 1 // 小时
  }
  str = toDub(h) + ':' + toDub(m) + ':' + toDub(s) + ' ' + toDubms(ms)
  // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
  hour = toDub(h)
  min = toDub(m)
  sen = toDub(s)
  msen = toDubms(ms)
  return str, hour, min, sen, msen
}
function toDub (n) { // 补0操作
  if (n < 10) {
    return '0' + n
  } else {
    return '' + n
  }
}
function toDubms (n) { // 给毫秒补0操作
  if (n < 10) {
    return '00' + n
  } else {
    return '' + n
  }
}
