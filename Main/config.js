  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCrqgcn4Ox62C8LGCelLRKsK2pNY5HIPoQ",
    authDomain: "blog-app-69c7d.firebaseapp.com",
    projectId: "blog-app-69c7d",
    storageBucket: "blog-app-69c7d.firebasestorage.app",
    messagingSenderId: "975120489542",
    appId: "1:975120489542:web:a44d31b1f55d4dc32b3e47"
  };
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);