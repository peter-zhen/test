import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCnnUAgsZUZnzxOglRqg9kIkQdZ5xZQHnI",
  authDomain: "rechargepage-d9fdb.firebaseapp.com",
  projectId: "rechargepage-d9fdb",
  appId: "1:490239735025:web:5de183d41958be870ba550",
  measurementId: "G-CMFN0XJXCX",
});

const analytics = getAnalytics(app);

export const sendEvent = (name: string, msg: string) => {
  try {
    logEvent(analytics, name, { name: name, message: msg });
  } catch (err: any) {
    logEvent(analytics, "Error", { name: "Error", message: err?.message });
  }
};

export default sendEvent;
