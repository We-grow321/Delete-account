// server.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

app.use(express.json());

app.post('/delete_account', (req, res) => {
    const uid = req.body.uid;
    if (!uid) {
        return res.status(400).json({ message: 'UID is required' });
    }

    // Simulate the call to your API URL (use your actual API logic)
    console.log(`Deleting account for UID: ${uid}`);
    
    // Replace this with actual logic to call your backend API
    res.status(200).json({ message: 'Account deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
