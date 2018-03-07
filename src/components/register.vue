<template>
  <div id="registerdiv">
    <div id="back-btn">
      <router-link to="/"><button type="button"><span>返回</span></button></router-link>
    </div>
    <form id="registerForm">
      <div class="inputdiv">
        <label>昵称：</label> <input type="text" placeholder="请输入您的昵称" name="nickname" v-model="nickname"/>
      </div>
      <div class="inputdiv">
        <label>姓名：</label> <input type="text" placeholder="请输入您的姓名" name="name" v-model="name"/>
      </div>
      <div class="inputdiv">
        <label>密码：</label> <input type="password" placeholder="请输入您的密码" name="password" v-model="password"/>
      </div>
      <div class="inputdiv1">
        <input type="radio" v-model="sex" value="男"/>男 <input type="radio" v-model="sex" value="女" />女
      </div>
      <div class="inputdiv">
        <label>年龄：</label> <input type="text" placeholder="请输入您的年龄" name="age" v-model="age"/>
      </div>
      <button type="button" @click="register">注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import comjs from '../common/comjs.js'

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
        comjs.toast('', '请填写完整信息')
      } else {
        comjs.toast('loading', '注册中...')
        let self = this
        axios.post('/api/user/register', {
          nickname: this.nickname,
          name: this.name,
          password: this.password,
          sex: this.sex,
          age: this.age})
          .then(function (res) {
            comjs.closeLoading()
            console.log(res.data)
            comjs.toast('', res.data.mes)
            if (res.data.mes === '注册成功!') {
              self.$router.push({path: '/'})
            }
          })
          .catch(function (res) {
            console.log(res)
            comjs.closeLoading()
            comjs.toast('', '请求失败!')
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#registerdiv{
  font-size: 0.506667rem;
}
.inputdiv, .inputdiv1{
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.inputdiv input{
  width: 77%;
   height: 0.966667rem;
  font-size: 0.533333rem;
  padding-left: 0.266667rem;
}
.inputdiv1 input{
   outline-color: #00dcff;
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
