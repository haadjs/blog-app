import { auth, db } from "/Main/config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let profileImageUrl = "";

// Cloudinary upload widget
let myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dhqhxvdrs",
    uploadPreset: "Blog App",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      profileImageUrl = result.info.secure_url; // Store image URL
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");

// Sign up with email and password
submit.addEventListener("click", async (event) => {
  event.preventDefault();

  if (!username.value || !email.value || !password.value) {
    alert("Please fill in all fields");
    return;
  }

  if (!profileImageUrl) {
    alert("Please upload a profile picture");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredential.user;

    await addDoc(collection(db, "userData"), {
      userUid: user.uid,
      username: username.value,
      email: email.value,
      userProfile: profileImageUrl, // Store uploaded profile URL
    });

    console.log("User created & data stored:", user);
    window.location = "./login.html";
  } catch (error) {
    console.error("Error creating user:", error.message);
  }

  email.value = "";
  password.value = "";
  username.value = "";
});
