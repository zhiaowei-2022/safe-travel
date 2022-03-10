<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    
    <h1>Dedicated for Happy Flying Experience</h1>

    <!-- Form for Book Flight Search Fields -->
    <div class="container">
        <form>
        <div class="row">
          <div class="col">
           <label for="origin-country" class="form-label">Origin</label>
           <input type="text" class="form-control" id="origin-country-input" placeholder="Enter origin country">
          </div>
          <div class="col">
            <label for="destination-country" class="form-label">Destination</label>
            <input type="text" class="form-control" id="destination-country-input" placeholder="Enter destination country">
           </div>
        </div>
        <br>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <label for="departure-date">Departure Date</label>
                        <input id="departure-date" class="form-control" type="date" />
                    </div>
                    <div class="col">
                        <label for="return-date">Return Date</label>
                        <input id="return-date" class="form-control" type="date" />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <label>No of Passengers</label>
                        <input id="no-passengers" class="form-control" type="number" placeholder="No. of Passenger(s)">
                    </div>
                    <div class="col">
                        <label>Class</label>
                        <input id="class-type" class="form-control" type="number" placeholder="Class">
                    </div>
                </div>
            </div>  
        </div>
        <br>
        <div class="row g-lg-2">
            <div class="form-group">
                <div>
                 <button class="btn btn-primary " name="submit" type="submit">
                  Submit
                 </button>
                </div>
            </div>
        </div>
        </form>
    </div>
    <br>
    <h4>Popular Destination</h4>
    <br>
    <div class="container">
        <div class="row">
            <div class="col">
                <figure>
                    <img src="@/assets/osaka-japan.jpg" style= "width: 80%; height: 80%" alt="picture of Osaka, Japan">
                    <figcaption>Osaka, Japan</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/berlin-germany.jpg" style= "width: 80%; height: 80%" alt="picture of Berlin, Germany">
                    <figcaption>Berlin, Germany</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <img src="@/assets/paris-france.jpg" style= "width: 80%; height: 80%" alt="picture of Paris, France">
                    <figcaption>Paris, France</figcaption>
                </figure>
            </div>
        </div>
    </div>
    
    
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>