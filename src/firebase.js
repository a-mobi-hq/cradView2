// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDglkCT6ohYOhqyxvcYZ-CBz28mfYMJIEA",
  authDomain: "craddule-38022.firebaseapp.com",
  projectId: "craddule-38022",
  storageBucket: "craddule-38022.appspot.com",
  messagingSenderId: "948376056381",
  appId: "1:948376056381:web:e569dc6e5efaf5e4847054",
  measurementId: "G-B7LBY51F0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request permission for notifications
export const requestForToken = () => {
  return getToken(messaging)
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Send the token to your server and update the UI if necessary
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
});
