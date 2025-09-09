const firebaseConfig = {
  apiKey: "AIzaSyDkZTq6hHOnaC3STTSOVM4O5bZa4gN_gU4",
  authDomain: "spoj-na-spoj.firebaseapp.com",
  databaseURL:
    "https://spoj-na-spoj-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spoj-na-spoj",
  storageBucket: "spoj-na-spoj.firebasestorage.app",
  messagingSenderId: "1017482186864",
  appId: "1:1017482186864:web:17a59b598cacdfbd0c24b5",
  measurementId: "G-8BXLHEKRZ7",
};

// Inicijalizacija Firebasea
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
