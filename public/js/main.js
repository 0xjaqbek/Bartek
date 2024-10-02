// public/js/main.js
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
        appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
    };

    // Initialize Firebase if it hasn't been initialized
    firebase.initializeApp(firebaseConfig);
} else {
    console.log("Firebase app already initialized.");
}
  
  // Login functionality
  document.getElementById('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    
      console.log(`Attempting to log in with email: ${email}`);
    
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
    
            console.log('User signed in:', user.email);
    
            // Get user token and check role
            user.getIdTokenResult().then(idTokenResult => {
                console.log('Token claims:', idTokenResult.claims);  // Log the token claims for debugging
  
                // Check for admin role
                if (idTokenResult.claims.admin) {
                    console.log(`${user.email} is an admin. Redirecting to admin dashboard.`);
                    window.location.href = "/admin-dashboard.html";
                } else {
                    // Default to worker dashboard
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
  