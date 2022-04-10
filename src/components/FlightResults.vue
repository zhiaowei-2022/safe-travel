<template>
  <!-- Bootstrap CSS -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />

  <div class="container-fluid">
    <span class="search-field">
      <FlightSearchInput :input="originCountry" />
      <i class="bi bi-arrow-right"></i>
      <FlightSearchInput :input="destinationCountry" />
      <FlightSearchInput
        :input="
          this.isOneWay == false
            ? searchDisplay(departureDate, arrivalDate)
            : departureDate
        "
      />
      <FlightSearchInput v-if="manyPassengers" :input="passengers" />
      <FlightSearchInput v-if="!manyPassengers" :input="passenger" />
      <FlightSearchInput :input="classType" />
    </span>
  </div>
    
    <div class="container form-group">
        <div v-if="this.isOneWay == true || database.length !== 0 || returnDatabase.length !== 0" @click="openSearchModal()">
            <button class="btn btn-primary" id="modify" name="submit" type="submit">
                Modify Search
            </button>
        </div>
    </div>
    <br>

  <div class="container">
    <h2>Depart - {{ originCountry }} to {{ destinationCountry }}</h2>
  </div>

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
        :arrivalTime="
          timeDisplay(flight.arrivalDateTime.toDate().toLocaleTimeString())
        "
        :arrivalDate="flight.arrivalDateTime.toDate().toDateString()"
        :duration="
          durationDisplay(flight.arrivalDateTime - flight.departureDateTime)
        "
        :price="round(flight.price)"
        :airline="flight.airline"
        :link="flight.link"
      />
    </div>
  </div>

  <div v-if="database.length === 0 && this.isOneWay == true">
    <img id="no-results" src="@/assets/sad.png" alt="" /> <br />
    <br />
    <h3>No Results Found</h3>
    <h5>We could not find any departure flights that match your search.</h5>
    <br />
    <button
      class="btn btn-primary"
      name="submit"
      type="button"
      onclick="history.back()"
    >
      Search Again
    </button>
  </div>

  <div v-if="database.length === 0 && returnDatabase.length !== 0">
    <img id="no-results" src="@/assets/sad.png" alt="" /> <br />
    <br />
    <h3>No Results Found</h3>
    <h5>We could not find any departure flights that match your search.</h5>
    <br />
    <button
      class="btn btn-primary"
      name="submit"
      type="button"
      onclick="history.back()"
    >
      Search Again
    </button>
  </div>

  <div class="container">
    <div v-if="this.isOneWay == false">
      <br />
      <h2>Return - {{ destinationCountry }} to {{ originCountry }}</h2>
    </div>
  </div>

  <div v-if="this.isOneWay == false">
    <br />
    <div v-if="returnDatabase.length !== 0">
      <div v-for="flight in returnDatabase" v-bind:key="flight.uid">
        <FlightResult
          :airlinePhoto="flight.airlinePic"
          :departureCountryId="flight.departureCountryId"
          :departureCountryName="flight.departureCountryName"
          :departureTime="
            timeDisplay(flight.departureDateTime.toDate().toLocaleTimeString())
          "
          :departureDate="flight.departureDateTime.toDate().toDateString()"
          :arrivalCountryId="flight.arrivalCountryId"
          :arrivalCountryName="flight.arrivalCountryName"
          :arrivalTime="
            timeDisplay(flight.arrivalDateTime.toDate().toLocaleTimeString())
          "
          :arrivalDate="flight.arrivalDateTime.toDate().toDateString()"
          :duration="
            durationDisplay(flight.arrivalDateTime - flight.departureDateTime)
          "
          :price="round(flight.price)"
          :airline="flight.airline"
          :link="flight.link"
        />
      </div>
    </div>
  </div>

  <div
    v-if="
      database.length !== 0 &&
      returnDatabase.length === 0 &&
      this.isOneWay == false
    "
  >
    <img id="no-results" src="@/assets/sad.png" alt="" /> <br />
    <br />
    <h3>No Results Found</h3>
    <h5>We could not find any return flights that match your search.</h5>
    <br />
    <button
      class="btn btn-primary"
      name="submit"
      type="button"
      onclick="history.back()"
    >
      Search Again
    </button>
  </div>

  <div
    v-if="
      database.length === 0 &&
      returnDatabase.length === 0 &&
      this.isOneWay == false
    "
  >
    <img id="no-results" src="@/assets/sad.png" alt="" /> <br />
    <br />
    <h3>No Results Found</h3>
    <h5>
      We could not find any departure and return flights that match your search.
    </h5>
    <br />
    <button
      class="btn btn-primary"
      name="submit"
      type="button"
      onclick="history.back()"
    >
      Search Again
    </button>
  </div>

  <div id="searchModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 style="font-weight: bold">Modify Your Search</h2>
        <span class="close" v-on:click="closeSearchModal()">&times;</span>
      </div>
      <br />

      <form class="form-details">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="originCountry" class="title">Origin</label>
              <select
                name="originCountry"
                id="originCountry"
                class="form-select form-control"
                v-model="newOriginCountry"
                aria-placeholder="Select Country"
              >
                <option value="null" selected hidden>
                  ---- Select Country ----
                </option>
                <option value="Singapore">Singapore</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Germany">Germany</option>
                <option value="Bangkok">Bangkok</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="destinationCountry" class="title">Destination</label>
              <select
                name="destinationCountry"
                id="destinationCountry"
                class="form-select form-control"
                v-model="newDestinationCountry"
                aria-placeholder="Select Country"
              >
                <option value="null" selected hidden>
                  ---- Select Country ----
                </option>
                <option value="Singapore">Singapore</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Germany">Germany</option>
                <option value="Bangkok">Bangkok</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <label for="departureDate" class="form-label">Departure Date</label>
            <input
              id="departureDate"
              class="form-control"
              type="date"
              v-model="newDepartureDate"
              required
            />
          </div>
          <div class="col" v-if="this.isOneWay == false">
            <label for="arrivalDate" class="form-label">Return Date</label>
            <input
              id="arrivalDate"
              class="form-control"
              type="date"
              v-model="newArrivalDate"
              required
            />
          </div>
          <div class="col">
            <label for="noOfPassengers" class="form-label"
              >No of Passengers</label
            >
            <input
              id="noOfPassengers"
              min="1"
              class="form-control"
              type="number"
              placeholder="No. of Passenger(s)"
              v-model="newNoOfPassengers"
            />
          </div>
          <div class="col">
            <label class="form-label">Class</label>
            <select
              name="classType"
              class="form-select form-control"
              v-model="newClassType"
            >
              <option value="null">---- Select Class ----</option>
              <option value="Economy Class">Economy Class</option>
              <option value="Business Class">Business Class</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </div>
        <br />
        <button type="button" class="btn btn-primary" @click="modifySearch()">
          Save
        </button>
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
        <img id="no-results" src="@/assets/sad.png" alt="" />
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary"
          id="errorBtn"
          name="submit"
          type="button"
          @click="closeErrorModal()"
        >
          Search Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FlightSearchInput from "@/template/FlightSearchInput.vue";
import FlightResult from "@/template/FlightResult.vue";
import moment from "moment";

import firebaseApp from "@/firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "FlightResults",
  components: {
    FlightSearchInput,
    FlightResult,
  },

  data() {
    return {
      database: [],
      returnDatabase: [],
      originCountry: this.$route.query.originCountry,
      destinationCountry: this.$route.query.destinationCountry,
      departureDate: this.$route.query.departureDate,
      arrivalDate: this.$route.query.arrivalDate,
      isOneWay: this.$route.query.isOneWay === "true",
      passenger: this.$route.query.noOfPassengers + " Passenger",
      passengers: this.$route.query.noOfPassengers + " Passengers",
      classType: this.$route.query.classType,
      manyPassengers: this.$route.query.manyPassengers,
      user: false,

      newOriginCountry: this.$route.query.originCountry,
      newDestinationCountry: this.$route.query.destinationCountry,
      newDepartureDate: this.$route.query.departureDate,
      newArrivalDate: this.$route.query.arrivalDate,
      newNoOfPassengers: this.$route.query.noOfPassengers,
      newClassType: this.$route.query.classType,
    };
  },

  mounted() {
    if (this.isOneWay == true) {
      // one way flight
      this.isOneWayFlightSearchValid();
    } else {
      // return flight
      this.isOneWayFlightSearchValid();
      this.isReturnFlightSearchValid();
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    searchDisplay(date1, date2) {
      return (
        moment(date1).format("D MMM YYYY") +
        " - " +
        moment(date2).format("D MMM YYYY")
      );
    },

    resultsDisplay(date) {
      return moment(date).format("ddd, D MMM YYYY");
    },

    timeDisplay(time) {
      return moment(time, "hh:mm:ss").format("hh:mm A");
    },

    durationDisplay(sec) {
      return (
        moment({}).seconds(sec).format("H") +
        " hours " +
        moment({}).seconds(sec).format("mm") +
        " mins"
      );
    },

    getYear(timeStamp) {
      return moment(timeStamp.toDate().toDateString(), "dd/mm/yyyy").format(
        "yyyy"
      );
    },

    round(number) {
      return number.toFixed(2);
    },

    async isOneWayFlightSearchValid() {
      var departureAfter = new Date(this.departureDate);
      var departureBefore = new Date(this.departureDate);
      departureAfter.setDate(departureAfter.getDate() + 1);
      const q = query(
        collection(db, "Flights"),
        where("departureCountryName", "==", this.originCountry),
        where("arrivalCountryName", "==", this.destinationCountry),
        where("departureDateTime", ">=", departureBefore),
        where("departureDateTime", "<", departureAfter)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data();
        console.log(doc.id, " => ", doc.data());
        this.database.push(data);
      });
    },

    async isReturnFlightSearchValid() {
      var arrivalAfter = new Date(this.arrivalDate);
      var arrivalBefore = new Date(this.arrivalDate);
      arrivalAfter.setDate(arrivalAfter.getDate() + 1);
      console.log(arrivalBefore);
      console.log(arrivalAfter);
      const q = query(
        collection(db, "Flights"),
        where("departureCountryName", "==", this.destinationCountry),
        where("arrivalCountryName", "==", this.originCountry),
        where("departureDateTime", ">=", arrivalBefore),
        where("departureDateTime", "<", arrivalAfter)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data();
        console.log("im here" + doc.id + "=>" + doc.data());
        this.returnDatabase.push(data);
      });
    },

    openSearchModal() {
      var modal = document.getElementById("searchModal");
      modal.style.display = "block";
    },

    closeSearchModal() {
      var modal = document.getElementById("searchModal");
      modal.style.display = "none";
    },

    async modifySearch() {
      var modal = document.getElementById("errorModal");
      var error = document.getElementById("errorMsg");
      this.originCountry = this.newOriginCountry;
      this.destinationCountry = this.newDestinationCountry;
      this.departureDate = this.newDepartureDate;
      this.arrivalDate = this.newArrivalDate;
      this.noOfPassengers = this.newNoOfPassengers;
      this.classType = this.newClassType;
      this.database = [];
      this.returnDatabase = [];

      if (
        this.newOriginCountry != "" &&
        this.newDestinationCountry != "" &&
        this.newDepartureDate != "" &&
        this.classType != ""
      ) {
        console.log("missing search");
        if (this.newNoOfPassengers >= 1) {
          console.log("check passengers");
          if (this.isOneWay == true) {
            // one way flight
            this.isOneWayFlightSearchValid();
          } else {
            console.log("check return flight");
            // return flight
            if (this.newArrivalDate > this.newDepartureDate) {
              console.log("check dates");
              this.isOneWayFlightSearchValid();
              this.isReturnFlightSearchValid();
            } else {
              modal.style.display = "block";
              error.innerHTML =
                "<h6> Please ensure that the return date is after the departure date. </h6>";
            }
          }
        } else {
          modal.style.display = "block";
          error.innerHTML =
            "<h6> Please ensure that the number of passengers is a positive number. </h6>";
        }
      } else {
        modal.style.display = "block";
        error.innerHTML =
          "<h6> Please fill up all fields to start searching. </h6>";
      }
      this.closeSearchModal();
    },

    closeErrorModal() {
      var modal = document.getElementById("errorModal");
      modal.style.display = "none";
    },
  },
};
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
  width: 150px;
}

img {
  width: 90%;
  border-radius: 50%;
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
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-header {
  padding: 10px;
  color: rgb(0, 15, 92);
  display: flex;
  align-items: center;
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

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#modify {
  float: right;
  margin-top: 10px;
}

label {
  color: black;
  float: left;
  text-align: left;
  font-weight: bold;
}

i {
  display: flex;
  justify-content: center;
  align-items: center;
}

#error-modal-content {
  margin: 16% auto;
  padding: 0px;
  width: 700px;
  height: 300px;
}

#invalid-options {
  font-weight: bold;
  font-size: 30px;
  color: rgb(0, 15, 92);
}
</style>
