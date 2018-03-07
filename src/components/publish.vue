<template>
  <div id="publish">
    <div id="back-btn">
      <router-link to="/chatroom"><button type="button" class="back"><span>返回</span></button></router-link>
      <button type="button" class="publishit" @click="publish"><span>发表</span></button>
    </div>
    <input type="text" placeholder="请输入标题" v-model="title" autofocus="autofocus"/>
    <textarea placeholder="请输入正文" v-model="artic">
    </textarea>
  </div>
</template>

<script>
import axios from 'axios'
import comjs from '../common/comjs.js'

export default {
  name: 'publish',
  data () {
    return {
      title: '',
      artic: ''
    }
  },
  methods: {
    publish: function () {
      if (this.title === '' || this.artic === '') {
        comjs.toast('', '请填写完整信息!')
      } else {
        var self = this
        axios.post('/api/user/publish', {
          nickname: localStorage.getItem('nickname'),
          title: self.title,
          msg: self.artic})
          .then(function (res) {
            comjs.toast('loading', '发表中...')
            setTimeout(function () {
              comjs.closeLoading()
            }, 200)
            self.$router.push({path: '/chatroom'})
            console.log(res)
          })
          .catch(function (res) {
            console.log(res)
            comjs.toast('', '请求失败!')
          })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#back-btn{
  width: 95%;
  padding-left: 5%;
  margin-top: 4%;
  text-align: left;
}
.back{
  width: 20%;
  height: 1rem;
  border-style: none;
  border-radius: 50px 5px 5px 50px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
}
.publishit{
  width: 20%;
  height: 1rem;
  margin-left: 52%;
  border-style: none;
  border-radius: 5px 50px 50px 5px;
  background-color: #00dcff;
  color: white;
  font-size: 0.453333rem;
}
#back-btn button span{
  margin-left: 0.2rem;
}
#publish input{
  margin-top: 0.8rem;
  padding-left: 0.266667rem;
  width: 40%;
  font-size: 0.533333rem;
  height: 0.8rem;
}
textarea{
  margin-top: 0.6rem;
  height: 4.0rem;
  width: 86%;
  outline: none;
  border: solid #ADADAD 1px;
  padding-left: 0.266667rem;
  padding-top: 0.266667rem;
  font-size: 0.48rem;
}
</style>
