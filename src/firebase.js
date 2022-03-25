import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBBhVKLyxX5ZOFFKNtFUmVwy9z9rtO1A90",
  authDomain: "safe-travel-1a5dd.firebaseapp.com",
  projectId: "safe-travel-1a5dd",
  storageBucket: "safe-travel-1a5dd.appspot.com",
  messagingSenderId: "82496921353",
  appId: "1:82496921353:web:400248e68cb852e0827dd8"
};
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp