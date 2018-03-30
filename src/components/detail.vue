<template>
  <div id="detail">
    <div id="detailcontent">
      <div id="back-btn">
        <button type="button" @click="back()"><span>返回</span></button>
      </div>
      <h1>{{detail.title}}</h1>
      <div id="author">
        <span id="name">{{detail.nickname}}</span><span>{{detail.createtime}}</span>
      </div>
      <div id="artic">
        <span>{{detail.msg}}</span>
      </div>
      <div id="comment">
        <div id="commentitle">
          评论区
        </div>
        <div class="commentul">
          <div class="commentli" v-for="(item, index) in comment">
            <div class="commentname">
              {{item.c_name}}
            </div>
            <div class="commentmsg">
              <span class="time">{{item.c_time}}</span>
              <span class="agree">
                <span :class="item.c_agree.status ? 'agreeimged' : 'agreeimg'" @click="agreeit(index)"></span>
                <span class="agreenum">{{item.c_agree.num}}</span>
              </span>
            </div>
            <div class="commenttxt" v-html='item.c_msg'>
            </div>
          </div>
          <div id="ulbottom"></div>
        </div>
      </div>
      <div id="footer">
        <div v-show="hidshow1">
          <input @focus="sayit()" id="input1" type="text" name="" placeholder="说点什么..."/>
          <span class="agreeauthor" @click="agreeauthor()">
            <span :class="status ? 'agreeauthorimged' : 'agreeauthorimg'"></span>
            <span class="agreeaunum">{{num}}</span>
          </span>
          <span class="cmauthor">
            <span class="cmauthorimg"></span>
            <span class="agreeaunum">{{detail.commentunm}}</span>
          </span>
        </div>
        <div v-show="!hidshow1" id="commentdiv">
          <img id="motion" src="../assets/image/detail/input.png">
          <input @blur="nosay()" @keyup="filter()" id="input2" type="text" name="" v-model="commentmsg" placeholder="可使用输入法自带表情" autofocus="autofocus" />
          <button type="button" id="commentbtn" @click="commentit()">发表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import comjs from '../common/comjs.js'
export default {
  name: 'detail',
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
  created: function () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData: function () {
      var self = this
      axios.post('/api/user/detail', {id: self.$route.query.id})
        .then(function (res) {
          res.data.mes[0].createtime = comjs.time(res.data.mes[0].createtime)
            if (res.data.mes[0].click.name.length === 0) {
              Vue.set(res.data.mes[0].click, 'status', false)
            } else {
              for (var n = 0; n < res.data.mes[0].click.name.length; n++) { 
                if (res.data.mes[0].click.name[n] === localStorage.getItem('nickname')) {
                  Vue.set(res.data.mes[0].click, 'status', true)
                } else {
                  Vue.set(res.data.mes[0].click, 'status', false)
                }
              }
            }
          if (res.data.mes[0].commentxt.length > 0) {
            for (var i = 0; i < res.data.mes[0].commentxt.length; i++) {
              res.data.mes[0].commentxt[i].c_time = comjs.time(res.data.mes[0].commentxt[i].c_time)
              if (res.data.mes[0].commentxt[i].c_agree.name.length === 0) {
                Vue.set(res.data.mes[0].commentxt[i].c_agree, 'status', false)
              } else {
                for (var j = 0; j < res.data.mes[0].commentxt[i].c_agree.name.length; j++) {
                  if (res.data.mes[0].commentxt[i].c_agree.name[j] === localStorage.getItem('nickname')) {
                    Vue.set(res.data.mes[0].commentxt[i].c_agree, 'status', true)
                  } else {
                    Vue.set(res.data.mes[0].commentxt[i].c_agree, 'status', false)
                  }
                }
              }
            }
          }
          self.detail = res.data.mes[0]
          self.num = res.data.mes[0].click.num
          self.status = self.detail.click.status
          self.comment = res.data.mes[0].commentxt.reverse()
        })
        .catch(function (err) {
          console.log(err)
          comjs.toast('', '请求失败!')
        })
    },
    filter: function () {
      var reg = new RegExp('傻逼', 'g')
      this.commentmsg = this.commentmsg.replace(reg, '***')
    },
    commentit: function () {
      var self = this
      if (this.commentmsg === '') {
        comjs.toast('', '评论不能为空!')
      } else {
        axios.post('/api/user/comment', {id: self.$route.query.id, nickname: localStorage.getItem('nickname'), msg: self.commentmsg})
          .then(function (res) {
            comjs.toast('loading', '评论中...')
            setTimeout(function () {
              comjs.closeLoading()
            }, 200)
            self.getData()
            self.commentmsg = ''
          })
          .catch(function (err) {
            console.log(err)
            comjs.toast('', '请求失败!')
          })
      }
    },
    agreeauthor: function () {
      var self = this
      var count = 0
      if (this.state2 === true) {
        this.state2 = false
        if (self.status === true) {
          count--
        } else {
          count++
        }
        axios.post('/api/user/artic/agree', {
          id: self.$route.query.id,
          nickname: localStorage.getItem('nickname'),
          count: count})
          .then(function (res) {
            if (res.data.mes === '点赞成功!') {
              if (self.status === true) {
                self.status = false
                self.num = self.num - 1
              } else {
                self.status = true
                self.num = self.num + 1
              }
              self.state2 = true
            } else {
              comjs.toast('', '请求失败!')
              self.state2 = true
            }
          })
          .catch(function (err) {
            console.log(err)
            comjs.toast('', '请求失败!')
            self.state2 = true
          })
      }
    },
    agreeit: function (index) {
      var self = this
      var count = 0
      var indexs = this.comment.length - index - 1
      if (this.state1 === true) {
        this.state1 = false
        if (this.comment[index].c_agree.status === true) {
          count--
        } else {
          count++
        }
        axios.post('/api/user/agree/comment', {
          id: self.$route.query.id,
          nickname: localStorage.getItem('nickname'),
          count: count,
          index: indexs})
          .then(function (res) {
            if (res.data.mes === '点赞成功!') {
              if (self.comment[index].c_agree.status === true) {
                self.comment[index].c_agree.status = false
                self.comment[index].c_agree.num = self.comment[index].c_agree.num - 1
              } else {
                self.comment[index].c_agree.status = true
                self.comment[index].c_agree.num = self.comment[index].c_agree.num + 1
              }
              self.state1 = true
            } else {
              comjs.toast('', '请求失败!')
              self.state1 = true
            }
          })
          .catch(function (err) {
            console.log(err)
            comjs.toast('', '请求失败!')
            self.state1 = true
          })
      }
    },
    sayit: function () {
      this.hidshow1 = false
      setTimeout(function () {
        document.getElementById('input2').focus()
      }, 0)
    },
    nosay: function () {
      this.hidshow1 = true
    },
    back: function () {
      // this.$router.push({path: '/chatroom?id=' + this.id })
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detail{
  height: 100%;
  overflow-y: auto;
}
#detailcontent h1{
  padding-top: 0.4rem;
  font-size: 0.55rem;
}
#author{
  width: 90%;
  padding-top: 0.333333rem;
  margin: 0 auto;
  font-size: 0.3rem;
  text-align: left;
  color: #ADADAD;
}
#author span{
  display: inline-block;
}
#name{
  width: 20%;
}
#artic{
  font-size: 0.45rem;
  text-align: left;
  height: auto;
  width: 90%;
  margin: 0 auto;
  padding-top: 0.266667rem;
  padding-bottom: 0.4rem;
}
.cut{
  height: 0.066667rem;
  width: 100%;
  background-color: #adadad75;
}
#comment{
  text-align: left;
  height: auto;
  overflow-y: auto;
}
#commentitle{
  border-top: #ADADAD solid 0.066667rem;
  border-bottom: #ADADAD solid 1px;
  font-size: 0.5rem;
  padding-left: 0.533333rem;
  height: 1.066667rem;
  margin: 0 auto;
  line-height: 1.066667rem;
}
.mincut{
  height: 1px;
  width: 100%;
  background-color: #adadad75;
}
.commentul{
  height: auto;
  width: 100%;
  overflow-y: auto;
}
#ulbottom{
  height: 1.2rem;
}
.commentli{
  height: auto;
  width: 100%;
  border-bottom: solid #ADADAD 1px;
  padding-bottom: 0.2rem;
}
.commentname{
  font-size: 0.4rem;
  height: 0.46rem;
  padding-left: 0.8rem;
  color: #ADADAD;
  padding-top: 0.2rem;
}
.commentmsg{
  padding-top: 0.106667rem;
  font-size: 0.3rem;
  color: #ADADAD;
  height: 0.466667rem;
  position: relative;
  padding-left: 0.8rem;
  overflow: hidden;
}
.commentmsg span{
  display: inline-block;
}
.agreenum{
  position: relative;
  top: -0.04rem;
  padding-left: 0.133333rem;
}
.agreeimg, .agreeimged{
  height: 0.426667rem;
  width: 0.426667rem;
  background-size: cover;
}
.agreeimg{
  background-image: url(../assets/image/chatroom/click.png);
}
.agreeimged{
  background-image: url(../assets/image/chatroom/clicked.png);
}
.agreeauthor{
  display: inline-block;
  width: auto;
  padding-left: 0.4rem;
  padding-top: 0.05rem;
}
.agreeauthorimg{
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
  background-image: url(../assets/image/chatroom/click.png);
  background-size: cover;
}
.agreeauthorimged{
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
  background-image: url(../assets/image/chatroom/clicked.png);
  background-size: cover;
}
.agreeaunum{
  font-size: 0.4rem;
  position: relative;
  display: inline-block;
  width: 1.066667rem;
  overflow-x: hidden;
  bottom: 0.09rem;
  right: 0.20rem;
  color: #ADADAD;
}
.cmauthorimg{
  margin-left: -0.48rem;
  display: inline-block;
  height: 0.7rem;
  width: 0.7rem;
  background-image: url(../assets/image/detail/comment.png);
  background-size: cover;
}
.cmaunum{
  font-size: 0.426667rem;
}
.commentmsg img{
  width: 0.426667rem;
  height: 0.426667rem;
}
.time{
  width: 40%;
}
.agree{
  width: 51%;
  height: 0.466667rem;
  line-height: 0.466667rem;
  text-align: right;
}
.commenttxt{
  padding-top: 0.133333rem;
  padding-left: 0.8rem;
  font-size: 0.42rem;
}
#back-btn{
  width: 95%;
  padding-left: 5%;
  margin-top: 4%;
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
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 1.2rem;
  border-top: solid #ADADAD 1px;
  background-color: white;
  width: 100%;
  text-align: left;
  overflow: hidden;
}
#footer #input1{
  width: 45%;
  height: 0.8rem;
  border-radius: 50px;
  padding-left: 0.666667rem;
  position: relative;
  top: -0.19rem;
  left: 0.266667rem;
  font-size: 0.5rem;
}
#input2{
  width: 64%;
  height: 0.8rem;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 0.5rem;
  border-radius: 0;
  padding-left: 0.133333rem;
  position: relative;
  bottom: 0.266667rem;
}
/*#footer p{
  display: inline-block;
  width: 60%;
  height: 0.8rem;
  overflow-y: hidden;
  padding-left: 0.133333rem;
  text-align: left;
  font-size: 0.6rem;
  border-radius: 5px;
  border: solid #ADADAD 1px;
  outline: none;
}*/
#motion{
  height: 0.933333rem;
  width: 0.933333rem;
  margin-left: 0.266667rem;
  padding-top: 0.026667rem;
}
#commentdiv{
  padding-top: 0.07rem;
}
#commentbtn{
  background: #00dcff;
  position: relative;
  top: -0.266667rem;
  right: -0.08rem;
  border: solid white 1px;
  border-radius: 5px;
  color: white;
  font-size: 0.373333rem;
  width: 1.3rem;
  height: 0.8rem;
}
</style>
