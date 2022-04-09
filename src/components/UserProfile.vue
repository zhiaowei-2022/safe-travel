<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />

  <br />
  <div id="whole">
    <div class="container">
      <div class="title">
        <h1>Edit Profile</h1>
        <br />
      </div>

      <div class="row">
        <div class="col col-lg-3 justify-content-end">
          <img
            :src="DPurl"
            style="
              height: 200px;
              width: 200px;
              border-radius: 50%;
              margin-bottom: 20px;
              margin-left: 60px;
            "
          />
          <input
            style="display: none"
            ref="uploadDP"
            type="file"
            @change="onFileSelected"
          />
          <button
            @click="$refs.uploadDP.click()"
            style="
              height: 25px;
              width: 200px;
              text-align: center;
              font-size: 12px;
              background-color: lightskyblue;
              margin-left: 60px;
            "
          >
            Change Display Picture
          </button>
          <br />
        </div>

        <div class="col col-lg" style="">
          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="username" id="credentials"
                  >Username:
                </label></strong
              >
            </div>
            <div class="col col-lg-6">
              <input
                class="accountForm"
                id="username"
                :placeholder="actualUsername"
              />
              <p id="newPasswordCriteria">
                Note: Username should not be more than 15 characters.
              </p>
            </div>
          </div>

          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="email" id="credentials">Email: </label></strong
              >
            </div>
            <div class="col col-lg-6">
              <input class="accountForm" :value="actualEmail" readonly />
            </div>
          </div>

          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="phone" id="credentials"
                  >Phone Number:</label
                ></strong
              >
            </div>
            <div class="col col-lg-6">
              <input
                class="accountForm"
                v-model="phone"
                id="phone"
                type="number"
                :placeholder="actualPhone"
              />
            </div>
          </div>

          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="password" id="credentials"
                  >Password:
                </label></strong
              >
            </div>
            <div class="col col-lg-6">
              <input
                class="accountForm"
                :value="actualPassword"
                type="password"
                readonly
              />
              <button
                data-bs-toggle="modal"
                id="changeBtn"
                data-bs-target="#changePwModal"
              >
                Change
              </button>
            </div>
          </div>

          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="gender" id="credentials">Gender: </label></strong
              >
            </div>
            <div class="col col-lg-6">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                />
                <label class="form-check-label" for="male">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label class="form-check-label" for="female">Female</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="others"
                  value="others"
                />
                <label class="form-check-label" for="others">Others</label>
              </div>
            </div>
          </div>

          <div class="row" style="padding-left: 10%">
            <div class="col col-lg-3" style="text-align: right">
              <strong
                ><label for="nation" id="credentials"
                  >Nationality:
                </label></strong
              >
            </div>
            <div class="col col-lg-6">
              <input
                class="accountForm"
                v-model="nation"
                id="nation"
                :placeholder="actualNation"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col" style="text-align: center">
          <br />
          <button id="saveBtn" @click="save()">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="changePwModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="font-weight: bold; color: rgb(0, 15, 92)">
            Change Password
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            v-on:click="resetForm()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="field">
              <div class="row justify-content-md-center">
                <div class="col col-lg-5" style="text-align: right">
                  <strong
                    ><label
                      for="password"
                      id="newcredentials"
                      style="margin: 2px 0 0 0 0"
                      >Current Password:
                    </label></strong
                  >
                </div>
                <div span class="col col-lg-7">
                  <input
                    class="passwordForm"
                    v-if="showPassword"
                    v-model="password"
                    type=""
                  />
                  <input
                    class="passwordForm"
                    v-else
                    v-model="password"
                    type="password"
                  />
                  <div
                    v-if="showPassword"
                    @click="toggleShow"
                    style="display: inline-block; margin: 7px 0 0 5px"
                  >
                    <i id="visibility" class="fa-solid fa-eye"></i>
                  </div>
                  <div
                    v-else
                    @click="toggleShow"
                    style="display: inline-block; margin: 7px 0 0 5px"
                  >
                    <i id="visibility" class="fa-solid fa-eye-slash"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="row justify-content-md-center">
                <div class="col col-lg-5" style="text-align: right">
                  <strong
                    ><label
                      for="password"
                      id="newcredentials"
                      style="margin: 0 0 0 0 0"
                      >New Password:
                    </label></strong
                  >
                </div>
                <div span class="col col-lg-7">
                  <input
                    class="passwordForm"
                    id="passwordForm"
                    v-if="showNewPassword"
                    v-model="newPassword"
                    type=""
                  />
                  <input
                    class="passwordForm"
                    id="passwordForm"
                    v-else
                    v-model="newPassword"
                    type="password"
                  />
                  <div
                    v-if="showNewPassword"
                    @click="toggleShowNew"
                    style="display: inline-block; margin: 7px 0 0 5px"
                  >
                    <i id="visibility" class="fa-solid fa-eye"></i>
                  </div>
                  <div
                    v-else
                    @click="toggleShowNew"
                    style="display: inline-block; margin: 7px 0 0 5px"
                  >
                    <i id="visibility" class="fa-solid fa-eye-slash"></i>
                  </div>
                  <p id="newPasswordCriteria">
                    Note: At least 8 Characters with 1 Numeric Number
                  </p>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="row justify-content-md-center">
                <div class="col" style="text-align: center">
                  <br />
                  <button
                    type="button"
                    id="changePwBtn"
                    v-on:click="changePw()"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="changePwModal1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel1"
            style="font-weight: bold; font-size: 30px; color: rgb(0, 15, 92);"
          >
            {{ passwordTitle }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            v-on:click="resetForm()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ passwordMsg }}
          <br /><br /><img
            src="@/assets/sad.png"
            alt="sad face"
            style="height: 120px; width: 120px"
          />
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            id="errorBtn"
            data-bs-target="#changePwModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import * as $ from "jquery";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      showPassword: false,
      showNewPassword: false,
      user: false,
      actualUsername: "",
      actualEmail: "",
      actualPhone: "",
      actualPassword: "",
      actualGender: "",
      actualNation: "",
      password: "",
      newPassword: "",
      passwordMsg: "",
      passwordTitle: "",
      DPurl: "",
      DP: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        var userEmail = this.user.email;
        const docRef = doc(db, "Users", userEmail);
        getDoc(docRef).then((docSnap) => {
          this.actualUsername = docSnap.data().username;
          this.actualPhone = docSnap.data().phone_num;
          this.actualPassword = docSnap.data().password;
          this.actualEmail = docSnap.data().email;
          this.actualGender = docSnap.data().gender;
          this.actualNation = docSnap.data().nation;
          this.DPurl = docSnap.data().display_pic;
          document.getElementById(this.actualGender).checked = true;
        });
      }
    });

    let jquery = document.createElement("script");
    jquery.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    );
  },

  methods: {
    async onFileSelected(event) {
      this.DP = event.target.files[0];
      const storage = getStorage();
      const profileRef = ref(
        storage,
        "UsersDP/" + this.actualEmail + "/" + this.DP.name
      );
      console.log(profileRef);
      const uploadTask = uploadBytesResumable(profileRef, this.DP);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          console.log(snapshot);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", (this.DPurl = downloadURL));
            this.save();
          });
        }
      );
    },

    async save() {
      const userRef = doc(db, "Users", this.actualEmail);

      let newUsername = document.getElementById("username").value;
      newUsername = newUsername.substring(0, 15);
      newUsername = newUsername == "" ? this.actualUsername : newUsername;

      let newPhone = document.getElementById("phone").value;
      newPhone = newPhone == 0 ? this.actualPhone : newPhone;

      let newGender = $("input[name=gender]:checked").val();

      let newNation = document.getElementById("nation").value;
      newNation = newNation == "" ? this.actualNation : newNation;

      let updatedPassword =
        this.newPassword == "" ? this.actualPassword : this.newPassword;

      await updateDoc(userRef, {
        username: newUsername,
        phone_num: newPhone,
        gender: newGender,
        nation: newNation,
        password: updatedPassword,
        display_pic: this.DPurl,
      });

      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      })
        .then(() => {
          console.log("updated displayname");
          console.log(auth.currentUser);
        })
        .catch((error) => {
          console.log(error);
        });

      await updatePassword(auth.currentUser, updatedPassword)
        .then(() => {
          // Update successful.
          console.log(updatedPassword);
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error);
        });

      await this.$router.push({ name: "UserProfile" }).then(() => {
        this.$router.go();
      });
    },

    resetForm() {
      this.showPassword = false;
      this.showNewPassword = false;
      this.password = "";
      this.newPassword = "";
    },

    toggleShow() {
      if (this.showPassword == true) {
        this.showPassword = false;
      } else {
        this.showPassword = true;
      }
    },

    toggleShowNew() {
      if (this.showNewPassword == true) {
        this.showNewPassword = false;
      } else {
        this.showNewPassword = true;
      }
    },

    changePw() {
      var numbers = /[0-9]/g;
      if (this.password != this.actualPassword) {
        this.passwordTitle = "Invalid Current Password";
        this.passwordMsg = "Current Password does not match";
        $("#changePwModal").modal("hide");
        $(".modal-backdrop").modal("hide");
        $("#changePwModal1").modal("toggle");
      } else if (!this.newPassword.match(numbers) && this.password.length < 8) {
        this.passwordTitle = "Invalid New Password";
        this.passwordMsg =
          "New Password should have at least 8 Characters with 1 Numeric Number";
        $("#changePwModal").modal("hide");
        $(".modal-backdrop").modal("hide");
        $("#changePwModal1").modal("toggle");
      } else if (!this.newPassword.match(numbers)) {
        this.passwordTitle = "Invalid New Password";
        this.passwordMsg = "New Password should have at least 1 Numeric Number";
        $("#changePwModal").modal("hide");
        $(".modal-backdrop").modal("hide");
        $("#changePwModal1").modal("toggle");
      } else if (this.newPassword.length < 8) {
        this.passwordTitle = "Invalid New Password";
        this.passwordMsg = "New Password should have at least 8 Characters";
        $("#changePwModal").modal("hide");
        $(".modal-backdrop").modal("hide");
        $("#changePwModal1").modal("toggle");
      } else {
        console.log("changing pw");
        this.save();
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  color: rgb(0, 15, 92);
}
.col {
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
  margin: 40px 10px 0 0;
}

.passwordForm {
  width: 80%;
  background-color: #f0f0f0;
  height: 35px;
  border-radius: 55px;
  border: 3px solid transparent;
  margin: 9px 0 0 0;
  font-size: 15px;
  align-content: left;
}

input[type="radio"] {
  margin: 49px 10px 0 0;
}

label {
  margin: 46px 0 10px 0;
}

#changePwBtn,
#saveBtn {
  background-color: rgb(0, 15, 92);
  color: white;
  font-weight: bold;
  width: 120px;
  height: 50px;
  align-items: center;
}

#changeBtn {
  background-color: lightskyblue;
  display: inline-block;
  height: 30px;
  width: 50px;
  font-size: 10px;
  margin: 0 0 0 10px;
}

#newPasswordCriteria {
  font-size: 9px;
  margin: 0 0 0 8px;
}

#newcredentials {
  margin: 15px 0 0 0;
}

#errorBtn {
  background-color: rgb(0, 15, 92);
  border-color: rgb(0, 15, 92);
  color: white;
  font-weight: bold;
  width: 150px;
}
</style>