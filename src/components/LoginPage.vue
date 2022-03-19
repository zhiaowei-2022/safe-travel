<template>
<div>
    <table>
        <tr>
            <td>
                <label for="email">Email: </label>
            </td>
            <td>
                <input class="signInForm" v-model= "email" id="email" type="text" placeholder="xyz@gmail.com"> <br>
            </td>
        </tr>
            
        <tr>
            <td>
                <label for="password">Password: </label>
            </td>
            <td>
                <input class="signInForm" v-if="showPassword" id="password" v-model="password" type="text" placeholder="*******">
                <input class="signInForm" v-else id="password" v-model="password" type="password" placeholder="*******"> <br>  
            </td>

            <td>
                <div v-if="showPassword" @click="toggleShow">
                  <i class="fa-solid fa-eye"></i>
                </div>
                <div v-else @click="toggleShow">
                    <i class="fa-solid fa-eye-slash"></i>
                </div>
            </td>
        </tr>

        <tr>
            <td></td>
            <td>
                <p id="register"> New to Safe Travel? Sign up 
                  <router-link to="/registerrouter">HERE</router-link> </p>
                  <router-view/>
                 <br>
                
                <button type="button" id="loginBtn" v-on:click="LogIn()"> Log In</button>
            </td>
        </tr>

    </table>
    
    <button @click="signOut" v-if="isLoggedIn"> Sign out</button>
    <p v-if="isLoggedIn" id="displayUsername"> </p>


                

</div>
</template>

<script>
export default {
    name: "LoginPage"

}
</script>

<style>

</style>