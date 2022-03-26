<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <div class="container-fluid" style="margin-bottom: 100px">
        <span class="search-field">
            <SearchInput :input = "name"/>
            <SearchInput :input = "searchDisplay(checkInDate, checkOutDate)"/>
            <SearchInput v-if="manyGuests" :input = "guests"/>
            <SearchInput v-if="!manyGuests" :input = "guest"/>
            <SearchInput v-if="manyRooms" :input = "rooms"/>
            <SearchInput v-if="!manyRooms" :input = "room"/>
        </span>

        <div>
            <button class="btn btn-primary" name="submit" type="button" data-toggle="modal" data-bs-target="#exampleModal" data-target=".bd-example-modal-lg">
                Modify Search
            </button>
        </div>

        <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    ...
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel" style="font-weight:bold; font-size:30px;">
                        Flight is unavailable :(
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Sorry, the flight that you are looking for is unavailable. Try searching again!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div> -->
                </div>
            </div>
        </div>
    </div>

    <AccomodationResult photo="mbs-singapore-2.jpg" name="Marina Bay Sands, Singapore" rating="4.6" 
        :checkInDate=resultsDisplay(checkInDate) :checkOutDate=resultsDisplay(checkOutDate) price="634"/>
    <AccomodationResult photo="mandarin-orchard-singapore.jpeg" name="Mandarin Orchard, Singapore" rating="4.4"
        :checkInDate=resultsDisplay(checkInDate) :checkOutDate=resultsDisplay(checkOutDate) price="496"/>
    <AccomodationResult photo="hotel-g-singapore.jpeg" name="Hotel G, Singapore" rating="4.1"
        :checkInDate=resultsDisplay(checkInDate) :checkOutDate=resultsDisplay(checkOutDate) price="133"/>
</template>

<script>
import SearchInput from '@/template/AccomodationSearchInput.vue'
import AccomodationResult from '@/template/AccomodationResult.vue'
import moment from 'moment'

export default {
    name: 'AccomodationResults',

    components: {
        SearchInput,
        AccomodationResult
    },
    
    data() {
        return {
            name: this.$route.query.hotelName,
            checkInDate: this.$route.query.checkInDate,
            checkOutDate: this.$route.query.checkOutDate,
            guest: this.$route.query.noOfGuests + " Guest",
            guests: this.$route.query.noOfGuests + " Guests",
            room: this.$route.query.noOfRooms + " Room",
            rooms: this.$route.query.noOfRooms + " Rooms",
            manyGuests: this.$route.query.manyGuests,
            manyRooms: this.$route.query.manyRooms,
        }
    },

    mounted() {
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)
    },

    methods: {
        searchDisplay(date1, date2) {
            return moment(date1).format("D MMM YYYY") + " - " + moment(date2).format("D MMM YYYY");
        },

        resultsDisplay(date) {
            return moment(date).format("ddd, D MMM YYYY");
        }
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