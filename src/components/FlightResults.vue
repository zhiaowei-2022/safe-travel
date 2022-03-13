<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

     <div class="search-field">
        <FlightSearchInput input="Melbourne"/>
        <i class="bi bi-arrow-right"></i>
        <FlightSearchInput input="Singapore"/>
        <FlightSearchInput input="14 Feb 2022 - 21 Feb 2022"/>
        <FlightSearchInput input="2 Passengers"/>
        <FlightSearchInput input="Economy Class"/>
    </div>
    <br>
    <div class="form-group">
        <div>
            <button class="btn btn-primary pull-right" name="submit" type="submit">
                Modify Search
            </button>
        </div>
    </div>
    <br>

    <h2>Depart - Melbourne to Singapore</h2>
    <div class="container">
        <div class="row rectangle">
            <div class="circle"></div>
        </div>
        <br>
        <div class="row rectangle">
            <div class="circle"></div>
        </div>
    </div>

</template>

<script>
import FlightSearchInput from '@/template/FlightSearchInput.vue'

export default {
    name: 'FlightResults',
    components: {
        FlightSearchInput
    }
}
</script>

<style scoped>
    .search-field {
        display: flex;
        justify-content: center;
    }
    .search-result {
        text-align: left;
    }
    h2 {
    text-align: left;
    margin-left: 80px;
    font-weight: bold;
    color: rgb(1, 1, 87);
    }   
    .rectangle {
        width: 1300px;
        height: 150px;
        background: rgb(0, 15, 95, 0.13);
    }
    .circle {
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
    margin-left: 30px;
    margin-top: 15px;
    }
</style>