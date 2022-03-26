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



    <div v-if="displayInfo">
        <h2>Covid Status</h2>
        <br>
    <div class="container">
    
        <div class="row">
            <div class="col">
                <figure style="background-color: rgb(1, 1, 87); margin: auto; color: white; border-radius:10px; padding: 30px;">
                    <div id ="qtDest" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 10px"></div>
                    <hr>
                    <div id ="qtOrigin" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 10px"></div>


                </figure>
            </div>
            <div class="col">
                <figure style="background-color: rgb(1, 1, 87); margin: auto; color: white; border-radius:10px; padding: 30px;">
                     <div id ="covidDest" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 10px"></div>
                    <hr>
                    <div id ="covidOrigin" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 10px"></div>
                </figure>
            </div>
        </div>
    </div> 
    <br>

    <div style="text-align:center; margin:auto;">
        <h2 style="text-align:center; margin:auto;">Visa Entry</h2>
        <br>
        </div>
    <div class="container">
        <div class = "row">
            <div class="col">
                <figure style="background-color:rgb(1, 1, 87); color: white; border-radius:10px; width: 40%; margin:auto; padding: 30px;">
                    <div id="visaDest" style="background-color: rgb(115, 149, 174); width: 80%; margin:auto; border-radius: 10px"></div>
                </figure>
            </div>
        </div>
    </div>
    </div>
    


    <!-- <div v-if="displayInfo">
    <div class="form-details">
        <h3 style="color:lightskyblue;"> COVID </h3>
    <table class="table table-dark table-bordered" style="border-radius: 10px; overflow: hidden;" >
  <tbody>
    <tr>
      <td class="col-6">
          <div id ="qtDest">
          </div>
          </td>
      <td>
          <div id="covidDest">
          </div>
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr>
        <td>
            <div id= "qtOrigin">
            </div>
        </td>
        <td>
            <div id= "covidOrigin">
            </div>
        </td>
    </tr>
  </tbody>
</table>
</div>
<br>

    <div class="form-detail">
        <h3 style="color:lightskyblue;"> VISA ENTRY </h3>
    <table class="table table-dark table-bordered" style="border-radius: 10px; overflow: hidden;" >
  <tbody>
    <tr>
      <td>
          <div id="visaDest">
          </div>
          
          </td>
    </tr>
  </tbody>

</table>
</div>


<br>


</div> -->

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
            Sorry, please fill up both the Origin and Destination fields.
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
                        "<i class='fa-solid fa-plane-arrival fa-flip-horizontal'></i>" +
                        "<strong>" +  " On return to " + origin.value  + "</strong> <br> <br>" +
                        "Fully Vaccinated:" + originSnap.data().Vaxxed  + "<br>" +
                        "Non-Fully Vaccinated:" + originSnap.data().NonVaxxed + "<br><br>" +
                        "<a href=" + originSnap.data().QuarrantineLink + ">See detailed Quarratine Information</a>"+ "<br><br>";

                        // COVID IN ORIGIN
                        covidOrigin.innerHTML = 
                        "<i class='fa-solid fa-virus-covid'></i>" +
                        "<strong> Covid Information in " + origin.value + "</strong> <br> <br>" +
                        "Daily cases: " + originSnap.data().DailyCases + "<br>" +
                        "Weekly cases: " + originSnap.data().WeeklyCases + "<br>" +
                        "Mask Rule: " + "<br><br>" +
                        "<a href=" + originSnap.data().CovidLink + ">See detailed Covid Status</a><br>";
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
                    qtDest.innerHTML = "<i class='fa-solid fa-plane-arrival'></i>" +
                    "<strong>" +  " On arrival to " + dest.value  + "</strong>" + "<br><br>" +
                    "Fully Vaccinated:" + destSnap.data().Vaxxed  + "<br>" +
                    "Non-Fully Vaccinated:" + destSnap.data().NonVaxxed + "<br> <br>" +
                    "<a href=" + destSnap.data().QuarrantineLink + ">See detailed Quarratine Information</a><br><br>";

                    // COVID IN DEST
                    covidDest.innerHTML = 
                    "<i class='fa-solid fa-virus-covid'></i>" +
                    "<strong> Covid Information in " + dest.value + "</strong> <br> <br>" +
                    "Daily cases: " + destSnap.data().DailyCases + "<br>" +
                    "Weekly cases: " + destSnap.data().WeeklyCases + "<br>" +
                    "Mask Rule: " + "<br><br>" +
                    "<a href=" + destSnap.data().CovidLink + ">See detailed Covid Status</a><br>";

                    // VISA
                    visaDest.innerHTML = 
                    "<strong>" + origin.value + " to "  + dest.value + "</strong> <br> <br>" +
                    "Visa Entry is " + destSnap.data().Visa + "<br><br>" +
                    "<a href=" + destSnap.data().VisaLink + ">See detailed Visa Entry Requirement</a>";
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



</style>