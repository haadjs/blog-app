import {auth , db} from '/Main/config.js'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


let UserBlogImage;
let title =document.querySelector('#title');
let description = document.querySelector('#description');
let publishBtn = document.querySelector('.publish')


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

document.getElementById("upload_widget").addEventListener("click", () => {
  myWidget.open();
}, false);

console.log(auth.currentUser.uid);

publishBtn.addEventListener('click',  async(event) => {
    event.preventDefault();

    if (!title.value ||!description.value) {
        alert('Please fill in all fields');
        return;
    }

     await addDoc(collection(db, "UserPosts"), {
            userUid: auth.currentUser.uid,
            title: title.value,
            description: description.value,
            userPostImage: UserBlogImage 
          });





    description.value = ''
    title.value = ''

})
