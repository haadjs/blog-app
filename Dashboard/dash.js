import { auth, db } from "/Main/config.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "/index.html";
  }
});
let allposts = [];
let UserBlogImage;
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
      // An error happened.
      alert.error("Sign Out Error:", error.message);
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
      console.log("Image Uploaded: ", result.info);
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
    Timestamp: new Date(),
  });

  description.value = "";
  title.value = "";
});

// Get the image and the name of the user
let renderData = async () => {
  allposts.length = 0;
  const querySnapshot = await getDocs(collection(db, "UserPosts"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    allposts.push(doc.data());
  });
  maincard.innerHTML = "";
  allposts.forEach((post) => {
    maincard.innerHTML += `  <h2 class="text-center mb-4">Latest Blog Posts</h2>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card blog-card">
                        <img src="/img/WhatsApp Image 2025-01-17 at 18.43.21_78a22f8e (1).png" class="card-img-top" alt="Blog Image">
                        <div class="card-body">
                            <h3 class="card-title">${post.title}</h3>
                            <p class="card-text">
                              ${post.description}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="post-date">Published on: ${post.Timestamp}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  });
};
renderData();
