// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const reportRoutes = require('./routes/index');
app.use('/api', reportRoutes);
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims('zPOaBrfQNMS1Ku2CdQJGSM5xZBv1', { admin: true })
  .then(() => {
    console.log("Admin role assigned to the owner");
  })
  .catch((error) => {
    console.error("Error assigning admin role:", error);
});

admin.auth().setCustomUserClaims('V7GEmN9WWPdWNZF09JS1HSBRWRf2', { role: 'worker' })
  .then(() => {
    console.log("Admin role assigned to the owner");
  })
  .catch((error) => {
    console.error("Error assigning admin role:", error);
});

admin.auth().setCustomUserClaims('JuXxtR0PYWexP5IJONSWjFy00LG3', { role: 'worker' })
  .then(() => {
    console.log("Admin role assigned to the owner");
  })
  .catch((error) => {
    console.error("Error assigning admin role:", error);
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
