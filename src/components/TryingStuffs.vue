
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
      const docRef = await setDoc(doc(db, "Origin", "Singapore"), {
        Name: "Singapore",
        Vaxxed: "NOT REQUIRED", 
        NonVaxxed: "REQUIRED", 
        DailyCases: "4,563",
        WeeklyCases: "5,549",
        CovidLink: "https://ourworldindata.org/explorers/coronavirus-data-explorer?facet=none&uniformYAxis=0&Metric=Confirmed+cases&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=~SGP",
        QuarrantineLink:"https://safetravel.ica.gov.sg/arriving/overview#vaccination",
        Mask: "Partial",

      })

      // const docRef = await setDoc(doc(db, "Origin", "Austrialia"), {
      //   Name: "Austrialia",
      //   Vaxxed: "NOT REQUIRED", 
      //   NonVaxxed: "REQUIRED", 
      //   DailyCases: "48,097",
      //   WeeklyCases: "57,293",
      //   QuarrantineLink: "https://singapore.embassy.gov.au/sing/COVIDINFORMATION.html",
      //   CovidLink: "https://www.singaporevisa.com/requirements/australian-citizens#:~:text=Yes%2C%20for%20all%20Australian%20nationals,the%20traveller%20arriving%20in%20Singapore.",
      //   Mask: "ON",

      // })




      console.log(docRef)
      

    }
    catch(error) {
      console.log(error.message)
    }


  },
    async add2() {
    try {
      const docRef2 = await setDoc(doc(db, "Origin", "Singapore", "Destination", "Austrialia"), {
        Name: "Austrialia",
        Vaxxed: "NOT REQUIRED", 
        NonVaxxed: "REQUIRED", 
        DailyCases: "48,097",
        WeeklyCases: "57,293",
        CovidLink: "https://ourworldindata.org/explorers/coronavirus-data-explorer?facet=none&uniformYAxis=0&Metric=Confirmed+cases&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=~AUS",
        QuarrantineLink:"https://singapore.embassy.gov.au/sing/COVIDINFORMATION.html",
        VisaLink: "https://singapore.embassy.gov.au/sing/Visas_and_Migration.html",
        Visa: "REQUIRED",
        Mask: "ON",

      })

      // const docRef2 = await setDoc(doc(db, "Origin", "Austrialia", "Destination", "Singapore"), {
      //   Name: "Singapore",
      //   Vaxxed: "NOT REQUIRED", 
      //   NonVaxxed: "REQUIRED", 
      //   DailyCases: "4,563",
      //   WeeklyCases: "5,549",
      //   CovidLink: "https://ourworldindata.org/explorers/coronavirus-data-explorer?facet=none&uniformYAxis=0&Metric=Confirmed+cases&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=~SGP",
      //   QuarrantineLink:"https://safetravel.ica.gov.sg/arriving/overview#vaccination",
      //   VisaLink: "https://www.ica.gov.sg/enter-depart/entry_requirements/visa_requirements",
      //   Visa: "NOT REQUIRED",
      //   Mask: "Partial",

      // })



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
