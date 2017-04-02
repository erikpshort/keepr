<template>
  <div class="hello">
    <img src="../assets/decklogo.png" alt="">
    <br>
    <br>
    <h4 class="blue-text" v-show="!authenticated">Get Started</h4>
    <br>
    <ul>
      <li v-show="!authenticated"><router-link class="blue-text size-up" to="login">Login</router-link></li>
      <li v-show="!authenticated"><router-link class="blue-text size-up" to="register">Register</router-link></li>
    </ul>
    <br>
    <hr v-show="!authenticated">
    <mainPage v-show="authenticated"></mainPage>
  </div>
</template>

<script>
  import mainPage from './MainPage'
export default {
  name: 'hello',
  components: {mainPage},
  mounted(){
    this.$root.store.actions.authenticate()
  },
  computed: {
    authenticated(){
      return this.$root.store.state.authenticated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.blue-text{
  color: #183a56;
  
}

.size-up{
  font-size: 32px;
  text-decoration: none
}
</style>
