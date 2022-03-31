<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <div>
        <div class="row justify-content-md-center">
            <div class="col col-lg-2">
                <img :src="photo" alt="">
            </div>
            <div class="col" style="text-align:left">
                <div class="room-name"> {{ name }} </div>
                <div class="room-description"> {{ description }} </div>
                <div class="room-facilities"> {{ facilities }} </div>
            </div>
            <div class="col col-lg-2">
                <div class="booking-details"> {{ days }}D{{nights}}N, {{ rooms }} </div>
                <div class="room-price"> ${{ price }} </div>
                <a class="btn btn-primary" :href="link" target="_blank"> Book now </a>
            </div>
        </div>
    </div>
    

</template>

<script>
export default {
    name: "AccommodationRoom",
    props: {
        photo: String,
        name: String,
        description: String,
        facilities: String,
        days: Number,
        nights: Number,
        rooms: String,
        price: String,
        link: String,
    }
}
</script>

<style scoped>
.row {
    background-color: rgb(0, 15, 95, 0.05);
    align-items: center;
    margin: 10px 0px;
    color: black;
}

img {
    width: 100%;
    border-radius: 10px;
    margin: 10px 0px
}

.room-name {
    font-weight: bold;
    font-size: 25px;
}

.room-price {
    font-weight: bold;
    font-size: 25px;
}

button, a {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
    width: 120px;
}
</style>