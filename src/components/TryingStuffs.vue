
<template>
<br>
  <button v-on:click="add()"> add origin </button>
  <hr>
  <button v-on:click="add2()"> add dest </button>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, } from "firebase/firestore";


const db = getFirestore(firebaseApp);
export default {
  methods: {
  async add() {
    try {
      const docRef = await setDoc(doc(db, "Origin", "Malaysia"), {
        Name: "Malaysia",
        Vaxxed: "REQUIRED", 
        NonVaxxed: "REQUIRED", 
        DailyCases: "1000",
        WeeklyCases: "5000",
        CovidLink: "https://www.google.com",
        QuarrantineLink:"https://www.google.com"

      })
      console.log(docRef)
      

    }
    catch(error) {
      console.log(error.message)
    }


  },
    async add2() {
    try {
      const docRef2 = await setDoc(doc(db, "Origin", "Malaysia", "Destination", "Singapore"), {
        Name: "Singapore",
        Vaxxed: "REQUIRED", 
        NonVaxxed: "REQUIRED", 
        DailyCases: "2000",
        WeeklyCases: "3000",
        CovidLink: "https://www.google.com",
        QuarrantineLink:"https://www.google.com",
        VisaLink: "https://www.google.com",
        Visa: "NOT REQUIRED"

      })
      console.log(docRef2)
      

    }
    catch(error) {
      console.log(error.message)
    }


  },


  }

}
</script>

<style>

</style>
