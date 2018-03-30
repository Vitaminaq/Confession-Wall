<template>
  <div id="app">
    <!-- <keep-alive> -->
      <!-- <router-view/> -->
    <!-- </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./common/screen.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
a{
  text-decoration: none;
  color: #00dcff;
  /*color: black;*/
}
input{
  outline: none;
  border-radius: 5px;
  border: solid #ADADAD 1px;
}
</style>
