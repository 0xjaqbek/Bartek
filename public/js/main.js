// public/js/main.js
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
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
