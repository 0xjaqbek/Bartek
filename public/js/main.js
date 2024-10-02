// Importing only what you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

// Login functionality
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(`Attempting to log in with email: ${email}`);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;

          console.log('User signed in:', user.email);

          user.getIdTokenResult().then(idTokenResult => {
              console.log('Token claims:', idTokenResult.claims);

              if (idTokenResult.claims.admin) {
                  console.log(`${user.email} is an admin. Redirecting to admin dashboard.`);
                  window.location.href = "/admin-dashboard.html";
              } else {
                  console.log(`${user.email} is a worker. Redirecting to worker dashboard.`);
                  window.location.href = "/worker-dashboard.html";
              }
          }).catch((error) => {
              console.error('Error fetching token:', error);
          });
      })
      .catch((error) => {
          console.error('Login failed:', error.message);
          document.getElementById('error-message').innerText = error.message;
      });
});
