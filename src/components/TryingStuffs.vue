<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">






<div id="whole">

  <div class="container">
    <div class="title">
      <h1> Edit Profile </h1>
    </div>


      
    <div class="row justify-content-md-center">
      <div class="col col-lg-1">
        <img src="@\assets\sad.png" alt="Italian Trulli" style="height:200px;width:200px;"><br>
        

      </div>

      <div class="col">

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="username" id="credentials">Username: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" v-model="username" type="text">
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="email" id="credentials">Email: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" value="Can't edit" readonly>
          </div>
        </div>
 
        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="username" id="credentials">Username: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" v-model="username" type="text">
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="phone" id="credentials">Phone Number: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" v-model="phone" type="number">
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="password" id="credentials">Password: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" value="Can't edit" type=password readonly>
            <button style="display:inline-block; height: 30px; width: 50px; font-size: 10px; margin: 0 0 0 10px;">Change</button>
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="gender" id="credentials">Gender: </label></strong>
          </div>
          <div class="col col-lg-5">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="male" checked>
              <label class="form-check-label" for="male">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="female">
              <label class="form-check-label" for="female">Female</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="others" value="others">
              <label class="form-check-label" for="others">Others</label>
            </div>

          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2" style="text-align:right">
            <strong><label for="nation" id="credentials">Nationality: </label></strong>
          </div>
          <div class="col col-lg-5">
            <input class="accountForm" v-model="nation" type="text">
          </div>
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col" style="text-align:center">
        <br>
        <button style> Save </button>
      </div>
    </div>



  </div>




</div>
        
</template>

<script>

export default {

  mounted() {
    let jquery = document.createElement('script')
    jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
    document.head.appendChild(jquery)
  }
}

</script>

<style scoped>
  .col{ 
      /* background-color: gray; */
    /* color: blue; */
    /* text-align: left; */
    border: 1px solid black;
    text-align: left;
  }

  .accountForm {
    width: 80%;
    background-color: #f0f0f0;
    height: 35px;
    border-radius: 55px;
    border: 3px solid transparent;
    padding: 0;
    font-size: 15px;
  
  }

  input[type="radio"]{
    margin: 0 10px 0 10px;
  }

  .row {
    /* height: 25%; */
  }



</style>