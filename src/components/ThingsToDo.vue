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
            <select name="country" class="form-select form-control">
                <option value="sgp" selected>Singapore</option>
                <option value="jpn">Japan</option>
                <option value="tha">Thailand</option>
            </select>
            </div>
        </div>
        </form>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col" id="overview"><button v-on:click='display("overview")'>Overview</button></div>
            <div class="col" id="Museum"><button v-on:click='display("Museum")'>Museum & Galleries</button></div>
            <div class="col" id="WTP"><button v-on:click='display("WTP")'>Water & Themed Park</button></div>
            <div class="col" id="Thrill"><button v-on:click='display("Thrill")'>Thrill Activities</button></div>
            <div class="col" id="AquaZoo"><button v-on:click='display("AquaZoo")'>Aquarium & Zoos</button></div>
        </div>
    </div>
    <br><br>
    <div class="container">
        <h4><b>Popular Attractions</b></h4>
        <div class="searchResult">
            <div class="row">
                <div class="col" id="0">
                </div>
                <div class="col" id="1">
                </div>
                <div class="col" id="2">
                </div>
            </div>
            <div class="row">
                <div class="col" id="3">
                </div>
                <div class="col" id="4">
                </div>
                <div class="col" id="5">
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
        <div class="row">
            <div id="resultinfo">
            <!-- Name , Rating ,Address , Phone , Description , Website -->
            </div>            
        </div>
        </div>
        
            
    </div>
    </div>
</template>

<script>

import firebaseApp from "../firebase.js";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

import { collection, getDocs } from "firebase/firestore"
const db = getFirestore(firebaseApp);
export default {
    methods: {
        clearAll(){
            for (var i = 0; i < 6; i++){
                var containerclear = document.getElementById(i);
                containerclear.innerHTML = ""
            }
            
            
        },
        closeModal() {
            var modal = document.getElementById("searchResult");
            modal.style.display = "none";
        },
        async display(variable){
            let z = await getDocs(collection(db, "ThingToDo"))
            let ind = 0
            this.clearAll()
            z.forEach((docs) => {
                let yy = docs.data()
                var container = document.getElementById(ind)
                //container.innerHTML = ""
                var name = (yy.Name)
                var imageURL = (yy.ImageURL)
                var address = (yy.Address)
                var contact = (yy.Contact)
                var desc = (yy.Description)
                var rating = (yy.Rating)
                var web = (yy.Website)
                
                if (ind > 5) {
                    return;
                }
                else {
                    if (variable === undefined || variable == 'overview') {

    
                        
                        container.innerHTML +=  "<figure id='"+name+"'>" 
                        + "<img src='"+ imageURL +"'style='width:100%'>"
                        + "<figcaption>" + name + " </figcaption>"
                        + "</figure>"  

                        

                        ind+=1
                    }
                    else {
                        var category = (yy.Category)
                        if (variable == category) {
                            container.innerHTML +=  "<figure id='"+name+"'>" 
                            + "<img src='"+ imageURL +" 'style='width:100%'>"
                            + "<figcaption>" + name + " </figcaption>"
                            + "</figure>" 
                            ind+=1
                        }
                    }
                    container.onclick = function() {
                            var modal = document.getElementById("searchResult");
                            console.log("getting modal");

                            // need to insert Information into Modal
                            var photoinfo = document.getElementById("photo")
                            photoinfo.innerHTML = 
                                "<img src='"+ imageURL +" 'style='width:100%'>" 
                                
                            var resultbox = document.getElementById("resultinfo")
                            resultbox.innerHTML =
                                "<h4><b>" + name + "</b></h4>" +
                                "<b>Rating:</b> " + rating + " / 5 <br>" +
                                "<b>Address:</b> " + address + "<br>" +
                                "<b>Phone:</b> " + contact + "<br><br>" + 
                                
                                "<h5><b>Description:</b></h5> " + desc + "<br><br>" +
                                "For more information please visit <a href='" + web + "' target='_blank' style='color:black'>here</a> <br>" 
                            modal.style.display = "block";
                            console.log("modal displayed")
                    }
                }
            })
            
        }
    },
    mounted(){
        this.display()
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
    width: 120px;
    height: 120px;
    border-radius: 50%;
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



</style>