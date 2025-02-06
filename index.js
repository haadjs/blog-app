import {db} from './Main/config.js'
import { getDocs ,doc,collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let userName = document.querySelector('#Username')

let getuserName = async ( ) =>{
    const querySnapshot = await getDocs(collection(db, "userData"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  userName.innerHTML = doc.data().username;
});



}
getuserName()

























