// public/js/main.js
// Firebase config from Firebase Console (Settings > General)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
                if (idTokenResult.claims.admin) {
                    // Redirect owner to admin dashboard
                    window.location.href = "/admin-dashboard.html";
                } else {
                    // Redirect workers to worker dashboard
                    window.location.href = "/worker-dashboard.html";
                }
            });
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
        });
  });