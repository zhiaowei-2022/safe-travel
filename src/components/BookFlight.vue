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
           <label for="originCountry" class="title">Origin</label>
           <select name="originCountry" id="originCountry" class="form-select form-control" v-model="originCountry" aria-placeholder="Select Country">
                <option value="null">---- Select Country ----</option>
                <option value="Singapore">Singapore</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Germany">Germany</option>
                <!-- <option v-for="country in listCountries" 
                v-bind:key="country.countryName"> {{ country.countryName }} </option> -->
           </select>
          </div>
          <!-- Search field for destination country -->
          <div class="col">
            <label for="destinationCountry" class="title">Destination</label>
            <select name="destinationCountry" id="destinationCountry" class="form-select form-control" v-model="destinationCountry" aria-placeholder="Select Country">
                <option value="null">---- Select Country ----</option>
                <option value="Singapore">Singapore</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Germany">Germany</option>
           </select>
           </div>
        </div>
        <br>
        <div class="row">
            <!-- for return flight -->
            <div class="col" v-if="this.isOneWay == false">
                <div class="row">
                    <!-- Search field for departure date -->
                    <div class="col">
                        <label for="departureDate" class="form-label">Departure Date</label>
                        <input id="departureDate" class="form-control" type="date" v-model="departureDate" required/>
                    </div>
                    <!-- Search field for return date -->
                    <div class="col">
                        <label for="arrivalDate" class="form-label">Return Date</label>
                        <input id="arrivalDate" class="form-control" type="date" v-model="arrivalDate" required/>
                    </div>
                </div>
            </div>
            <div class="col" v-if="this.isOneWay == true">
                <div class="row">
                    <!-- Search field for departure date -->
                    <div class="col">
                        <label for="departureDate" class="form-label">Departure Date</label>
                        <input id="departureDate" class="form-control" type="date" v-model="departureDate" required/>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <!-- Search field for no of passengers -->
                    <div class="col">
                        <label  for="noOfPassengers" class="form-label">No of Passengers</label>
                        <input id="noOfPassengers" min="1" class="form-control" type="number" placeholder="No. of Passenger(s)" v-model="noOfPassengers">
                    </div>
                    <!-- Search field for class type -->
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
            </div>  
        </div>

        <br>
        <div class="row g-lg-3">
            <div class="col">
                <div class="form-group">
                <div>
                 <button class="btn btn-primary " name="submit" type="submit" @click="searchFlights()">
                  Search Flights
                 </button>
                </div>
                </div>
            </div>
            <div class="col">
                <label class="switch">
                <input type="checkbox" checked  v-model="isOneWay" @click="toggle">
                <span class="slider round"></span>
                </label>
                <p style="color: white; margin-right:330px; margin-top:5px">One-way?</p>
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
            originCountry: null,
            destinationCountry: null,
            departureDate: "",
            arrivalDate: "",
            noOfPassengers: "",
            classType: null,
            isOneWay: false,
        }
    },

    mounted() {
      let jquery = document.createElement('script')
      jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(jquery)

    },
    methods: {
        toggle() {
        this.isOneWay = this.isOneWay ? false : true;
        },
        async searchFlights() {
            console.log(this.departureDate)
            console.log(this.arrivalDate)
            console.log(this.isOneWay)
            if (this.originCountry != "" && this.destinationCountry != "" && this.departureDate != "" && this.classType != "") { // empty field
                if (this.noOfPassengers >= 1) {
                    if (this.arrivalDate != "") { // return flight
                        if (this.arrivalDate > this.departureDate ) {
                            this.$router.push({
                                name: "FlightResults",
                                query: {
                                    originCountry: this.originCountry,
                                    destinationCountry: this.destinationCountry,
                                    departureDate: this.departureDate,
                                    arrivalDate: this.arrivalDate,
                                    isOneWay: this.isOneWay,
                                    noOfPassengers: this.noOfPassengers,
                                    classType: this.classType,
                                    manyPassengers: this.noOfPassengers == 1 ? "" : true,
                                },
                            })
                        console.log(typeof(this.isOneWay));
                        } else {
                            console.log("error in return date")
                            alert("Return Date must be after Departure Date.")
                        }
                        }
                    else { // one way flight
                    console.log("im here")
                        this.$router.push({
                                name: "FlightResults",
                                query: {
                                    originCountry: this.originCountry,
                                    destinationCountry: this.destinationCountry,
                                    departureDate: this.departureDate,
                                    arrivalDate: "",
                                    isOneWay: this.isOneWay,
                                    noOfPassengers: this.noOfPassengers,
                                    classType: this.classType,
                                    manyPassengers: this.noOfPassengers == 1 ? "" : true,
                                },
                        })
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
            }}
        },
}
</script>

<style src="@vueform/toggle/themes/default.css"></style>
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
        margin-left: 360px;
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

    .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 10px;
    }

    .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
    }
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #2196F3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
</style>