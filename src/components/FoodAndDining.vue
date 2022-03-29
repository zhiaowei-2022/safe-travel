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

  <div class="food-and-dining">
    <h1>Food and Dining</h1>
    <h3>Explore restaurants, cafes, and more</h3>
    <form class="form-details">
      <div class="row">
        <div class="col-lg-2">
          <select name="country" class="form-select form-control">
            <option value="sgp" selected>Singapore</option>
            <option value="jpn">Japan</option>
            <option value="tha">Thailand</option>
          </select>
        </div>
      </div>
    </form>
  </div>
  <br />
  <h2>Popular Dining</h2>
  <br />
  <div class="container">
    <div class="row">
      <div class="col" v-for="cat in categories" :key="cat">
        <div class="btn btn-primary" @click="readFirebase(cat)">{{ cat }}</div>
      </div>
    </div>
  </div>
  <br /><br />
  <div class="container">
    <div>
      <div class="row" v-for="row in database" :key="row">
        <div class="col" v-for="item in row" :key="item">
          <figure>
            <img
              :id="item.Name"
              :src="item.ImageURL"
              :alt="item.Name"
              @click="openModal(item.Name, item.ImageURL, item.Rating, item.Address, item.Contact, item.Description, item.Website)"
            />
            <figcaption>{{ item.Name }}</figcaption>
          </figure>
        </div>
        <div class="col" v-for="i in numberOfColumns - row.length" :key="i"></div>
      </div>
    </div>
  </div>
  <div id="searchResult" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" @click="closeModal()">&times;</span>
      <div class="container">
        <div class="row">
          <div id="photo">
            <!-- img -->
          </div>
        </div>
        <div class="row">
          <div id="resultinfo">
            <!--
              Name
              Rating
              Address
              Contact
              Description
              Website
              -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "FoodAndDining",
  computed: {
    // return computed value methods here
  },
  methods: {
    // Read Firebase
    async readFirebase(variable) {
      // user in params
      this.database = [];
      var z = await getDocs(collection(db, "FnB"));
      let counter = 0;
      let container = [];
      z.forEach((doc) => {
        let row = doc.data();
        if (!this.categories.includes(row.Category)) {
          this.categories.push(row.Category);
        }

        if (variable === undefined || variable == "All") {
          container.push(row);
          counter++;
        } else {
          if (variable == row.Category) {
            console.log(row);
            container.push(row);
            counter++;
          }
        }

        if (counter % this.numberOfColumns == 0 || counter == z.length) {
          this.database.push(container);
          container = [];
        }
      });
      if (container.length < this.numberOfColumns) {
        this.database.push(container);
      }
    },
    initModal() {
      var modal = document.getElementById("searchResult");
      modal.style.display = "block";
    },
    openModal(name, imageURL, rating, address, contact, desc, web) {
      var modal = document.getElementById("searchResult");
      var photoinfo = document.getElementById("photo");
      photoinfo.innerHTML =
        "<img src='" +
        imageURL +
        " 'style='width:100%; border-radius: 10px;'><br/><br/>";
      var resultbox = document.getElementById("resultinfo");
      resultbox.innerHTML =
        "<h4><b>" +
        name +
        "</b></h4>" +
        "<b>Rating:</b> " +
        rating +
        " / 5 <br>" +
        "<b>Address:</b> " +
        address +
        "<br>" +
        "<b>Phone:</b> " +
        contact +
        "<br><br>" +
        "<h5><b>Description:</b></h5> " +
        desc +
        "<br><br>" +
        "For more information please visit <a href='" +
        web +
        "' target='_blank' style='color:black'>here</a> <br>";
      modal.style.display = "block";
    },
    closeModal() {
      var modal = document.getElementById("searchResult");
      modal.style.display = "none";
    },
  },
  data() {
    return {
      database: [],
      categories: ["All"],
      numberOfColumns: 3,
      temp_db: "",
    };
  },
  mounted() {
    let jquery = document.createElement("script");
    jquery.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    );
    document.head.appendChild(jquery);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    this.readFirebase();
  },
  beforeUpdate() {},
  updated() {},
  // modifying firebase database script here for filtering
};
</script>

<style scoped>
.food-and-dining {
  background-image: url("https://www.causeandeffect.sg/assets/images/dwws-0538-e-berlin-2000x1363.jpg");
  height: 500px;
  padding-top: 100px;
}

h1,
h3 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: white;
}

h2 {
  text-align: left;
  margin-left: 180px;
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
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.form-details {
  padding: 20px;
  border-radius: 10px;
  margin-right: 180px;
  margin-left: 160px;
}

label {
  color: white;
  float: left;
  text-align: left;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  /* overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  text-align: right;
  padding-right: 15px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#resultinfo {
  text-align: left;
}
</style>
