import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAguMo3k4AU4pvVrFrP4I9KmJkIdWeAMS4",
    authDomain: "test-firebase-66cf9.firebaseapp.com",
    projectId: "test-firebase-66cf9",
    storageBucket: "test-firebase-66cf9.appspot.com",
    messagingSenderId: "1035742213201",
    appId: "1:1035742213201:web:8e004c87f52c664862f470",
    measurementId: "G-N2K3R6KERR"
}


const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp