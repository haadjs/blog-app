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
let imgSrc = document.querySelector("#profileImg") || "";
let logoutBtn = document.querySelector("#logBtn");
let logInBtn = document.querySelector("#logInBtn");
let dashboard = document.querySelector("#dashboard");
let blog = document.querySelector(".blog-grid");
let allblogData = [];
let dashDis =document.getElementById("dashboard")
let existUser = 'unknown';




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



// import { onAuthStateChanged } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = collection(db, "userData");
    const q = query(userRef, where("userUid", "==", user.uid));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("User Exists:", doc.data().username);
        existUser.innerHTML = doc.data().username;
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is signed in.");
  }
});






// let existName = async () => {
// const userRef = collection(db, "userData");
// const q = query(userRef, where("userUid", "==", auth.currentUser.uid));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   existUser = doc.data().username;
// });

// }
// existName()

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
  allblogData.length = 0
  const querySnapshot = await getDocs(collection(db, "UserPosts"));
  querySnapshot.forEach((doc) => {
    allblogData.push(doc.data());
  });
   allblogData.forEach((post) =>{
    blog.innerHTML +=   `
    <div class="blog-card">
    <p class="post-date"><span id = "name">${existUser}</span> ${post.currenttime}</p><hr>
      <img src="${post.userPostImage}" alt="Blog Image">
      <div class="card-content">
        <h2 class="card-title">${post.title}</h2>
        <p class="card-text">${post.description}</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
    </div>
    
  `})
};
showAllData();

