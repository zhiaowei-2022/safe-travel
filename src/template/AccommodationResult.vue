<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <button type="button" class="btn btn-light" @click='onclick(modalPhoto, name, rating, address, phone, email, description, rooms)'>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col col-lg-2">
                    <img :src="photo" alt="">
                </div>
                <div class="col" style="text-align:left">
                    <div class="hotel-name"> {{ name }} </div>
                    <div class="hotel-body"> {{ rating }} / 5</div>
                    <div class="hotel-body"> {{ checkInDate }} - {{ checkOutDate }}</div>
                </div>
                <div class="col col-lg-2">
                    <div class="hotel-price-text"> Price from </div>
                    <div class="hotel-price"> ${{ price }} </div>
                    <div class="hotel-price-text"> per night and room </div>
                </div>
            </div>
        </div>
    </button>
    

</template>

<script>
export default {
    name: "AccommodationResult",
    props: {
        photo: String,
        name: String,
        rating: Number,
        checkInDate: String,
        checkOutDate: String,
        price: String,
        onclick: Function,
        address: String,
        phone: String,
        email: String,
        description: String,
        modalPhoto: String,
        rooms: Array,
    }
}
</script>

<style scoped>
.row {
    background-color: rgb(0, 15, 95, 0);
    align-items: center;
    margin: 10px 0px;
    color: black;
}

img {
    width: 100%;
    border-radius: 10px;
}

.hotel-name {
    font-weight: bold;
    font-size: 25px;
}

.hotel-price {
    font-weight: bold;
    color: rgb(0, 15, 95);;
    font-size: 25px;
    text-align: right;
}

.hotel-price-text {
    text-align: right;
    font-size: 15px;
}

button {
    margin-bottom: 15px;
    background-color: rgb(0, 15, 95, 0.05);
    color: rgb(0, 15, 95);
}
</style>