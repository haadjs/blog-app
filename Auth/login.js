import { db, auth } from "/Main/config.js";
import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const loginBtn = document.querySelector(".login-btn");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!email.value.trim() || !password.value.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location = "/index.html";
    } catch (error) {
      alert(error.message); // Provides a more specific error message
    }
  });
});
