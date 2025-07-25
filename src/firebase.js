// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAM4X1gVLb7E4wCKMkcDdkTTV-hTKgr808",
  authDomain: "realframez-website.firebaseapp.com",
  projectId: "realframez-website",
  storageBucket: "realframez-website.firebasestorage.app",
  messagingSenderId: "416022503089",
  appId: "1:416022503089:web:84cfee0f8501225bda8c90"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
