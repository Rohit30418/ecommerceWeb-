import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyAKAAaPF7rB519gdvQN6AjuhQyjTqDRH-Q",
  authDomain: "myshop-8fa30.firebaseapp.com",
  projectId: "myshop-8fa30",
  storageBucket: "myshop-8fa30.appspot.com",
  messagingSenderId: "436394369396",
  appId: "1:436394369396:web:9edd582b7c492b42320c21",
  measurementId: "G-HY6NQJ32QR"
};

  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth=getAuth(firebaseApp)

export { firebaseApp, db, storage ,auth };