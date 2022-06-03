import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_API_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_APP_ID,
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
