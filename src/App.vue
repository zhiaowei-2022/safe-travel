<template>
  <BookFlight/>
  <FlightResults/>
  <FlightNotFound/>
</template>

<script>
import BookFlight from './components/BookFlight.vue'
import FlightResults from './components/FlightResults.vue'
import FlightNotFound from './components/FlightNotFound.vue'

export default {
  name: 'App',
  components: {
    BookFlight,
    FlightResults,
    FlightNotFound
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
