// delete_account.js
const { Client } = require('firebase-admin');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}

exports.handler = async (req, res) => {
    if (req.method === 'POST') {
        const { uid } = req.body;

        if (!uid) {
            return res.status(400).json({ message: 'UID is required' });
        }

        try {
            // Delete user from Firebase Authentication
            await admin.auth().deleteUser(uid);

            // Remove user data from Firebase Realtime Database
            const db = admin.database();
            await db.ref(`users/${uid}`).remove();

            return res.status(200).json({ message: 'Account deleted successfully' });
        } catch (err) {
            console.error('Error deleting account:', err);
            return res.status(500).json({ message: 'Error deleting account' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
};
