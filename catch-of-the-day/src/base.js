import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCrATYcvzXWCLGRULs4gM4sBFyWpEOloVg",
        authDomain: "catch-of-the-day-miska.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-miska.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;