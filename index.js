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
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    getuserName();
  } else {
    // No user is signed in.
    window.location.href = "/Auth/login.html";
  }
});



let login = true;

if (!login) {
  logInBtn.style.display = "block";
  logoutBtn.style.display = "none";
  login = false;
} else {
  logInBtn.style.display = "none";
  logoutBtn.style.display = "block";
  login = true;
}

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/Auth/login.html";
    })
    .catch((error) => {
      // An error happened.
    });
});

// Get the image and the name of the user
let getuserName = async () => {
  const citiesRef = collection(db, "userData");
  const q = query(citiesRef, where("userUid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    userName.innerHTML = doc.data().username;
    imgSrc.src = doc.data().userProfile;
  });
};
