<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <div class="container" style="margin-bottom: 60px">
        <span class="search-field">
            <SearchInput :input = "name"/>
            <SearchInput :input = "searchDisplay(checkInDate, checkOutDate)"/>
            <SearchInput :input = "displayGuests(noOfGuests)"/>
            <SearchInput :input = "displayRooms(noOfRooms)"/>
        </span>

        <div v-if="database.length !== 0">
            <button class="btn btn-primary" id="modify" name="submit" type="button" @click="openSearchModal()">
                Modify Search
            </button>
        </div>
    </div>

    <div class="container" v-if="database.length !== 0">
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

                <div>
                    <div v-for="roomType in roomDatabase" v-bind:key="roomType.roomName">
                        <AccommodationRoom
                            :photo="roomType.roomPhoto"
                            :name="roomType.roomName"
                            :description="roomType.roomDescription"
                            :facilities="roomType.roomFacilities"
                            :days="countDays(checkInDate, checkOutDate)"
                            :nights="countNights(checkInDate, checkOutDate)"
                            :rooms="displayRooms(noOfRooms)"
                            :price=round(calculatePrice(roomType.roomPrice))
                            :link="roomType.roomLink"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="searchModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 style="font-weight:bold">Modify Your Search</h2>
                <span class="close" v-on:click="closeSearchModal()">&times;</span>
            </div> <br>

            <form class="form-details">
                <div class="form-group">
                    <label for="hotelName" class="form-label">Destination Country/Hotel Name:</label>
                    <input type="text" class="form-control" id="hotelName" v-model="newName" required>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <label for="checkInDate" class="form-label">Check-in Date:</label>
                        <input type="date" class="form-control" id="checkInDate" v-model="newCheckInDate" required>
                    </div>
                    <div class="col">
                        <label for="checkOutDate" class="form-label">Check-out Date:</label>
                        <input type="date" class="form-control" id="checkOutDate" v-model="newCheckOutDate" required>
                    </div>
                    <div class="col">
                        <label for="noOfGuests" class="form-label">No. of Guest(s):</label>
                        <input type="number" min="1" class="form-control" id="noOfGuests" v-model="newNoOfGuests" required>
                    </div>
                    <div class="col">
                        <label for="noOfRooms" class="form-label">No. of Room(s):</label>
                        <input type="number" min="1" class="form-control" id="noOfRooms" v-model="newNoOfRooms" required>
                    </div>
                </div>
                <br>
                <button type="button" class="btn btn-primary" @click="modifySearch()">Save</button>
            </form>
        </div>
    </div>

    <div id="errorModal" class="modal">
        <div class="modal-content" id="error-modal-content">
            <div class="modal-header">
                <h5 id="invalid-options">Invalid Options</h5>
            </div>
            <div class="modal-body">
                <div id="errorMsg"></div>
                <img id="no-results" src="@/assets/sad.png" alt=""/>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="errorBtn" name="submit" type="button" @click="closeErrorModal()">
                    Search Again
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from '@/template/AccommodationSearchInput.vue'
import AccommodationResult from '@/template/AccommodationResult.vue'
import AccommodationRoom from '@/template/AccommodationRoom.vue'
import moment from 'moment'

import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "@/firebase.js"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name: 'AccommodationResults',

    components: {
        SearchInput,
        AccommodationResult,
        AccommodationRoom
    },
    
    data() {
        return {
            database: [],
            roomDatabase: [],

            name: this.$route.query.hotelName,
            checkInDate: this.$route.query.checkInDate,
            checkOutDate: this.$route.query.checkOutDate,
            noOfGuests: this.$route.query.noOfGuests,
            noOfRooms: this.$route.query.noOfRooms,

            newName: this.$route.query.hotelName,
            newCheckInDate: this.$route.query.checkInDate,
            newCheckOutDate: this.$route.query.checkOutDate,
            newNoOfGuests: this.$route.query.noOfGuests,
            newNoOfRooms: this.$route.query.noOfRooms
        }
    },

    mounted() {
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
        
        displayGuests(guests) {
            return guests == 1 ? guests + " Guest" : guests + " Guests"
        },

        displayRooms(rooms) {
            return rooms == 1 ? rooms + " Room" : rooms + " Rooms" 
        },

        round(number) {
            return number.toFixed(2);
        },

        countDays(date1, date2) {
            var a = moment(date1)
            var b = moment(date2)
            return b.diff(a, 'days') + 1
        },

        countNights(date1, date2) {
            var a = moment(date1)
            var b = moment(date2)
            return b.diff(a, 'days')
        },

        calculatePrice(price) {
            var noOfNights = this.countNights(this.checkInDate, this.checkOutDate)
            return price * this.noOfRooms * noOfNights
        },

        async display() {
            this.database = []
            var docs = await getDocs(collection(db, "Accommodations"))

            docs.forEach((doc) => {
                let data = doc.data()
                if (data.Name.toLowerCase().includes(this.name.toLowerCase())) {
                    this.database.push(data)
                }
            })
            console.log(this.database)
        },

        openResultModal(modalPhoto, name, rating, address, phone, email, description, rooms) {
            console.log("open modal")
            var modal = document.getElementById("hotelModal")

            var photoinfo = document.getElementById("photo")
            photoinfo.innerHTML = "<img src='" + modalPhoto + " 'style='width:100%; overflow:hidden'><br><br>"

            var hotelinfo = document.getElementById("hotelInfo")
            hotelinfo.innerHTML =
                "<h3><b>" + name + "</b></h3>" +
                "<h6><b>Rating:</b> " + rating + " / 5 <br></h6>" +
                "<h6><b>Address:</b> " + address + "<br></h6>" +
                "<h6><b>Phone:</b> " + phone + "<br></h6>" +
                "<h6><b>Email:</b> " + email + "<br><br></h6>" +
                description + "<br><br>" +
                "<h5><b>Room Types:</b></h5>"

            this.roomDatabase = []

            for(let room of rooms) {
                this.roomDatabase.push({
                    roomPhoto: room.RoomPhoto,
                    roomName: room.RoomName,
                    roomDescription: room.RoomDescription,
                    roomFacilities: room.RoomFacilities,
                    roomPrice: room.RoomPrice,
                    roomLink: room.RoomLink
                })
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
            var modal = document.getElementById("errorModal");
            var error = document.getElementById("errorMsg")

            if (this.newName != "" && this.newCheckInDate != "" && this.newCheckOutDate != "") {
                if (this.newNoOfGuests >= 1 && this.newNoOfRooms >= 1) {
                    if (this.newCheckOutDate > this.newCheckInDate) {
                        this.name = this.newName
                        this.checkInDate = this.newCheckInDate
                        this.checkOutDate = this.newCheckOutDate
                        this.noOfGuests = this.newNoOfGuests
                        this.noOfRooms = this.newNoOfRooms
                        this.closeSearchModal()
                        this.display()
                    } else {
                        modal.style.display = "block"
                        error.innerHTML = "<h6> Please ensure that the check-out date is after the check-in date. </h6>"
                    }
                } else {
                    modal.style.display = "block"
                    error.innerHTML = "<h6> Please ensure that the number of guests and rooms is a positive number. </h6>"
                }
            } else {
                modal.style.display = "block"
                error.innerHTML = "<h6> Please fill up all fields to start searching. </h6>"
            }
        },

        closeErrorModal() {
            var modal = document.getElementById("errorModal");
            modal.style.display = "none"
        },
    }
}
</script>

<style scoped>
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
    width: 120px;
    height: 120px;
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

.modal-header {
    padding: 10px;
    color: rgb(0, 15, 92);
    display: flex;
    align-items: center;
    font-weight:bold; 
    font-size:30px;
}

.modal-content {
    background-color: #fefefe;
    color: black;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 75%;
}

#error-modal-content {
    margin: 16% auto;
    padding: 0px;
    width: 700px;
    height: 300px;
}

#invalid-options {
    font-weight:bold; 
    font-size:30px;
    color: rgb(0, 15, 92);
}

.modal-body {
    padding: 2px 16px;
    justify-content: center;
    align-items: center;
}

.modal-footer {
    padding: 10px;
    display: flex;
    align-items: center;
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

#room {
    color: black;
}

label {
    color: black;
    float: left;
    text-align: left;
    font-weight: bold;
}
#invalid-options {
    font-weight:bold; 
    font-size:30px;
    color: rgb(0, 15, 92);
}
</style>