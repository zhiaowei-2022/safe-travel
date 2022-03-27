<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <div class="container-fluid" style="margin-bottom: 60px">
        <span class="search-field">
            <SearchInput :input = "name"/>
            <SearchInput :input = "searchDisplay(checkInDate, checkOutDate)"/>
            <SearchInput v-if="manyGuests" :input = "guests"/>
            <SearchInput v-if="!manyGuests" :input = "guest"/>
            <SearchInput v-if="manyRooms" :input = "rooms"/>
            <SearchInput v-if="!manyRooms" :input = "room"/>
        </span>

        <div v-if="database.length !== 0">
            <button class="btn btn-primary" id="modify" name="submit" type="button" @click="openSearchModal()">
                Modify Search
            </button>
        </div>
    </div>

    <div v-if="database.length !== 0">
        <div v-for="hotel in database" v-bind:key="hotel.uid">
            <AccommodationResult 
                :photo="hotel.CoverPhoto"
                :name="hotel.Name"
                :rating="hotel.Rating"
                :checkInDate=resultsDisplay(checkInDate) 
                :checkOutDate=resultsDisplay(checkOutDate)
                :price=round(hotel.Price)
                :address="hotel.Address"
                :phone="hotel.Phone"
                :email="hotel.Email"
                :description="hotel.Description"
                :modalPhoto="hotel.ModalPhoto"
                :rooms="hotel.RoomTypes"
                :onclick="openResultModal"
            />
        </div>
    </div>

    <div v-else>
        <img id="no-results" src="@/assets/sad.png" alt=""/> <br> <br>
        <h3>No Results Found</h3>
        <h5>We could not find any accommodations that match your search.</h5> <br>
        <button class="btn btn-primary" name="submit" type="button" onclick="history.back()">
            Search Again
        </button>
    </div>

    <div id="hotelModal" class="modal">
        <div class="modal-content">
            <span class="close" v-on:click="closeResultModal()">&times;</span>
            <div class="container">
                <div class="row">
                    <div id="photo"></div>
                </div>
                
                <div class="row">
                    <div id="hotelInfo"></div>
                </div>

                <div id="room">
                    <!-- <div class="col">
                        <div id="roomPhoto"></div>
                    </div>
                    <div class="col">
                        <div id="roomInfo"></div>
                    </div>
                    <div class="col">
                        <div id="roomPrice"></div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div id="searchModal" class="modal">
        <div class="modal-content">
            <span class="close" v-on:click="closeSearchModal()">&times;</span>

            <form class="form-details">
                <div class="form-group">
                    <label for="hotelName" class="form-label">Destination Country/Hotel Name:</label>
                    <input type="text" class="form-control" id="hotelName" v-model="name" required>
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
                <button type="button" class="btn btn-primary" @click="modifySearch()">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import SearchInput from '@/template/AccommodationSearchInput.vue'
import AccommodationResult from '@/template/AccommodationResult.vue'
import moment from 'moment'

import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "@/firebase.js"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name: 'AccommodationResults',

    components: {
        SearchInput,
        AccommodationResult
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
        // let jquery = document.createElement('script')
        // jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        // document.head.appendChild(jquery)

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

        round(number) {
            return number.toFixed(2);
        },

        async display() {
            var docs = await getDocs(collection(db, "Accommodations"))

            docs.forEach((doc) => {
                let data = doc.data()
                if (data.Name.toLowerCase().includes(this.name.toLowerCase())) {
                    this.database.push(data)
                }
            })
        },

        openResultModal(modalPhoto, name, rating, address, phone, email, description, rooms) {
            console.log("open modal")
            var modal = document.getElementById("hotelModal")

            var photoinfo = document.getElementById("photo")
            photoinfo.innerHTML = "<img src='" + modalPhoto + " 'style='width:100%; overflow:hidden'><br><br>"

            var hotelinfo = document.getElementById("hotelInfo")
            hotelinfo.innerHTML =
                "<h4><b>" + name + "</b></h4>" +
                "<h6><b>Rating:</b> " + rating + " / 5 <br></h6>" +
                "<h6><b>Address:</b> " + address + "<br></h6>" +
                "<h6><b>Phone:</b> " + phone + "<br></h6>" +
                "<h6><b>Email:</b> " + email + "<br><br></h6>" +
                description + "<br><br>" +
                "<h6><b>Room Types:</b></h6>"

            var room = document.getElementById("room")

            // var roomphoto = document.getElementById("roomPhoto")
            // var roominfo = document.getElementById("roomInfo")
            // var roomprice = document.getElementById("roomPrice")

            for(let roomType of rooms) {
                room.innerHTML += 
                "<div class='row'>" + 
                "<div class='col'>" + "<img src='" + roomType.RoomPhoto + " 'style='width:60%; overflow:hidden'><br><br></div>" + 
                "<div class='col'>" + roomType.RoomName + "<br>" + 
                    roomType.RoomDescription + "<br>" + 
                    roomType.RoomFacilities + "<br></div>" +
                "<div class='col'>" + roomType.RoomPrice + "</div>" + 
                "</div>"

                // roomphoto.innerHTML += "<img src='" + room.RoomPhoto + " 'style='width:80%; overflow:hidden'><br><br>"

                // roominfo.innerHTML += 
                // "<h6>" + room.RoomName+"</h6><br>" +
                // "<h6>" + room.RoomDescription+"</h6><br>" + 
                // "<h6>" + room.RoomFacilities+"</h6><br>"

                // roomprice.innerHTML += 
                // "<h6>" + room.RoomPrice + "</h6><br>"
            }
                
            modal.style.display = "block"
        },

        closeResultModal() {
            var modal = document.getElementById("hotelModal");
            modal.style.display = "none"
        },

        openSearchModal() {
            var modal = document.getElementById("searchModal")
            modal.style.display = "block"
        },

        closeSearchModal() {
            var modal = document.getElementById("searchModal");
            modal.style.display = "none"
        },

        async modifySearch() {
            this.closeSearchModal()
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
    width: 150px;
}

#modify {
    float: right;
    margin-top: 10px;
}

.search-field {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

img {
    width: 90%;
    border-radius: 20px;
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
  width: 75%;
}

.close {
  color: #aaa;
  text-align: right;
  padding-right: 15px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#hotelInfo {
    text-align: left;
    color: black;
}
</style>