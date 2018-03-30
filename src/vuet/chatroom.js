 import axios from 'axios'
 import comjs from '../common/comjs'
 
 export default {

          data () {
            return {
              msg: [],
              limit: 15,
              page: 0,
              pdlist: []
            }
          },
          route: {
            once: true, // 当前页面，只加载一次，这样我们就可以做上拉加载了
            // need: true,
            // watch: ['query']
          },
          // routeWatch: 'query',
          // async fetch () { 
          // 	http.GET('/api/user/chatroomsg', {limit: 10, page: 0})
          // 	    .then(function (res) {
          //         console.log(res)
          //       })
          //       .catch(function (res) {
          //         console.log(res)
          //         comjs.toast('', '请求失败!')
          //       })
          // }
          async fetch () {
            var self = this
          	fetch('/api/user/chatroomsg?limit=' + self.limit + '&page=' + self.page, {
                method: 'GET'
              })
              .then(function(response) {
                return response.json();
              })
              .then(function(json) {
              // 此处的 json 已经被处理为 json 对象
                console.log(json)
                //self.page++
                for (var i = 0; i < json.mes.length; i++) {
                  json.mes[i].createtime = comjs.time(json.mes[i].createtime)
                }
                self.msg = json.mes
                console.log(self.msg)
              })
              .catch(function(err) {
              // 捕获错误
                console.log(err)
              })
          },
            refresh: function (done) {
              this.page = 0
              // var self = this
              // var url = '/api/user/chatroomsg?limit=' + this.limit + '&page=' + this.page
              // axios.get(url)
              //   .then(function (res) {
              //     self.page++
              //     console.log(self.page)
              //     for (var i = 0; i < res.data.mes.length; i++) {
              //       res.data.mes[i].createtime = comjs.time(res.data.mes[i].createtime)
              //     }
              //     self.msg = res.data.mes
              //     done(false)
              //     comjs.toast('', '刷新成功!')
              //   })
              //   .catch(function (res) {
              //     console.log(res)
              //     comjs.toast('', '请求失败!')
              //   })
            var self = this
            fetch('/api/user/chatroomsg?limit=' + self.limit + '&page=' + self.page, {
                method: 'GET'
              })
              .then(function(response) {
                return response.json();
              })
              .then(function(json) {
              // 此处的 json 已经被处理为 json 对象
                console.log(json)
                self.page++
                for (var i = 0; i < json.mes.length; i++) {
                  json.mes[i].createtime = comjs.time(json.mes[i].createtime)
                }
                self.msg = json.mes
                done(true)
                comjs.toast('', '刷新成功!')
                console.log(self.msg)
              })
              .catch(function(err) {
              // 捕获错误
                console.log(err)
                comjs.toast('', '请求失败!')
              })
          },
          infinite: function (done) {
            //if (this.page > 0) {
              var refreshData
            var self = this
            var url = '/api/user/chatroomsg?limit=' + this.limit + '&page=' + this.page
              axios.get(url)
                .then(function (res) { 
                  document.getElementsByClassName('loading-layer')[0].style.height = 100 + 'px'
                  self.page++
                  if (res.data.mes === '暂无信息') {
                    console.log('c')
                    done(true)
                  } else {
                    for (var i = 0; i < res.data.mes.length; i++) {
                      res.data.mes[i].createtime = comjs.time(res.data.mes[i].createtime)
                    }
                    refreshData = res.data.mes
                    if (refreshData.length < self.limit) {
                      console.log('a')
                      self.msg = self.msg.concat(refreshData)
                      done(true)
                    } else {
                      console.log('b')
                      for (var i = 0; i < refreshData.length - 1; i++) {
                        self.msg.push(refreshData[i])
                      }
                      done(false)
                    }
                  }
                })
                .catch(function (res) {
                  console.log(res)
                  comjs.toast('', '请求失败!')
                })
            //}  
          }
        }