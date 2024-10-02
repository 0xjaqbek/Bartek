// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./bartekbuilders-firebase-adminsdk-m03fz-38941493a7.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the port (Firebase sets environment variable `process.env.PORT`)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Use this code only when assigning roles (do not use it in production)
admin.auth().setCustomUserClaims('USER_ID_FOR_ADMIN', { admin: true })
  .then(() => {
    console.log("Admin role assigned to the owner");
  })
  .catch((error) => {
    console.error("Error assigning admin role:", error);
});

// Set worker roles similarly when needed (use this once, not on every app start)
admin.auth().setCustomUserClaims('USER_ID_FOR_WORKER', { role: 'worker' })
  .then(() => {
    console.log("Worker role assigned");
  })
  .catch((error) => {
    console.error("Error assigning worker role:", error);
});
