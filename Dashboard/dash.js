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
      // Success message after sign-out
      Swal.fire({
        icon: 'success',
        title: 'Signed out successfully',
        text: 'You have been logged out.',
      });
    })
    .catch((error) => {
      // Error message for sign-out
      Swal.fire({
        icon: 'error',
        title: 'Sign Out Error',
        text: error.message,
      });
    });
  window.location.reload();
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
    // SweetAlert message when fields are empty
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill in all fields.',
    });
    return;
  }

  try {
    await addDoc(collection(db, "UserPosts"), {
      userUid: auth.currentUser.uid,
      title: title.value,
      description: description.value,
      userPostImage: UserBlogImage,
      currenttime: new Date().toLocaleString(),
    });

    // Success message after posting
    Swal.fire({
      icon: 'success',
      title: 'Post Published',
      text: 'Your blog post has been successfully published!',
    });

    description.value = "";
    title.value = "";
    renderData();
  } catch (error) {
    // Error message if the post creation fails
    Swal.fire({
      icon: 'error',
      title: 'Error Publishing Post',
      text: error.message,
    });
  }
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

  let exist = "unknown";
  let uploaderImg;
  const usersRef = collection(db, "userData");
  const qe = query(usersRef, where("userUid", "==", auth.currentUser.uid));
  const Snapshot = await getDocs(qe);
  Snapshot.forEach((doc) => {
    uploaderImg = doc.data().userProfile;
    exist = doc.data().username;
  });

  maincard.innerHTML = "";
  allposts.forEach((post) => {
    maincard.innerHTML += `  
      <div class="blog-card">
        <div class="post-header" style="display: flex;align-items: center;justify-content: space-between; padding: 5px;" >
        <div>  <img id="uploaderimg" src="${uploaderImg}" alt="Profile Picture"/>
          <span id="name">${exist}</span></div>
          <span class="post-date">${post.currenttime}</span>
        </div>
        <hr>
        <img src="${post.userPostImage}" alt="Blog Image">
        <div class="card-content">
          <h2 class="card-title">${post.title}</h2>
          <p class="card-text">${post.description}</p>
          <a href="#" class="read-more">Read More →</a>
        </div>
      </div>`; 
  });
};
