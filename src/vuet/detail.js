export default {
    data () {
      return {
        detail: '',
        comment: [],
        names: [],
        num: '',
        id: '',
        status: null,
        commentmsg: '',
        state1: true,
        state2: true,
        hidshow1: true,
        hidshow2: false,
        hidshow3: false
      }
    },
    async fetch () {
      console.log(this.$route.query.id)
      // var self = this
      // fetch('/api/user/detail', {
      //     method: 'POST',
      //     body: 'id: self.$route.query.id' 
      //   })
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   .then(function(json) {
      //   // 此处的 json 已经被处理为 json 对象
      //     console.log(json)
      //     self.page++
      //     for (var i = 0; i < json.mes.length; i++) {
      //       json.mes[i].createtime = comjs.time(json.mes[i].createtime)
      //     }
      //     self.msg = json.mes
      //     console.log(self.msg)
      //   })
      //   .catch(function(err) {
      //   // 捕获错误
      //     console.log(err)
      //   })
    }
  }