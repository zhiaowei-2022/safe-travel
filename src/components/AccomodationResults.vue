<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <div class="container-fluid" style="margin-bottom: 100px">
        <h1>{{this.hotelName}} {{this.checkInDate}} {{this.checkOutDate}} {{this.noOfGuests}} {{this.noOfRooms}}</h1>
        <span class="search-field">
            <SearchInput input="Singapore"/>
            <SearchInput input="14 Feb 2022 - 21 Feb 2022"/>
            <SearchInput input="2 Guests"/>
            <SearchInput input="1 Room"/>
        </span>
        <div>
            <button class="btn btn-primary" name="submit" type="submit">
                Modify Search
            </button>
        </div>
    </div>

    <AccomodationResult name="Marina Bay Sands, Singapore" rating="4.6/5" 
        checkInDate="14 Feb 2022" checkOutDate="21 Feb 2022" price="$634"/>
    <AccomodationResult name="Mandarin Orchard, Singapore" rating="4.4/5" 
        checkInDate="14 Feb 2022" checkOutDate="21 Feb 2022" price="$496"/>
    <AccomodationResult name="Hotel G, Singapore" rating="4.1/5" 
        checkInDate="14 Feb 2022" checkOutDate="21 Feb 2022" price="$133"/>
</template>

<script>
import SearchInput from '@/template/AccomodationSearchInput.vue'
import AccomodationResult from '@/template/AccomodationResult.vue'

export default {
    name: 'AccomodationResults',

    components: {
        SearchInput,
        AccomodationResult
    },
    
    data() {
        return {
            hotelName: "",
            checkInDate: "",
            checkOutDate: "",
            noOfGuests: "",
            noOfRooms: "",
        }
    },

    created() {
        this.hotelName=this.$route.query.hotelName
        this.checkInDate=this.$route.query.checkInDate
        this.checkOutDate=this.$route.query.checkOutDate
        this.noOfGuests=this.$route.query.noOfGuests
        this.noOfRooms=this.$route.query.noOfRooms
    }
}
</script>

<style scoped>
button {
    background-color: rgb(0, 15, 92);
    border-color: rgb(0, 15, 92);
    color: white;
    font-weight: bold;
    float: right;
    margin-right: 60px;
    margin-top: 10px;
}

.search-field {
   display: flex;
   justify-content: center;
}

img {
    width: 90%;
    border-radius: 20px;
    display: inline-block;
}
</style>