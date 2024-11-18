import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfQYYHf0G2l-QYLaf6UrUb3aR0oVbh2lw",
  authDomain: "banana-shield-6c3db.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "banana-shield-6c3db",
  storageBucket: "your-storage-bucket.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "1:370910777596:android:f295b6f6338008592b4779",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);
export const messaging = getMessaging(app);
