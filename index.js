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
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

let userName = document.querySelector("#Username");
let imgSrc = document.querySelector("#profileImg");
let logoutBtn = document.querySelector("#logBtn");
let logInBtn = document.querySelector("#logInBtn");
let dashboard = document.querySelector("#dashboard");
let blog = document.querySelector(".blog-grid");
let allblogData = [];
let dashDis = document.getElementById("dashboard");

onAuthStateChanged(auth, (user) => {
  if (user) {
    logInBtn.style.display = "none";
    logoutBtn.style.display = "block";
    getuserName();
  } else {
    logInBtn.style.display = "block";
    logoutBtn.style.display = "none";
    dashDis.disabled = true;
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
    // Replacing alert with SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Sign Out Error',
      text: error.message
    });
  });
  window.location.reload();
});

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
  allblogData.length = 0;
  blog.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "UserPosts"));
  let userPosts = querySnapshot.docs.map((doc) => doc.data());

  for (let post of userPosts) {
    let uploaderName = "Unknown";
    let uploaderImg =
      "https://th.bing.com/th/id/OIP.VWwq2xtthMXiOFa4IuqAwwHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7";
    const userRef = collection(db, "userData");
    const q = query(userRef, where("userUid", "==", post.userUid));
    const userSnapshot = await getDocs(q);

    userSnapshot.forEach((doc) => {
      uploaderName = doc.data().username;
      uploaderImg = doc.data().userProfile;
    });

    blog.innerHTML += `
       <div class="blog-card">
        <div class="post-header" style="display: flex;align-items: center;justify-content: space-between; padding: 5px;" >
        <div>  <img id="uploaderimg" src="${uploaderImg}" alt="Profile Picture"/>
          <span id="name">${uploaderName}</span></div>
          <span class="post-date">${post.currenttime}</span>
        </div>
        <hr>
        <img src="${post.userPostImage}" alt="Blog Image">
        <div class="card-content">
          <h2 class="card-title">${post.title}</h2>
          <p class="card-text">${post.description}</p>
          <a href="#" class="read-more">Read More →</a>
        </div>
      </div>
    `;
  }
};

showAllData();
