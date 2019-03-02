import firebase from "firebase";



let config = {
    apiKey: "AIzaSyDnEY9IT2nbxJtQNHv_2GscuHN1X7BCNcE",
    authDomain: "message-app-4bab0.firebaseapp.com",
    databaseURL: "https://message-app-4bab0.firebaseio.com",
    projectId: "message-app-4bab0",
    storageBucket: "message-app-4bab0.appspot.com",
    messagingSenderId: "413568418478"
};


firebase.initializeApp(config);

export default firebase;