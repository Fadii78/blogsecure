const firebaseConfig = {
  apiKey: "AIzaSyDpebVDrdx9Vci3CtCT14VfNDmjprCgvMY",
  authDomain: "blog-7028a.firebaseapp.com",
  projectId: "blog-7028a",
  storageBucket: "blog-7028a.firebasestorage.app",
  messagingSenderId: "572428563104",
  appId: "1:572428563104:web:3687bec20baa9aa17e8fc5",
  measurementId: "G-2QQ70TGRGT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore()

let db = firebase.firestore();
const ADMIN_EMAIL = 'fahad@gmail.com';