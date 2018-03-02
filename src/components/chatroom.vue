<template>
  <div id="chatroom">
    <div id="header">
      <span>Confenssion Wall</span>
    </div>
    <div id="footer">
      <input type="text" name="talk" placeholder="发表言论"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header{
  background-color: #00dcff;
  font-size: 0.533333rem;
  color: white;
  height: 0.96rem;
  line-height: 0.96rem;
}
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 1.2rem;
  background-color: #00dcff;
  width: 100%;
  display: table;
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
