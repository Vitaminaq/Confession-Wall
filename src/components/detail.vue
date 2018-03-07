<template>
  <div>
    <div id="detailcontent">
      <div id="back-btn">
        <router-link to="/chatroom"><button type="button"><span>返回</span></button></router-link>
      </div>
      <h1>{{detail.title}}</h1>
      <div id="author">
        <span id="name">{{detail.nickname}}</span><span>{{detail.createtime}}</span>
      </div>
      <div id="artic">
        <span>{{detail.msg}}</span>
      </div>
      <div class="cut">
      </div>
      <div id="comment">
        <div id="commentitle">
          评论区
        </div>
        <div class="mincut">
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
            <div class="commenttxt">
              <span>{{item.c_msg}}</span>
            </div>
          </div>
        </div>
          
      </div>
      <div id="footer">
        <input type="text" name="talk" v-model="commentmsg" placeholder="说点什么"/>
        <button type="button" id="commentbtn" @click="commentit()">发表</button>
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
      detail: [],
      comment: [],
      names: [],
      commentmsg: '',
      state1: true
    }
  },
  created: function () {
    var self = this
    axios.post('/api/user/detail', {id: self.$route.query.id})
      .then(function (res) {
        res.data.mes[0].createtime = comjs.time(res.data.mes[0].createtime)
        self.detail = res.data.mes[0]
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
        self.comment = res.data.mes[0].commentxt.reverse()
        console.log(self.comment)
      })
      .catch(function (err) {
        console.log(err)
        comjs.toast('', '请求失败!')
      })
  },
  methods: {
    commentit: function () {
      var self = this
      axios.post('/api/user/comment', {id: self.$route.query.id, nickname: localStorage.getItem('nickname'), msg: self.commentmsg})
        .then(function (res) {
          comjs.toast('loading', '评论中...')
          setTimeout(function () {
            comjs.closeLoading()
          }, 200)
          location.reload()
        })
        .catch(function (err) {
          console.log(err)
          comjs.toast('', '请求失败!')
        })
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
        console.log(count)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detailcontent h1{
  padding-top: 0.4rem;
  font-size: 0.533333rem;
}
#author{
  width: 90%;
  padding-top: 0.333333rem;
  margin: 0 auto;
  font-size: 0.213333rem;
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
  font-size: 0.4rem;
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
}
#commentitle{
  font-size: 0.48rem;
  width: 90%;
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
  height: 10.666667rem;
  width: 100%;
  overflow-y: auto;
}
.commentli{
  height: auto;
  width: 100%;
  border-bottom: solid #ADADAD 1px;
  padding-bottom: 0.2rem;
}
.commentname{
  font-size: 0.36rem;
  height: 0.4rem;
  padding-left: 0.8rem;
  color: #ADADAD;
  padding-top: 0.2rem;
}
.commentmsg{
  padding-top: 0.106667rem;
  font-size: 0.213333rem;
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
.agreeimg{
  height: 0.426667rem;
  width: 0.426667rem;
  background-image: url(../assets/image/chatroom/click.png);
  background-size: cover;
}
.agreeimged{
  height: 0.426667rem;
  width: 0.426667rem;
  background-image: url(../assets/image/chatroom/clicked.png);
  background-size: cover;
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
  font-size: 0.4rem;
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
  display: table;
}
#footer input{
  width: 65%;
  height: 0.7rem;
  padding-left: 0.133333rem;
  font-size: 0.4rem;
  display: table-cell;
  vertical-align: middle;
}
#commentbtn{
  margin-left: 5%;
  background: #00dcff;
  display: table-cell;
  vertical-align: middle;
  border: solid white 1px;
  border-radius: 5px;
  color: white;
  font-size: 0.373333rem;
  width: 1.3rem;
  height: 0.8rem;
}
</style>
