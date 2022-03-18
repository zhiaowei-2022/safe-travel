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
            <button type="button" class="btn btn-primary" @click="searchAccomodations()">Search Accomodations</button>
        </form>
        <br>
    </div> <br>

    <div class="container">
        <h2>Popular Hotels</h2>
        
        <div class="row">
            <div class="col">
                <figure>
                    <img src="@/assets/the-plaza-ny.jpg" alt="">
                    <figcaption>The Plaza, New York</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/mbs-singapore.jpg" alt="">
                    <figcaption>Marina Bay Sands, Singapore</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/the-shelbourne-hotel-dublin.jpg" alt="">
                    <figcaption>The Shelbourne Hotel, Dublin</figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"AccomodationPage",

    data() {
        return {
            hotelName: "",
            checkInDate: "",
            checkOutDate: "",
            noOfGuests: "",
            noOfRooms: "",
        }
    },

    methods: {
        async searchAccomodations() {
            this.$router.push({name: "AccomodationResults", 
                query:{hotelName: this.hotelName,
                        checkInDate: this.checkInDate,
                        checkOutDate: this.checkOutDate,
                        noOfGuests: this.noOfGuests,
                        noOfRooms: this.noOfRooms}
            })
        }
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
    background-image: url("@/assets/accomodation-page.jpeg");
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
</style>