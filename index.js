import { db,auth } from "./Main/config.js";
import {
  getDocs,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {signOut } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'


// itnitialize all Variable
let Data = [];
let userName = document.querySelector("#Username");
let imgSrc = document.querySelector("#profileImg");
let logoutBtn = document.querySelector('#logBtn')
let logInBtn = document.querySelector('#logInBtn')


// Logout Function
let login = true;

if (!login) {
    logInBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
}else if (login){
    logInBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
}

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "/Auth/login.html";
      }).catch((error) => {
        // An error happened.
      });
})




// Get the image and the name of the user
let getuserName = async () => {
  const querySnapshot = await getDocs(collection(db, "userData"));
  querySnapshot.forEach((doc) => {
    Data.push(doc.data());
    userName.innerHTML = ` Welcome,${doc.data().username}`;
    imgSrc.src = doc.data().userProfile;
  });
};
getuserName();
