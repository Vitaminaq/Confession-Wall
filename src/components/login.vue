<template>
  <div class="hello">
    <form id="loginFrom">
      <div class="input" id="nkdiv">
        <label>昵称：</label> <input type="text" name="nickname" v-model="nickname"/>
      </div>
      <div class="input">
        <label>密码：</label> <input type="password" name="password" v-model="password"/>
      </div>
      <div id="login-btn">
        <button type="button" @click="login">登录</button>
      </div>
      <router-link to="#"><span class="button">忘记密码？</span></router-link>
      <router-link to="/register"><span class="button" id="register-btn">注册新用户</span></router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      nickname: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      axios.post('/api/user/login', {
        nickname: this.nickname,
        password: this.password})
        .then(function (res) {
          console.log(res)
        })
        .catch(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginFrom{
   margin-top: 50%;
   text-align: left;
   width: 100%;
   font-size: 0.506667rem;
}
#loginFrom .input{
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.133333rem;
}
#loginFrom input{
  width: 79%;
  height: 0.666667rem;
}
#login-btn{
  width: 100%;
  text-align: center;
}
#login-btn button{
  width: 60%;
  height: 0.8rem;
  border-style: none;
  border-radius: 5px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
  margin-top: 0.133333rem;
}
.button{
  display: inline-block;
  width: 49%;
  margin-top: 0.266667rem;
}
#register-btn{
  text-align: right;
}
</style>
