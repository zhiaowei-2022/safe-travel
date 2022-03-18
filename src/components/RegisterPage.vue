<template>
        <h1> Register for an account </h1>
        
        <div>
          <table border = '0'>
            <tr>
              <td>
                <label for="email">Email: </label>
                <p></p>
              </td>

              <td>
                <input class="registerForm" v-model="email" type="email" placeholder="xyz@gmail.com">
                <p id="invalidCritera" v-if="invalidEmail()"> {{emailCriteria}} </p>
                <p v-else>Why is this not showing</p>
              </td>
            </tr>
            
            <tr>
              <td>
              <label for="username">Username: </label>
              </td>
              <td>
                  <input class="registerForm" v-model="username" type="text" placeholder="xyz">
                  <p id="invalidCritera" v-if="invalidUsername()"> {{usernameCriteria}} </p>
              </td>
            </tr>

            <tr>
              <td>
                <label for="password">Password: </label>
                <p></p>
              </td>
              <td>
                <input class="registerForm" v-if="showPassword" v-model="password" type="" placeholder="*******">
                <input class="registerForm" v-else id="password" v-model="password" type="password" placeholder="*******">
                <p id="invalidCritera" v-if="invalidPassword()"> {{passwordCriteria}} </p> 
                <p></p>
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
                <p id="login"> Already have an account? Login HERE </p>
                  <!-- <router-link to="/loginrouter">HERE</router-link> </p> -->
                  <!-- <router-view/> <br> -->
                <button type="button" id="registerBtn" v-on:click="register()"> REGISTER</button>
                <!-- <button type="button" id = "invalidRegisterBtn" v-if = "allInvalid()">REGISTER</button>
                <button type="button" v-else id="registerBtn" v-on:click="register()"> REGISTER</button> -->
                </td>
            </tr>

          </table>


                

        </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
      username: ""


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

    async invalidEmail(){
      this.email = this.email.trim()
      if (this.email == ""){
        this.emailCriteria = "Invalid Email: Cannot be blank"
        return true
      } else{
        if (!(this.email.includes("@"))) {
          this.emailCriteria = "Invalid Email: Requires @"
          return true
        } else if (!(this.email.includes("."))) {
          this.emailCriteria = "Invalid Email: Requires ."
          return true
         } 
         else{
          const docRef = doc(db, "Users", this.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.emailCriteria = "Email is in used"
            return true;
          }
          else {
            this.emailCriteria = ""
            return false;
          }
        }
      }
    },

    invalidUsername() {
      if (this.username == "") {
        this.usernameCriteria = "Invalid Username: Cannot be empty"
        return true
      } 
      else {
        return false
      }
    },

    invalidPassword() {
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
        return false
      }
    },

    async allInvalid() {
              
        let x = await this.invalidEmail()
        let y = this.invalidPassword()
        let z = this.invalidUsername()

      if ((x == false) && (y == false) && (z == false)) {

        return false
      }
      else {
        return true
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

              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user)
                });
              

            console.log(docRef)
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
            width: 280px;
            background-color: #f0f0f0;
            height: 30px;
            border-radius: 55px;
            border: 3px solid transparent;
            padding: 0;
            font-size: 15px;
            

            
    }

    #invalidCritera {
      font-size: 10px;
      width:300px;
      color: red;
      margin : 0px;
      padding : 0px;
      margin: auto;
    

    }

    #login {
        font-size: 10px;
    }


    table{

      margin: auto;
    }

    td{
      height: 100px;
      margin: 0px;
      
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

    #visibility:hover{
    border-radius: 5px;
    box-shadow: 4px 4px;
}

</style>