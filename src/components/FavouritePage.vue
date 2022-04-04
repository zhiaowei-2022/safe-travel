<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>    
    <div class="Favourite">
    
        <div v-if="user">
            <div> <h2> <strong> {{user.displayName}}'s Favourites </strong> </h2> </div>
            <div class="container" >
                <div>
                <div class="row" v-for="row in favourites" :key="row" v-on:click="openModal(row.Name, row.ImageURL, row.Rating, row.Address, row.Contact, row.Description, row.Website)">
                    <div class="col-4">
                    <figure >
                        <img
                        :id="row.Name"
                        :src="row.ImageURL"
                        :alt="row.Name"
                        
                        style="width:100%"
                        />
                    </figure>
                    </div>
                    <div class="col - 8">
                        <h4><strong> {{row.Name}} </strong></h4>
                        <br/>
                        <br/>
                        <h5>{{row.Category}} </h5>
                    </div>
                    
                </div>
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
    name:"FavouritePage",
    methods: {
        openModal(name, imageURL, rating, address, contact, desc, web,category) {
            const fbuser = getAuth().currentUser.email;            
            var modal = document.getElementById("searchResult");
            var photoinfo = document.getElementById("photo");
            photoinfo.innerHTML = "<img src='" + imageURL + " 'style='width:100%;height:400px;border-radius: 30px;padding:10px'>";
            var favbut = document.getElementById("favbut");
            favbut.innerHTML = "";
            var delbut = document.createElement("button")
            console.log(this.favourites)
            
                for(var index = 0; index < this.favourites.length; index++) {
                        console.log(this.favourites[index]["Name"] == name)
                        if (this.favourites[index]["Name"] == name) {
                                delbut.className = "btn btn-danger"
                                delbut.id = String(name)
                                delbut.innerHTML = "Remove from Favourites"
                                delbut.onclick = function () {
                                    //console.log(name + " " + imageURL + " " + rating + " " + address + " " + contact + " " + desc + " " + web + " " + category)
                                    removeFav(name)
                                    console.log("removed")
                                } 
                                favbut.append(delbut) 
                                break;
                            } else {
                                delbut.className = "btn btn-danger"
                                delbut.id = String(name)
                                delbut.innerHTML = "Add to Favourites"
                                delbut.onclick = function () {
                                    console.log(name + " " + imageURL + " " + rating + " " + address + " " + contact + " " + desc + " " + web + " " + category)
                                    addFav(name, imageURL, rating, address, contact, desc, web,category)
                                } 
                                favbut.append(delbut) 
                            }
                    
                }
            
            async function addFav(name, imageURL, rating, address, contact, desc, web,category) {
                try {
                    const docRef = setDoc(doc(db, "Users/"+String(fbuser)+"/Favourites", name), {
                        Name: name,
                        ImageURL: imageURL,
                        Rating: rating,
                        Address: address,
                        Contact: contact,
                        Description: desc,
                        Website: web,
                        Category: category
                })
                console.log(docRef)
                                    
                } catch (error) {
                    console.error("Error adding document:", error)
                }
                
            }
            async function removeFav(name){
                var itemname = name
                console.log("Removing Favourites: ", itemname)
                await deleteDoc(doc(db, "Users/"+String(fbuser)+"/Favourites", itemname));
                console.log("Document removed")
                
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
        async readUserFirebase() {
            this.favourites = [];
            const auth = getAuth();
            const fbuser = auth.currentUser.email;
            var z = await getDocs(collection(db,"Users/"+ String(fbuser)+"/Favourites"))
            z.forEach((doc) => {
                    let row = doc.data();
                    this.favourites.push(row)
                    
            });
            console.log(this.favourites)
            
        }

    },
    data() {
        return {
            user:false,
            allinfo: [],
            favourites: [],
            database: [],
        }
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
            if(user) {
                this.user = user;
                this.readUserFirebase();
            }
        })
    },
}
</script>

<style scoped>
h1,
h2 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: black;
}

.Favourite {
    margin-top:20px;
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

.row {
    background-color: rgb(0, 15, 95, 0.05);
    align-items: center;
    margin: 10px 0px;
}
img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  margin:5px
}
</style>