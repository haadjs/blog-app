import { db } from "./Main/config.js";
import {
  getDocs,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";



// itnitialize all Variable
let Data = [];
let userName = document.querySelector("#Username");
let imgSrc = document.querySelector("#profileImg");
let logBtn = document.querySelector('#logBtn')

// Logout Function
let login = true;

logBtn.addEventListener('click', () => {
    if (login === true){
    
    }
})





// Get the image and the name of the user
let getuserName = async () => {
  const querySnapshot = await getDocs(collection(db, "userData"));
  querySnapshot.forEach((doc) => {
    Data.push(doc.data());
    userName.innerHTML = doc.data().username;
    imgSrc.src = doc.data().userProfile;
  });
};
getuserName();
