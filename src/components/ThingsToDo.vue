<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

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
        <h4 style='text-align:left'><b>Popular Attractions</b></h4>
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

</template>

<script>

import firebaseApp from "../firebase.js";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

import { collection, getDocs } from "firebase/firestore"
const db = getFirestore(firebaseApp);
export default {
    methods: {
        async display(variable){
            let z = await getDocs(collection(db, "ThingToDo"))
            let ind = 0
            //let col = 0
            if (variable != undefined ){
                {
                    var containerclear0 = document.getElementById(0)
                    var containerclear1 = document.getElementById(1)
                    var containerclear2 = document.getElementById(2)
                    var containerclear3 = document.getElementById(3)
                    var containerclear4 = document.getElementById(4)
                    var containerclear5 = document.getElementById(5)
                    containerclear0.innerHTML = ""
                    containerclear1.innerHTML = ""
                    containerclear2.innerHTML = ""
                    containerclear3.innerHTML = ""
                    containerclear4.innerHTML = ""
                    containerclear5.innerHTML = ""
                }
            }

            z.forEach((docs) => {
                let yy = docs.data()
                var container = document.getElementById(ind)
                var name = (yy.Name)
                var imageURL = (yy.ImageURL)
                if (ind > 5) {
                    return;
                }
                else {
                    if (variable === undefined || variable == 'overview') {
                        
                        container.innerHTML +=  "<figure>" 
                        + "<img src='"+ imageURL +"'style='width:100%'>"
                        + "<figcaption>" + name + " </figcaption>"
                        + "</figure>"  
                    }
                    else {
                        var category = (yy.Category)
                        if (variable == category) {
                            container.innerHTML +=  "<figure>" 
                            + "<img src='"+ imageURL +"'style='width:100%'>"
                            + "<figcaption>" + name + " </figcaption>"
                            + "</figure>" 
                        }
                    }
                    ind+=1
                }
            })
            
        }
    },
    mounted(){
        this.display()
    }
}
</script>

<style>

</style>