<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <div class="input-hotel-details">
        <h1>Make Your Stay Memorable</h1>

        <form class="form-details">
            <div class="form-group">
                <label for="hotelName" class="form-label">Destination Country/Hotel Name:</label>
                <input type="text" class="form-control" id="hotelName" v-model="hotelName" required>
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
                    <input type="number" min="1" class="form-control" id="noOfGuests" v-model="noOfGuests" required>
                </div>
                <div class="col">
                    <label for="noOfRooms" class="form-label">No. of Room(s):</label>
                    <input type="number" min="1" class="form-control" id="noOfRooms" v-model="noOfRooms" required>
                </div>
            </div>
            <br>
            <button type="button" class="btn btn-primary" @click="searchAccommodations()">Search Accommodations</button>
        </form>
        <br>
    </div> <br>

    <div id="errorModal" class="modal">
        <div class="modal-content">
            <div id="errorMsg"></div>
            <img id="no-results" src="@/assets/sad.png" alt=""/> <br>
            <button class="btn btn-primary" id="errorBtn" name="submit" type="button" @click="closeErrorModal()">
                Search Again
            </button>
        </div>
    </div>

    <div class="container">
        <h2>Popular Hotels</h2>

        <form class="container" style="margin-left: 10px;">
            <div class="row">
                <div class="col-lg-2">
                <select name="country" class="form-select form-select-sm" v-model="category" @change="display()">
                    <option value="All" selected>All</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                    <option value="United States">United States</option>
                </select>
                </div>
            </div>
        </form> <br>
        
        <div class="row" v-for="row in database" :key="row">
            <div class="col-4" v-for="hotel in row" :key="hotel">
                <figure>
                    <a :href="hotel.Link" target="_blank">
                        <img
                            :src="hotel.Photo"
                            alt="Unable to load photo."
                        />
                    </a>
                    <figcaption>{{ hotel.Name }}, {{ hotel.City }}</figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "@/firebase.js"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name:"AccommodationPage",

    data() {
        return {
            hotelName: "",
            checkInDate: "",
            checkOutDate: "",
            noOfGuests: "",
            noOfRooms: "",

            database: [],
            noOfCols: 3,
            category: "All"
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
        async searchAccommodations() {
            var modal = document.getElementById("errorModal");
            var error = document.getElementById("errorMsg")

            if (this.hotelName != "" && this.checkInDate != "" && this.checkOutDate != "") {
                if (this.noOfGuests >= 1 && this.noOfRooms >= 1) {
                    if (this.checkOutDate > this.checkInDate) {
                        this.$router.push({
                            name: "AccommodationResults", 
                            query: {
                                hotelName: this.hotelName,
                                checkInDate: this.checkInDate,
                                checkOutDate: this.checkOutDate,
                                noOfGuests: this.noOfGuests,
                                noOfRooms: this.noOfRooms,
                            }
                        })
                    } else {
                        modal.style.display = "block"
                        error.innerHTML = "<h5><b> Please ensure that the check-out date is after the check-in date. </b></h5>"
                    }
                } else {
                    modal.style.display = "block"
                    error.innerHTML = "<h5><b> Please ensure that the number of guests and rooms is a positive number. </b></h5>"
                }
            } else {
                modal.style.display = "block"
                error.innerHTML = "<h5><b> Please fill up all fields to start searching. </b></h5>"
            }
        },

        async display() {
            this.database = []

            var docs = await getDocs(collection(db, "PopularAccommodations"))
            let counter = 0;
            let row = []

            docs.forEach((doc) => {
                let data = doc.data();
                if (data.Country === this.category || this.category === "All") {
                    row.push(data)
                    counter++
                }
                
                if (counter % this.noOfCols == 0) {
                    this.database.push(row)
                    row = []
                }
            })
            this.database.push(row)
        },

        closeErrorModal() {
            var modal = document.getElementById("errorModal");
            modal.style.display = "none"
        },
    }
}
</script>

<style scoped>
h1 {
    text-align: left;
    margin-left: 180px;
    font-weight: bold;
    color: rgb(0, 15, 92);
}

h2 {
    text-align: left;
    margin-left: 20px;
    font-weight: bold;
    color: rgb(0, 15, 92);
}

button {
    background-color: lightskyblue;
    border-color: lightskyblue;
    color: black;
    font-weight: bold;
    float: right;
}

#errorBtn {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
    width: 150px;
}

img {
    width: 90%;
    border-radius: 20px;
}

figcaption {
    font-weight: bold;
    
}

.form-details {
    background-color: rgb(0, 15, 92);
    padding: 20px;
    padding-bottom: 60px;
    border-radius: 10px;
    margin-right: 180px;
    margin-left: 180px;
}

.input-hotel-details {
    background-image: url("@/assets/accommodation-page.jpeg");
    width: 100%;
    height: 500px;
    padding-top: 80px;
}

label {
    color: white;
    float: left;
    text-align: left;
    font-weight: bold;
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
  color: black;
  margin: 15% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 50%;
  height: 300px;
  align-items: center;
  justify-content: center;
}
</style>