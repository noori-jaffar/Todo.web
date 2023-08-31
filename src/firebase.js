// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ7Rco5C77HqrgTWRI2UbNq8HyoMCtltw",
  authDomain: "todo-app-1304e.firebaseapp.com",
  projectId: "todo-app-1304e",
  storageBucket: "todo-app-1304e.appspot.com",
  messagingSenderId: "856405717019",
  appId: "1:856405717019:web:1ee6c34d69ab39f6b408be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);