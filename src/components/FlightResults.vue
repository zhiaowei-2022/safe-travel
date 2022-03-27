<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    
    <div class="container-fluid" style="margin-bottom: 50px">
        <span class="search-field">
            <FlightSearchInput :input="originCountry"/>
            <i class="bi bi-arrow-right"></i>
            <FlightSearchInput :input="destinationCountry"/>
            <FlightSearchInput :input="searchDisplay(departureDate, arrivalDate)"/>
            <FlightSearchInput v-if="manyPassengers" :input="passengers"/>
            <FlightSearchInput v-if="!manyPassengers" :input="passenger"/>
            <FlightSearchInput :input="classType"/>
        </span>
    </div>
    <div class="form-group">
        <div v-if="database.length !== 0" @click="openSearchModal()">
            <button class="btn btn-primary pull-right" name="submit" type="submit">
                Modify Search
            </button>
        </div>
    </div>
    <br>

    <h2>Depart - {{ originCountry }} to {{ destinationCountry }}</h2>

    <br>

    <div v-if="database.length !== 0">
        <div v-for="flight in database" v-bind:key="flight.uid">
            <FlightResult 
            :airlinePhoto="flight.airlinePic"
            :departureCountryId="flight.departureCountryId"
            :departureCountryName="flight.departureCountryName"
            :departureTime="timeDisplay(flight.departureDateTime.toDate().toLocaleTimeString())"
            :departureDate="flight.departureDateTime.toDate().toDateString()"
            :arrivalCountryId="flight.arrivalCountryId"
            :arrivalCountryName="flight.arrivalCountryName"
            :arrivalTime="timeDisplay(flight.arrivalDateTime.toDate().toLocaleTimeString())"
            :arrivalDate="flight.arrivalDateTime.toDate().toDateString()"
            :duration="durationDisplay(flight.arrivalDateTime-flight.departureDateTime)"
            :price="flight.price"
            :airline="flight.airline" />
        </div>
    </div>   

      <div v-else>
        <img id="no-results" src="@/assets/sad.png" alt=""/> <br> <br>
        <h3>No Results Found</h3>
        <h5>We could not find any flights that match your search.</h5> <br>
        <button class="btn btn-primary" name="submit" type="button" onclick="history.back()">
            Search Again
        </button>
    </div>

    <div id="searchModal" class="modal">
        <div class="modal-content">
            <span class="close" v-on:click="closeSearchModal()">&times;</span>

            <form class="form-details">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                        <label for="originCountry" class="title">Origin</label>
                        <select name="originCountry" id="originCountry" class="form-select form-control" v-model="originCountry" aria-placeholder="Select Country">
                                <option value="null">---- Select Country ----</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Melbourne">Melbourne</option>
                                <option value="Germany">Germany</option>
                        </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                        <label for="destinationCountry" class="title">Destination</label>
                        <select name="destinationCountry" id="destinationCountry" class="form-select form-control" v-model="destinationCountry" aria-placeholder="Select Country">
                                <option value="null">---- Select Country ----</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Melbourne">Melbourne</option>
                                <option value="Germany">Germany</option>
                        </select>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <label for="departureDate" class="form-label">Departure Date</label>
                        <input id="departureDate" class="form-control" type="date" v-model="departureDate" required/>
                    </div>
                    <div class="col">
                        <label for="arrivalDate" class="form-label">Return Date</label>
                        <input id="arrivalDate" class="form-control" type="date" v-model="arrivalDate" required/>
                    </div>
                    <div class="col">
                        <label  for="noOfPassengers" class="form-label">No of Passengers</label>
                        <input id="noOfPassengers" min="1" class="form-control" type="number" placeholder="No. of Passenger(s)" v-model="noOfPassengers">
                    </div>
                    <div class="col">
                        <label  class="form-label">Class</label>
                        <select name="classType" class="form-select form-control" v-model="classType">
                            <option value=null>---- Select Class ----</option>
                            <option value="Economy Class">Economy Class</option>
                            <option value="Business Class">Business Class</option>
                            <option value="First Class">First Class</option>
                        </select>
                    </div>
                </div>
                <br>
                <button type="button" class="btn btn-primary" @click="modifySearch()">Save Edits</button>
            </form>
        </div>
    </div>

</template>

<script>
import FlightSearchInput from '@/template/FlightSearchInput.vue'
import FlightResult from '@/template/FlightResult.vue'
import moment from 'moment'

import firebaseApp from "@/firebase.js"
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name: 'FlightResults',
    components: {
        FlightSearchInput,
        FlightResult
    },
    data() {
        return {
            database: [],
            originCountry: this.$route.query.originCountry,
            destinationCountry: this.$route.query.destinationCountry,
            departureDate: this.$route.query.departureDate,
            arrivalDate: this.$route.query.arrivalDate,
            passenger: this.$route.query.noOfPassengers + " Passenger",
            passengers: this.$route.query.noOfPassengers + " Passengers",
            classType: this.$route.query.classType,
            manyPassengers: this.$route.query.manyPassengers,
        }
    },
    mounted() {
        this.isFlightSearchValid()
    },
    methods: {
        searchDisplay(date1, date2) {
            return moment(date1).format("D MMM YYYY") + " - " + moment(date2).format("D MMM YYYY");
        },

        resultsDisplay(date) {
            return moment(date).format("ddd, D MMM YYYY");
        },

        timeDisplay(time) {
            return moment(time, "hh:mm:ss").format("hh:mm");
        },

        durationDisplay(sec) {
            return moment({}).seconds(sec).format("H") + " hours " + moment({}).seconds(sec).format("mm") + " mins";
        },

        getYear(timeStamp) {
            return moment(timeStamp.toDate().toDateString(), "dd/mm/yyyy").format("yyyy")
        },

        async isFlightSearchValid() {
              const q = query(collection(db, "Flights"), where("departureCountryName", "==", this.originCountry), 
              where("arrivalCountryName", "==", this.destinationCountry))
              
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.data()
                // console.log(doc.id, " => ", doc.data());
                this.database.push(data)
            });
            console.log(this.departureDate.substring(0, 4))
        },
                
        openSearchModal() {
            var modal = document.getElementById("searchModal")
            modal.style.display = "block";
        },

        closeSearchModal() {
            var modal = document.getElementById("searchModal");
            modal.style.display = "none";
        },

        async modifySearch() {

        },
    }
}
</script>

<style scoped>
    .search-field {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    }
    .search-result {
        text-align: left;
    }
    h2 {
    text-align: left;
    margin-left: 80px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }   
    .rectangle {
        width: 1300px;
        height: 150px;
        background: rgb(0, 15, 95, 0.13);
    }
    .circle {
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
    margin-left: 30px;
    margin-top: 15px;
    }
    button {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
    float: right;
    margin-top: 10px;
    }
    img {
    width: 90%;
    border-radius: 50%;
    display: inline-block;
    }
    #no-results {
    width: 10%;
    }
    .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    }
    .close {
    color: #aaa;
    text-align: right;
    padding-right: 15px;
    font-size: 35px;
    font-weight: bold;
    }
</style>