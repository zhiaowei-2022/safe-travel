<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <div class="container-fluid" style="margin-bottom: 100px">
        <span class="search-field">
            <SearchInput :input = "name"/>
            <SearchInput :input = "searchDisplay(checkInDate, checkOutDate)"/>
            <SearchInput v-if="manyGuests" :input = "guests"/>
            <SearchInput v-if="!manyGuests" :input = "guest"/>
            <SearchInput v-if="manyRooms" :input = "rooms"/>
            <SearchInput v-if="!manyRooms" :input = "room"/>
        </span>

        <div v-if="database.length !== 0">
            <button class="btn btn-primary" id="modify" name="submit" type="button" data-toggle="modal" data-bs-target="#exampleModal" data-target=".bd-example-modal-lg">
                Modify Search
            </button>
        </div>

        <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    ...
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel" style="font-weight:bold; font-size:30px;">
                        Flight is unavailable :(
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Sorry, the flight that you are looking for is unavailable. Try searching again!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div> -->
                </div>
            </div>
        </div>
    </div>

    <div v-if="database.length !== 0">
        <div v-for="hotel in database" v-bind:key="hotel.uid">
            <AccomodationResult 
                photo="mbs-singapore-cover.jpg"
                :name="hotel.Name"
                :rating="hotel.Rating"
                :checkInDate=resultsDisplay(checkInDate) 
                :checkOutDate=resultsDisplay(checkOutDate)
                :price="hotel.Price"
            />
        </div>
    </div>

    <div v-else>
        <img id="no-results" src="@/assets/sad.png" alt=""/> <br> <br>
        <h3>No Results Found</h3>
        <h5>We could not find any accomodations that match your search.</h5> <br>
        <button class="btn btn-primary" name="submit" type="button" onclick="history.back()">
            Search Again
        </button>
    </div>
</template>

<script>
import SearchInput from '@/template/AccomodationSearchInput.vue'
import AccomodationResult from '@/template/AccomodationResult.vue'
import moment from 'moment'

import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "@/firebase.js"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name: 'AccomodationResults',

    components: {
        SearchInput,
        AccomodationResult
    },
    
    data() {
        return {
            database: [],
            name: this.$route.query.hotelName,
            checkInDate: this.$route.query.checkInDate,
            checkOutDate: this.$route.query.checkOutDate,
            guest: this.$route.query.noOfGuests + " Guest",
            guests: this.$route.query.noOfGuests + " Guests",
            room: this.$route.query.noOfRooms + " Room",
            rooms: this.$route.query.noOfRooms + " Rooms",
            manyGuests: this.$route.query.manyGuests,
            manyRooms: this.$route.query.manyRooms,
        }
    },

    mounted() {
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
        this.display();
    },

    methods: {
        searchDisplay(date1, date2) {
            return moment(date1).format("D MMM YYYY") + " - " + moment(date2).format("D MMM YYYY");
        },

        resultsDisplay(date) {
            return moment(date).format("ddd, D MMM YYYY");
        },

        async display() {
            var docs = await getDocs(collection(db, "Accommodations"))

            docs.forEach((doc) => {
                let data = doc.data()
                if (data.Name.toLowerCase().includes(this.name.toLowerCase())) {
                    this.database.push(data)
                }
            })
        }
    }
}
</script>

<style scoped>
h3, h5 {
    color: black;
}

button {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
}

#modify {
    float: right;
    margin-top: 10px;
}

.search-field {
    display: flex;
    justify-content: center;
}

img {
    width: 90%;
    border-radius: 20px;
    display: inline-block;
}

#no-results {
    width: 10%;
}
</style>