<template>
    <div style="" class="login-register">
        <div class="bg-cover container align-items-center justify-content-center default"
            v-bind:class="{ smaller: showButton }" id="animationrow">
            <transition class="transition" name="expand" mode="out-in">
                <div class="row">
                    <div id="log-in-card" style="margin-top: 10%" class="card col-sm-12 col-md-6 mx-auto rounded-0">
                        <span id="card-outline" style="height:4px"></span>

                        <img class="card-img-top mx-auto" src="../assets/ui/mikro_logo_trim.png" alt="mikro logo"
                            style="max-width:250px; padding:50px">

                        <div class="card-body">
                            <form>
                                <div id="login_inputfields" class="form-group mt-2" style="width: 100%;">
                                    <input type="text" class="form-control rounded-0" autofocus="autofocus"
                                        maxlength="25" id="loginInputUID" required="required" v-model="loginemail">
                                    <span id="input-field-label">Email</span>
                                    <span id="input-field-underline"></span>
                                </div>

                                <div id="login_inputfields" class="form-group mt-5" style="width: 100%;">
                                    <input type="password" class="form-control rounded-0" id="loginInputPW"
                                        required="required" v-model="loginpassword">
                                    <span id="input-field-label">Password</span>
                                    <span id="input-field-underline"></span>
                                </div>
                            </form>

                            <div>
                                <!-- <router-link to="/home"> -->
                                <button id="login-btn" class="btn btn-primary w-100 mt-5" @click="login">
                                    <div id="login-btn-container">
                                        <span id="login-text" style="font-size: 15px;">Log in</span>
                                        <img id="login-btn-img" src="../assets/ui/enter-icon.png" alt="">
                                        <div id="login-btn-overlay"></div>
                                    </div>

                                </button>
                                <!-- </router-link> -->
                            </div>

                            <!-- <div>
                            <router-link to="Register">
                                <button id="register-btn" class="btn btn-outline-primary w-100 mt-3" style="font-size:20px; height: 65px;">
                                    Register
                                </button>
                            </router-link>
                        </div> -->

                            <div class="d-flex justify-content-start mt-3" style="font-size:14px;">
                                <router-link to="/">
                                    Forgot your User ID or Password?
                                </router-link>
                            </div>

                            <!-- <button @click="toggleBigger">
                            <transition name="expand" mode="out-in">
                             <div  class="default" v-bind:class="{ smaller: showButton }"> B </div> -->

                            <!--<input-div><</input-div>-->
                            <!-- </transition>
                           </button> -->
                        </div>

                        <span id="card-outline" class="mt-4" style="height:4px"></span>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
import { useRouter } from 'vue-router'
// import { ref, child, get, set } from "firebase/database"
import { auth } from "../main.js"
import { signInWithEmailAndPassword } from "firebase/auth";

export default
    {
        name: 'LoginRegisterPage',

        components: {
            //NavigationBar
        },

        props:
        {

        },

        data() {
            return {
                showButton: false,
                loginemail: "",
                loginpassword: "",

                router: useRouter()
            }
        },

        methods: {
            toggleBigger: function () {
                this.showButton = !this.showButton;
            },

            changePage: function () {
                setTimeout(() => this.$router.push({ path: '/home' }), 1000);
            },

            changeImage: function () {
                var loginText = document.getElementById("login-text");
                var loginImage = document.getElementById("login-btn-img");
                var loginContainer = document.getElementById("login-btn-container");
                var loginImageOverlay = document.getElementById("login-btn-overlay");
                if (loginText && loginImage && loginContainer) {
                    loginText.innerText = "";
                    loginImageOverlay.style.visibility = "hidden";
                    loginImage.style.visibility = "hidden";
                    loginContainer.style.backgroundSize = "50px 50px";
                    loginContainer.style.transform = "translate(0px)";

                }

            },

            login() {
                signInWithEmailAndPassword(auth, this.loginemail, this.loginpassword)
                    .then((data) => {
                        console.log(data === 0);
                        console.log("Success!");

                        this.changeImage();
                        this.toggleBigger();
                        this.changePage()

                    })
                    .catch((e) => {
                        switch (e.code) {
                            case "auth/invalid-email":
                                this.errorMsg = "Invalid email";
                                break;
                            case "auth/user-not-found":
                                this.errorMsg = "No account with taht email was found";
                                break;
                            case "auth/wrong-password":
                                this.errorMsg = "Incorrect password";
                                break;
                            default:
                                this.errorMsg = "Email or password was incorrect";
                                break;
                        }
                        alert(this.errorMsg)
                    });
            }
        },
        created() {

        },

        mounted() {

        }
    }

</script>

<style>
.transition {
    padding-left: 25px;
    width: 100%;
}

.default {
    transition: ease-out;
    opacity: 1;
    transition-property: width, height, opacity;
}

.smaller {
    transition: ease-out;
    width: 0%;
    height: 0%;
    opacity: 0;
    transition-duration: 0.2s;
    transition-delay: 0.7s;
    transition-property: width, height, opacity;
}



#log-in-card {
    margin: 50px 0px 50px 0px;
    padding: 40px 30px 60px 30px;

    outline: none;
    border: none;

    width: 540px;
    background-color: aliceblue;
    overflow: hidden;
    box-shadow: rgba(121, 121, 121, 0.988) 3px 7px 29px 3px;
    margin-top: 0;
}

#card-outline {
    width: 100%;
    background-color: #344c64;
    display: flex;
    justify-content: center;
}

.form-control:focus {
    border-color: none;
    box-shadow: none;
}

.form-control:selected {
    border-color: #2f4863;
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
    background-color: #2f4863 !important;
    border-color: #2f4863 !important;
}

.btn-outline-primary,
.btn-outline-primary:hover {
    border-color: #2f4863 !important;
    color: #2f4863 !important;
    background-color: aliceblue;
}
</style>

<style scoped>
.login-register {
    background-color: #2f4863;
    background-image: url(../assets/ui/background.webp);
    height: 110vh;
}

.form-group {
    position: relative;
}

.form-group input {
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    color: aliceblue;

    min-height: 50px;
    font-size: 15px;
    letter-spacing: 0.1ch;
    z-index: 20;
    overflow: hidden;
}

.form-group #input-field-label {
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px;
    transition: 0.3s;
    pointer-events: none;
}

.form-group input:valid~#input-field-label,
.form-group input:focus~#input-field-label {
    color: #344c64;
    transform: translate(-20px, -37px) scale(0.8);
}

.form-group #input-field-underline {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #2f4863;
    border-radius: 4px;
    transition: 0.3s;
    pointer-events: none;
    z-index: 1;
}

.form-group input:focus~#input-field-underline,
.form-group input:valid~#input-field-underline {
    height: 50px;
}

#login-btn:hover {
    transition: 0.3s;
    transform: scale(1.05);
}

#login-btn-container {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 25px;

    height: 35px;
    padding-left: 35px;

    transition: 0.3s;
    background-image: url("../assets/ui/load.gif");
    background-repeat: no-repeat;
    background-size: 0px, 0px;
    background-position: center;
}

#login-btn-container:hover {
    transform: translateX(-15px);
}

#login-btn-container #login-btn-img {

    height: 20px;

    transform: translateX(10px);
}

#login-btn-container #login-btn-overlay {

    height: 20px;
    width: 27px;

    transform: translateX(-10px);

    transition: 0.3s;
    background-color: #2f4863;
}

#login-btn-container:hover #login-btn-overlay {
    transform: translateX(10px);
}


#register-btn:hover {
    transition: 0.3s;
    transform: scale(1.05);
}
</style>
