import { auth, db } from "./Main/config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let profileImageUrl = "https://via.placeholder.com/150"; // Default image

// Cloudinary upload widget
let myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dhqhxvdrs",
    uploadPreset: "Blog App",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Image Uploaded: ", result.info);
      profileImageUrl = result.info.secure_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener("click", () => {
  myWidget.open();
}, false);

document.addEventListener("DOMContentLoaded", () => {
  let username = document.querySelector("#username");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let submit = document.querySelector(".login-btn");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!username.value || !email.value || !password.value) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      await addDoc(collection(db, "userData"), {
        userUid: user.uid,
        username: username.value,
        email: email.value,
        userProfile: profileImageUrl 
      });

      console.log("User created & data stored:", user);
      alert("Registration successful! Redirecting to login...");
      window.location.href = "./login.html";
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Registration failed: " + error.message);
    }

    username.value = "";
    email.value = "";
    password.value = "";
  });
});
