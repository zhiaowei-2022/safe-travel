<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


    <!-- Form for Book Flight Search Fields -->
    <div class="book-flight">
        <h1>Guidelines</h1>
        <form class=form-details>
        <div class="row">
          <!-- Search field for origin country -->
          <div class="col">
           <label for="origin-country" class="title">Origin</label>
           <input type="text" class="form-control" id="origin-country-input" placeholder="Enter origin country" v-model="originCountry" required>
          </div>
          <!-- Search field for destination country -->
          <div class="col">
            <label for="destination-country" class="title">Destination</label>
            <input type="text" class="form-control" id="destination-country-input" placeholder="Enter destination country" v-model="destinationCountry" required>
           </div>
        </div>
        <br>
        <div class="row g-lg-2">
            <div class="form-group">
                <div>
                 <button class="btn btn-primary " name="submit" type="submit" @click="searchInfo()">
                  Display Information
                 </button>
                </div>
            </div>
        </div>
        </form>
    </div>








</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"



export default {
    name: "HomePage",
    
    data() {
        return {
            user: false,
            invalid: false,
        }
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

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'LoginView'})
        },
    }
    
}
</script>

<style>
    .book-flight {
        background-image: url("@/assets/holding-earth.jpg");
        height: 50vh;
        /* padding-top: 100px; */
        background-size: cover;
              background-position: center;
      background-repeat: no-repeat;
    }
    h1 {
    text-align: left;
    margin-left: 180px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }
    h2 {
    text-align: left;
    margin-left: 80px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }   
    button {
        background-color: lightskyblue;
        border-color: lightskyblue;
        color: black;
        font-weight: bold;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
    .form-details {
        background-color: rgb(1, 1, 87);
        padding: 20px;
        border-radius: 10px;
        margin-right: 180px;
        margin-left: 180px;
    }
    label {
        color: white;
        float: left;
        text-align: left;
    }

</style>