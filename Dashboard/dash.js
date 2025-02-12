import { auth, db } from "/Main/config.js";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderData();
  } else {
    window.location = "/index.html";
  }
});

let allposts = [];
let UserBlogImage = "";
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let publishBtn = document.querySelector(".publish");
let logoutBtn = document.querySelector("#logoutBtn");
let maincard = document.querySelector(".cardmain");

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/Auth/login.html";
    })
    .catch((error) => {
      alert("Sign Out Error: " + error.message);
    });
});

// Cloudinary upload widget
let myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dhqhxvdrs",
    uploadPreset: "Blog App",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      UserBlogImage = result.info.secure_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  () => {
    myWidget.open();
  },
  false
);

publishBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  if (!title.value || !description.value) {
    alert("Please fill in all fields");
    return;
  }

  await addDoc(collection(db, "UserPosts"), {
    userUid: auth.currentUser.uid,
    title: title.value,
    description: description.value,
    userPostImage: UserBlogImage,
    currenttime: new Date().toLocaleString(),
  });

  description.value = "";
  title.value = "";
  renderData();
});

// Render user posts
let renderData = async () => {
  allposts.length = 0;
  const postsRef = collection(db, "UserPosts");
  const q = query(postsRef, where("userUid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    allposts.unshift(doc.data());
  });

  maincard.innerHTML = "";
  allposts.forEach((post) => {
    maincard.innerHTML += `  
      <div class="blog-grid">
        <div class="blog-card">
          <p class="post-date"> <span>Username</span>${post.currenttime}</p><hr>
          <img id='postimg' src="${post.userPostImage}" alt="Blog Image">
          <div class="card-body mt-5">
            <h2 class="card-title">${post.title}</h2>
            <p class="card-text">${post.description}</p>
          </div>
        </div>
      </div>`;
  });
};
