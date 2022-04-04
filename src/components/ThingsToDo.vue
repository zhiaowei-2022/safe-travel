<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>    
    <div class="ThingsToDo">
        <h1>Things To Do</h1>
        <h3>Explore attractions, tours and more</h3>
        <form class="form-details">
        <div class="row">
            <div class="col-lg-2">
            <select id="country" class="form-select form-control" v-on:change='changeData()'>
            <!-- <select id="country" class="form-select form-control">-->
                <option value="Japan">Japan</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Singapore" selected>Singapore</option>
            </select>
            </div>
        </div>
        </form>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col" v-for="cat in categories" :key="cat">
        <div class="btn btn-primary" v-on:click="goFilter(cat)">{{ cat }}</div>
      </div>
    </div>
  </div>
  <br /><br />
  <div class="container" >
    <div>
      <div class="row" v-for="row in database" :key="row">
        <div class="col-4" v-for="item in row" :key="item">
          <figure>
            <img
              :id="item.Name"
              :src="item.ImageURL"
              :alt="item.Name"
              v-on:click="openModal(item.Name, item.ImageURL, item.Rating, item.Address, item.Phone, item.Description, item.Website)"
            />
            <figcaption>{{ item.Name }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
  <div id="searchResult" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" v-on:click="closeModal()">&times;</span>
      <div class="container">
        <div class="row">
          <div id="photo">
            <!-- img -->
          </div>
        </div>
        <div class="row" v-if="user">
            <div class="col-8"></div>
            <div class="col-4" id="favbut" style="text-align:right"></div>
        </div>
        <div class="row">
          <div id="resultinfo">
            <!--
              Name
              Rating
              Address
              Phone
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

import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

import { collection, getDocs} from "firebase/firestore"
const db = getFirestore(firebaseApp);
export default {
    methods: {
        clearAll(){
            for (var i = 0; i < 6; i++){
                var containerclear = document.getElementById(i);
                containerclear.innerHTML = ""
            }  
        },
        changeData(){
            this.goFilter();
        },
        goFilter(cat) {
            console.log(cat);
            //console.log(this.allinfo)
            let counter = 0;
            let container = [];
            var country = document.getElementById("country").value
            this.database = []
            for(var i=0;i < this.allinfo.length; i++){
                    let row = this.allinfo[i];
                    //console.log(row);
                    if(cat === undefined){
                        if(row["Country"] == country) {
                            container.push(row);
                            counter++;
                        }
                    } else if (cat != "All") {
                        if(row["Country"] == country && row["Category"] == cat) {
                            container.push(row);
                            counter++;
                        } 
                    } else {
                        if(row["Country"] == country) {
                            container.push(row);
                            counter++;
                        }
                    }
                    if (counter % this.numberOfColumns == 0 || counter == this.allinfo.length || i == this.allinfo.length-1) {
                                this.database.push(container);
                                container = [];
                    }
            }
        },
        openModal(name, imageURL, rating, address, contact, desc, web) {            
            var modal = document.getElementById("searchResult");
            var photoinfo = document.getElementById("photo");
            photoinfo.innerHTML = "<img src='" + imageURL + " 'style='width:100%;border-radius: 30px;padding:10px'>";
            var favbut = document.getElementById("favbut");
            favbut.innerHTML = "";
            var delbut = document.createElement("button")
            console.log(this.favourites)
            for(var index = 0; index < this.favourites.length; index++) {
                
                for (var val = 0; val < this.favourites[index].length; val++) {

                    if (this.favourites[index][val]["Name"] == name) {
                            delbut.className = "btn btn-danger"
                            delbut.id = String(name)
                            delbut.innerHTML = "Remove from Favourites"
                            delbut.onclick = function () {
                                console.log("removeFav(name)")
                            } 
                            favbut.append(delbut) 
                            break;
                        } else {
                            delbut.className = "btn btn-danger"
                            delbut.id = String(name)
                            delbut.innerHTML = "Add to Favourites"
                            delbut.onclick = function () {
                                console.log("addFav(name)")
                            } 
                            favbut.append(delbut) 
                        }
                }
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
        },
        closeModal() {
            var modal = document.getElementById("searchResult");
            //console.log(modal)
            modal.style.display = "none";
        },
        async readFirebase() {
        // user in params
            //console.log(document.getElementById("country").options[1].text)
            var countrybox = document.getElementById("country")
            //console.log(countrybox.length)
            for(var i = 0; i < countrybox.length; i++){
                var country = countrybox.options[i].value
            
                var zz = await getDocs(collection(db, "ThingToDo/Attractions/" + country));
                //console.log(zz)
                let counter = 0;
                let container = [];
                let rowcounter = 0;
                zz.forEach((doc) => {
                    let row = doc.data();
                    if (!this.categories.includes(row.Category)) {
                    this.categories.push(row.Category);
                    }
                    row["Country"] = country
                    //console.log(row)
                    container.push(row);
                    this.allinfo.push(row) 
                    //console.log(this.allinfo)
                    counter++;
                    if ((counter % this.numberOfColumns == 0 || counter == zz.length) && rowcounter < 2) {
                        this.database.push(container);
                        container = [];
                        rowcounter++;
                    }
                });
            }
            //console.log(this.database)
        },
        async readUserFirebase() {
            const auth = getAuth();
            const fbuser = auth.currentUser.email;
            var z = await getDocs(collection(db,"Users"))
            z.forEach((doc) => {
                    let row = doc.data();
                    if (fbuser == row.email){
                        let rowfavourites = row.favourites
                        
                        this.favourites.push(rowfavourites)
                    }
            });
            //console.log(this.favourites)
            
        }
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
            this.readUserFirebase();
        } else {
            this.favourites = [];
        }
        });
        this.readFirebase();
    }
}
</script>

<style scoped>
.ThingsToDo {
  background-image: url("https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,,w_1920,/v1607408071/ued/ttd/banner/jpg/ttd_veritcal_page_banner_experiences.jpg"); 
  height: 400px;
  padding-top: 100px;
}
h1, h3 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: white;
}
h4 {
    text-align: left;
    margin-left: 30px;
    font-weight: bold;
    color: rgb(1, 1, 87);
}
.row {
    background-color: rgb(0, 15, 95, 0.05);
    align-items: center;
    margin: 10px 0px;
}
img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin:5px
}
button {
    margin-bottom: 15px;
    background-color: rgb(0, 15, 95, 0.05);
    color: rgb(0, 15, 95);
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
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
  padding-right:15px;
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

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active    {
        background-color: red;
        color: #FFF;
        border-color: #285e8e;
}

</style>