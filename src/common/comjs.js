/**
 * 通用函数
 */
import Vue from 'vue'
// 封装的toast函数
var toast = function (mark, msg) {
  if (mark === 'loading') { // 加载动画toast
    Vue.prototype.$loading(msg)
  } else { // 正常提示toast
    Vue.prototype.$toast(msg)
  }
}
// 加载动画toast的关闭函数
var closeLoading = function () {
  Vue.prototype.$loading.close()
}

// 时间格式
const time = function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}

export default {
  toast,
  closeLoading,
  time
}
