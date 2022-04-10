<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-lg-1">
                <img :src="airlinePhoto" alt="">
            </div>
            <div class="col col-lg-3" style="text-align:left; margin-left: 50px">
                <div class="flight-name"> {{ departureCountryId }} {{departureTime}}</div>
                <div class="flight-body"> {{ departureCountryName }} </div>
                <div class="flight-body"> {{ departureDate }}</div>
            </div>
            <div class="col col-lg-2" style="color: black;">
                <div class="row-lg" id="duration">{{ duration }}</div>
                <div class="row-lg" style="background-color: rgb(0, 15, 95, 0);"><i class="bi bi-arrow-right" style="font-size:50px; display: inline-block;"></i></div>
                <div class="row-lg"> {{ airline }} </div>
            </div>
            <div class="col col-lg-3" style="text-align:left; margin-left: 50px">
                <div class="flight-name"> {{ arrivalCountryId }} {{arrivalTime}}</div>
                <div class="flight-body"> {{ arrivalCountryName }} </div>
                <div class="flight-body"> {{ arrivalDate }}</div>
            </div>
            <div class="col col-lg-2">
                <!-- added to likes -->
                <div class="flight-price-added"> ${{ price }} </div>
                <div>
                    <!-- not added to likes -->
                    <!-- <div class="flight-price"> {{ price }} </div> -->
                    <a class="btn btn-primary" :href="link" target="_blank"> Book now </a>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    name: "FlightResult",

    data() {
        return {
            user:false,
        }
    },

    props: {
        airlinePhoto: String,
        departureCountryId: String,
        departureCountryName: String,
        departureTime: Number,
        departureDate: String,
        arrivalCountryId: String,
        arrivalCountryName: String,
        arrivalTime: String,
        arrivalDate: String,
        duration: String,
        price: String,
        airline: String,
        link: String,
    },

    methods: {
        logOut() {
            const auth = getAuth()
            const user = auth.currentUser
            signOut(auth, user)
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    }
}
</script>

<style scoped>
.row {
    background-color: rgb(0, 15, 95, 0.05);
    align-items: center;
    margin: 10px 0px;
    padding: 10px 0px;
    color: black;
}
img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.flight-name {
    font-weight: bold;
    font-size: 25px;
    color: black;
}
.flight-body {
    color: black;
}
.flight-price-added {
    font-weight: bold;
    font-size: 25px;
}
.flight-price {
    background-color: rgb(0, 15, 95, 0.2);
    width: 100px;
    height: 100px;
    border-radius: 50px;
    display: inline-block;
    line-height: 100px;
    font-weight: bold;
    color: black;
    font-size: 15px;
    margin-top: 20px;  
}
button {
    margin-bottom: 15px;
    background-color: rgb(0, 15, 95, 0.05);
    color: rgb(0, 15, 95);
}

#duration {
    background-color: rgb(0, 15, 95, 0); 
    display:inline-block;
}

a {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
    width: 120px;
}
</style>