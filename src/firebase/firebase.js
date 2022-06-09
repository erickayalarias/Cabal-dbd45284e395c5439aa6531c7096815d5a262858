import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD2Af9blnTqB4D2-Nk9hhndKH-MpCuaytI",
  authDomain: "cabal-project.firebaseapp.com",
  projectId: "cabal-project",
  storageBucket: "cabal-project.appspot.com",
  messagingSenderId:877459755219,
  appId: "1:877459755219:web:89e3857c0a28d255f88426",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
