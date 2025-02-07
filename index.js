import { db,auth } from "./Main/config.js";
import {
  getDocs,
  doc,
  collection,
  where ,
  query
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {signOut , onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid); 
    
  } else {
    // No user is signed in.
    window.location.href = "/Auth/login.html";
  }
});


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
  
  const q = query(collection(db, "userData"), where("userUid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    Data.push(doc.data());
    userName.innerHTML = ` Welcome,${doc.data().username}`;
    imgSrc.src = doc.data().userProfile;
  });
};
getuserName();
