<template>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

  <div class="container-fluid m-0 p-0" style="position: absolute; top: 0;">
  <nav id = "nav" class="navbar navbar-expand-lg mx-0 px-5">
    <div class="container-fluid">
      <img src="@/assets/safe_travel_logo.png" style="width: 214px; height: 50px;">
    </div>
    <ul class="nav me-auto mb-2 mb-lg-0 nav-pills justify-content-end" style="width:500px">
      <!-- <li class="nav-item justify-content-end">
          <a class="nav-link" id="TryingStuffs"><router-link style="text-decoration: none; color: inherit;" to="/tryingstuffs">try</router-link></a>
      </li> -->

      <li class="nav-item" >
        <div v-if="user">
          <a class="nav-link" id="UserProfile"><router-link style="text-decoration: none; color: inherit;" to="/userprofile"><em> {{username}} </em> </router-link></a>
        </div>
      </li>

      <li class="nav-item" >
        <div v-if="user">
          <a class="nav-link" id="FavouritePage"><router-link style="text-decoration: none; color: inherit;" to="/favouritepage"> Favourites </router-link></a>
        </div>
      </li>



      <li class="nav-item" id = "login">
        <div v-if="user">
          <a class="nav-link" id="LogOut" href="#" v-on:click="signOut()">Logout</a>
        </div>
        <div v-else>
          <a class="nav-link" href="#" id="LogIn" data-bs-toggle="collapse" v-on:click="openModal()">Login</a>
        </div>
      </li>


      <li class="nav-item">
        <div v-if="user==false">
          <a class="nav-link" id="RegisterView"><router-link style="text-decoration: none; color: inherit;" to="/registerview">Register</router-link></a>
        </div>
      </li>
    </ul>
  </nav>
</div>
<br>






    <div id="nav" class="border border-1" style="position: relative">
        <ul class="nav nav-pills">
            <li class="nav-item navi">
                <a class="nav-link" id = "HomeView"><router-link style="text-decoration: none; color: inherit;" to="/">Home</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id = "BookFlight"><router-link style="text-decoration: none; color: inherit;" to="/bookflight">Book Flights</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id = "ThingsToDo"><router-link style="text-decoration: none; color: inherit;" to="/ThingsToDo">Things To Do</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id = "AccommodationPage"><router-link style="text-decoration: none; color: inherit;" to="/accommodationpage">Accommodation</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id = "FoodAndDining"><router-link style="text-decoration: none; color: inherit;" to="/FoodAndDining">Food And Dining</router-link></a>
            </li>
        </ul>
    </div>



  <!-- </div> -->




  <!-- Modal -->  
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <!-- <div class="modal-dialog"> -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">Login Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="closeModal()"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <table>
                <tr>
                  <td>
                    <label for="email">Email: </label>
                  </td>
                  <td>
                    <input class="signInForm" v-model= "email" id="email" type="text" placeholder="xyz@gmail.com"> <br>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="password">Password: </label>
                  </td>
                  <td>
                    <input class="signInForm" v-if="showPassword" id="password" v-model="password" type="text" placeholder="*******">
                    <input class="signInForm" v-else id="password" v-model="password" type="password" placeholder="*******"> <br>  
                  </td>

                  <td>
                    <div v-if="showPassword" @click="toggleShow">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <div v-else @click="toggleShow">
                      <i class="fa-solid fa-eye-slash"></i>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <p id="registerlink"> New to Safe Travel? Sign up 
                      <a href="#" v-on:click="navToRegPage()">HERE</a>
                    </p> 
                    <br>
                    <button type="button" id="loginBtn" v-on:click="Login()"> Login </button>
                  </td>
                </tr>

              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>



    <!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel1" style="font-weight:bold; font-size:30px;">
          {{loginMsg}}
        </h5>
        <button type="button" class="btn-close" v-on:click="closeModal()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <br><br><img src="@/assets/sad.png" alt="sad face" style="height: 150px; width: 150px">
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back to login</button>
      </div>
    </div>
  </div>
</div>   


</template>

<script>
import * as $ from 'jquery'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "NavBar",

  components: {
    // LoginModal
  },

  data() {
    return {
      user: false,
      showPassword: false,
      username: "",
      showModal: false,
      loginMsg: "",
    };
  },

  methods: {
    toggleShow() {
      if (this.showPassword == true) {
        this.showPassword = false
      } else{
        this.showPassword = true
      }
    },

    navToRegPage() {
      $('#loginModal').modal('hide')
      $('body').removeClass('modal-open');
      $('.modal-backdrop').modal('hide')

      this.$router.replace('/registerview')
    },

    closeModal() {
      $('#exampleModal1').modal('hide')
      $('#loginModal').modal('hide')
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove()

      var name = this.$router.currentRoute._value.name
      $('.active').removeClass('active')
      document.getElementById(name).classList.toggle("active")
      // console.log( document.getElementById(name).classList)

    //       if ( name== ("UserProfile") || name == ("FavouritePage") ) {
    //   $(this).children().children().addClass('active')
    // }

    // else if (name == "RegisterView") {
    //   $(this).children().children().addClass('active')
    // }

    // else {
    //   console.log("here")
    //   $(this).children().addClass('active')
    //   // $(this).removeClass('active');   

    // }

    },

    openModal() {
      $('#loginModal').modal('show')
      //  $('.modal-backdrop').show()

    },

    Login() {
      var email = document.getElementById("email").value
      var password = document.getElementById("password").value
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          $('#loginModal').modal('hide')
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove()
        })
        .catch((error) => {
          console.log(error.message)
          switch (error.code) {
            case "auth/invalid-email":
              this.loginMsg = "Invalid Email";
              break;
            default:
              // alert("Incorrect Email/Password")
              this.loginMsg = "Incorrect Email/Password";
              break;
          }
          $('#loginModal').modal('hide')
          $('#exampleModal1').modal('toggle')
        });   
    },

    async signOut() {
        const auth = getAuth();
        const user = auth.currentUser;
        signOut(auth, user)
        // console.log(this.$router.currentRoute._value.name)
        if ( ((this.$router.currentRoute._value.name) == "UserProfile") || ((this.$router.currentRoute._value.name) == "FavouritePage")) {
          await this.$router.push({name: 'HomeView'})
        }
        this.$router.go()

    },
    
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.username = user.displayName
      }
    });
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
    document.head.appendChild(jquery);

    
    var current = (this.$router.currentRoute)
    
    $(document).ready(function() {
      var page_name = current['_value']['name']
      if (page_name != "UserProfile") {
        console.log(document.getElementById(page_name))
        document.getElementById(page_name).classList.toggle("active")
      }

    });


    $('.nav li').click(function() {
      // $("#HomeView").removeClass("active")
      // $("#BookFlight").removeClass("active")
      // $("#ThingsToDo").removeClass("active")
      // $("#FoodAndDining").removeClass("active")
      // $("#AccomodationPage").removeClass("active")
      // $("#TryingStuffs").removeClass("active")
      // $("#RegisterView").removeClass("active")
      // $("#UserProfile").removeClass("active")
      $('.active').removeClass('active')

      // console.log($(this))

    if (($(this).children().children()[0].id) == ("UserProfile") || ($(this).children().children()[0].id) == ("FavouritePage")) {
      $(this).children().children().addClass('active')
    }

    else if (($(this).children().children()[0].id) == "RegisterView") {
      $(this).children().children().addClass('active')
    }

    else {
      $(this).children().addClass('active')
      // $(this).removeClass('active');   

    }
    
      // console.log($(this).children().children()[0].id)


    })
    

  },
  updated() {
    console.log("here")
    this.$nextTick(() => {
      var current = (this.$router.currentRoute)
      console.log(current)
      var page_name = current['_value']['name']
      document.getElementById(page_name).classList.toggle("active")
    })
  }

};
</script>

<style scoped>
#nav {
  padding: 20px;
  text-align: center;
      /* position: fixed; */
  /* position: -webkit-sticky; */
  /* margin: 0 0 100px 0; */
  /* top: 0; */
  
}

#nav a {
  font-weight: bold;
  
}

.nav-link {
  padding: 8px 16px 8px 16px;
}


.signInForm {
  max-width: 190px;
  width: 100%;
  background-color: #f0f0f0;
  height: 30px;
  border-radius: 55px;
  border: 3px solid transparent;
  padding: 0 0.4rem;
  font-size: 15px;
  margin: 20px auto;
}



#registerlink {
  font-size: 10px;
}

table{
  margin-left:auto;
  margin-right:auto;
  text-align: right;

}
td{
  padding-left:10px;
}

label {
  color: black;
}

#loginBtn {
  background-color: rgb(0, 15, 92);
  color: white;
  font-weight: bold;
  width: 120px;
  height: 50px;
  align-items: center;
}

html,body{
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
}

#nav a.router-link-exact-active {
  color: white !important;
  /* background-color: green; */
}

/* .modal {
  text-align: center;
  padding: 0!important;
}
.modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
} */





</style>