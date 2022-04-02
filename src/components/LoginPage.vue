<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
<!-- <div>
    <table border = '0'>
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
                  <router-link to="/registerview">HERE</router-link> </p>
                  <router-view/>
                 <br>
                
                <button type="button" id="loginBtn" v-on:click="UserLogin()"> Log In as User</button><br><br>
                <button type="button" id="loginBtn" v-on:click="AnonymousLogin()"> Log In Anonymously</button>
            </td>
        </tr>

    </table> -->


 <div class="container p-5">
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    User Login
  </button>  -->

<a href="#exampleModal" data-bs-toggle="modal">Login</a>
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
                      <router-link to="/registerview">HERE</router-link> 
                    </p> <router-view/> 
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
</div>

    <!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel1" style="font-weight:bold; font-size:30px;">
          {{loginMsg}}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import * as $ from 'jquery'

export default {
    name: 'LoginPage',


  data() {
    return {
      showPassword: false,
      username: "",
      showModal: false,
      user:false,
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

    Login() {
      var email = document.getElementById("email").value
      var password = document.getElementById("password").value
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // const user = userCredential.user;
          // console.log(user.email)
          // console.log("signed in")
          $('#exampleModal').modal('hide')
          $('.modal-backdrop').modal('hide')
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
    
  },


    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)
        
    },
  
}
</script>

<style scoped>
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