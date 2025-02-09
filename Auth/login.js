import { auth } from "/Main/config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let loginbtn = document.querySelector(".login-btn");

  loginbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!email.value || !password.value) {
      alert("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log("User signed in successfully:", userCredential.user.email);

      // Redirect only if login is successful
      window.location.href = "/index.html";
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Invalid email or password");
    }
  });
});
