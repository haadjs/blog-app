import { auth, db } from "/Main/config.js";
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
  let submit = document.querySelector(".submit");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!username.value || !email.value || !password.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields.',
      });
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      // Add user data to Firestore
      await addDoc(collection(db, "userData"), {
        userUid: user.uid,
        username: username.value,
        email: email.value,
        userProfile: profileImageUrl,
      });

      console.log("User created & data stored:", user);

      // Show success alert and redirect
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting to login...',
      }).then(() => {
        window.location.href = "./login.html";  // Redirect to login page
      });
    } catch (error) {
      // Show error alert in case of failure
      console.error("Error creating user:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Error: ' + error.message,
      });
    }

    // Clear the input fields
    username.value = "";
    email.value = "";
    password.value = "";
  });
});
