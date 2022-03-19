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
                <input class="registerForm" v-model="email" @input="checkEmail()" type="email" placeholder="xyz@gmail.com">
                <p v-if="checkingEmail" id="invalidCritera"> {{emailCriteria}} </p>
                <p v-else id="invalidCritera">&nbsp;</p>
                

              </td>
            </tr>
            
            <tr>
              <td>
                <label for="username">Username: </label>
                <p></p>
              </td>
              <td>
                  <input class="registerForm" v-model="username" @input="checkUsername()" type="text" placeholder="xyz">
                  <p id="invalidCritera" v-if="checkingUsername"> {{usernameCriteria}} </p>
                  <p v-else id="invalidCritera">&nbsp;</p>
              </td>
            </tr>

            <tr>
              <td>
                <label for="password">Password: </label>
                <p></p>
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