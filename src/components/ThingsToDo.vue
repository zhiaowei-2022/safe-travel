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
    <h4> Pick a category </h4>
    <div class="row">
      <div class="col" v-for="cat in categories" :key="cat">
        <div class="btn btn-primary" v-on:click="goFilter(cat)" style="width:100%">{{ cat }}</div>
      </div>
    </div>
  </div>
  <br /><br />
  <div class="container" >
    <div>
      <h2> Tourist Attractions </h2>
      <div class="row" v-for="row in database" :key="row">
        <div class="col-4" v-for="item in row" :key="item">
          <figure>
            <img
              :id="item.Name"
              :src="item.ImageURL"
              :alt="item.Name"
              v-on:click="openModal(item.Name, item.ImageURL, item.Rating, item.Address, item.Contact, item.Description, item.Website, item.Category)"
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
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc} from "firebase/firestore"
const db = getFirestore(firebaseApp);
export default {
    methods: {
    
        changeData(){
            this.goFilter();
        },
        goFilter(cat) {
            console.log(cat);
            // console.log(this.database)
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
                    if ( (counter % this.numberOfColumns == 0 || counter == this.allinfo.length || i == this.allinfo.length-1)
                          && counter != 0 ) {
                                this.database.push(container);
                                container = [];
                    }
            }
        },
        openModal(name, imageURL, rating, address, contact, desc, web) {
            var modal = document.getElementById("searchResult");
            var photoinfo = document.getElementById("photo");
            photoinfo.innerHTML = "<img src='" + imageURL + " 'style='width:100%;border-radius: 30px;padding:10px'>";
            //console.log(this.favourites.length)
            if (getAuth().currentUser != null) {
              
              var favbut = document.getElementById("favbut");
              var delbut = document.createElement("button")
              favbut.innerHTML = "";
              if (this.favourites.length > 0){
                  for(var index = 0; index < this.favourites.length; index++) {
                          console.log(this.favourites[index]["Name"] == name)
                          if (this.favourites[index]["Name"] == name) {
                              createDelBut(name,this.allinfo);
                              break;
                            } else {
                                createAddBut(name, this.allinfo)
                            }
                  }
              } else {
                  createAddBut(name, this.allinfo)
              }
            }
            var resultbox = document.getElementById("resultinfo");
            resultbox.innerHTML =
                "<h4><b>" + name + "</b></h4>" +
                "<b>Rating:</b> " + rating + " / 5 <br>" +
                "<b>Address:</b> " + address + "<br>" +
                "<b>Phone:</b> " + contact + "<br><br>" +
                "<h5><b>Description:</b></h5> " + desc + "<br><br>" +
                "For more information please visit <a href='" + web + "' target='_blank' style='color:black'>here</a> <br>";
                modal.style.display = "block";
                //console.log(category);

            function createDelBut(name,allinfo) {
                delbut.className = "btn btn-primary"
                delbut.id = String(name)
                delbut.innerHTML = "Remove from Favourites"
                delbut.onclick = function () {
                    removeFav(name,allinfo)
                    console.log("removed")
                    console.log(allinfo)
                    createAddBut(name,allinfo)
                } 
                favbut.append(delbut)
            }

            function createAddBut(name,allinfo) {
                delbut.className = "btn btn-primary"
                delbut.id = String(name)
                delbut.innerHTML = "Add to Favourites"
                delbut.onclick = function () {
                    console.log(allinfo)
                    addFav(name,allinfo)
                    console.log("Added")
                    createDelBut(name,allinfo)
                } 
                favbut.append(delbut)
            }

            async function removeFav(name,allinfo){
                const fbuser = getAuth().currentUser.email;
                var itemname = name
                console.log("Removing Favourites: ", itemname)
                await deleteDoc(doc(db, "Users/"+String(fbuser)+"/Favourites", itemname));
                console.log("Document removed")
                console.log(allinfo)
            }

            async function addFav(name,allinfo) {
                const fbuser = getAuth().currentUser.email;
                //console.log(favourites)
                try {
                    for(var i = 0; i < allinfo.length; i++){
                        if(allinfo[i]["Name"] == name) {
                            console.log(allinfo[i])
                            const docRef = setDoc(doc(db, "Users/"+String(fbuser)+"/Favourites", name), {
                                Name: name,
                                ImageURL: allinfo[i]["ImageURL"],
                                Rating: allinfo[i]["Rating"],
                                Address: allinfo[i]["Address"],
                                Contact: allinfo[i]["Contact"],
                                Description: allinfo[i]["Description"],
                                Website: allinfo[i]["Website"],
                                Category: allinfo[i]["Category"],
                                Overhead: "Tourist Attractions"
                            })
                            console.log(docRef)
                        }
                    }
                } catch (error) {
                    console.error("Error adding document:", error)
                }
                
            }
        },
        closeModal() {
            var modal = document.getElementById("searchResult");
            //console.log(modal)
            modal.style.display = "none";
            setTimeout(function() {
                    console.log(".5 sec timeout")
                    window.location.reload()
                  }, 500
            )
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
          
            this.favourites = [];
            const auth = getAuth();
            const fbuser = auth.currentUser.email;
            var z = await getDocs(collection(db,"Users/"+ String(fbuser)+"/Favourites"))
            z.forEach((doc) => {
                    let row = doc.data();
                    this.favourites.push(row)
                
            });
            /*console.log(this.favourites)
            setTimeout(function() {
                    console.log("1 sec timeout")
                    window.location.reload()
                  }, 1000
            ) */
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
            console.log(user.email)
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
  height: 500px;
  width:100%;
  padding-top: 100px;
}
h1, h3 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: rgb(0, 15, 92);
}
h2,h4 {
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
  margin:5px
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

.btn-primary, button {
    background-color: lightskyblue;
    border-color: lightskyblue;
    color: black;
    font-weight: bold;
    float: right;
}


</style>