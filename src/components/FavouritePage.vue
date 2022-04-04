<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>    
    <div class="Favourite">
    
        <div v-if="user">
            <div> <h2> <strong> {{user.displayName}}'s Favourites </strong> </h2> </div>
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
                    </figure>

                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs} from "firebase/firestore"
const db = getFirestore(firebaseApp);
export default {
    name:"FavouritePage",
    methods: {
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
            
            if(this.favourites.length == 1 && this.favourites[0].length !== undefined){
                for(var index = 0; index < this.favourites.length; index++) {
                    for (var val = 0; val < this.favourites[index].length; val++) {
                        console.log(this.favourites[index][val]["Reference"])
                    }
                }
            } 
        },

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

<style>
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
</style>