import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA7oDsEcQ5tvxRkGpIB-negzWmCk5L8i7Q",
    authDomain: "sports-app-yssa.firebaseapp.com",
    databaseURL: "https://sports-app-yssa-default-rtdb.firebaseio.com",
    projectId: "sports-app-yssa",
    storageBucket: "sports-app-yssa.appspot.com",
    messagingSenderId: "767151119699",
    appId: "1:767151119699:web:962f1ca5865f737be295a6",
    measurementId: "G-02L8FVW4VN"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.FacebookAuthProvider();

export { auth, google, facebook, db };


