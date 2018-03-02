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
export default {
  toast,
  closeLoading
}
