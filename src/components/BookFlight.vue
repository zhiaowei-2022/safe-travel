<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <!-- Form for Book Flight Search Fields -->
    <div class="book-flight">
        <h1>Dedicated for Happy Flying Experience</h1>
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
        <div class="row">
            <div class="col">
                <div class="row">
                    <!-- Search field for departure date -->
                    <div class="col">
                        <label for="departure-date" class="label">Departure Date</label>
                        <input id="departure-date" class="form-control" type="date" v-model="departureDate" required/>
                    </div>
                    <!-- Search field for return date -->
                    <div class="col">
                        <label for="return-date" class="label">Return Date</label>
                        <input id="return-date" class="form-control" type="date" v-model="arrivalDate" required/>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <!-- Search field for no of passengers -->
                    <div class="col">
                        <label  class="label">No of Passengers</label>
                        <input id="no-passengers" min="1" class="form-control" type="number" placeholder="No. of Passenger(s)" v-model="noOfPassengers">
                    </div>
                    <!-- Search field for class type -->
                    <div class="col">
                        <label  class="label">Class</label>
                        <select name="classType" class="form-select form-control" v-model="classType">
                            <option>---- Select Class ----</option>
                            <option value="economyClass">Economy Class</option>
                            <option value="businessClass">Business Class</option>
                            <option value="firstClass">First Class</option>
                        </select>
                    </div>
                </div>
            </div>  
        </div>
        <br>
        <div class="row g-lg-2">
            <div class="form-group">
                <div>
                 <button class="btn btn-primary " name="submit" type="submit" @click="searchFlights()">
                  Search Flights
                 </button>
                </div>
            </div>
        </div>
        </form>
    </div>
    <br>
    <h2>Popular Destination</h2>
    <br>
    <div class="container">
        <div class="row">
            <div class="col">
                <figure>
                    <img class="img-responsive" src="@/assets/osaka-japan.jpg" alt="picture of Osaka, Japan">
                    <figcaption>Osaka, Japan</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/berlin-germany.jpg" alt="picture of Berlin, Germany">
                    <figcaption>Berlin, Germany</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/paris-france.jpg" alt="picture of Paris, France">
                    <figcaption>Paris, France</figcaption>
                </figure>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name: "BookFlight",
    data() {
        return {
            originCountry: "",
            destinationCountry: "",
            departureDate: "",
            arrivalDate: "",
            noOfPassengers: "",
            classType: "",
        }
    },
    mounted() {
      let jquery = document.createElement('script')
      jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(jquery)
    },
    methods: {
        async searchFlights() {
            if (this.originCountry != "" && this.destinationCountry != "" && this.departureDate != "" && this.arrivalDate != "" && this.classType != "") {
                if (this.noOfPassengers >= 1) {
                    if (this.arrivalDate > this.departureDate) {
                        this.$router.push({
                            name: "FlightResults",
                            query: {
                                originCountry: this.originCountry,
                                destinationCountry: this.destinationCountry,
                                departureDate: this.departureDate,
                                arrivalDate: this.arrivalDate,
                                noOfPassengers: this.noOfPassengers,
                                classType: this.classType,
                            }
                        })
                    }
                    else {
                        console.log("error in check out date")
                        alert("Check-out Date must be after Check-in Date.")
                    }
                }
                else {
                        console.log("error, not a positive number")
                        alert("There must be at least one passenger.")
                }
            }
            else {
                    console.log("error, missing fields")
                    alert("There are missing fields.")
            }
        }
    }
}
</script>

<style scoped>
    .book-flight {
        background-image: url("@/assets/popular-destination-background.jpg");
        height: 500px;
        padding-top: 100px;
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