<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
<!-- <div id="container">
  <div id="content">
        <h1> Register for an account </h1>
        
        <div>
          <table border = '0'>
            <tr>
              <td>
                <strong><label for="email" >Email: </label></strong>
                <p style="font-size:10px;">&nbsp;</p>
              </td>
              <td>
                <input class="registerForm" v-model="email" @input="checkEmail()" type="email" placeholder="xyz@gmail.com">
                <p v-if="checkingEmail" id="invalidCritera"> {{emailCriteria}} </p>
                <p v-else id="invalidCritera">&nbsp;</p>
                

              </td>
            </tr>
            
            <tr>
              <td>
                <strong><label for="username">Username: </label></strong>
                <p style="font-size:7px;">&nbsp;</p>
              </td>
              <td>
                  <input class="registerForm" v-model="username" @input="checkUsername()" type="text" placeholder="xyz">
                  <p id="invalidCritera" v-if="checkingUsername"> {{usernameCriteria}} </p>
                  <p v-else id="invalidCritera">&nbsp;</p>
              </td>
            </tr>

            <tr>
              <td>
                <strong><label for="password">Password: </label></strong>
                <p style="font-size:10px;">&nbsp;</p>
              </td>
              <td>
                <input class="registerForm" v-if="showPassword" v-model="password" @input="checkPassword()" type="" placeholder="*******">
                <input class="registerForm" v-else v-model="password" @input="checkPassword()" type="password" placeholder="*******">
                <p id="invalidCritera" v-if="checkingPassword"> {{passwordCriteria}} </p> 
                <p v-else id="invalidCritera">&nbsp;</p>
                
              </td>
              <td>
                <div v-if="showPassword" @click="toggleShow">
                  <i id = "visibility" class="fa-solid fa-eye"></i>
                  <p></p>
                </div>
                <div v-else @click="toggleShow">
                    <i id = "visibility" class="fa-solid fa-eye-slash"></i>
                    <p></p>
                  </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <p id="login"> Already have an account? Login
                  <router-link to="/loginview">HERE</router-link> </p>
                  <router-view/> <br>

                <button type="button" id="registerBtn" v-on:click="register()" v-if="criteriaArray.every(x => x == true)">REGISTER</button>
                <button type="button" v-else id ="invalidRegisterBtn"> REGISTER</button>
                </td>
            </tr>
          </table>
        </div>
        </div>
        </div> -->



<div class="container">
  <h1> Register for an account </h1>

  <div class="row justify-content-md-center">
    <div class="col-md-auto">
      <strong><label for="email" >Email: </label></strong>
    </div>
    <div class="col-md-auto">
      <input class="registerForm" v-model="email" @input="checkEmail()" type="email" placeholder="xyz@gmail.com">
      <p v-if="checkingEmail" id="invalidCritera"> {{emailCriteria}} </p>
    </div>
  </div>


  <div class="row">
    <div class="col">
      <strong><label for="username">Username: </label></strong>
    </div>
    <div class="col">
      <input class="registerForm" v-model="username" @input="checkUsername()" type="text" placeholder="xyz">
      <p id="invalidCritera" v-if="checkingUsername"> {{usernameCriteria}} </p>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <strong><label for="password">Password: </label></strong>
    </div>
    <div class="col">
      <input class="registerForm" v-if="showPassword" v-model="password" @input="checkPassword()" type="" placeholder="*******">
      <input class="registerForm" v-else v-model="password" @input="checkPassword()" type="password" placeholder="*******">
      <p id="invalidCritera" v-if="checkingPassword"> {{passwordCriteria}} </p> 
    </div>

    <div class="col">
      <div v-if="showPassword" @click="toggleShow">
        <i id = "visibility" class="fa-solid fa-eye"></i>
      </div>

      <div v-else @click="toggleShow">
        <i id = "visibility" class="fa-solid fa-eye-slash"></i>
      </div>

    </div>

  </div>


</div>

        
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const db = getFirestore(firebaseApp);


export default {
  name: 'RegisterPage',

  data() {
    return {
      showPassword: false,
      password: "",
      email: "",
      emailCriteria: "",
      passwordCriteria: "",
      usernameCriteria: "",
      username: "",
      checkingEmail: false,
      checkingUsername: false,
      checkingPassword: false,
      checkingRegister: true,
      criteriaArray:[false, false, false]
    };
  },
  methods: {
      mounted() {
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         this.user = user;
        //     }
        // });
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)
    },
    toggleShow() {
      if (this.showPassword == true) {
        this.showPassword = false
      } else{
        this.showPassword = true
      }
    },

    async checkEmail() {
      this.checkingEmail = true
      this.invalidEmail()
    },

    async checkUsername() {
      this.checkingUsername = true

      this.invalidUsername()
    },

    async checkPassword () {
      this.checkingPassword = true
      this.invalidPassword()
    },

    async invalidEmail(){
      this.criteriaArray[0] = false
      this.email = this.email.trim()
      if (this.email == ""){
        this.emailCriteria = "Invalid Email: Cannot be blank"
        return true
      } else{
        var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ /* eslint-disable-line */
        if (!emailFormat.test(this.email)) { /* eslint-disable-line */
          this.emailCriteria = "Invalid Email Format" 
          return true;
        }
        // if (!(this.email.includes("@"))) {
        //   this.emailCriteria = "Invalid Email: Requires @"
        //   return true
        // } else if (!(this.email.includes("."))) {
        //   this.emailCriteria = "Invalid Email: Requires ."
        //   return true
        //  } 
        
         else{
          const docRef = doc(db, "Users", this.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.emailCriteria = "Email is in used"
            return true;
          }
          else {
            this.emailCriteria = ""
            this.checkingEmail = false
            this.criteriaArray[0] = true
            return false;

          }
        }
      }
    },

    invalidUsername() {
      this.criteriaArray[1] = false
      if (this.username == "") {
        this.usernameCriteria = "Invalid Username: Cannot be empty"
        return true
      } 
      else {
        this.checkingUsername = false
        this.criteriaArray[1] = true
        return false
      }
    },

    invalidPassword() {
      this.criteriaArray[2] = false
      var numbers = /[0-9]/g;
      if (!this.password.match(numbers) && this.password.length < 8) {
        this.passwordCriteria = "Invalid Password: At least 8 Characters with numeric number"
        return true
      }
      else if (!this.password.match(numbers)) {
        this.passwordCriteria = "Invalid Password: At least one numeric number"
        return true
      }
      else if (this.password.length < 8) {
        this.passwordCriteria = "Invalid Password: At least 8 Characters"
        return true
      }else{
        this.checkingPassword = false
        this.criteriaArray[2] = true

        return false
      }
    },


    async register() {
        var email = this.email
        var username = this.username
        var password = this.password

        let x = await this.invalidEmail()
        let y = this.invalidPassword()
        let z = this.invalidUsername()


        if (x == false && y == false && z == false) {
          alert("Registering for " + username)

          try {
            const docRef = await setDoc(doc(db, "Users", email), {
                email: email, 
                username: username, 
                password: password, 
                favourites: {},
                previousPurchases: {},
                paymentMethod: {}

            })

            console.log(docRef)

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)

                updateProfile(auth.currentUser, {
                  displayName: username
                  }).then(() => {
                    console.log("displayName set")
                    this.$router.push({name: 'HomeView'})
                  }).catch((error) => {
                    console.log(error.message)
                  });
              })

            
          }
          catch(error) {
              console.error("Error adding document: ", error);
          }
        }
        
        else {
          console.log("invalid") 
        }
    }
  }
}


</script>

<style scoped>

.container {
  margin-right: 180px;
  margin-left: 180px;
}


</style>