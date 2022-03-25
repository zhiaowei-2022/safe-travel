<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <button type="button" class="btn btn-light">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col col-lg-2">
                    <img src="@/assets/mbs-singapore-2.jpg" alt="">
                </div>
                <div class="col" style="text-align:left">
                    <div class="hotel-name"> {{ name }} </div>
                    <div class="hotel-body"> {{ rating }} </div>
                    <div class="hotel-body"> {{ checkInDate }} - {{ checkOutDate }}</div>
                </div>
                <div class="col col-lg-2">
                    <div class="hotel-price"> From {{ price }} </div> <br>
                    <button type="button" class="btn btn-link" style="background-color: rgb(0, 15, 95, 0)">Add to cart</button>
                </div>
            </div>
        </div>
    </button>
    

</template>

<script>
export default {
    name: "AccomodationResult",
    props: {
        photo: String,
        name: String,
        rating: String,
        checkInDate: String,
        checkOutDate: String,
        price: String
    }
}
</script>

<style scoped>
.row {
    background-color: rgb(0, 15, 95, 0);
    align-items: center;
    margin: 10px 0px;
}

img {
    width: 100%;
    border-radius: 10px;
}

.hotel-name {
    font-weight: bold;
    font-size: 25px;
    color: black;
}

.hotel-body {
    color: black;
}

.hotel-price {
    background-color: rgb(0, 15, 95);
    width: 100px;
    height: 100px;
    border-radius: 50px;
    display: inline-block;
    line-height: 100px;
    font-weight: bold;
    color: white;
    font-size: 15px;
    margin-top: 20px;
    
}

button {
    margin-bottom: 15px;
    background-color: rgb(0, 15, 95, 0.05);
    color: rgb(0, 15, 95);
}
</style>
