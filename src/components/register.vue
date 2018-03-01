<template>
  <div id="registerdiv">
    <div id="back-btn">
      <router-link to="/"><button type="button"><span>返回</span></button></router-link>
    </div>
    <form id="registerForm">
      <div class="inputdiv">
        <label>昵称：</label> <input type="text" placeholder="请输入昵称" name="nickname" v-model="nickname"/>
      </div>
      <div class="inputdiv">
        <label>姓名：</label> <input type="text" placeholder="请输入姓名" name="name" v-model="name"/>
      </div>
      <div class="inputdiv">
        <label>密码：</label> <input type="password" placeholder="请输入密码" name="password" v-model="password"/>
      </div>
      <div class="inputdiv">
        <label>性别：</label> <input type="text" placeholder="请输入性别" name="sex" v-model="sex"/>
      </div>
      <div class="inputdiv">
        <label>年龄：</label> <input type="text" placeholder="请输入年龄" name="age" v-model="age"/>
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
.inputdiv{
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
input{
  width: 77%;
  height: 0.666667rem;
   height: 0.966667rem;
  font-size: 0.533333rem;
  padding-left: 0.266667rem;
}
#back-btn{
  width: 95%;
  padding-left: 5%;
  margin-top: 10%;
  margin-bottom: 7%;
  text-align: left;
}
#back-btn button{
  width: 20%;
  height: 1rem;
  border-style: none;
  border-radius: 50px 5px 5px 50px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
}
#back-btn button span{
  margin-left: 0.2rem;
}
#registerForm button{
  width: 60%;
  height: 1rem;
  border-style: none;
  border-radius: 5px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
  margin-top: 0.666667rem;
}
</style>
