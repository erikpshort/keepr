<template>
  <div class="hello">
    <h1 v-show="!authenticated">Welcome to Decks</h1>
    <p v-show="!authenticated">Get Started</p>
    <ul>
      <li v-show="!authenticated"><router-link to="login">Login</router-link></li>
      <li v-show="!authenticated"><router-link to="register">Register</router-link></li>
    </ul>
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

a {
  color: #42b983;
}
</style>
