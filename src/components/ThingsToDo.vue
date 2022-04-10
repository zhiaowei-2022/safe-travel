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
  <div class="ThingsToDo">
    <h1>Things To Do</h1>
    <h3>Explore attractions, tours and more</h3>
    <form class="form-details">
      <div class="row">
        <div class="col-lg-2">
          <select
            id="country"
            class="form-select form-control"
            v-on:change="changeData()"
          >
            <option value="Singapore" selected>Singapore</option>
            <option value="Japan">Japan</option>
            <option value="Melbourne">Melbourne</option>
          </select>
        </div>
      </div>
    </form>
  </div>
  <br />
  <div class="container">
    <h4>Pick a category</h4>
    <div class="row">
      <div class="col" v-for="cat in categories" :key="cat">
        <div
          class="btn btn-primary"
          v-on:click="goFilter(cat)"
          style="width: 100%"
        >
          {{ cat }}
        </div>
      </div>
    </div>
  </div>
  <br /><br />
  <div class="container">
    <div>
      <h2>Tourist Attractions</h2>
      <div class="row" v-for="row in database" :key="row">
        <div class="col-4" v-for="item in row" :key="item">
          <figure>
            <img
              :id="item.Name"
              :src="item.ImageURL"
              :alt="item.Name"
              v-on:click="
                openModal(
                  item.Name,
                  item.ImageURL,
                  item.Rating,
                  item.Address,
                  item.Contact,
                  item.Description,
                  item.Website,
                  item.Category
                )
              "
            />
            <figcaption>{{ item.Name }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
  <div id="searchResult" class="modal">
    <div class="modal-content">
      <span class="close" v-on:click="closeModal()">&times;</span>
      <div class="container">
        <div class="row">
          <div id="photo">
          </div>
        </div>
        <div class="row">
          <div class="col-8"></div>
          <div class="col-4" style="text-align: right">
            <button class="btn btn-primary" id="favbut">
              Add to Favourites
            </button>
          </div>
        </div>
        <div class="row">
          <div id="resultinfo">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="errorModal" class="modal">
    <div class="modal-content" id="error-modal-content">
      <div class="modal-body">
        <h5><b>Please Login or Register to add to your Favourites</b></h5>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary"
          id="errorBtn"
          name="submit"
          type="button"
          @click="closeErrorModal()"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  methods: {
    changeData() {
      this.goFilter();
    },
    goFilter(cat) {
      console.log(cat);
      // console.log(this.database)
      //console.log(this.allinfo)
      let counter = 0;
      let container = [];
      var country = document.getElementById("country").value;
      this.database = [];
      this.allinfo.sort(function (a, b) {
        return b.Rating - a.Rating;
      });
      for (var i = 0; i < this.allinfo.length; i++) {
        let row = this.allinfo[i];
        //console.log(row);
        if (cat === undefined) {
          if (row["Country"] == country) {
            container.push(row);
            counter++;
          }
        } else if (cat != "All") {
          if (row["Country"] == country && row["Category"] == cat) {
            container.push(row);

            counter++;
          }
        } else {
          if (row["Country"] == country) {
            container.push(row);
            counter++;
          }
        }
        if (
          (counter % this.numberOfColumns == 0 ||
            counter == this.allinfo.length ||
            i == this.allinfo.length - 1) &&
          counter != 0
        ) {
          console.log(container);
          this.database.push(container);
          container = [];
          counter = 0;
        }
      }
    },
    openModal(name, imageURL, rating, address, contact, desc, web) {
      var modal = document.getElementById("searchResult");
      var photoinfo = document.getElementById("photo");
      photoinfo.innerHTML =
        "<img src='" +
        imageURL +
        " 'style='width:100%;height:400px;border-radius: 30px;padding:10px'>";
      //console.log(this.favourites.length)
      var favbut = document.getElementById("favbut");
      if (getAuth().currentUser != null) {
        if (this.favourites.length > 0) {
          for (var index = 0; index < this.favourites.length; index++) {
            console.log(this.favourites[index]["Name"] == name);
            if (this.favourites[index]["Name"] == name) {
              removeFavBut(name, this.allinfo, this.favourites);
              break;
            } else {
              createAddBut(name, this.allinfo, this.favourites);
            }
          }
        } else {
          createAddBut(name, this.allinfo, this.favourites);
        }
      } else {
        loginbut();
      }

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

      function loginbut() {
        console.log(getAuth().currentUser);
        favbut.onclick = function () {
          console.log("please log in");
          var errormodal = document.getElementById("errorModal");
          errormodal.style.display = "block";
        };
      }

      function removeFavBut(name, allinfo, favourites) {
        favbut.innerHTML = "Remove from Favourites";
        favbut.onclick = function () {
          removeFav(name, allinfo, favourites);
          console.log("removed");
          console.log(allinfo);
          createAddBut(name, allinfo, favourites);
        };
      }
      function createAddBut(name, allinfo, favourites) {
        favbut.innerHTML = "Add to Favourites";
        favbut.onclick = function () {
          console.log(allinfo);
          addFav(name, allinfo, favourites);
          console.log("Added");
          removeFavBut(name, allinfo, favourites);
        };
      }
      async function removeFav(name, allinfo, favourites) {
        console.log(favourites);
        const fbuser = getAuth().currentUser.email;
        var itemname = name;
        console.log("Removing Favourites: ", itemname);
        await deleteDoc(
          doc(db, "Users/" + String(fbuser) + "/Favourites", itemname)
        );
        console.log("Document removed");
        for (var i = 0; i < favourites.length; i++) {
          if (favourites[i]["Name"] == name) {
            favourites.splice(i, 1);
          } else {
            continue;
          }
        }
        console.log(favourites);
      }
      async function addFav(name, allinfo, favourites) {
        const fbuser = getAuth().currentUser.email;
        try {
          for (var i = 0; i < allinfo.length; i++) {
            if (allinfo[i]["Name"] == name) {
              console.log(allinfo[i]);
              const docRef = setDoc(
                doc(db, "Users/" + String(fbuser) + "/Favourites", name),
                {
                  Name: name,
                  ImageURL: allinfo[i]["ImageURL"],
                  Rating: allinfo[i]["Rating"],
                  Address: allinfo[i]["Address"],
                  Contact: allinfo[i]["Contact"],
                  Description: allinfo[i]["Description"],
                  Website: allinfo[i]["Website"],
                  Category: allinfo[i]["Category"],
                  Overhead: "Tourist Attractions",
                }
              );
              console.log(docRef);
              favourites.push(allinfo[i]);
            }
          }
        } catch (error) {
          console.error("Error adding document:", error);
        }
        console.log(favourites);
      }
    },
    closeModal() {
      var modal = document.getElementById("searchResult");
      modal.style.display = "none";
    },
    closeErrorModal() {
      var modal = document.getElementById("errorModal");
      modal.style.display = "none";
    },
    async readFirebase() {
      var countrybox = document.getElementById("country");
      console.log(countrybox.value);
      for (var i = 0; i < countrybox.length; i++) {
        var country = countrybox.options[i].value;
        var zz = await getDocs(
          collection(db, "ThingToDo/Attractions/" + country)
        );
        let counter = 0;
        let container = [];
        let rowcounter = 0;
        zz.forEach((doc) => {
          let row = doc.data();
          if (!this.categories.includes(row.Category)) {
            this.categories.push(row.Category);
          }
          row["Country"] = country;
          if (row["Country"] == "Singapore") {
            container.push(row);
            counter++;
          }
          this.allinfo.push(row);
          if (
            (counter % this.numberOfColumns == 0 || counter == zz.length) &&
            container.length != 0 &&
            rowcounter < 2
          ) {
            //onsole.log(container)
            this.database.push(container);
            container = [];
            rowcounter++;
          }
        });
      }
      this.categories.sort();
    },
    async readUserFirebase() {
      this.favourites = [];
      const auth = getAuth();
      const fbuser = auth.currentUser.email;
      var z = await getDocs(
        collection(db, "Users/" + String(fbuser) + "/Favourites")
      );
      z.forEach((doc) => {
        let row = doc.data();
        this.favourites.push(row);
      });
    },
  },
  data() {
    return {
      allinfo: [],
      favourites: [],
      database: [],
      categories: ["All"],
      numberOfColumns: 3,
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
        console.log(user.email);
        this.readUserFirebase();
      } else {
        this.favourites = [];
      }
    });
    this.readFirebase();
  },
};
</script>

<style scoped>
.ThingsToDo {
  background-image: url("https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,,w_1920,/v1607408071/ued/ttd/banner/jpg/ttd_veritcal_page_banner_experiences.jpg");
  height: 500px;
  width: 100%;
  padding-top: 100px;
}

h1, h3 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: rgb(0, 15, 92);
}

h2, h4 {
  text-align: left;
  margin-left: 20px;
  font-weight: bold;
  color: rgb(0, 15, 92);
}

.row {
  background-color: transparent;
  align-items: center;
  margin: 10px 0px;
}

img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin: 5px;
}

button {
  background-color: lightskyblue;
  border-color: lightskyblue;
  color: black;
  font-weight: bold;
  float: right;
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

h5 {
  margin-top: 25%;
}

#error-modal-content {
  margin: 16% auto;
  padding: 0px;
  width: 700px;
  height: 300px;
}

.modal-body {
  margin: auto;
  font-size: 30px;
  color: rgb(0, 15, 92);
  padding: 2px 16px;
  justify-content: center;
  align-items: center;
}

.modal-footer {
  padding: 10px;
  display: flex;
  align-items: center;
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

.btn-primary, button {
  background-color: lightskyblue;
  border-color: lightskyblue;
  color: black;
  font-weight: bold;
  float: right;
}
</style>
