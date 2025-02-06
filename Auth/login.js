import { auth } from "/Main/config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginbtn = document.querySelector(".login-btn");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log("User signed in successfully:", user.email);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Error:", errorMessage);
    });

  // Clear form fields
  email.value = "";
  password.value = "";

  // Redirect to home page
  window.location.href = "/index.html";
});
