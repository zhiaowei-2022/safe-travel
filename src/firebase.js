import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAIeivunAW9Sjchj2DBPtW_hh6QOWuUjsA",
    authDomain: "testst-a016f.firebaseapp.com",
    projectId: "testst-a016f",
    storageBucket: "testst-a016f.appspot.com",
    messagingSenderId: "724391561029",
    appId: "1:724391561029:web:78bac7550e3ec3f2ec202c"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  
  export default firebaseApp;