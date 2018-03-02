<template>
  <div class="hello">
    <div id="tx">
      <img src="../assets/image/login/tx.jpg">
    </div>
    <form id="loginFrom">
      <div class="input" id="nkdiv">
        <label>昵称：</label> <input type="text" name="nickname" placeholder="请输入昵称" v-model="nickname"/>
      </div>
      <div class="input">
        <label>密码：</label> <input type="password" name="password" placeholder="请输入密码" v-model="password"/>
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
// import axios from 'axios'
// import Toast from '../common/comjs.js'
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
    //   if (this.nickname === '' || this.password === '') {
    //     Toast.toast('', '昵称密码不能为空')
    //   } else {
    //     var self = this
    //     axios.post('/api/user/login', {
    //       nickname: this.nickname,
    //       password: this.password})
    //       .then(function (res) {
    //         console.log(res)
    //         if (res.data.mes === '验证成功!') {
    //           Toast.toast('loading', '登录中...')
    //           setTimeout(function () {
    //             Toast.closeLoading()
    //           }, 200)
    //           self.$router.push({path: '/chatroom'})
    //         } else {
    //           Toast.toast('', res.data.mes)
    //         }
    //       })
    //       .catch(function (res) {
    //         console.log(res)
    //         Toast.toast('', '请求失败!')
    //       })
    //   }
      this.$router.push({path: '/chatroom'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tx img{
  height: 1.333333rem;
  width: 1.333333rem;
  border-radius: 1.333333rem;
  border: solid #ADADAD 0.013333rem;
  margin-top: 35%;
}
#loginFrom{
   margin-top: 2%;
   text-align: left;
   width: 100%;
   font-size: 0.506667rem;
}
#loginFrom .input{
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
#loginFrom input{
  width: 76%;
  height: 0.966667rem;
  font-size: 0.533333rem;
  padding-left: 0.266667rem;
}
#login-btn{
  width: 100%;
  text-align: center;
}
#login-btn button{
  width: 60%;
  height: 1rem;
  border-style: none;
  border-radius: 5px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
  margin-top: 0.266667rem;
}
.button{
  display: inline-block;
  width: auto;
  margin-top: 0.4rem;
  margin-left: 0.213333rem;
}
#register-btn{
  width: 66%;
  text-align: right;
  margin-right: 0.213333rem;
}
</style>
