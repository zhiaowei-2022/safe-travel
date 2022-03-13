<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <span class="search-field">
        <SearchInput input="Singapore"/>
        <SearchInput input="14 Feb 2022 - 21 Feb 2022"/>
        <SearchInput input="2 Guests"/>
        <SearchInput input="1 Room"/>
    </span>
    <br>
    <div>
        <button class="btn btn-primary pull-right" name="submit" type="submit">
            Modify Search
        </button>
    </div>
</template>

<script>
import SearchInput from '@/template/AccomodationSearchInput.vue'

export default {
    name: 'AccomodationResults',
    components: {
        SearchInput
    }
}
</script>

<style scoped>
button {
    background-color: rgb(1, 1, 87);
    border-color: rgb(1, 1, 87);
    color: white;
    font-weight: bold;
}

.search-field {
   display: flex;
   justify-content: center;
}
</style>