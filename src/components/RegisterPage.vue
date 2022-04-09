<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

<div id="photo">
  <div class="title">
    <h1> Register for an account! </h1>
  </div>
<div class="container background" style="width: 40%">
<form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-3 col-form-label">Email: </label>

    <div class="col-sm-9" style="text-align:left">
      <input class="form-control" v-model="email" @input="checkEmail()" type="email" placeholder="xyz@gmail.com">
      <p v-if="checkingEmail" id="invalidCritera"> {{emailCriteria}} </p>
      <p v-else id="invalidCritera">&nbsp;</p>
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-3 col-form-label">Username: </label>
    <div class="col-sm-9" style="text-align:left">
      <input type="text" v-model="username" @input="checkUsername()" class="form-control" id="inputPassword" placeholder="xyz">
      <p id="invalidCritera" v-if="checkingUsername" v-html="usernameCriteria"></p>
      <p v-else id="invalidCritera">&nbsp;</p>
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-3 col-form-label">Password: </label>
    <div class="col-sm-9" style="display:inline-block; text-align:left">
        <input class="form-control" style="display:inline-block" v-if="showPassword" v-model="password" @input="checkPassword()" type="" placeholder="  *******">
        <input class="form-control" style="display:inline-block" v-else v-model="password" @input="checkPassword()" type="password" placeholder="  *******">
        <div v-if="showPassword" @click="toggleShow" style="display:inline-block; margin: 7px 0 0 5px;">
          <i id = "visibility" class="fa-solid fa-eye"></i></div>
        <div v-else @click="toggleShow" style="display:inline-block; margin: 7px 0 0 5px">
          <i id = "visibility" class="fa-solid fa-eye-slash"></i>
        </div>
        <p id="invalidCritera" v-if="checkingPassword" v-html="passwordCriteria"></p> 
        <p v-else id="invalidCritera">
          &nbsp;</p>
    </div>
  </div>
  <strong><p id="login"> Already have an account? Login now!</p>
  </strong>
      
  <br>
  <button type="button" id="registerBtn" v-on:click="register()" v-if="criteriaArray.every(x => x == true)">REGISTER</button>
  <button type="button" v-else id ="invalidRegisterBtn"> REGISTER</button>
</form>
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
      if (this.username == "" || (!this.username.replace(/\s/g,"").length)) {
        this.usernameCriteria = "Invalid Username: Cannot be empty"
        return true
      } 
      else if (this.username.length > 15) {
        this.usernameCriteria = "Invalid Username: Cannot be longer than 15 characters"
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
        this.passwordCriteria = "Invalid Password: At least 8 Characters with a Numeric Number"
        return true
      }
      else if (!this.password.match(numbers)) {
        this.passwordCriteria = "Invalid Password: At least One Numeric Number"
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

          try {
            const docRef = await setDoc(doc(db, "Users", email), {
                email: email, 
                username: username, 
                password: password, 
                favourites: {},
                gender: "others",
                nation: "",
                phone_num: 0,
                display_pic: "https://firebasestorage.googleapis.com/v0/b/safe-travel-1a5dd.appspot.com/o/UsersDP%2FNewAccount%2Fhappyface.jpg?alt=media&token=cb95d3d8-e87c-45a4-a632-9a649405c8bf",
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
    h1 {
      font-weight: bold;
    }
    .registerForm {
      width: 90%;
      background-color: #f0f0f0;
      height: 35px;
      border-radius: 10px;
      border: 3px solid transparent;
      font-size: 15px;
      
    }

    .form-control {
      width: 90%;
      background-color: #f0f0f0;
      height: 35px;
      border-radius: 10px;
      border: 3px solid transparent;
      font-size: 15px;
      
    }




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
      height: 100%;
      background-image: url("../assets/balloon.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.4;
    }

    .container {
      position: relative;
      height: 100%;
    }

    #credentials {
      margin: 4px 0 0 0;
    }

    .field {
      height: 80px;
    }

    #login {
      font-size: 15px;
      color: black;
      text-align: center;
    }

    #invalidCritera {
      font-size: px;
      width:90%;
      color: red;
      margin : 0px;
      padding : 0px;
      text-align:center;
    
    }

    .form-details {
        background-color: white;
        margin-right: 300px;
        margin-left: 300px;
    }

    .title {
      margin-bottom: 30px;
      color: rgb(0, 15, 92);
    }

    label {
      color: rgb(0, 15, 92);
      font-size: 12px;
    }

    #registerBtn, #invalidRegisterBtn {
      background-color: rgb(0, 15, 92);
      color: white;
      font-weight: bold;
      width: 120px;
      height: 50px;
      align-items: right;
      justify-content: right;
    }

    #invalidRegisterBtn {
      background-color: #f0f0f0;
      border:0;
      color: grey;
      justify-content: right;
      align-items: right;
    }



    .col{ 
      text-align: left;
      border: 1px solid black;
    }



  .background {
    background-color: rgb(220,223,240);
    padding: 40px;
    border-radius: 10px;
  }

  #photo {
    padding: 40px;
    background-image: url("@/assets/background 3.jpeg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .col-form-label {
    text-align: right;
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  .col-sm-10 {
    padding-left: 15px;
  }


</style>