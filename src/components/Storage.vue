<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


<!-- <div v-if="user">
  <button id = "btn" @click="signOut()">Logout</button> <br>
    {{ user.displayName }}
  </div>
  <div v-else>
      <p> unknown user</p>
  </div> -->
  <a id = "trial" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" role="button">Open first modal</a>

  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <!-- <button class="btn btn-primary" v-on:click="change()" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal -->
        <button id = "check" class="btn btn-primary" @click = "change()" data-bs-target="#exampleModalToggle2" data-bs-toggle="">Open second modal
        <!-- <button class="btn btn-primary" v-on:click="change()">Open second modal -->
        <!-- <div v-if="invalid" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal"></div> -->
        </button>
      </div>
    </div>
  </div>
</div>

<div v-if = "invalid">
<div  class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Hide this modal and show the first with the button below.
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
<div id = "secondModal">
</div>
-->


</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"


export default {
    name: "TryingStuffs",

    data() {
        return {
            user: false,
            invalid: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
        let jquery = document.createElement('script')
        jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
        document.head.appendChild(jquery)
        
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'LoginView'})
        },

        change() {
            // $('#exampleModal1').modal('show')
            // var jquery = document.createElement('script')
            // jquery.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
            // jquery('#exampleModal1').modal('toggle')
            // this.invalid = true;
            // console.log(this.invalid)
            //this.invalid = true;
            console.log(this.invalid)
            //document.getElementsByClassName
            //dcoument.getElementById("check").data-bs-toggle = "modal"
            document.getElementById("exampleModalToggle2").modal("toggle")
            /*
            if (this.invalid == false){
              document.getElementById("secondModal").innerHTML = `
              <div  class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Hide this modal and show the first with the button below.
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                    </div>
                  </div>
                </div>
              </div>
              `
              */
            }

        },

        close() {
            this.invalid = false;
            console.log("here")
        }
    }

    
</script>

<style>

</style>