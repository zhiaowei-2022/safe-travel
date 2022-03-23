<template>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

  <div class="food-and-dining">
    <h1>Food and Dining</h1>
    <h3>Explore restaurants, cafes, and more</h3>
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
  <br />
  <h2>Popular Dining</h2>
  <br />
  <!--
  <li v-for="item in items" :key="item">
      {{ item.lang }}
  </li>
  -->
  <div class="container">
    <div class="row">
      <div class="col"> <!-- v-for starts here -->
        <figure>
          <img src="https://www.thebestsingapore.com/wp-content/uploads/2018/09/The-Line-Seafood-Counter-1.jpg" alt="the line at shangri-la" />
          <figcaption>The Line at Shangri-La Singapore</figcaption>
        </figure>
      </div>
      <div class="col">
        <figure>
          <img src="https://nomaddicted.files.wordpress.com/2015/08/wpid-20150808_115842.jpg" alt="the cat cafe" />
          <figcaption>The Cat Cafe</figcaption>
        </figure>
      </div>
      <div class="col">
        <figure>
          <img src="https://www.gardensbythebay.com.sg/content/dam/gbb-2021/image/things-to-do/dine-and-shop/satay-by-the-bay/main/satay-by-the-bay-main.jpg" alt="satay by the bay" />
          <figcaption>Satay by the Bay at Gardens by the Bay</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    name: "FoodAndDining",
    data() {
        return {

        }
    },
    mounted() {
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user;
          }    
        });

        // Read Firebase
        async function readFirebase() { // user in params
            var z = await getDocs(collection(db, "FnB"));
            z.forEach((doc) => {
                let row = doc.data();
                console.log(row);
                /*
                var address = row.Address;
                var category = row.Category;
                var contact = row.Contact;
                var description = row.Description;
                var imageURL = row.ImageURL;
                var name = row.Name;
                var rating = row.Rating;
                var website = row.Website;
                */
            })
        }
        readFirebase()

    },
    methods: {

    }
}
</script>

<style scoped>
.food-and-dining {
  background-image: url("~@/assets/food-bg.jpg");
  height: 500px;
  padding-top: 100px;
}

h1,
h3 {
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  color: white;
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
</style>