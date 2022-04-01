<template>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

  <div id="logged" style="border: 1px solid">
    <div id="nav" style="padding: 0 20px 0 20px">
      <div class="container">
      <!-- <ul class="nav nav-pills " style="position:absolute; top:0; right: 2%; margin: 10px;"> -->
        <ul class="nav nav-pills" >
        <li class="nav">
            <img src="@/assets/sad.png" alt="sad face" style="height: 40px;">
        </li>

        <li class="nav-item justify-content-end">
            <a class="nav-link" id="TryingStuffs"><router-link style="text-decoration: none; color: inherit;" to="/tryingstuffs">try</router-link></a>
        </li>
        <li class="nav-item">
          <div v-if="user">
            <a class="nav-link" href="#" v-on:click="signOut()" style="text-decoration: none; color: inherit;">Log Out</a>
          </div>
          <div v-else>
            <a class="nav-link" href="#" v-on:click="openModal()" data-bs-toggle="modal">Login</a>
          </div>
        </li>
        <li class="nav-item">
            <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/registerview">Register</router-link></a>
        </li>
      </ul>
    </div>
    </div>
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
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/accomodationpage">Accommodation</router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/FoodAndDining">Food And Dining</router-link></a>
            </li>
        </ul>
    </div>




  </div>


  <!-- Modal -->  
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">Login Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                      <a v-on:click="navToRegPage()">HERE</a>
                    </p> 
                    <!-- <router-view/> -->
                    <br>
                
                <!-- <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" to="/bookflight">Book Flights</router-link></a> -->

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
<!-- </div> -->


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
        <br><br><img src="@/assets/sad.png" alt="sad face" style="height: 120px">
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back to login</button>
      </div>
    </div>
  </div>
</div>   


</template>

<script>
// import LoginModal from '@/components/LoginModal.vue'
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
      $('#exampleModal').modal('hide')
      $('body').removeClass('modal-open');
      $('.modal-backdrop').modal('hide')

      this.$router.replace('/registerview')
    },

    closeModal() {
      $('#exampleModal1').modal('hide')
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove()

    },

    openModal() {
      $('#exampleModal').modal('show')
    },

    Login() {
      var email = document.getElementById("email").value
      var password = document.getElementById("password").value
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          $('#exampleModal').modal('hide')
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
          $('#exampleModal').modal('hide')
          $('#exampleModal1').modal('toggle')
        });   
    },

    async signOut() {
        const auth = getAuth();
        const user = auth.currentUser;
        signOut(auth, user)
        console.log(this.$router.currentRoute._value.name)
        if ((this.$router.currentRoute._value.name) == "TryingStuffs") {
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
            }
        });
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
    document.head.appendChild(jquery);


  },

};
</script>

<style scoped>
#nav {
    /* padding: 20px; */
    text-align: center;
        /* position: fixed; */
    /* position: -webkit-sticky; */
    /* margin: 0 0 100px 0; */
    /* top: 0; */
}

#nav a {
    font-weight: bold;
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



</style>