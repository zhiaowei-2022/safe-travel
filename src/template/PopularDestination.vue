:<template>
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
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
</style>