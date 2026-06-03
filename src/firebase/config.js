import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAE4fZJCG5H62JFaKP-tOqK6s8jEGcEu_k",
    authDomain: "fir-pi-ecbf4.firebaseapp.com",
    projectId: "fir-pi-ecbf4",
    storageBucket: "fir-pi-ecbf4.firebasestorage.app",
    messagingSenderId: "230585019095",
    appId: "1:230585019095:web:a07858d324ce33f7ae1e92"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore(); 