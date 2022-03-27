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
                        <label for="hotelName" class="form-label">Destination Country/Hotel Name:</label>
                        <input type="text" class="form-control" id="hotelName" v-model="name" required>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                        <label for="hotelName" class="form-label">Destination Country/Hotel Name:</label>
                        <input type="text" class="form-control" id="hotelName" v-model="name" required>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <label for="checkInDate" class="form-label">Check-in Date:</label>
                        <input type="date" class="form-control" id="checkInDate" v-model="checkInDate" required>
                    </div>
                    <div class="col">
                        <label for="checkOutDate" class="form-label">Check-out Date:</label>
                        <input type="date" class="form-control" id="checkOutDate" v-model="checkOutDate" required>
                    </div>
                    <div class="col">
                        <label for="noOfGuests" class="form-label">No. of Guest(s):</label>
                        <input type="number" min="1" class="form-control" id="noOfGuests" v-model=this.$route.query.noOfGuests required>
                    </div>
                    <div class="col">
                        <label for="noOfRooms" class="form-label">No. of Room(s):</label>
                        <input type="number" min="1" class="form-control" id="noOfRooms" v-model=this.$route.query.noOfRooms required>
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