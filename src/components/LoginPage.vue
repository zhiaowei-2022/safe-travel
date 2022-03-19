<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
<div>
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
                <p id="register"> New to Safe Travel? Sign up 
                  <router-link to="/registerview">HERE</router-link> </p>
                  <router-view/>
                 <br>
                
                <button type="button" id="loginBtn" v-on:click="UserLogin()"> Log In as User</button><br><br>
                <button type="button" id="loginBtn" v-on:click="AnonymousLogin()"> Log In Anonymously</button>
            </td>
        </tr>

    </table>

    <!-- <button @click="signOut" v-if="isLoggedIn"> Sign out</button>
    <p v-if="isLoggedIn" id="displayUsername"> </p> -->


                

</div>
</template>

<script>
// import firebaseApp from '../firebase.js';
// import {getFirestore} from "firebase/firestore"
// import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
// import { ref } from "vue";

// const db = getFirestore(firebaseApp);

export default {
    name: 'LoginPage',

  data() {
    return {
      showPassword: false,
    //   isLoggedIn: ref(false),
    //   auth: getAuth(),
      username: "",
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

    UserLogin() {
      var email = document.getElementById("email").value
      var password = document.getElementById("password").value
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email)
          console.log("signed in")
          this.$router.push({name: 'HomeView'})
        })
        .catch((error) => {
          console.log(error.message)
          switch (error.code) {
            case "auth/invalid-email":
              alert("Invalid Email");
              break;
            default:
              alert("Incorrect Email/Password")
              break;
          }
        });   
    },
    AnonymousLogin() {
      const auth = getAuth();
      signInAnonymously(auth)
        .then(() => {
          console.log(auth.currentUser)
          this.$router.push({name: 'HomeView'})
        })
        .catch((error) => {
          console.log(error.message)

          // ...
        });
    },


    // signOut() {
    //   signOut(this.auth).then(() => {
    //     console.log("signed out")
    //   })
    // },

  }
    // mounted() {
    //     const auth = getAuth();
    //     onAuthStateChanged(this.auth, (user) => {
    //     if (user) {
    //         this.isLoggedIn = true;
    //         // display(user.email)
    
    //     } else {
    //         this.isLoggedIn = false;
    //     }
    //     })
        
    //   async function display(email) {
    //     const docRef = doc(db, "Users", email);
    //       const docSnap = await getDoc(docRef);

    //       if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //         document.getElementById("displayUsername").innerHTML = docSnap.data().username
    //       } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //       }
    //   }
    // }

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


    #register {
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

    #loginBtn {
      background-color: rgb(0, 15, 92);
      color: white;
      font-weight: bold;
      width: 120px;
      height: 50px;
      align-items: center;
    }

</style>