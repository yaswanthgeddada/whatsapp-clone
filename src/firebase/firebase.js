import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD21raE4A26wXZEjBB0fTsM0QrjOBEVfxw",
  authDomain: "chit-chat123.firebaseapp.com",
  projectId: "chit-chat123",
  storageBucket: "chit-chat123.appspot.com",
  messagingSenderId: "142987745137",
  appId: "1:142987745137:web:aa407d36d503ed7419c8d0",
  measurementId: "G-N72JEG3TYC",
});
export const auth = app.auth();
export const storage = app.storage();

export default firebase;
