<template>
<div v-if="user">
  <button id = "btn" @click="signOut()">Logout</button> <br>
  {{ user.displayName }}
  </div>
  
  
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

export default {
    name: "LogOut",

    data() {
        return {
            user: false
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'LoginView'})
        }
    }
    
}
</script>

<style>

</style>