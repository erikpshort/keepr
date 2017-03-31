<template>
  <div id="app">
    <navBar class="navBar"></navBar>
    <br>
    {{err}}
    <router-view></router-view>
  </div>
</template>

<script>
  import navBar from './components/NavBar'
export default {
  name: 'app',
  components: {navBar},
  data(){
    return {
    }
  },
  computed:{
    err(){
      return this.$root.store.state.error
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navBar{
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 0 !important
}
</style>
