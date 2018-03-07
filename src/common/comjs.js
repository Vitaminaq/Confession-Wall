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
var time = function (time) {
  var time1 = time.split('T')
  var time2 = time1[0].split('-')
  var time3 = time1[1].split(':')
  var time4 = time3[2].split('.')
  var times = time2[1] + '月' + time2[2] + '日' + ' ' + time3[0] + '时' + time3[1] + '分' + time4[0] + '秒'
  return times
}

export default {
  toast,
  closeLoading,
  time
}
