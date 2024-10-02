// routes/index.js
const express = require('express');
const router = express.Router();

router.post('/submit-report', (req, res) => {
    const { workerId, report } = req.body;
    console.log(`Worker ${workerId} submitted report: ${report}`);
    res.status(200).send('Report received');
});

module.exports = router;
