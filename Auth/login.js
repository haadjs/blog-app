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

let userName = document.querySelector("#Username");
let imgSrc = document.querySelector("#profileImg") || "";
let logoutBtn = document.querySelector("#logBtn");
let logInBtn = document.querySelector("#logInBtn");
let dashboard = document.querySelector("#dashboard");
let blog = document.querySelector(".blog-grid");
let allblogData = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    logInBtn.style.display = "none";
    logoutBtn.style.display = "block";
    getuserName();
  } else {
    logInBtn.style.display = "block";
    logoutBtn.style.display = "none";
    document.getElementById("dashboard").disabled = true;
  }
});

dashboard.addEventListener("click", () => {
  window.location.href = "/Dashboard/dash.html";
});

logInBtn.addEventListener("click", () => {
  window.location.href = "/Auth/login.html";
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).catch((error) => {
    alert("Sign Out Error: " + error.message);
  });
});

// Get the image and the name of the user
let getuserName = async () => {
  const userRef = collection(db, "userData");
  const q = query(userRef, where("userUid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userName.innerHTML = `Welcome, ${doc.data().username}`;
    imgSrc.src = doc.data().userProfile;
  });
};

let showAllData = async () => {
  allblogData = [];
  const querySnapshot = await getDocs(collection(db, "UserPosts"));
  querySnapshot.forEach((doc) => {
    allblogData.push(doc.data());
  });
  blog.innerHTML = allblogData
    .map(
      (post) => `
    <div class="blog-card">
      <img src="${post.userPostImage}" alt="Blog Image">
      <div class="card-content">
        <p class="post-date"><span>Username</span> ${post.currenttime}</p>
        <h2 class="card-title">${post.title}</h2>
        <p class="card-text">${post.description}</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
    </div>
  `
    )
    .join("");
};

showAllData();
