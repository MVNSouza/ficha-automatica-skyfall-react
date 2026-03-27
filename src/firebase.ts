import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAF17nkV9obyRVqMGYwSX9Al5IpbjvWSDw",
  authDomain: "ficha-automatica-skyfall.firebaseapp.com",
  projectId: "ficha-automatica-skyfall",
  storageBucket: "ficha-automatica-skyfall.firebasestorage.app",
  messagingSenderId: "755097477428",
  appId: "1:755097477428:web:ec795ed31b85436c8ac561",
  measurementId: "G-ZVL9Z6SSZT",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
