<template>
    <figure>
        <img :src="this.image" :alt="this.altText">
        <figcaption> {{ countryName }} </figcaption>
    </figure>

</template>

<script>
export default {
    name: "PopularDestination",
    props: {
        image: String,
        countryName: String,
        altText: String,
    }
}
</script>

<style>
img {
    width: 95%;
    border-radius: 20px;
}

figcaption {
    font-weight: bold;
}
</style>