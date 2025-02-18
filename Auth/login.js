import { db, auth } from "/Main/config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Validate if email and password fields are filled
  if (!email.value.trim() || !password.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please enter both email and password.',
    });
    return;
  }

  // Show a loading spinner when attempting to log in
  loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Logging in...`;
  loginBtn.disabled = true;

  try {
    // Try signing in with email and password
    await signInWithEmailAndPassword(auth, email.value, password.value);
    window.location = "/index.html";  // Redirect to home page after login success

    // Optionally show success alert (if you want a success message)
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Login Successful',
    //   text: 'Welcome back!',
    // });

  } catch (error) {
    // Handle sign-in error
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message,  // Show specific error message
    });

    // Re-enable the login button and reset the text after error
    loginBtn.disabled = false;
    loginBtn.innerHTML = 'Login';
  }
});
