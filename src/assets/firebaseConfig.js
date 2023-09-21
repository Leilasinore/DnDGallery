import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC9Cev4YtFUYaRV2LLL6GA3HckqdwQz58U",
  authDomain: "galleryauth.firebaseapp.com",
  projectId: "galleryauth",
  storageBucket: "galleryauth.appspot.com",
  messagingSenderId: "795518037401",
  appId: "1:795518037401:web:9ab556e88a18d337823708",
  measurementId: "G-DDZNQ7KFPY",
};

const app =initializeApp(firebaseConfig)

export const auth = getAuth(app);