<template>
  <title> SafeTravel | Food and Dining </title>
  <NavBar/>
  <FoodAndDining/>
</template>

<script>
import FoodAndDining from './components/FoodAndDining.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    FoodAndDining,
    NavBar
  }
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
</style>