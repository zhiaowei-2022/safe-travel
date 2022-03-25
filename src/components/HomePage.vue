<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


    <!-- Form for Book Flight Search Fields -->
    <div class="search-info">
        <h1>Guidelines</h1>
        <form class=form-details>
        <div class="row">
          <!-- Search field for origin country -->
          <div class="col">
           <label for="origin-country" class="title">Origin</label>
            <select class="form-select" required id="origin" >
               <option value="" selected hidden>---- Please select origin country ----</option>
               <option value="economyClass">Singapore</option>
               <option value="businessClass">Malaysia</option>
               <option value="firstClass">China</option>
            </select>
          </div>
          <!-- Search field for destination country -->
          <div class="col">
            <label for="destination-country" class="title">Destination</label>
            <select class="form-select" required id="destination" >
               <option value="" selected hidden>---- Please select destination country ----</option>
               <option value="economyClass">Singapore</option>
               <option value="businessClass">Malaysia</option>
               <option value="firstClass">China</option>
            </select>
          
           </div>
        </div>
        <br>
        <div class="row g-lg-2">
            <div class="form-group">
                <div>
                 <button class="btn btn-primary " name="submit" type="submit" @click="searchInfo()">
                  Display Information <br>Below
                 </button>
                </div>
            </div>
        </div>
        </form>
    </div>
    <br>
    
    <!-- <div class="form-details" style="color:black">
        <div class="container" style="background-color:white">
        <div class="row">
            <div class="col-5" style="background-color:white">
                origin <br>
                Fully Vaccinated: X <br>
                Non-Fully Vaccinated: X
            </div>
            <div class="col">
                covid <br>
                Daily cases: X <br>
                Weekly cases: X 

            </div>
        </div>
        <div class="row">
            <div class="col">
                destination
            </div>
            <div class="col">
                covid
            </div>
        </div>
        </div>
    </div> -->


    
    <div class="form-details">
        <h3 style="color:lightskyblue;"> COVID </h3>
    <table class="table table-dark table-bordered" style="border-radius: 10px; overflow: hidden;" >
  <tbody>
    <tr>
      <td class="col-4">
          <strong>Origin</strong> <br> <br>
          Fully Vaccinated: X <br>
          Non-Fully Vaccinated: X <br>
          <a href="https://www.google.com">For more details click me</a>
          
          </td>
      <td><strong>Covid Information</strong> <br> <br>
      Daily cases: X <br>
      Weekly cases: X 
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>Destination</td>
      <td>Covid Information</td>
    </tr>
  </tbody>
</table>
</div>
<br>


<div v-if="displayInfo">
    <div class="form-details">
    <table class="table table-dark table-bordered" style="border-radius: 10px; overflow: hidden;" >
  <tbody>
    <tr>
      <td class="col-4">
          <strong>Origin</strong> <br> <br>
          Fully Vaccinated: X <br>
          Non-Fully Vaccinated: X <br>
          <a href="https://www.google.com">For more details click me</a>
          
          </td>
      <td><strong>Covid Information</strong> <br> <br>
      Daily cases: X <br>
      Weekly cases: X 
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>Destination</td>
      <td>Covid Information</td>
    </tr>
  </tbody>
</table>
</div>
</div>

<br>







</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"



export default {
    name: "HomePage",
    
    data() {
        return {
            user: false,
            invalid: false,
            displayInfo: false
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'LoginView'})
        },

        searchInfo() {
            this.displayInfo = true;
        }
    }
    
}
</script>

<style scoped>
    .search-info {
        background-image: url("@/assets/holding-earth.jpg");
        /* height: 50vh; */
        padding-top: 100px;
        padding-bottom: 120px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    h1 {
    text-align: left;
    margin-left: 180px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }
    h2 {
    text-align: left;
    margin-left: 80px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }   
    button {
        background-color: lightskyblue;
        border-color: lightskyblue;
        color: black;
        font-weight: bold;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
    .form-details {
        background-color: rgb(1, 1, 87);
        padding: 20px;
        border-radius: 10px;
        margin-right: 180px;
        margin-left: 180px;
        
    }
    label {
        color: white;
        float: left;
        text-align: left;
    }
        select:invalid{
        color: gray;
    }
    option{
        color: black;
    }



</style>