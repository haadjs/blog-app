import { db, auth } from "./Main/config.js";
import {
  getDocs,
  collection,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = "/index.html";
    } catch (error) {
      alert("Invalid email or password");
    }
  });
});
