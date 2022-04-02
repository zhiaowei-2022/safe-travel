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


<div id="holder">
<div class="container">
  <div class="title">
    <h1> Register for an account </h1>
  </div>

  <div id="background">


  <div class="field">
    <div class="row justify-content-md-center">
      <div class="col col-lg-1" style="text-align:right">
        <strong><label for="email" id="credentials">Email: </label></strong>
      </div>
      <div class="col col-lg-3">
        <input class="registerForm" v-model="email" @input="checkEmail()" type="email" placeholder="xyz@gmail.com">
        <p v-if="checkingEmail" id="invalidCritera"> {{emailCriteria}} </p>
        
      </div>
    </div>
  </div>

  <div class="field">
    <div class="row justify-content-md-center">
      <div class="col col-lg-1" style="text-align:right">
        <strong><label for="username" id="credentials">Username: </label></strong>
      </div>
      <div class="col col-lg-3">
        <input class="registerForm" v-model="username" @input="checkUsername()" type="text" placeholder="xyz">
        <p id="invalidCritera" v-if="checkingUsername" v-html="usernameCriteria"></p>
      </div>
      <!-- <div class="col col-lg-1">
      </div> -->
    </div>
  </div>


  <div class="field">
    <div class="row justify-content-md-center">
      <div class="col col-lg-1">
        <strong><label for="password" id="credentials" style="text-align:right">Password: </label></strong> 
      </div>
      <div span class="col col-lg-3">
        <input class="registerForm" v-if="showPassword" v-model="password" @input="checkPassword()" type="" placeholder="*******">
        <input class="registerForm" v-else v-model="password" @input="checkPassword()" type="password" placeholder="*******">
        <div v-if="showPassword" @click="toggleShow" style="display:inline-block; margin: 7px 0 0 5px;">
          <i id = "visibility" class="fa-solid fa-eye"></i></div>
        <div v-else @click="toggleShow" style="display:inline-block; margin: 7px 0 0 5px">
          <i id = "visibility" class="fa-solid fa-eye-slash"></i>
        </div>
        <p id="invalidCritera" v-if="checkingPassword" v-html="passwordCriteria"></p> 
      </div>

      <!-- <div class="col col-md-auto">
        <div v-if="showPassword" @click="toggleShow">
          <i id = "visibility" class="fa-solid fa-eye"></i>
        </div>

        <div v-else @click="toggleShow">
          <i id = "visibility" class="fa-solid fa-eye-slash"></i>
        </div>
      </div> -->
    </div>
  </div>

<div class="field">
  <div class="row justify-content-md-center">
    <div class="col col-lg-1">
      </div>
      <div class="col col-lg-3" style="text-align:center">
      
          <strong><p id="login"> Already have an account? Login
          <router-link to="/loginview" style="color:rgb(1, 1, 87)">HERE</router-link> </p>
          <router-view/></strong> <br>
              

          <button type="button" id="registerBtn" v-on:click="register()" v-if="criteriaArray.every(x => x == true)">REGISTER</button>
          <button type="button" v-else id ="invalidRegisterBtn"> REGISTER</button>
          <br><br>
          </div>

  </div>
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
      else if (this.username.length > 15) {
        this.usernameCriteria = "Invalid Username:<br>Cannot be longer than 15 characters"
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
        this.passwordCriteria = "Invalid Password:<br>At least 8 Characters with a Numeric Number"
        return true
      }
      else if (!this.password.match(numbers)) {
        this.passwordCriteria = "Invalid Password:<br>At least One Numeric Number"
        return true
      }
      else if (this.password.length < 8) {
        this.passwordCriteria = "Invalid Password:<br>At least 8 Characters"
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
          // alert("Registering for " + username)

          try {
            const docRef = await setDoc(doc(db, "Users", email), {
                email: email, 
                username: username, 
                password: password, 
                favourites: {},
                gender: "others",
                nation: "",
                phone_num: 0,
                display_pic: "https://firebasestorage.googleapis.com/v0/b/project-59f96.appspot.com/o/safe_travel_logo.png?alt=media&token=466c01bd-a43e-48c2-baca-581db06253a0",
            })

            console.log(docRef)

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)

                updateProfile(auth.currentUser, {
                  displayName: username,
                  }).then(() => {
                    this.$router.push({name: 'HomeView'}).then(() => {
                    this.$router.go()
                  })
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
    .registerForm {
      width: 90%;
      background-color: #f0f0f0;
      height: 35px;
      border-radius: 55px;
      border: 3px solid transparent;
      padding: 0;
      font-size: 15px;
      
    }

    /* #holder {
      background-image: url("../assets/parachute.jpg");
        height: 100%;
        padding-top: 100px;
        padding-bottom: 50px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        
        } */


    #holder {
    position: relative;
    height: 100%;
            padding-top: 100px;
        padding-bottom: 50px;
    text-align: center
    
    }

    #holder:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      /* height: 80.5vh; */
      height: 100%;
      background-image: url("../assets/balloon.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.6;
    }

    .container {
      position: relative;
      height: 100%;
    }

    #credentials {
      /* color:white; */
      margin: 4px 0 0 0;
    }

    .field {
      height: 100px;
    }

    #login {
      font-size: 12px;
      color: black;
    }

    #invalidCritera {
      font-size: 10px;
      width:90%;
      color: red;
      margin : 0px;
      padding : 0px;
      /* margin: auto; */
      text-align:center;
    
    }

    .title {
      padding: 0px 0px 50px 0px;
      color: rgb(0, 15, 92);
    }

    .label {
      color: white;
    }

    #registerBtn, #invalidRegisterBtn {
      background-color: rgb(0, 15, 92);
      color: white;
      font-weight: bold;
      width: 120px;
      height: 50px;
      align-items: center;
      justify-content: center;
    }

    #invalidRegisterBtn {
      background-color: #f0f0f0;
      border:0;
      color: grey;
    }

    /* #visibility:hover{
    border-radius: 5px;
    box-shadow: 4px 4px;
    } */

    .col{ 
       /* background-color: gray; */
      /* color: blue; */
      text-align: left;
      /* border: 1px solid black; */
    }


</style>