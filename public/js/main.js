// public/js/main.js
// Firebase config from Firebase Console (Settings > General)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Login functionality
  document.getElementById('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
  
            // Get user token and check role
            user.getIdTokenResult().then(idTokenResult => {
                // If admin, redirect to admin dashboard
                if (idTokenResult.claims.admin) {
                    window.location.href = "/admin-dashboard.html";
                } else {
                    // Else redirect to worker dashboard
                    window.location.href = "/worker-dashboard.html";
                }
            }).catch((error) => {
                console.error('Error fetching token:', error);
            });
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
        });
  });
  