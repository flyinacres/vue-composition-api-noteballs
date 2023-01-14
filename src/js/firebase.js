// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: 'AIzaSyCbXT6lTYtfCdyIUQoY8Tkik7QOrrMciBM',
    authDomain: 'noteballs-1adaf.firebaseapp.com',
    projectId: 'noteballs-1adaf',
    storageBucket: 'noteballs-1adaf.appspot.com',
    messagingSenderId: '626486034666',
    appId: '1:626486034666:web:32af2cc3c9d62549f8d793',
    measurementId: 'G-QDM8HT0N87'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export { db, auth }