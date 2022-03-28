import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBBhVKLyxX5ZOFFKNtFUmVwy9z9rtO1A90",
  authDomain: "safe-travel-1a5dd.firebaseapp.com",
  projectId: "safe-travel-1a5dd",
  storageBucket: "safe-travel-1a5dd.appspot.com",
  messagingSenderId: "82496921353",
  appId: "1:82496921353:web:400248e68cb852e0827dd8"

};
/* Brandon's Firebase

    apiKey: "AIzaSyAIeivunAW9Sjchj2DBPtW_hh6QOWuUjsA",
    authDomain: "testst-a016f.firebaseapp.com",
    projectId: "testst-a016f",
    storageBucket: "testst-a016f.appspot.com",
    messagingSenderId: "724391561029",
    appId: "1:724391561029:web:78bac7550e3ec3f2ec202c"
  };
*/
  const firebaseApp = initializeApp(firebaseConfig);
  
  export default firebaseApp;