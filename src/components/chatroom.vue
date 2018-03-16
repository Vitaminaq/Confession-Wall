<template>
  <div id="chatroom">
    <div id="header">
      <span>Confenssion Wall</span>
      <img @click="loginout()" src="../assets/image/chatroom/loginout.png"/>
    </div>
    <div>
      <div id="divul">
        <div id="divli" v-for="item in msg" @click="todetail(item._id)">
          <div class="title">
            <span>标题：</span><span>{{item.title}}</span>
          </div>
          <div class="author">
            <span class="authormsg">作者：</span><span class="authormsg authorname">{{item.nickname}}</span>
            <span class="publishtime publishtxt">发表于</span><span class="publishtime">{{item.createtime}}</span>
          </div>
          <div class="oparatenum">
           <span>浏览量：</span><span class="view">{{item.viewnum}}</span>
           <span class="comment">评论：</span><span class="commentnum">{{item.commentunm}}</span>
           <span class="agreen">赞：</span><span>{{item.clicknum}}</span>
          </div>
        </div>
        <div id="bottom">
        </div>
      </div>
    </div>
    <div id="footer">
      <input type="text" name="talk" @focus="towrite" placeholder="发表言论"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import comjs from '../common/comjs.js'
export default {
  name: 'chatroom',
  data () {
    return {
      msg: []
    }
  },
  created: function () {
    var self = this
    axios.get('/api/user/chatroomsg')
      .then(function (res) {
        for (var i = 0; i < res.data.mes.length; i++) {
          res.data.mes[i].createtime = comjs.time(res.data.mes[i].createtime)
        }
        self.msg = res.data.mes
      })
      .catch(function (res) {
        console.log(res)
        comjs.toast('', '请求失败!')
      })
  },
  methods: {
    todetail: function (id) {
      axios.post('/api/user/view', {id: id})
        .then(function (res) {
        })
        .catch(function (res) {
          console.log(res)
          comjs.toast('', '请求失败!')
        })
      this.$router.push({path: '/detail?id=' + id})
    },
    towrite: function () {
      this.$router.push({path: '/publish'})
    },
    loginout: function () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chatroom{
  height: 100%;
}
#header{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #00dcff;
  font-size: 0.533333rem;
  color: white;
  height: 0.96rem;
  line-height: 0.96rem;
}
#header img{
  height: 0.6rem;
  width: 0.6rem;
  position: relative;
  left: 22%;
  top: 0.09rem;
}
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 1.2rem;
  background-color: white;
  border-top: solid #ADADAD 1px;
  width: 100%;
  display: table;
}
#bottom{
  height: 1.2rem;
}
#divul {
  margin-top: 0.96rem;
  height: auto;
/*  border: solid gray 1px;*/
  width: 100%;
}
#divli{
  width: 98%;
  text-align: left;
  height: 2rem;
  /*border: solid gray 1px;*/
  padding-left: 2%;
  border-bottom: solid #ADADAD 0.013333rem;
}
.title{
  padding-top: 0.133333rem;
  height: 0.613333rem;
  width: 100%;
  overflow: hidden;
  font-size: 0.533333rem;
  font-weight: bold;
}
.author{
  width: 100%;
  height: 0.466667rem;
  font-size: 0.38rem;
  padding-top: 0.133333rem;
}

/*ul li .authormsg{
  font-size: 0.38rem;
}*/
.authorname{
  width: 15%;
}
.publishtime{
  font-size: 0.213333rem;
  color: #ADADAD;
}
.publishtxt{
  margin-left: 4%;
}
.oparatenum{
  padding-top: 0.106667rem;
  width: 100%;
  font-size: 0.32rem;
  height: 0.4rem;
  color: #ADADAD;
}
.author span, .oparatenum span{
  display: inline-block;
}
.view{
  width: 20%;
}
.comment{
  margin-left: 29%;
}
.commentnum{
  width: 7%;
}
.agreen{
  margin-left: 2%;
}
#footer input{
  width: 80%;
  height: 0.8rem;
  border: solid #ADADAD 1px;
  padding-left: 0.266667rem;
  font-size: 0.4rem;
  display: table-cell;
  vertical-align: middle;
}
</style>
