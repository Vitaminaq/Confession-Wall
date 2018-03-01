<template>
  <div id="registerdiv">
    <div>
      <span>返回</span>
    </div>
    <form>
      <div>
        <label>昵称：</label> <input type="text" name="nickname" v-model="nickname"/>
      </div>
      <div>
        <label>姓名：</label> <input type="text" name="name" v-model="name"/>
      </div>
      <div>
        <label>密码：</label> <input type="password" name="password" v-model="password"/>
      </div>
      <div>
        <label>性别：</label> <input type="text" name="sex" v-model="sex"/>
      </div>
      <div>
        <label>年龄：</label> <input type="text" name="age" v-model="age"/>
      </div>
      <button type="button" @click="register">注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'register',
  data () {
    return {
      nickname: '',
      name: '',
      password: '',
      sex: '',
      age: ''
    }
  },
  methods: {
    register: function () {
      if (this.nickname === '' || this.name === '' || this.password === '' || this.sex === '' || this.age === '') {
        Vue.prototype.$toast('请填写完善信息')
      } else {
        Vue.prototype.$loading('注册中...')
        let self = this
        axios.post('/api/user/register', {
          nickname: this.nickname,
          name: this.name,
          password: this.password,
          sex: this.sex,
          age: this.age})
          .then(function (res) {
            self.closeLoading()
            console.log(res.data)
            Vue.prototype.$toast(res.data.mes)
            if (res.data.mes === '注册成功!') {
              self.$router.push({path: '/'})
            }
          })
          .catch(function (res) {
            console.log(res)
          })
      }
    },
    closeLoading: function () {
      Vue.prototype.$loading.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#registerdiv{
  font-size: 0.506667rem;
}
input{
  width: 79%;
  height: 0.666667rem;
}
</style>
