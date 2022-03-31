<template>
  <button v-on:click="isFlightSearchValid()">check firebase</button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { query, where } from "firebase/firestore";  
const db = getFirestore(firebaseApp);
export default {
    methods:{
            async isFlightSearchValid() {
              const q = query(collection(db, "Flights"), where("arrivalCountryName", "==", "Singapore"), where("departureCountryName", "==", "Melbourne"));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
});

    }
}}
</script>

<style>

</style>