<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


    <!-- Form for Book Flight Search Fields -->
    <div class="search-info">
        <h1>Guidelines</h1>
        <form class=form-details>
        <div class="row">
          <!-- Search field for origin country -->
          <div class="col">
           <label for="origin-country" class="title">Origin</label>
            <select class="form-select" required id="origin">
               <option value="" selected hidden>---- Please select origin country ----</option>
                <option v-for="country in countries" v-bind:key="country" v-bind:value="country">
                {{ country }}
                </option>
            </select>
          </div>
          <!-- Search field for destination country -->
          <div class="col">
            <label for="destination-country" class="title">Destination</label>
            <select class="form-select" required id="destination" >
               <option value="" selected hidden>---- Please select destination country ----</option>               
                <option v-for="country in countries" v-bind:key="country" v-bind:value="country">
                {{ country }}
                </option>
            </select>
          
           </div>
        </div>
        <br>
        <div class="row g-lg-2">
            <div class="form-group">
                <div>
                 <button class="btn btn-primary" @click.prevent="searchInfo()">
                  Display Information <br>Below
                 </button>
                </div>
            </div>
        </div>
        </form>
    </div>
    <br>



    <!-- <div v-if="displayInfo"> -->
        <h2>Covid Status</h2>
        <br>
    <div class="container">
        <div class="row">
            <div class="col">
                <figure style="margin: auto; color: white;">
                    <div id ="qtDest" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 20px"></div>
                    <hr>
                    <div id ="covidDest" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 20px"></div>
                    


                </figure>
            </div>
            <div class="col">
                <figure style="margin: auto; color: white;">
                     <div id ="qtOrigin" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 20px"></div>
                    <hr>
                    <div id ="covidOrigin" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 20px"></div>
                </figure>
            </div>
        </div>
    </div> 
    <br> <br>

    <div style="text-align:center; margin:auto;">
        <h2 style="text-align:center; margin:auto;">Visa Entry</h2>
        <br>
    </div>
    <div class="container">
        <div class = "row">
            <div class="col">
                <figure style="color: white; margin:auto; ">
                    <div id="visaDest" style="width: 40%; margin:auto; border-radius: 20px"></div>
                </figure>
            </div>
        </div>
    </div>
    <!-- </div> -->
    

<br>

    <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="font-weight:bold; font-size:30px;">
                Options are invalid
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            {{ errorMsg }}
            <br><br><img src="@/assets/sad.png" alt="sad face" style="height: 120px; width: 120px">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>





</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore"
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import * as $ from 'jquery'


const db = getFirestore(firebaseApp);



export default {
    name: "HomePage",
    
    data() {
        return {
            user: false,
            invalid: false,
            displayInfo: false,
            countries: [],
            errorMsg: "",
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
        this.dropdown()



        
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'LoginView'})
        },

        async dropdown() {
            let docs = await getDocs(collection(db, "Origin"));
            docs.forEach((doc) => {
                var docData = doc.data()
                // console.log(docData.name)
                this.countries.push(docData.Name)
            })
        },

        async searchInfo() {
            var origin = document.getElementById("origin")
            var dest = document.getElementById("destination")

            if ((origin.value == "") || (dest.value == "")) {
                this.errorMsg = "Sorry, please fill up both the Origin and Destination fields."
                $('#exampleModal5').modal('show')
            }
            else if (origin.value == dest.value) {
                this.errorMsg = "Sorry, Origin and Destination fields should be different."
                $('#exampleModal5').modal('show')
            }
            else {
        
                this.displayInfo = true;
                const originRef = doc(db, "Origin", origin.value);
                const originSnap = await getDoc(originRef);
                var qtOrigin = document.getElementById("qtOrigin")
                var covidOrigin = document.getElementById("covidOrigin")

                if (originSnap.exists()) {
                    // QUARRANTINE IN ORIGIN
                        qtOrigin.innerHTML = 
                        "<h4><i class='fa-solid fa-plane-arrival fa-flip-horizontal fa-xs'></i>" +
                        "<strong>" +  " On return to " + origin.value  + "</strong></h4> <br>" +
                        "Fully Vaccinated: Quarrantine <strong>" + originSnap.data().Vaxxed  + "</strong><br>" +
                        "Non-Fully Vaccinated: Quarrantine <strong>" + originSnap.data().NonVaxxed + "</strong><br><br>" +
                        "<a  class='btn btn-info' href=" + originSnap.data().QuarrantineLink + ">See detailed Quarratine Information</a>";

                        // COVID IN ORIGIN
                        covidOrigin.innerHTML = 
                        "<h4><i class='fa-solid fa-virus-covid fa-xs'></i>" +
                        "<strong> Covid Information in " + origin.value + "</strong></h4> <br>" +
                        "Daily cases: <strong>" + originSnap.data().DailyCases + "</strong><br>" +
                        "Weekly cases: <strong>" + originSnap.data().WeeklyCases + "</strong><br>" +
                        "Mask Rule: " + "<br><br>" +
                        "<a class='btn btn-info' href=" + originSnap.data().CovidLink + ">See detailed Covid Status</a>";
                } 
                else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    }

                // var dest = document.getElementById("destination")
                console.log(dest.value)
                var qtDest = document.getElementById("qtDest")
                var covidDest = document.getElementById("covidDest")
                var visaDest = document.getElementById("visaDest")
                const destRef = doc(db, "Origin", origin.value, "Destination", dest.value);
                const destSnap = await getDoc(destRef);
                
                if (destSnap.exists()) {
                    // QUARRANTINE IN DEST
                    qtDest.innerHTML = 
                    "<h4><i class='fa-solid fa-plane-arrival fa-xs'></i>" +
                    "<strong>" +  " On arrival to " + dest.value  + "</strong></h4>" + "<br>" +
                    "Fully Vaccinated: Quarrantine <strong>" + destSnap.data().Vaxxed  + "</strong><br>" +
                    "Non-Fully Vaccinated: Quarrantine <strong>" + destSnap.data().NonVaxxed + "</strong><br> <br>" +
                    "<a class='btn btn-info' href=" + destSnap.data().QuarrantineLink + ">See detailed Quarratine Information</a>";

                    // COVID IN DEST
                    covidDest.innerHTML = 
                    "<h4><i class='fa-solid fa-virus-covid fa-xs'></i>" +
                    "<strong> Covid Information in " + dest.value + "</strong></h4> <br>" +
                    "Daily cases: <strong>" + destSnap.data().DailyCases + "</strong><br>" +
                    "Weekly cases: <strong>" + destSnap.data().WeeklyCases + "</strong><br>" +
                    "Mask Rule: " + "<br><br>" +
                    "<a class='btn btn-info' href=" + destSnap.data().CovidLink + ">See detailed Covid Status</a>";

                    // VISA
                    visaDest.innerHTML = 
                    "<h4><i class='fa-solid fa-passport fa-xs'></i>" +
                    "<strong> " + origin.value + " to "  + dest.value + "</strong> </h4> <br>" +
                    "Visa Entry: <strong>" + destSnap.data().Visa + "</strong><br><br>" +
                    "<a class='btn btn-info' href=" + destSnap.data().VisaLink + ">See detailed Visa Entry Requirement</a>";
                } 
                else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    }
            }
        }
    }
}


        
</script>

<style scoped>
    .search-info {
        background-image: url("@/assets/holding-earth.jpg");
        /* height: 50vh; */
        padding-top: 100px;
        padding-bottom: 120px;
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
        .form-detail {
        background-color: rgb(1, 1, 87);
        padding: 20px;
        border-radius: 10px;
        margin-right: 350px;
        margin-left: 350px;
        
    }
    label {
        color: white;
        float: left;
        text-align: left;
    }
        select:invalid{
        color: gray;
    }
    option{
        color: black;
    }

    #visaDest, #covidDest, #covidOrigin, #qtOrigin, #qtDest {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

        background-color: rgb(1, 1, 87);;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        /* box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; */

    }




</style>