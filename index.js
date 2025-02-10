import { db, auth } from "./Main/config.js";
import {
  getDocs,
  doc,
  collection,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

let Data = [];
let userName = document.querySelector("#Username");
let imgSrc = document.querySelector("#profileImg");
let logoutBtn = document.querySelector("#logBtn");
let logInBtn = document.querySelector("#logInBtn");
let dashboard = document.querySelector("#dashboard");
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    logInBtn.style.display = "none";
    logoutBtn.style.display = "block";
    console.log(uid);
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
  signOut(auth)
    .then(() => {
      // window.location.href = "/Auth/login.html";
    })
    .catch((error) => {
      // An error happened.
      alert.error("Sign Out Error:", error.message);
    });
});

// Get the image and the name of the user
let getuserName = async () => {
  const citiesRef = collection(db, "userData");
  const q = query(citiesRef, where("userUid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    userName.innerHTML = `Welcome,${doc.data().username}`;
    imgSrc.src = doc.data().userProfile;
  });
};
