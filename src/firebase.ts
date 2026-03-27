// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF17nkV9obyRVqMGYwSX9Al5IpbjvWSDw",
  authDomain: "ficha-automatica-skyfall.firebaseapp.com",
  projectId: "ficha-automatica-skyfall",
  storageBucket: "ficha-automatica-skyfall.firebasestorage.app",
  messagingSenderId: "755097477428",
  appId: "1:755097477428:web:ec795ed31b85436c8ac561",
  measurementId: "G-ZVL9Z6SSZT",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export default app
