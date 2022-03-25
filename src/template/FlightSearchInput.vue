<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

    <span>
        <span class="input">
            {{ input }}
        </span>
    </span>
</template>

<script>
export default {
    name: "FlightSearchInput",
    props: {
        input: String
    }
}
</script>

<style scoped>
    .input {
        background-color: rgb(0, 15, 95, 0.13);
        padding: 10px 65px;
        margin: 10px;
        color: black;
        border-radius: 10px;
    }
</style>