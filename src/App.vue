<template>
    <div id="nav">
    <router-link to="/favouritepage">Favourite</router-link> |
    <!-- <router-link to="/">Home</router-link> | -->
    <router-link to="/loginview">Login</router-link> |
    <!-- <LoginPage/> -->
    <router-link to="/registerview">Register</router-link> |
    <router-link to="/tryingstuffs">try</router-link> |
  </div>

  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
// import LoginPage from './components/LoginPage.vue'
// import RegisterPage from './components/RegisterPage.vue'


export default {
  name: 'App',
  components: {
    NavBar,
    // LoginPage
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: rgb(4, 64, 121);
}

#nav a.router-link-exact-active {
  color: pink;

}
</style>
