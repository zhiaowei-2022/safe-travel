<template>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

  <div id="logged">
    <div id="nav" class="border border-1">
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/">Home</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/bookflight">Book Flights</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/ThingsToDo">Things To Do</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/accommodationpage">Accommodation</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/FoodAndDining">Food And Dining</router-link></a>
            </li>            
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
    document.head.appendChild(jquery);
  },

};
</script>

<style scoped>
#nav {
    padding: 20px;
    text-align: center;
}

#nav a {
    font-weight: bold;
}

</style>